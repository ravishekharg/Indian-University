output "ec2_profile_name" {
  value = aws_iam_instance_profile.ec2_profile.name
}

output "jenkins_profile_name" {
  value = aws_iam_instance_profile.jenkins_profile.name
}