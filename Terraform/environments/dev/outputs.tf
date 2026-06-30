output "k8s_master_public_ip" {
  value = module.ec2.k8s_master_public_ip
}

output "k8s_worker_1_public_ip" {
  value = module.ec2.k8s_worker_1_public_ip
}

output "k8s_worker_2_public_ip" {
  value = module.ec2.k8s_worker_2_public_ip
}

output "devops_public_ip" {
  value = module.ec2.devops_public_ip
}

output "mysql_private_ip" {
  value = module.ec2.mysql_private_ip
}

output "cassandra_private_ip" {
  value = module.ec2.cassandra_private_ip
}

output "rhel9_ami" {
  value = data.aws_ami.rhel9.id
}