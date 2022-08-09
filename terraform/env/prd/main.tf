
module "site" {
  source              = "../../modules/site"
  aws_region          = var.aws_region
  s3_origin_id        = var.site_domain
  site_domain         = var.site_domain
  dns_zone            = var.dns_zone
  aliases             = var.aliases
  acm_certificate_arn = var.acm_certificate_arn
}