terraform {
  required_version = ">= 1.5"
  required_providers {
    neon = {
      source  = "kislerdm/neon"
      version = "~> 0.7"
    }
  }
}

provider "neon" {
  api_key = var.neon_api_key
}

# This project already exists (provisioned via the Vercel/Neon integration).
# Terraform does not manage its creation — `terraform import` it before running
# `plan`/`apply`, otherwise Terraform will try to create a duplicate. See README.md.
data "neon_project" "sos_areias" {
  id = var.neon_project_id
}

resource "neon_branch" "production" {
  project_id = var.neon_project_id
  name       = "production"

  lifecycle {
    prevent_destroy = true
  }
}

resource "neon_role" "app" {
  project_id = var.neon_project_id
  branch_id  = neon_branch.production.id
  name       = "sos_areias_app"
}

resource "neon_database" "app" {
  project_id = var.neon_project_id
  branch_id  = neon_branch.production.id
  name       = "sos_areias"
  owner_name = neon_role.app.name
}
