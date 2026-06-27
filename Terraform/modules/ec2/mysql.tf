resource "aws_instance" "mysql" {

  ami           = var.ami_id
  instance_type = "t3.large"

  subnet_id = var.private_subnet_id

  key_name = var.key_name

  vpc_security_group_ids = [
    var.mysql_sg_id
  ]

  iam_instance_profile = var.ec2_profile_name

  root_block_device {

    volume_size = 50

    volume_type = "gp3"
  }

  tags = {
    Name = "mysql-server"
  }
}