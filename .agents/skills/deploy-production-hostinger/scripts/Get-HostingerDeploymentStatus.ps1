param(
  [string]$Domain = "cejasinternacionales.com",
  [ValidateRange(1, 50)][int]$RecentBuilds = 10,
  [switch]$PlanOnly
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest
. (Join-Path $PSScriptRoot "Release.Common.ps1")

$root = Get-ReleaseRepositoryRoot
$envFile = Join-Path $root ".env.local"

if ($PlanOnly) {
  Write-Host "Consultaria builds recientes por API y el estado HTTP externo de $Domain sin cambiar produccion."
  exit 0
}

$context = Get-HostingerContext -EnvFile $envFile -Domain $Domain
$builds = @(Get-HostingerBuilds -Context $context) |
  Sort-Object { [datetime]$_.created_at } -Descending |
  Select-Object -First $RecentBuilds |
  ForEach-Object {
    [pscustomobject]@{
      uuid = $_.uuid
      state = $_.state
      node_version = [int]$_.options.node_version
      source_type = $_.options.source_type
      created_at = $_.created_at
      updated_at = $_.updated_at
    }
  }

$nonce = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
$probes = @(
  Get-ReleaseHttpProbe -Uri "https://$Domain/es?release-status=$nonce"
  Get-ReleaseHttpProbe -Uri "https://$Domain/en?release-status=$nonce"
  Get-ReleaseHttpProbe -Uri "https://www.$Domain/"
  Get-ReleaseHttpProbe -Uri "http://$Domain/"
)

[pscustomobject]@{
  schema = 1
  domain = $Domain
  checked_at = (Get-Date).ToUniversalTime().ToString("o")
  builds = $builds
  http = $probes
} | ConvertTo-Json -Depth 8
