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

  # Pinned to the project's current live values so Terraform doesn't propose
  # reverting them to schema defaults (which would unlink the GitHub repo,
  # disable OIDC tokens, and loosen deployment protection).
  git_repository = {
    type              = "github"
    repo              = "klebertiko/sos-areias"
    production_branch = "main"
  }

  oidc_token_config = {
    enabled = true
  }

  lifecycle {
    prevent_destroy = true
    # vercel_authentication.deployment_type's live value ("all_except_custom_domains")
    # isn't accepted as valid input by this provider version's schema, so it can't be
    # pinned explicitly without changing it. Ignore drift on it instead.
    ignore_changes = [vercel_authentication]
  }
}

locals {
  # Vercel rejects "development" as a target for sensitive env vars.
  sensitive_envs = ["production", "preview"]
}

# DATABASE_URL / DATABASE_URL_UNPOOLED are NOT managed here on purpose: the
# Vercel/Neon marketplace integration already provisions and syncs them
# (contentHint: integration-store-secret). Managing them via Terraform would
# overwrite that live binding with a static value and break future rotation.

resource "vercel_project_environment_variable" "admin_passcode" {
  project_id = vercel_project.sos_areias.id
  team_id    = var.vercel_team_id
  key        = "ADMIN_PASSCODE"
  value      = var.admin_passcode
  target     = local.sensitive_envs
  sensitive  = true
}
