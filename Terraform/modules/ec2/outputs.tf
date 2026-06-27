output "k8s_master_public_ip" {
  value = aws_instance.k8s_master.public_ip
}

output "k8s_worker_1_public_ip" {
  value = aws_instance.k8s_worker_1.public_ip
}

output "k8s_worker_2_public_ip" {
  value = aws_instance.k8s_worker_2.public_ip
}

output "devops_public_ip" {
  value = aws_instance.devops.public_ip
}

output "mysql_private_ip" {
  value = aws_instance.mysql.private_ip
}

output "cassandra_private_ip" {
  value = aws_instance.cassandra.private_ip
}