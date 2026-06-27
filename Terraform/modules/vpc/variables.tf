variable "vpc_cidr" {
  description = "VPC CIDR"
  type        = string
}

variable "public_subnets" {
  description = "Public Subnet CIDRs"
  type        = list(string)
}

variable "private_subnets" {
  description = "Private Subnet CIDRs"
  type        = list(string)
}

variable "environment" {
  type = string
}