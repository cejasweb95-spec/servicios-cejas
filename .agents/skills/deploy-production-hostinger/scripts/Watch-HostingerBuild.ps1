param(
  [string]$Domain = "cejasinternacionales.com",
  [Parameter(Mandatory = $true, ParameterSetName = "ByTime")][string]$NotBeforeUtc,
  [Parameter(Mandatory = $true, ParameterSetName = "ById")][string]$BuildId,
  [Parameter(ParameterSetName = "ByTime")][string[]]$KnownBuildIds = @(),
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
$threshold = if ($PSCmdlet.ParameterSetName -eq "ByTime") {
  [datetime]::Parse($NotBeforeUtc).ToUniversalTime().AddSeconds(-5)
} else {
  [datetime]::MinValue
}

if ($PlanOnly) {
  $target = if ($PSCmdlet.ParameterSetName -eq "ById") { "UUID $BuildId" } else { "un build nuevo desde $($threshold.ToString('o'))" }
  Write-Host "Esperaria $target, exigiria fuente $SourceType y Node $ExpectedNodeVersion, y lo seguiria durante $TimeoutMinutes minutos."
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
  if ($PSCmdlet.ParameterSetName -eq "ById") {
    $build = @($builds) | Where-Object { $_.uuid -eq $BuildId } | Select-Object -First 1
  } else {
    $candidates = @($builds) |
      Where-Object {
        $_.options.source_type -eq $SourceType -and
        ([datetime]$_.created_at).ToUniversalTime() -ge $threshold -and
        $_.uuid -notin $KnownBuildIds
      } |
      Sort-Object { [datetime]$_.created_at }

    if ($candidates.Count -gt 1) {
      $candidateIds = ($candidates | ForEach-Object { $_.uuid }) -join ", "
      throw "Hostinger creo varios builds $SourceType durante la misma release ($candidateIds). No se elige uno a ciegas; inspecciona y repite por UUID."
    }
    $build = $candidates | Select-Object -First 1
  }

  if (-not $build) {
    Start-Sleep -Seconds $PollSeconds
    continue
  }

  if ($build.options.source_type -ne $SourceType) {
    throw "El build $($build.uuid) usa fuente $($build.options.source_type), pero se esperaba $SourceType."
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
  $target = if ($PSCmdlet.ParameterSetName -eq "ById") { "con UUID $BuildId" } else { "$SourceType nuevo" }
  throw "Hostinger no registro un build $target dentro de $TimeoutMinutes minutos. No se declara la release como completada."
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
