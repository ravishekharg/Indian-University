<<<<<<< HEAD
resource "aws_instance" "k8s_master" {

  ami           = var.ami_id
  instance_type = "t3.large"

  subnet_id = var.public_subnet_id

  key_name = var.key_name

  vpc_security_group_ids = [
    var.k8s_sg_id
  ]

  iam_instance_profile = var.ec2_profile_name

  monitoring = true

  metadata_options {
    http_endpoint               = "enabled"
    http_tokens                 = "required" # enforce IMDSv2
    http_put_response_hop_limit = 1
  }

  root_block_device {
    volume_size = 50
    volume_type = "gp3"
    encrypted   = true
  }

  tags = {
    Name = "k8s-master"
  }
}
=======
resource "aws_instance" "k8s_master" {

  ami           = var.ami_id
  instance_type = "t3.large"

  subnet_id = var.public_subnet_id

  key_name = var.key_name

  vpc_security_group_ids = [
    var.k8s_sg_id
  ]

  iam_instance_profile = var.ec2_profile_name

  root_block_device {

    volume_size = 50

    volume_type = "gp3"
  }

  tags = {
    Name = "k8s-master"
  }
}
>>>>>>> 4606112d88dc7ce4bf04f6d4ac590f7c5cbf4f00
