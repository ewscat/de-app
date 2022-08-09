provider "aws" {
  region = var.aws_region
}

terraform {
  backend "s3" {
    bucket = "terraform-bilorus"
    key    = "website"
    region = "eu-central-1"
  }
}