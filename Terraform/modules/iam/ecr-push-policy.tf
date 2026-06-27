resource "aws_iam_role_policy" "jenkins_ecr" {

  name = "${var.environment}-jenkins-ecr"
  role = aws_iam_role.jenkins_role.id
  policy = jsonencode({

    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "ecr:*"
        ]
        Resource = "*"
      }
    ]
  })
}