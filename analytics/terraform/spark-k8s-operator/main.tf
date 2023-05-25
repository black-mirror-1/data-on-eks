locals {
  name   = var.name
  region = var.region
  azs    = slice(data.aws_availability_zones.available.names, 0, 2)

  tags = {
    Blueprint  = local.name
    GithubRepo = "github.com/awslabs/data-on-eks"
  }
  # This role will be created
  karpenter_iam_role_name = format("%s-%s", "karpenter", local.name)
}

#---------------------------------------------------------------
# EKS Cluster
#---------------------------------------------------------------
module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 19.13"

  cluster_name    = local.name
  cluster_version = var.eks_cluster_version

  cluster_endpoint_private_access = true # if true, Kubernetes API requests within your cluster's VPC (such as node to control plane communication) use the private VPC endpoint
  cluster_endpoint_public_access  = true # if true, Your cluster API server is accessible from the internet. You can, optionally, limit the CIDR blocks that can access the public endpoint.

  vpc_id = module.vpc.vpc_id
  # Filtering only Secondary CIDR private subnets starting with "100.". Subnet IDs where the EKS Control Plane ENIs will be created
  subnet_ids = compact([for subnet_id, cidr_block in zipmap(module.vpc.private_subnets, module.vpc.private_subnets_cidr_blocks) : substr(cidr_block, 0, 4) == "100." ? subnet_id : null])

  manage_aws_auth_configmap = true
  aws_auth_roles = [
    # We need to add in the Karpenter node IAM role for nodes launched by Karpenter
    {
      rolearn  = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:role/${local.karpenter_iam_role_name}"
      username = "system:node:{{EC2PrivateDNSName}}"
      groups = [
        "system:bootstrappers",
        "system:nodes",
      ]
    }
  ]

  #---------------------------------------
  # Note: This can further restricted to specific required for each Add-on and your application
  #---------------------------------------
  # Extend cluster security group rules
  cluster_security_group_additional_rules = {
    ingress_nodes_ephemeral_ports_tcp = {
      description                = "Nodes on ephemeral ports"
      protocol                   = "tcp"
      from_port                  = 1025
      to_port                    = 65535
      type                       = "ingress"
      source_node_security_group = true
    }
  }

  # Extend node-to-node security group rules
  node_security_group_additional_rules = {
    ingress_self_all = {
      description = "Node to node all ports/protocols"
      protocol    = "-1"
      from_port   = 0
      to_port     = 0
      type        = "ingress"
      self        = true
    }
    egress_all = {
      description      = "Node all egress"
      protocol         = "-1"
      from_port        = 0
      to_port          = 0
      type             = "egress"
      cidr_blocks      = ["0.0.0.0/0"]
      ipv6_cidr_blocks = ["::/0"]
    }
    # Allows Control Plane Nodes to talk to Worker nodes on all ports. Added this to simplify the example and further avoid issues with Add-ons communication with Control plane.
    # This can be restricted further to specific port based on the requirement for each Add-on e.g., metrics-server 4443, spark-operator 8080, karpenter 8443 etc.
    # Change this according to your security requirements if needed
    ingress_cluster_to_node_all_traffic = {
      description                   = "Cluster API to Nodegroup all traffic"
      protocol                      = "-1"
      from_port                     = 0
      to_port                       = 0
      type                          = "ingress"
      source_cluster_security_group = true
    }
  }

  eks_managed_node_group_defaults = {
    iam_role_additional_policies = {
      # Not required, but used in the example to access the nodes to inspect mounted volumes
      AmazonSSMManagedInstanceCore = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
    }
  }

  eks_managed_node_groups = {
    #  We recommend to have a MNG to place your critical workloads and add-ons
    #  Then rely on Karpenter to scale your workloads
    #  You can also make uses on nodeSelector and Taints/tolerations to spread workloads on MNG or Karpenter provisioners
    core_node_group = {
      name        = "core-node-group"
      description = "EKS managed node group example launch template"
      # Filtering only Secondary CIDR private subnets starting with "100.". Subnet IDs where the nodes/node groups will be provisioned
      subnet_ids = compact([for subnet_id, cidr_block in zipmap(module.vpc.private_subnets, module.vpc.private_subnets_cidr_blocks) : substr(cidr_block, 0, 4) == "100." ? subnet_id : null])

      ami_id = data.aws_ami.x86.image_id
      # This will ensure the bootstrap user data is used to join the node
      # By default, EKS managed node groups will not append bootstrap script;
      # this adds it back in using the default template provided by the module
      # Note: this assumes the AMI provided is an EKS optimized AMI derivative
      enable_bootstrap_user_data = true

      # Optional - This is to show how you can pass pre bootstrap data
      pre_bootstrap_user_data = <<-EOT
        echo "Node bootstrap process started by Data on EKS"
      EOT

      # Optional - Post bootstrap data to verify anything
      post_bootstrap_user_data = <<-EOT
        echo "Bootstrap complete.Ready to Go!"
      EOT

      min_size     = 3
      max_size     = 9
      desired_size = 3

      force_update_version = true
      instance_types       = ["m5.xlarge"]

      ebs_optimized = true
      block_device_mappings = {
        xvda = {
          device_name = "/dev/xvda"
          ebs = {
            volume_size = 100
            volume_type = "gp3"
          }
        }
      }

      update_config = {
        max_unavailable_percentage = 50
      }

      labels = {
        WorkerType    = "ON_DEMAND"
        NodeGroupType = "core"
      }

      tags = {
        Name                     = "core-node-grp",
        "karpenter.sh/discovery" = local.name
      }
    }

    spark_ondemand_r5d = {
      name        = "spark-ondemand-r5d"
      description = "Spark managed node group for Driver pods"
      # Filtering only Secondary CIDR private subnets starting with "100.". Subnet IDs where the nodes/node groups will be provisioned
      subnet_ids = [element(compact([for subnet_id, cidr_block in zipmap(module.vpc.private_subnets, module.vpc.private_subnets_cidr_blocks) : substr(cidr_block, 0, 4) == "100." ? subnet_id : null]), 0)]

      ami_type = "AL2_x86_64" # Use this for Graviton AL2_ARM_64

      # Current default AMI used by managed node groups - pseudo "custom"
      ami_id = data.aws_ami.x86.image_id
      # This will ensure the bootstrap user data is used to join the node
      # By default, EKS managed node groups will not append bootstrap script;
      # this adds it back in using the default template provided by the module
      # Note: this assumes the AMI provided is an EKS optimized AMI derivative
      enable_bootstrap_user_data = true

      # NVMe instance store volumes are automatically enumerated and assigned a device
      pre_bootstrap_user_data = <<-EOT
        echo "Running a custom user data script"
        set -ex
        yum install mdadm -y

        DEVICES=$(lsblk -o NAME,TYPE -dsn | awk '/disk/ {print $1}')
        DISK_ARRAY=()

        for DEV in $DEVICES
        do
          DISK_ARRAY+=("/dev/$${DEV}")
        done

        DISK_COUNT=$${#DISK_ARRAY[@]}

        if [ $${DISK_COUNT} -eq 0 ]; then
          echo "No SSD disks available. No further action needed."
        else
          if [ $${DISK_COUNT} -eq 1 ]; then
            TARGET_DEV=$${DISK_ARRAY[0]}
            mkfs.xfs $${TARGET_DEV}
          else
            mdadm --create --verbose /dev/md0 --level=0 --raid-devices=$${DISK_COUNT} $${DISK_ARRAY[@]}
            mkfs.xfs /dev/md0
            TARGET_DEV=/dev/md0
          fi

          mkdir -p /local1
          echo $${TARGET_DEV} /local1 xfs defaults,noatime 1 2 >> /etc/fstab
          mount -a
          /usr/bin/chown -hR +999:+1000 /local1
        fi
      EOT

      # Optional - Post bootstrap data to verify anything
      post_bootstrap_user_data = <<-EOT
        echo "Bootstrap complete.Ready to Go!"
      EOT

      min_size     = 0
      max_size     = 20
      desired_size = 0

      force_update_version = true
      instance_types       = ["r5d.xlarge"] # r5d.xlarge 4vCPU - 32GB - 1 x 150 NVMe SSD - Up to 10Gbps - Up to 4,750 Mbps EBS Bandwidth

      ebs_optimized = true
      # This bloc device is used only for root volume. Adjust volume according to your size.
      # NOTE: Dont use this volume for Spark workloads
      block_device_mappings = {
        xvda = {
          device_name = "/dev/xvda"
          ebs = {
            volume_size = 100
            volume_type = "gp3"
          }
        }
      }

      update_config = {
        max_unavailable_percentage = 50
      }

      labels = {
        WorkerType    = "ON_DEMAND"
        NodeGroupType = "spark-on-demand-ca"
      }

      taints = [{ key = "spark-on-demand-ca", value = true, effect = "NO_SCHEDULE" }]

      tags = {
        Name          = "spark-ondemand-r5d"
        WorkerType    = "ON_DEMAND"
        NodeGroupType = "spark-on-demand-ca"
      }
    }

    # ec2-instance-selector --vcpus=48 --gpus 0 -a arm64 --allow-list '.*d.*'
    # This command will give you the list of the instances with similar vcpus for arm64 dense instances
    spark_spot_x86_48cpu = {
      name        = "spark-spot-48cpu"
      description = "Spark Spot node group for executor workloads"
      # Filtering only Secondary CIDR private subnets starting with "100.". Subnet IDs where the nodes/node groups will be provisioned
      subnet_ids = [element(compact([for subnet_id, cidr_block in zipmap(module.vpc.private_subnets, module.vpc.private_subnets_cidr_blocks) : substr(cidr_block, 0, 4) == "100." ? subnet_id : null]), 0)]

      ami_type = "AL2_x86_64" # Use this for Graviton AL2_ARM_64
      # Current default AMI used by managed node groups - pseudo "custom"
      ami_id = data.aws_ami.x86.image_id

      enable_bootstrap_user_data = true

      # NVMe instance store volumes are automatically enumerated and assigned a device
      pre_bootstrap_user_data = <<-EOT
        echo "Running a custom user data script"
        set -ex
        yum install mdadm -y

        DEVICES=$(lsblk -o NAME,TYPE -dsn | awk '/disk/ {print $1}')
        DISK_ARRAY=()

        for DEV in $DEVICES
        do
          DISK_ARRAY+=("/dev/$${DEV}")
        done

        DISK_COUNT=$${#DISK_ARRAY[@]}

        if [ $${DISK_COUNT} -eq 0 ]; then
          echo "No SSD disks available. No further action needed."
        else
          if [ $${DISK_COUNT} -eq 1 ]; then
            TARGET_DEV=$${DISK_ARRAY[0]}
            mkfs.xfs $${TARGET_DEV}
          else
            mdadm --create --verbose /dev/md0 --level=0 --raid-devices=$${DISK_COUNT} $${DISK_ARRAY[@]}
            mkfs.xfs /dev/md0
            TARGET_DEV=/dev/md0
          fi

          mkdir -p /local1
          echo $${TARGET_DEV} /local1 xfs defaults,noatime 1 2 >> /etc/fstab
          mount -a
          /usr/bin/chown -hR +999:+1000 /local1
        fi
      EOT

      # Optional - Post bootstrap data to verify anything
      post_bootstrap_user_data = <<-EOT
        echo "Bootstrap complete.Ready to Go!"
      EOT

      min_size     = 0
      max_size     = 12
      desired_size = 0

      capacity_type        = "SPOT"
      force_update_version = true
      instance_types       = ["r5d.12xlarge", "r6id.12xlarge", "c5ad.12xlarge", "c5d.12xlarge", "c6id.12xlarge", "m5ad.12xlarge", "m5d.12xlarge", "m6id.12xlarge"] # 48cpu - 2 x 1425 NVMe SSD

      ebs_optimized = true
      block_device_mappings = {
        xvda = {
          device_name = "/dev/xvda"
          ebs = {
            volume_size = 100
            volume_type = "gp3"
          }
        }
      }

      update_config = {
        max_unavailable_percentage = 50
      }

      labels = {
        WorkerType    = "SPOT"
        NodeGroupType = "spark-spot-ca"
      }

      taints = [{ key = "spark-spot-ca", value = true, effect = "NO_SCHEDULE" }]

      tags = {
        Name          = "spark-node-grp"
        WorkerType    = "SPOT"
        NodeGroupType = "spark"
      }
    }
  }
}
