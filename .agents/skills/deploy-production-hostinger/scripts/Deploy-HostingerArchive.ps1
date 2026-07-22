param(
  [string]$Domain = "cejasinternacionales.com",
  [string]$Commitish = "refs/remotes/origin/main",
  [ValidateSet(18, 20, 22, 24)][int]$ExpectedNodeVersion = 22,
  [switch]$PlanOnly
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest
. (Join-Path $PSScriptRoot "Release.Common.ps1")

$root = Get-ReleaseRepositoryRoot
$envFile = Join-Path $root ".env.local"
$evidenceRoot = Join-Path $root "output\production-release"
$helper = Join-Path $PSScriptRoot "Deploy-HostingerArchive.mjs"

if ($PlanOnly) {
  Write-Host "Crearia un ZIP limpio desde $Commitish, lo subiria con el flujo oficial de Hostinger, conservaria su autodeteccion y forzaria Node $ExpectedNodeVersion."
  exit 0
}

$null = Get-DotEnvValue -Path $envFile -Name "HOSTINGER_API_TOKEN" -Required
$secrets = Get-ReleaseSecrets -EnvFile $envFile
$commit = (Invoke-ReleaseGit -Arguments @("rev-parse", "$Commitish^{commit}") -Quiet | Select-Object -First 1).Trim()
if ([string]::IsNullOrWhiteSpace($commit)) { throw "No se pudo resolver $Commitish." }

if (-not (Test-Path -LiteralPath $evidenceRoot)) {
  New-Item -ItemType Directory -Path $evidenceRoot -Force | Out-Null
}

$timestamp = (Get-Date).ToUniversalTime().ToString("yyyyMMdd-HHmmss")
$archiveName = "hostinger-$($commit.Substring(0, 8))-$timestamp.zip"
$archivePath = Join-Path $evidenceRoot $archiveName
$candidatePaths = @(
  ".npmrc",
  "components.json",
  "next.config.js",
  "next.config.mjs",
  "next.config.ts",
  "next-env.d.ts",
  "package.json",
  "package-lock.json",
  "pnpm-lock.yaml",
  "yarn.lock",
  "postcss.config.js",
  "postcss.config.mjs",
  "public",
  "scripts",
  "src",
  "tsconfig.json"
)
$includePaths = @()
foreach ($candidate in $candidatePaths) {
  $match = @(Invoke-ReleaseGit -Arguments @("ls-tree", "--name-only", $commit, "--", $candidate) -Quiet)
  if (($match -join "").Trim()) { $includePaths += $candidate }
}
foreach ($required in @("package.json", "src", "public")) {
  if ($required -notin $includePaths) { throw "El commit $commit no contiene $required." }
}

$archiveArguments = @("archive", "--format=zip", "--output=$archivePath", $commit, "--") + $includePaths
Invoke-ReleaseGit -Arguments $archiveArguments -Secrets $secrets | Out-Null
$archiveInfo = Get-Item -LiteralPath $archivePath
if ($archiveInfo.Length -gt 50MB) {
  throw "El archivo de produccion ocupa $([math]::Round($archiveInfo.Length / 1MB, 2)) MB y supera el limite de 50 MB."
}

Write-Host "[Hostinger] Subiendo $archiveName desde el commit $commit..."
$previousPreference = $ErrorActionPreference
$ErrorActionPreference = "Continue"
try {
  $rawOutput = @(& node $helper "--archive=$archivePath" "--env=$envFile" "--domain=$Domain" "--node=$ExpectedNodeVersion" 2>&1)
  $exitCode = $LASTEXITCODE
} finally {
  $ErrorActionPreference = $previousPreference
}
$safeOutput = @($rawOutput | ForEach-Object { Protect-ReleaseText -Value $_ -Secrets $secrets })
$safeOutput | ForEach-Object { Write-Host $_ }
if ($exitCode -ne 0) {
  throw "El despliegue por archivo fallo.`n$(($safeOutput | Select-Object -Last 40) -join "`n")"
}

$jsonLine = $safeOutput |
  Where-Object { $_.Trim().StartsWith("{") -and $_.Trim().EndsWith("}") } |
  Select-Object -Last 1
if (-not $jsonLine) { throw "El helper de Hostinger no devolvio evidencia JSON." }
$result = $jsonLine | ConvertFrom-Json
if (-not $result.build.uuid) { throw "La evidencia no contiene un UUID de build." }

$evidencePath = Join-Path $evidenceRoot "archive-deploy-$($result.build.uuid).json"
Write-ReleaseJson -Value $result -Path $evidencePath
Write-Host "[Hostinger] Build por archivo creado: $($result.build.uuid)."
$result | ConvertTo-Json -Depth 8 -Compress
