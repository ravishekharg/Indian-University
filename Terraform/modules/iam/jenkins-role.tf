resource "aws_iam_role" "jenkins_role" {
  name = "${var.environment}-jenkins-role"
  assume_role_policy = data.aws_iam_policy_document.ec2_assume_role.json
}