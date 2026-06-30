# Remote state with locking. The previous setup used local state only,
# meaning terraform.tfstate lived on a single laptop with no locking - any
# second `terraform apply` (e.g. from CI and a human at the same time) could
# corrupt state, and there was no encryption/versioning/audit trail.
#
# Create the bucket and table once (outside Terraform, or in a separate
# bootstrap stack) before uncommenting this block:
#
#   aws s3api create-bucket --bucket <your-tfstate-bucket> --region ap-south-2 \
#     --create-bucket-configuration LocationConstraint=ap-south-2
#   aws s3api put-bucket-versioning --bucket <your-tfstate-bucket> \
#     --versioning-configuration Status=Enabled
#   aws dynamodb create-table --table-name terraform-locks \
#     --attribute-definitions AttributeName=LockID,AttributeType=S \
#     --key-schema AttributeName=LockID,KeyType=HASH \
#     --billing-mode PAY_PER_REQUEST
#
# terraform {
#   backend "s3" {
#     bucket         = "<your-tfstate-bucket>"
#     key            = "indian-university/dev/terraform.tfstate"
#     region         = "ap-south-2"
#     dynamodb_table = "terraform-locks"
#     encrypt        = true
#   }
# }
