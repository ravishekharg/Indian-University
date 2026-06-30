resource "aws_security_group" "k8s" {

  name        = "${var.environment}-k8s-sg"
  description = "Kubernetes Security Group"
  vpc_id      = var.vpc_id

  ingress {
    description = "SSH (restricted to admin_cidr_blocks)"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = var.admin_cidr_blocks
  }

  ingress {
    description = "Kubernetes API"
    from_port   = 6443
    to_port     = 6443
    protocol    = "tcp"
    self        = true
  }

  ingress {
    description = "etcd"
    from_port   = 2379
    to_port     = 2380
    protocol    = "tcp"
    self        = true
  }

  ingress {
    description = "Kubelet"
    from_port   = 10250
    to_port     = 10250
    protocol    = "tcp"
    self        = true
  }

  # NodePort range is intentionally NOT opened to 0.0.0.0/0 here. The NGINX
  # ingress controller's Service should be exposed via a proper AWS Load
  # Balancer (or, for a lab/demo, restricted to admin_cidr_blocks below) -
  # not the entire internet hitting raw NodePorts.
  ingress {
    description = "NodePort (restricted to admin_cidr_blocks)"
    from_port   = 30000
    to_port     = 32767
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
    Name = "${var.environment}-k8s-sg"
  }
}
