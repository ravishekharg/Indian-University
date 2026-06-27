module "vpc" {

  source   = "../../modules/vpc"
  vpc_cidr = var.vpc_cidr
  public_subnets = [
    "10.0.1.0/24",
    "10.0.2.0/24"
  ]

  private_subnets = [
    "10.0.10.0/24",
    "10.0.20.0/24"
  ]

  environment = var.environment
}

module "security_groups" {
  source      = "../../modules/security-groups"
  vpc_id      = module.vpc.vpc_id
  environment = var.environment
}

module "iam" {
  source      = "../../modules/iam"
  environment = var.environment
}

module "ecr" {
  source      = "../../modules/ecr"
  environment = var.environment
}

module "ec2" {
  source               = "../../modules/ec2"
  ami_id               = data.aws_ami.rhel9.id
  key_name             = var.key_name
  public_subnet_id     = module.vpc.public_subnet_ids[0]
  private_subnet_id    = module.vpc.private_subnet_ids[0]
  k8s_sg_id            = module.security_groups.k8s_sg_id
  devops_sg_id         = module.security_groups.devops_sg_id
  mysql_sg_id          = module.security_groups.mysql_sg_id
  cassandra_sg_id      = module.security_groups.cassandra_sg_id
  ec2_profile_name     = module.iam.ec2_profile_name
  jenkins_profile_name = module.iam.jenkins_profile_name
  environment          = var.environment
}