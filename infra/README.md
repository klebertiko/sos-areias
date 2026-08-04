# Infra — S.O.S Areias

## `schema.sql` (use this — fully executable today)

Idempotent DDL + seed for the `campaign_state`, `timeline_steps`, and `supporters` tables. Runs against the Neon Postgres database already provisioned (credentials in `.env.local`, `DATABASE_URL`).

```bash
psql "$DATABASE_URL" -f infra/schema.sql
```

Safe to re-run: `CREATE TABLE IF NOT EXISTS` + `ON CONFLICT DO NOTHING` seeds.

## `main.tf` / `variables.tf` (Terraform, best-effort — needs an extra credential)

Declares the Neon *project* (branch/role/database) using the community [`kislerdm/neon`](https://registry.terraform.io/providers/kislerdm/neon/latest) provider. This is **not required** for the site to work — `schema.sql` is what actually matters. It exists so the Neon project itself is declared as code instead of only living in the console.

**Before running anything:**

1. This Neon project **already exists** (it was provisioned via the Vercel/Neon integration — that's where the credentials in `.env.local` came from). Terraform doesn't know that yet.
2. Get a `NEON_API_KEY` from console.neon.tech → Account settings → API keys. This is **not** in `.env.local` and is different from the `DATABASE_URL` password.
3. **Import the existing resources before planning/applying** — do NOT run `terraform apply` cold, or it will try to create a duplicate branch/role/database next to the real one:

```bash
export TF_VAR_neon_api_key="<your NEON_API_KEY>"
export TF_VAR_neon_project_id="<project id from console.neon.tech>"

terraform init
terraform import neon_branch.production <existing-branch-id>
terraform import neon_role.app <existing-role-name>
terraform import neon_database.app <existing-database-name>
terraform plan   # should show no changes if the import matched correctly
```

If you don't have a `NEON_API_KEY` or don't want to manage the Neon project itself as Terraform state, skip this folder's `.tf` files entirely — `schema.sql` alone is sufficient to run the app.

## `vercel.tf` (Terraform, manages Vercel project env vars)

Declares the `sos-areias` Vercel project's environment variables (`DATABASE_URL`, `DATABASE_URL_UNPOOLED`, `ADMIN_PASSCODE`) using the official [`vercel/vercel`](https://registry.terraform.io/providers/vercel/vercel/latest) provider, so the env vars needed for the site to actually run in production/preview aren't only set by hand in the dashboard.

**Before running anything:**

1. The Vercel project **already exists** (`vercel link` created it as `sos-areias` under team `team_EWN0mcs3YqjwNKCQgE6T3FOF`). Import it before planning/applying — do NOT run `terraform apply` cold, or it will try to create a duplicate project.
2. Get a Vercel **Personal Access Token** from vercel.com/account/tokens. This is a different credential than the CLI's local OAuth session (`~/.local/share/com.vercel.cli/auth.json`) — Terraform needs a static token.
3. Pull the secret values from `.env.local` (`DATABASE_URL`, `DATABASE_URL_UNPOOLED`, `ADMIN_PASSCODE`) — don't retype them.

```bash
export TF_VAR_vercel_api_token="<Personal Access Token from vercel.com/account/tokens>"
export TF_VAR_vercel_team_id="team_EWN0mcs3YqjwNKCQgE6T3FOF"
export TF_VAR_database_url="<DATABASE_URL from .env.local>"
export TF_VAR_database_url_unpooled="<DATABASE_URL_UNPOOLED from .env.local>"
export TF_VAR_admin_passcode="<ADMIN_PASSCODE from .env.local>"

terraform init
terraform import vercel_project.sos_areias prj_ty639Bm0VdbYAzIhH64GDrGdUqx
terraform plan   # review before applying — env var resources will show as "to be created" the first time
terraform apply
```

After `apply`, trigger a redeploy (push a commit, or `vercel deploy --prod` from the CLI) so the new env vars are picked up by the running functions — Vercel does not hot-reload env vars into already-built deployments.
