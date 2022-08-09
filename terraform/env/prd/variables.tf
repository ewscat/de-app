variable "aws_region" {
  type        = string
  description = "The AWS region to put the bucket into"
  default     = "eu-central-1"
}

variable "site_domain" {
  type        = string
  description = "The domain name to use for the static site"
  default     = "woorden.bilor.us"
}

variable "aliases" {
  type        = list(string)
  description = "Extra CNAMEs (alternate domain names), if any, for this distribution"
  default     = ["woorden.bilor.us"]
}

variable "acm_certificate_arn" {
  type        = string
  description = "The ARN of the AWS Certificate Manager certificate"
  default     = "arn:aws:acm:us-east-1:104427576631:certificate/2b595801-a234-431f-b664-bce31e91f75f"
}

variable "dns_zone" {
  type        = string
  description = "Hosted zone name"
  default     = "bilor.us"
}