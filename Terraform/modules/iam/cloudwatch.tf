resource "aws_iam_role_policy_attachment" "cloudwatch" {

  role = aws_iam_role.ec2_role.name
  policy_arn =  "arn:aws:iam::aws:policy/CloudWatchAgentServerPolicy"
}