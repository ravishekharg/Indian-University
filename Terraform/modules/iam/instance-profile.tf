resource "aws_iam_instance_profile" "ec2_profile" {

  name = "${var.environment}-ec2-profile"
  role = aws_iam_role.ec2_role.name
}

resource "aws_iam_instance_profile" "jenkins_profile" {

  name = "${var.environment}-jenkins-profile"
  role = aws_iam_role.jenkins_role.name
}