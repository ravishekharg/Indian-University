resource "aws_iam_role" "ec2_role" {

  name = "${var.environment}-ec2-role"
  assume_role_policy = data.aws_iam_policy_document.ec2_assume_role.json
}