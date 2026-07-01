# Production deploy via Vercel CLI using VERCEL_TOKEN from .env.local (no interactive login).
$ErrorActionPreference = "Stop"
$root = Resolve-Path (Join-Path $PSScriptRoot "..")
$envFile = Join-Path $root ".env.local"

if (-not (Test-Path $envFile)) {
  Write-Error ".env.local not found at $envFile"
}

$vercelToken = (Get-Content $envFile | Where-Object { $_ -match '^\s*VERCEL_TOKEN=' }) -replace '^\s*VERCEL_TOKEN=',''
if (-not $vercelToken) {
  Write-Error "VERCEL_TOKEN missing in .env.local"
}

$env:VERCEL_TOKEN = $vercelToken
$env:GIT_TERMINAL_PROMPT = "0"

Push-Location $root
try {
  npx vercel link --project servicios-cejas --yes
  npx vercel deploy --prod --yes
} finally {
  Pop-Location
}
