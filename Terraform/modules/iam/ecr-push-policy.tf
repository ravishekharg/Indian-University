resource "aws_iam_role_policy" "jenkins_ecr" {

  name = "${var.environment}-jenkins-ecr"
  role = aws_iam_role.jenkins_role.id
  policy = jsonencode({

    Version = "2012-10-17"
    Statement = [
      {
        # GetAuthorizationToken has no resource-level permissions in IAM -
        # it must stay scoped to "*", but is harmless on its own (it only
        # returns a short-lived docker login token).
        Sid      = "EcrAuth"
        Effect   = "Allow"
        Action   = ["ecr:GetAuthorizationToken"]
        Resource = "*"
      },
      {
        # Push/pull only, scoped to this project's three repos - no
        # DeleteRepository, no PutLifecyclePolicy, no SetRepositoryPolicy.
        Sid    = "EcrPushPull"
        Effect = "Allow"
        Action = [
          "ecr:BatchCheckLayerAvailability",
          "ecr:GetDownloadUrlForLayer",
          "ecr:BatchGetImage",
          "ecr:PutImage",
          "ecr:InitiateLayerUpload",
          "ecr:UploadLayerPart",
          "ecr:CompleteLayerUpload"
        ]
        Resource = var.ecr_repo_arns
      }
    ]
  })
}
