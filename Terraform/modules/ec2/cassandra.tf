resource "aws_instance" "cassandra" {
  ami           = var.ami_id
  instance_type = "t3.xlarge"
  subnet_id = var.private_subnet_id
  key_name = var.key_name
  vpc_security_group_ids = [
    var.cassandra_sg_id
  ]
  iam_instance_profile = var.ec2_profile_name
  root_block_device {
    volume_size = 100
    volume_type = "gp3"
  }
  tags = {
    Name = "cassandra-server"
  }
}