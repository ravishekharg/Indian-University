resource "aws_security_group" "mysql" {

  name   = "${var.environment}-mysql-sg"
  vpc_id = var.vpc_id

  ingress {

    description = "MySQL"

    from_port = 3306
    to_port   = 3306

    protocol = "tcp"

    security_groups = [
      aws_security_group.k8s.id,
      aws_security_group.devops.id
    ]
}

  egress {

    from_port = 0
    to_port   = 0

    protocol = "-1"

    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.environment}-mysql-sg"
  }
}