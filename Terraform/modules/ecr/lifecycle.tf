resource "aws_ecr_lifecycle_policy" "frontend" {
  repository = aws_ecr_repository.frontend.name
  policy = jsonencode({
    rules = [
      {
        rulePriority = 1
        description = "Keep latest 20 images"
        selection = {
          tagStatus = "any"
          countType = "imageCountMoreThan"
          countNumber = 20
        }
        action = {
          type = "expire"
        }
      }
    ]
  })
}

resource "aws_ecr_lifecycle_policy" "backend" {
  repository = aws_ecr_repository.backend.name
  policy = aws_ecr_lifecycle_policy.frontend.policy
}

resource "aws_ecr_lifecycle_policy" "traffic" {
  repository = aws_ecr_repository.traffic_generator.name
  policy = aws_ecr_lifecycle_policy.frontend.policy
}