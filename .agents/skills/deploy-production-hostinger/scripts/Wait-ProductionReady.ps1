param(
  [string]$Domain = "cejasinternacionales.com",
  [Parameter(Mandatory = $true)][string]$BuildId,
  [ValidateSet(18, 20, 22, 24)][int]$ExpectedNodeVersion = 22,
  [ValidateRange(1, 30)][int]$TimeoutMinutes = 10,
  [ValidateRange(5, 60)][int]$PollSeconds = 10,
  [ValidateRange(1, 10)][int]$RequiredConsecutiveSuccesses = 3,
  [ValidateRange(0, 15)][int]$RestartAfterMinutes = 2,
  [switch]$AllowSingleRestart,
  [switch]$PlanOnly
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest
. (Join-Path $PSScriptRoot "Release.Common.ps1")

$root = Get-ReleaseRepositoryRoot
$envFile = Join-Path $root ".env.local"
$evidenceRoot = Join-Path $root "output\production-release"

if ($PlanOnly) {
  Write-Host "Esperaria HTTP 200 estable para el build $BuildId; permitiria como maximo un reinicio controlado: $([bool]$AllowSingleRestart)."
  exit 0
}

$context = Get-HostingerContext -EnvFile $envFile -Domain $Domain
$build = Get-HostingerBuildById -Context $context -BuildId $BuildId
if (-not $build) { throw "Hostinger no devolvio el build $BuildId." }
if ($build.state -ne "completed") { throw "El build $BuildId no esta completado: $($build.state)." }
if ([int]$build.options.node_version -ne $ExpectedNodeVersion) {
  throw "El build $BuildId usa Node $($build.options.node_version), no Node $ExpectedNodeVersion."
}

$started = Get-Date
$deadline = $started.AddMinutes($TimeoutMinutes)
$restartAt = $started.AddMinutes($RestartAfterMinutes)
$restartUsed = $false
$successes = 0
$probes = @()
$status = "failed"
$failure = $null
$nonce = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
$evidencePath = Join-Path $evidenceRoot "readiness-$BuildId.json"

try {
  do {
    $probe = Get-ReleaseHttpProbe -Uri "https://$Domain/es?deployment=$BuildId&probe=$nonce" -TimeoutSeconds 30
    $probes += $probe

    if ($probe.status -eq 200) {
      $successes++
      Write-Host "[Readiness] HTTP 200 ($successes/$RequiredConsecutiveSuccesses)."
      if ($successes -ge $RequiredConsecutiveSuccesses) {
        $status = "passed"
        break
      }
    } else {
      $successes = 0
      Write-Host "[Readiness] HTTP $($probe.status); server=$($probe.server); platform=$($probe.platform)."
    }

    if (
      $AllowSingleRestart -and
      -not $restartUsed -and
      (Get-Date) -ge $restartAt -and
      $probe.status -in @(502, 503, 504)
    ) {
      $currentBuilds = @(Get-HostingerBuilds -Context $context) | Sort-Object { [datetime]$_.created_at } -Descending
      $newerBuilds = @($currentBuilds | Where-Object { ([datetime]$_.created_at) -gt ([datetime]$build.created_at) })
      $activeBuilds = @($currentBuilds | Where-Object { $_.state -in @("pending", "running") })
      if ($newerBuilds.Count -gt 0 -or $activeBuilds.Count -gt 0) {
        throw "No se reinicia el runtime: existe un build mas nuevo o todavia activo."
      }
      Restart-HostingerServer -Context $context | Out-Null
      $restartUsed = $true
      Write-Host "[Readiness] Hostinger acepto el unico reinicio permitido para $BuildId."
    }

    Start-Sleep -Seconds $PollSeconds
  } while ((Get-Date) -lt $deadline)

  if ($status -ne "passed") {
    $last = $probes | Select-Object -Last 1
    throw "Produccion no alcanzo $RequiredConsecutiveSuccesses respuestas HTTP 200 consecutivas en $TimeoutMinutes minutos. Ultimo estado: $($last.status), server=$($last.server), platform=$($last.platform), cache=$($last.cache_control), request=$($last.request_id)."
  }
} catch {
  $failure = $_.Exception.Message
  throw
} finally {
  $result = [pscustomobject]@{
    schema = 1
    status = $status
    domain = $Domain
    build_id = $BuildId
    node_version = [int]$build.options.node_version
    restart_used = $restartUsed
    checked_at = (Get-Date).ToUniversalTime().ToString("o")
    probes = $probes
    failure = $failure
  }
  Write-ReleaseJson -Value $result -Path $evidencePath
}

Write-Host "[Readiness] Runtime estable para el build $BuildId."
