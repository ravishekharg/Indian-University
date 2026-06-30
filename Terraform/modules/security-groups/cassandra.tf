resource "aws_security_group" "cassandra" {

  name   = "${var.environment}-cassandra-sg"
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

    from_port = 9042
    to_port   = 9042

    protocol = "tcp"

    security_groups = [
      aws_security_group.k8s.id,
      aws_security_group.devops.id
    ]
  }

  ingress {

    from_port = 7000
    to_port   = 7000

    protocol = "tcp"

    security_groups = [
      aws_security_group.k8s.id,
      aws_security_group.devops.id
    ]
  }

  ingress {

    from_port = 7001
    to_port   = 7001

    protocol = "tcp"

    security_groups = [
      aws_security_group.k8s.id,
      aws_security_group.devops.id
    ]
  }

  ingress {

    from_port = 7199
    to_port   = 7199

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
    Name = "${var.environment}-cassandra-sg"
  }
}