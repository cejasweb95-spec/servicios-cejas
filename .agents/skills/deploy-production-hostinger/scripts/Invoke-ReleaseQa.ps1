param(
  [switch]$PlanOnly
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest
. (Join-Path $PSScriptRoot "Release.Common.ps1")

$root = Get-ReleaseRepositoryRoot
$evidenceRoot = Join-Path $root "output\release-qa"
$timestamp = (Get-Date).ToUniversalTime().ToString("yyyyMMdd-HHmmss")
$gates = @(
  "npm ci",
  "npm run lint",
  "npm run typecheck",
  "npm test",
  "npm run test:links",
  "npm audit --omit=dev --audit-level=high",
  "npm run build",
  "npm run test:e2e",
  "npm run test:crossbrowser",
  "npm run test:seo:all sobre el build local",
  "npm run test:responsive:all sobre el build local"
)

if ($PlanOnly) {
  Write-Host "Compuertas obligatorias de release:"
  $gates | ForEach-Object { Write-Host " - $_" }
  exit 0
}

Push-Location $root
$server = $null
$nodeText = $null
$startedAt = (Get-Date).ToUniversalTime()
$status = "failed"
$failure = $null
$completedGates = @()

function Invoke-QaGate {
  param(
    [Parameter(Mandatory = $true)][string]$Label,
    [Parameter(Mandatory = $true)][string]$FilePath,
    [string[]]$Arguments = @()
  )

  Write-Host "`n[QA] $Label"
  Invoke-ReleaseNative -FilePath $FilePath -Arguments $Arguments | Out-Null
  $script:completedGates += $Label
}

try {
  $nodeText = (& node --version).Trim().TrimStart('v')
  $nodeVersion = [version]$nodeText
  if ($nodeVersion -lt [version]"20.19.0") {
    throw "Node $nodeText no cumple el minimo 20.19.0 del proyecto."
  }

  if (-not (Test-Path -LiteralPath (Join-Path $root "package-lock.json"))) {
    throw "Falta package-lock.json; no existe instalacion reproducible."
  }

  $trackedEnv = @(Invoke-ReleaseGit -Arguments @("ls-files", ".env", ".env.local") -Quiet)
  if ($trackedEnv.Count -gt 0 -and -not [string]::IsNullOrWhiteSpace(($trackedEnv -join ""))) {
    throw ".env o .env.local estan versionados. La release se cancela."
  }

  Invoke-QaGate -Label "Instalacion reproducible" -FilePath "npm.cmd" -Arguments @("ci")
  Invoke-QaGate -Label "Lint" -FilePath "npm.cmd" -Arguments @("run", "lint")
  Invoke-QaGate -Label "TypeScript" -FilePath "npm.cmd" -Arguments @("run", "typecheck")
  Invoke-QaGate -Label "Pruebas unitarias" -FilePath "npm.cmd" -Arguments @("test")
  Invoke-QaGate -Label "Definiciones de enlaces" -FilePath "npm.cmd" -Arguments @("run", "test:links")
  Invoke-QaGate -Label "Auditoria runtime alta/critica" -FilePath "npm.cmd" -Arguments @("audit", "--omit=dev", "--audit-level=high")
  Invoke-QaGate -Label "Build de produccion" -FilePath "npm.cmd" -Arguments @("run", "build")

  $listener = Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue
  if ($listener) { throw "El puerto 3000 esta ocupado; no se reutiliza un servidor ajeno para certificar la release." }

  Invoke-QaGate -Label "E2E, accesibilidad y visual" -FilePath "npm.cmd" -Arguments @("run", "test:e2e")
  Invoke-QaGate -Label "Cross-browser y dispositivos (serie estable)" -FilePath "npm.cmd" -Arguments @("run", "test:crossbrowser", "--", "--workers=1")

  $listener = Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue
  if ($listener) { throw "El puerto 3000 quedo ocupado despues de Playwright." }

  if (-not (Test-Path -LiteralPath $evidenceRoot)) {
    New-Item -ItemType Directory -Path $evidenceRoot -Force | Out-Null
  }
  $stdout = Join-Path $evidenceRoot "server-$timestamp.stdout.log"
  $stderr = Join-Path $evidenceRoot "server-$timestamp.stderr.log"
  $server = Start-Process -FilePath "cmd.exe" `
    -ArgumentList @("/d", "/s", "/c", "npm run start -- --hostname 127.0.0.1 --port 3000") `
    -WorkingDirectory $root `
    -WindowStyle Hidden `
    -RedirectStandardOutput $stdout `
    -RedirectStandardError $stderr `
    -PassThru

  $deadline = (Get-Date).AddSeconds(90)
  $ready = $false
  do {
    try {
      $response = Invoke-WebRequest -Uri "http://127.0.0.1:3000/es" -UseBasicParsing -TimeoutSec 8
      $ready = ([int]$response.StatusCode -eq 200)
    } catch {
      Start-Sleep -Seconds 2
    }
  } while (-not $ready -and (Get-Date) -lt $deadline -and -not $server.HasExited)

  if (-not $ready) {
    $tail = if (Test-Path -LiteralPath $stderr) { (Get-Content -LiteralPath $stderr | Select-Object -Last 40) -join "`n" } else { "" }
    throw "El servidor del build no quedo listo.`n$tail"
  }

  $previousSeo = $env:SEO_BASE_URL
  $previousResponsive = $env:RESPONSIVE_BASE_URL
  try {
    $env:SEO_BASE_URL = "http://127.0.0.1:3000"
    Invoke-QaGate -Label "Rastreo SEO completo" -FilePath "npm.cmd" -Arguments @("run", "test:seo:all")
    $env:RESPONSIVE_BASE_URL = "http://127.0.0.1:3000"
    Invoke-QaGate -Label "Auditoria responsive completa" -FilePath "npm.cmd" -Arguments @("run", "test:responsive:all")
  } finally {
    $env:SEO_BASE_URL = $previousSeo
    $env:RESPONSIVE_BASE_URL = $previousResponsive
  }

  $status = "passed"
  Write-Host "`n[QA] Todas las compuertas aprobaron."
} catch {
  $failure = $_.Exception.Message
  throw
} finally {
  if ($server -and -not $server.HasExited) {
    & taskkill.exe /PID $server.Id /T /F *> $null
  }

  $sha = (Invoke-ReleaseGit -Arguments @("rev-parse", "HEAD") -Quiet | Select-Object -First 1).Trim()
  $branch = (Invoke-ReleaseGit -Arguments @("branch", "--show-current") -Quiet | Select-Object -First 1).Trim()
  $evidence = [pscustomobject]@{
    schema = 1
    status = $status
    branch = $branch
    commit = $sha
    node = if ($nodeText) { $nodeText } else { $null }
    started_at = $startedAt.ToString("o")
    finished_at = (Get-Date).ToUniversalTime().ToString("o")
    completed_gates = $completedGates
    failure = $failure
  }
  Write-ReleaseJson -Value $evidence -Path (Join-Path $evidenceRoot "$timestamp-$($sha.Substring(0, 8)).json")
  Pop-Location
}
