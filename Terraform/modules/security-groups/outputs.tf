output "k8s_sg_id" {
  value = aws_security_group.k8s.id
}

output "devops_sg_id" {
  value = aws_security_group.devops.id
}

output "mysql_sg_id" {
  value = aws_security_group.mysql.id
}

output "cassandra_sg_id" {
  value = aws_security_group.cassandra.id
}