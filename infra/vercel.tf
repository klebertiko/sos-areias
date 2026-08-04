provider "vercel" {
  api_token = var.vercel_api_token
  team      = var.vercel_team_id
}

# This project already exists (created via `vercel link` / the Vercel dashboard).
# Terraform does not manage its creation — `terraform import` it before running
# `plan`/`apply`, otherwise Terraform will try to create a duplicate. See README.md.
resource "vercel_project" "sos_areias" {
  name      = "sos-areias"
  framework = "vite"

  lifecycle {
    prevent_destroy = true
  }
}

locals {
  all_envs = ["production", "preview", "development"]
}

resource "vercel_project_environment_variable" "database_url" {
  project_id = vercel_project.sos_areias.id
  team_id    = var.vercel_team_id
  key        = "DATABASE_URL"
  value      = var.database_url
  target     = local.all_envs
  sensitive  = true
}

resource "vercel_project_environment_variable" "database_url_unpooled" {
  project_id = vercel_project.sos_areias.id
  team_id    = var.vercel_team_id
  key        = "DATABASE_URL_UNPOOLED"
  value      = var.database_url_unpooled
  target     = local.all_envs
  sensitive  = true
}

resource "vercel_project_environment_variable" "admin_passcode" {
  project_id = vercel_project.sos_areias.id
  team_id    = var.vercel_team_id
  key        = "ADMIN_PASSCODE"
  value      = var.admin_passcode
  target     = local.all_envs
  sensitive  = true
}
