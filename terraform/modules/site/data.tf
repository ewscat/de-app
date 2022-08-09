data "aws_route53_zone" "root" {
  name = var.dns_zone
}