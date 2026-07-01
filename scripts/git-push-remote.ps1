# Push current branch to GitHub using GIT_ACCESS_TOKEN from .env.local (no interactive auth).
param(
  [string]$Branch = ""
)

$ErrorActionPreference = "Stop"
$root = Resolve-Path (Join-Path $PSScriptRoot "..")
$envFile = Join-Path $root ".env.local"

if (-not (Test-Path $envFile)) {
  Write-Error ".env.local not found at $envFile"
}

$lines = Get-Content $envFile
$gitToken = ($lines | Where-Object { $_ -match '^\s*GIT_ACCESS_TOKEN=' }) -replace '^\s*GIT_ACCESS_TOKEN=',''
$repoUrl = ($lines | Where-Object { $_ -match '^\s*GIT_REPO_URL=' }) -replace '^\s*GIT_REPO_URL=',''

if (-not $gitToken) {
  Write-Error "GIT_ACCESS_TOKEN missing in .env.local"
}

if (-not $repoUrl) {
  $repoUrl = "https://github.com/cejasweb95-spec/servicios-cejas.git"
}

if (-not $Branch) {
  Push-Location $root
  $Branch = git branch --show-current
  Pop-Location
}

$authenticatedUrl = $repoUrl -replace '^https://', "https://x-access-token:${gitToken}@"

$env:GIT_TERMINAL_PROMPT = "0"
$env:GCM_INTERACTIVE = "never"

Push-Location $root
try {
  git push "${authenticatedUrl}" "${Branch}:${Branch}"
} finally {
  Pop-Location
}
