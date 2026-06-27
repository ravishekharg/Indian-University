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