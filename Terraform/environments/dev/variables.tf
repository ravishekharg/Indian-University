variable "aws_region" {
  type    = string
  default = "ap-south-2"
}

variable "environment" {
  type    = string
  default = "dev"
}

variable "vpc_cidr" {
  type    = string
  default = "10.0.0.0/16"
}

variable "key_name" {
  type = string
}

variable "admin_cidr_blocks" {
  description = "CIDR blocks allowed to reach SSH and Jenkins/NodePort. Set this explicitly per environment - intentionally has no default so nobody accidentally ships 0.0.0.0/0."
  type        = list(string)
}