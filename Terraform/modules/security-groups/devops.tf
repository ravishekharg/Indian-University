resource "aws_security_group" "devops" {

  name   = "${var.environment}-devops-sg"
  vpc_id = var.vpc_id

  ingress {
    description = "SSH (restricted to admin_cidr_blocks)"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = var.admin_cidr_blocks
  }

  ingress {
    description = "Jenkins UI (restricted to admin_cidr_blocks)"
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = var.admin_cidr_blocks
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.environment}-devops-sg"
  }
}
