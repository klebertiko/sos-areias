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

## `vercel.tf` (Terraform, manages the Vercel project + `ADMIN_PASSCODE`)

Declares the `sos-areias` Vercel project itself and its `ADMIN_PASSCODE` environment variable using the official [`vercel/vercel`](https://registry.terraform.io/providers/vercel/vercel/latest) provider.

`DATABASE_URL` / `DATABASE_URL_UNPOOLED` are **deliberately not managed here** — the Vercel/Neon marketplace integration already provisions and syncs them (they show up on the project with `contentHint: integration-store-secret`). Managing them via Terraform would overwrite that live binding with a static value and break the integration's rotation/sync.

**Before running anything:**

1. The Vercel project **already exists** (id `prj_ty639Bm0VdbYAzIhH64GDrGGdUqx`, under team `team_EWN0mcs3YqjwNKCQgE6T3FOF`). Import it before planning/applying — do NOT run `terraform apply` cold, or it will try to create a duplicate project.
2. Get a Vercel **Personal Access Token** from vercel.com/account/tokens. This is a different credential than the CLI's local OAuth session (`~/.local/share/com.vercel.cli/auth.json`) — Terraform needs a static token.
3. Pull `ADMIN_PASSCODE` from `.env.local` — don't retype it.
4. Vercel rejects `development` as a target for *sensitive* env vars — `admin_passcode` only targets `production`/`preview` (see `locals.sensitive_envs` in `vercel.tf`).
5. `vercel_authentication.deployment_type`'s live value (`all_except_custom_domains`) isn't accepted as valid *input* by this provider version's schema (only `standard_protection`/`all_deployments`/`only_preview_deployments`/`none` are). It's excluded via `lifecycle.ignore_changes` — don't remove that or `plan` will propose silently downgrading deployment protection.
6. This module also declares Neon resources (`main.tf`) that need a real `NEON_API_KEY` to refresh — without one, any `plan`/`apply` here fails on that data source. Scope to the Vercel resources only with `-target` until Neon credentials are wired up:

```bash
export TF_VAR_vercel_api_token="<Personal Access Token from vercel.com/account/tokens>"
export TF_VAR_vercel_team_id="team_EWN0mcs3YqjwNKCQgE6T3FOF"
export TF_VAR_admin_passcode="<ADMIN_PASSCODE from .env.local>"
export TF_VAR_neon_api_key="unused"      # only needed to satisfy variable validation when using -target
export TF_VAR_neon_project_id="unused"

terraform init
terraform import vercel_project.sos_areias prj_ty639Bm0VdbYAzIhH64GDrGGdUqx
terraform plan  -target=vercel_project.sos_areias -target=vercel_project_environment_variable.admin_passcode
terraform apply -target=vercel_project.sos_areias -target=vercel_project_environment_variable.admin_passcode
```

After `apply`, trigger a redeploy (push a commit, or `vercel deploy --prod` from the CLI) so the new env var is picked up by the running functions — Vercel does not hot-reload env vars into already-built deployments.
