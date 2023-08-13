provider "aws" {
  region = local.region
}

provider "kubernetes" {
  host                   = data.aws_eks_cluster.this.endpoint
  cluster_ca_certificate = base64decode(data.aws_eks_cluster.this.certificate_authority[0].data)

  exec {
    api_version = "client.authentication.k8s.io/v1beta1"
    command     = "aws"
    # This requires the awscli to be installed locally where Terraform is executed
    args = ["eks", "get-token", "--cluster-name", local.eks_cluster]
  }
}

provider "helm" {
  kubernetes {
    host                   = data.aws_eks_cluster.this.endpoint
    cluster_ca_certificate = base64decode(data.aws_eks_cluster.this.certificate_authority[0].data)

    exec {
      api_version = "client.authentication.k8s.io/v1beta1"
      command     = "aws"
      # This requires the awscli to be installed locally where Terraform is executed
      args = ["eks", "get-token", "--cluster-name", local.eks_cluster]
    }
  }
}

data "aws_eks_cluster" "this" {
  name = local.eks_cluster
}

locals {
  region      = var.region
  name        = "stable-diffusion"
  eks_cluster = "ray-cluster"
}

module "stable_diffusion_service" {
  source = "../../../modules/ray-service"

  namespace        = local.name
  ray_cluster_name = local.name
  eks_cluster_name = local.eks_cluster
  serve_config = yamldecode(<<EOF
importPath: "stable_diffusion:entrypoint"
runtimeEnv: |
  working_dir: "https://github.com/askulkarni2/ray-demo/raw/main/src.zip"
EOF
  )
}
