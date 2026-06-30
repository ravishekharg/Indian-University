<<<<<<< HEAD
resource "aws_instance" "devops" {
  ami           = var.ami_id
  instance_type = "t3.large"
  subnet_id     = var.public_subnet_id
  key_name      = var.key_name

  vpc_security_group_ids = [
    var.devops_sg_id
  ]

  iam_instance_profile = var.jenkins_profile_name

  monitoring = true

  metadata_options {
    http_endpoint               = "enabled"
    http_tokens                 = "required"
    http_put_response_hop_limit = 1
  }

  root_block_device {
    volume_size = 100
    volume_type = "gp3"
    encrypted   = true
  }

  tags = {
    Name = "devops-server"
  }
}
=======
resource "aws_instance" "devops" {
  ami           = var.ami_id
  instance_type = "t3.large"
  subnet_id = var.public_subnet_id
  key_name = var.key_name
  vpc_security_group_ids = [
    var.devops_sg_id
  ]
  iam_instance_profile = var.jenkins_profile_name
  root_block_device {
    volume_size = 100
    volume_type = "gp3"
  }
  tags = {
    Name = "devops-server"
  }
}
>>>>>>> 4606112d88dc7ce4bf04f6d4ac590f7c5cbf4f00
