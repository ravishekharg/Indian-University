variable "environment" {
  type = string
}

variable "ecr_repo_arns" {
  description = "ARNs of the ECR repositories Jenkins is allowed to push to."
  type        = list(string)
}
