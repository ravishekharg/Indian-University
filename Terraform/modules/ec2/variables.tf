variable "ami_id" {
  type = string
}

variable "key_name" {
  type = string
}

variable "public_subnet_id" {
  type = string
}

variable "private_subnet_id" {
  type = string
}

variable "k8s_sg_id" {
  type = string
}

variable "devops_sg_id" {
  type = string
}

variable "mysql_sg_id" {
  type = string
}

variable "cassandra_sg_id" {
  type = string
}

variable "ec2_profile_name" {
  type = string
}

variable "jenkins_profile_name" {
  type = string
}

variable "environment" {
  type = string
}