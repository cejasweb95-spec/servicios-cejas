param(
  [string]$Domain = "cejasinternacionales.com",
  [Parameter(Mandatory = $true)][string]$NotBeforeUtc,
  [ValidateSet("git", "archive")][string]$SourceType = "git",
  [ValidateSet(18, 20, 22, 24)][int]$ExpectedNodeVersion = 22,
  [ValidateRange(1, 120)][int]$TimeoutMinutes = 30,
  [ValidateRange(5, 60)][int]$PollSeconds = 10,
  [switch]$PlanOnly
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest
. (Join-Path $PSScriptRoot "Release.Common.ps1")

$root = Get-ReleaseRepositoryRoot
$envFile = Join-Path $root ".env.local"
$evidenceRoot = Join-Path $root "output\production-release"
$threshold = [datetime]::Parse($NotBeforeUtc).ToUniversalTime().AddSeconds(-5)

if ($PlanOnly) {
  Write-Host "Esperaria un build $SourceType creado desde $($threshold.ToString('o')), exigiria Node $ExpectedNodeVersion y lo seguiria durante $TimeoutMinutes minutos."
  exit 0
}

$context = Get-HostingerContext -EnvFile $envFile -Domain $Domain
$secrets = Get-ReleaseSecrets -EnvFile $envFile
$deadline = (Get-Date).AddMinutes($TimeoutMinutes)
$build = $null
$lastState = $null

Write-Host "[Hostinger] Esperando el build nuevo de $Domain..."
do {
  $builds = Get-HostingerBuilds -Context $context
  $build = @($builds) |
    Where-Object {
      $_.options.source_type -eq $SourceType -and
      ([datetime]$_.created_at).ToUniversalTime() -ge $threshold
    } |
    Sort-Object { [datetime]$_.created_at } -Descending |
    Select-Object -First 1

  if (-not $build) {
    Start-Sleep -Seconds $PollSeconds
    continue
  }

  if ([int]$build.options.node_version -ne $ExpectedNodeVersion) {
    throw "Hostinger inicio el build $($build.uuid) con Node $($build.options.node_version), pero la release exige Node $ExpectedNodeVersion. Corrige hPanel y reimplementa."
  }

  if ($build.state -ne $lastState) {
    Write-Host "[Hostinger] $($build.uuid): $($build.state) (Node $($build.options.node_version), $($build.options.source_type))."
    $lastState = $build.state
  }

  if ($build.state -in @("completed", "failed")) { break }
  Start-Sleep -Seconds $PollSeconds
} while ((Get-Date) -lt $deadline)

if (-not $build) {
  throw "Hostinger no creo un build $SourceType nuevo dentro de $TimeoutMinutes minutos. No se declara la release como completada."
}

if ($build.state -notin @("completed", "failed")) {
  throw "El build $($build.uuid) no llego a estado terminal dentro de $TimeoutMinutes minutos. Estado actual: $($build.state)."
}

if ($build.state -eq "failed") {
  $logResponse = Get-HostingerBuildLogs -Context $context -BuildId $build.uuid
  $safeLog = Protect-ReleaseText -Value $logResponse.logs -Secrets $secrets
  $logPath = Join-Path $evidenceRoot "hostinger-$($build.uuid)-failed.log"
  if (-not (Test-Path -LiteralPath $evidenceRoot)) {
    New-Item -ItemType Directory -Path $evidenceRoot -Force | Out-Null
  }
  $safeLog | Set-Content -LiteralPath $logPath -Encoding UTF8
  $tail = (($safeLog -split "`r?`n") | Select-Object -Last 60) -join "`n"
  throw "El build Hostinger $($build.uuid) fallo. Log saneado: $logPath`n$tail"
}

$result = [pscustomobject]@{
  uuid = $build.uuid
  state = $build.state
  node_version = [int]$build.options.node_version
  source_type = $build.options.source_type
  created_at = $build.created_at
  updated_at = $build.updated_at
}
Write-ReleaseJson -Value $result -Path (Join-Path $evidenceRoot "hostinger-$($build.uuid)-completed.json")
Write-Host "[Hostinger] Build completado y registrado."
$result | ConvertTo-Json -Compress
