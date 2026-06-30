resource "aws_ecr_repository" "frontend" {

  name = "university-frontend"

  image_tag_mutability = "IMMUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Name = "university-frontend"
  }
}