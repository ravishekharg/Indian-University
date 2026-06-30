<<<<<<< HEAD
resource "aws_security_group" "mysql" {

  name   = "${var.environment}-mysql-sg"
  vpc_id = var.vpc_id

  ingress {

  description = "SSH from DevOps"

  from_port = 22
  to_port   = 22

  protocol = "tcp"

  security_groups = [
    aws_security_group.devops.id
  ]
}

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
=======
resource "aws_security_group" "mysql" {

  name   = "${var.environment}-mysql-sg"
  vpc_id = var.vpc_id

  ingress {

  description = "SSH from DevOps"

  from_port = 22
  to_port   = 22

  protocol = "tcp"

  security_groups = [
    aws_security_group.devops.id
  ]
}

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
>>>>>>> 4606112d88dc7ce4bf04f6d4ac590f7c5cbf4f00
}