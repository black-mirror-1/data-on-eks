variable "name" {
  description = "Name of the VPC and EKS Cluster"
  default     = "spark-k8s-operator"
  type        = string
}

variable "region" {
  description = "region"
  type        = string
  default     = "us-west-2"
}

variable "eks_cluster_version" {
  description = "EKS Cluster version"
  default     = "1.23"
  type        = string
}

variable "vpc_cidr" {
  description = "VPC CIDR with 65,536 Ips"
  default     = "10.1.0.0/16"
  type        = string
}

variable "public_subnets" {
  description = "Public Subnets CIDRs. 4094 IPs per Subnet"
  default     = ["10.1.192.0/20", "10.1.208.0/20", "10.1.224.0/20"]
  type        = list(string)
}

# You can also use "10.1.0.0/17"(32,768) and "10.1.64.0/18"(16382) with two AZs in two private subnets
variable "private_subnets" {
  description = "Private Subnets CIDRs. 16382 IPs per Subnet"
  default     = ["10.1.0.0/18", "10.1.64.0/18", "10.1.128.0/18"]
  type        = list(string)
}

variable "database_subnets" {
  description = "Private Database Subnets CIDRs. 2046 IPs per Subnet"
  default     = ["10.1.240.0/21", "10.1.248.0/21"]
  type        = list(string)
}

variable "eks_cluster_domain" {
  description = "Optional Route53 domain for the cluster."
  type        = string
  default     = ""
}

variable "acm_certificate_domain" {
  description = "Optional Route53 certificate domain"
  type        = string
  default     = null
}
