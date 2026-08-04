variable "neon_api_key" {
  description = "Neon API key (console.neon.tech → Account settings → API keys). NOT the DATABASE_URL password."
  type        = string
  sensitive   = true
}

variable "neon_project_id" {
  description = "Existing Neon project ID for S.O.S Areias (console.neon.tech → Project settings → General)."
  type        = string
}

variable "vercel_api_token" {
  description = "Vercel Personal Access Token (vercel.com/account/tokens). NOT the CLI's local OAuth session."
  type        = string
  sensitive   = true
}

variable "vercel_team_id" {
  description = "Vercel team ID that owns the project (from `vercel link` output or Team Settings → General)."
  type        = string
}

variable "admin_passcode" {
  description = "Admin panel passcode, same value as ADMIN_PASSCODE in .env.local."
  type        = string
  sensitive   = true
}
