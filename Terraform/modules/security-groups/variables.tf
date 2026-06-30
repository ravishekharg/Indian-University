variable "vpc_id" {
  type = string
}

variable "environment" {
  type = string
}

variable "admin_cidr_blocks" {
  description = "CIDR blocks allowed to reach SSH (22) and Jenkins (8080). Restrict this to your office/VPN range - never leave it as 0.0.0.0/0 outside of a disposable demo."
  type        = list(string)
}
