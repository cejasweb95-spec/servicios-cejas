param(
  [string]$Domain = "cejasinternacionales.com",
  [ValidateRange(1, 30)][int]$ReadyTimeoutMinutes = 5,
  [switch]$PlanOnly
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest
. (Join-Path $PSScriptRoot "Release.Common.ps1")

$root = Get-ReleaseRepositoryRoot
$baseUrl = "https://$Domain"
$timestamp = (Get-Date).ToUniversalTime().ToString("yyyyMMdd-HHmmss")
$evidencePath = Join-Path $root "output\production-release\smoke-$timestamp.json"
$checks = @()

if ($PlanOnly) {
  Write-Host "Comprobaria HTTPS, www, cabeceras, ES/EN, sitemap, robots, canonical, SEO y responsive en $baseUrl."
  exit 0
}

function Add-Check {
  param([string]$Name, [bool]$Passed, [string]$Detail)
  $script:checks += [pscustomobject]@{ name = $Name; passed = $Passed; detail = $Detail }
  if (-not $Passed) { throw "Smoke check '$Name' fallo: $Detail" }
}

function Invoke-ReadyRequest {
  param([Parameter(Mandatory = $true)][string]$Uri)

  $deadline = (Get-Date).AddMinutes($ReadyTimeoutMinutes)
  $lastStatus = 0
  do {
    try {
      $response = Invoke-WebRequest -Uri $Uri -UseBasicParsing -TimeoutSec 30
      if ([int]$response.StatusCode -eq 200) { return $response }
      $lastStatus = [int]$response.StatusCode
    } catch {
      $lastStatus = if ($_.Exception.Response) { [int]$_.Exception.Response.StatusCode } else { 0 }
      if ($lastStatus -notin @(0, 502, 503, 504)) { throw }
    }
    Write-Host "[Smoke] $Uri todavia no esta listo (HTTP $lastStatus); reintentando..."
    Start-Sleep -Seconds 10
  } while ((Get-Date) -lt $deadline)

  throw "$Uri no recupero HTTP 200 dentro de $ReadyTimeoutMinutes minutos. Ultimo estado: $lastStatus."
}

Push-Location $root
try {
  foreach ($path in @("/es", "/en", "/sitemap.xml", "/robots.txt")) {
    $response = Invoke-ReadyRequest -Uri "$baseUrl$path"
    Add-Check -Name "HTTP $path" -Passed ([int]$response.StatusCode -eq 200) -Detail "status=$([int]$response.StatusCode)"
  }

  $es = Invoke-ReadyRequest -Uri "$baseUrl/es?release-smoke=$timestamp"
  Add-Check -Name "Web nueva" -Passed ($es.Content -notmatch 'Proximamente|Próximamente') -Detail "La home no debe mostrar la pagina anterior."
  Add-Check -Name "Contenido principal" -Passed ($es.Content -match '<main[\s>]') -Detail "Debe existir el landmark main."
  Add-Check -Name "Canonical" -Passed ($es.Content -match [regex]::Escape("$baseUrl/es")) -Detail "El canonical debe usar el dominio productivo."
  Add-Check -Name "Sin localhost" -Passed ($es.Content -notmatch 'localhost|127\.0\.0\.1') -Detail "El HTML publico no debe apuntar al entorno local."

  $headers = $es.Headers
  Add-Check -Name "HSTS" -Passed ([bool]$headers["Strict-Transport-Security"]) -Detail "Strict-Transport-Security obligatorio."
  Add-Check -Name "No sniff" -Passed ($headers["X-Content-Type-Options"] -match 'nosniff') -Detail "X-Content-Type-Options=nosniff obligatorio."
  Add-Check -Name "Referrer policy" -Passed ([bool]$headers["Referrer-Policy"]) -Detail "Referrer-Policy obligatoria."
  Add-Check -Name "Permissions policy" -Passed ([bool]$headers["Permissions-Policy"]) -Detail "Permissions-Policy obligatoria."
  Add-Check -Name "Frame options" -Passed ([bool]$headers["X-Frame-Options"]) -Detail "X-Frame-Options obligatoria."

  $httpRedirect = (& curl.exe -sS -o NUL -w "%{http_code}|%{redirect_url}" "http://$Domain/es") -split '\|', 2
  Add-Check -Name "HTTP a HTTPS" -Passed ($httpRedirect[0] -in @("301", "308") -and $httpRedirect[1] -eq "$baseUrl/es") -Detail ($httpRedirect -join " -> ")

  $wwwRedirect = (& curl.exe -sS -o NUL -w "%{http_code}|%{redirect_url}" "https://www.$Domain/en/services?market=switzerland") -split '\|', 2
  Add-Check -Name "www a apex" -Passed ($wwwRedirect[0] -in @("301", "308") -and $wwwRedirect[1] -eq "$baseUrl/en/services?market=switzerland") -Detail ($wwwRedirect -join " -> ")

  $previousSeo = $env:SEO_BASE_URL
  $previousResponsive = $env:RESPONSIVE_BASE_URL
  try {
    $env:SEO_BASE_URL = $baseUrl
    Invoke-ReleaseNative -FilePath "npm.cmd" -Arguments @("run", "test:seo:all") | Out-Null
    Add-Check -Name "SEO completo" -Passed $true -Detail "Rastreo publico aprobado."

    $env:RESPONSIVE_BASE_URL = $baseUrl
    Invoke-ReleaseNative -FilePath "npm.cmd" -Arguments @("run", "test:responsive:all") | Out-Null
    Add-Check -Name "Responsive completo" -Passed $true -Detail "Seis viewports publicos aprobados."
  } finally {
    $env:SEO_BASE_URL = $previousSeo
    $env:RESPONSIVE_BASE_URL = $previousResponsive
  }

  $result = [pscustomobject]@{
    schema = 1
    status = "passed"
    domain = $Domain
    checked_at = (Get-Date).ToUniversalTime().ToString("o")
    checks = $checks
  }
  Write-ReleaseJson -Value $result -Path $evidencePath
  Write-Host "[Smoke] Produccion aprobada desde Internet. Evidencia: $evidencePath"
} catch {
  $result = [pscustomobject]@{
    schema = 1
    status = "failed"
    domain = $Domain
    checked_at = (Get-Date).ToUniversalTime().ToString("o")
    checks = $checks
    failure = $_.Exception.Message
  }
  Write-ReleaseJson -Value $result -Path $evidencePath
  throw
} finally {
  Pop-Location
}
