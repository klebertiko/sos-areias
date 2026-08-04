variable "neon_api_key" {
  description = "Neon API key (console.neon.tech → Account settings → API keys). NOT the DATABASE_URL password."
  type        = string
  sensitive   = true
}

variable "neon_project_id" {
  description = "Existing Neon project ID for S.O.S Areias (console.neon.tech → Project settings → General)."
  type        = string
}
