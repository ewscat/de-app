variable "aws_region" {
  type        = string
  description = "The AWS region to put the bucket into"
}

variable "site_domain" {
  type        = string
  description = "The domain name to use for the static site"
}

variable "s3_origin_id" {
  type        = string
  description = "A unique identifier for the origin"
}

variable "aliases" {
  type        = list(string)
  description = "Extra CNAMEs (alternate domain names), if any, for this distribution"
}

variable "acm_certificate_arn" {
  type        = string
  description = "The ARN of the AWS Certificate Manager certificate"
}

variable "dns_zone" {
  type        = string
  description = "Hosted zone name"
}