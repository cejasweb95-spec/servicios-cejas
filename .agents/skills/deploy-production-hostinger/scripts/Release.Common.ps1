Set-StrictMode -Version Latest

function Get-ReleaseRepositoryRoot {
  return (Resolve-Path (Join-Path $PSScriptRoot "..\..\..\..")).Path
}

function Get-DotEnvValue {
  param(
    [Parameter(Mandatory = $true)][string]$Path,
    [Parameter(Mandatory = $true)][string]$Name,
    [switch]$Required
  )

  if (-not (Test-Path -LiteralPath $Path)) {
    if ($Required) { throw "No existe $Path." }
    return $null
  }

  $pattern = "^\s*" + [regex]::Escape($Name) + "="
  $line = Get-Content -LiteralPath $Path |
    Where-Object { $_ -match $pattern } |
    Select-Object -Last 1

  if (-not $line) {
    if ($Required) { throw "Falta $Name en .env.local." }
    return $null
  }

  $value = ($line -replace $pattern, "").Trim()
  if ($value.Length -ge 2) {
    $first = $value.Substring(0, 1)
    $last = $value.Substring($value.Length - 1, 1)
    if (($first -eq '"' -and $last -eq '"') -or ($first -eq "'" -and $last -eq "'")) {
      $value = $value.Substring(1, $value.Length - 2)
    }
  }

  if ($Required -and [string]::IsNullOrWhiteSpace($value)) {
    throw "$Name esta vacio en .env.local."
  }

  return $value
}

function Get-ReleaseSecrets {
  param([Parameter(Mandatory = $true)][string]$EnvFile)

  if (-not (Test-Path -LiteralPath $EnvFile)) { return @() }

  $values = @()
  foreach ($line in Get-Content -LiteralPath $EnvFile) {
    if ($line -notmatch '^\s*([^#=]+)=(.*)$') { continue }
    $name = $Matches[1].Trim()
    $value = $Matches[2].Trim().Trim('"').Trim("'")
    if ($name -match '(?i)(TOKEN|SECRET|PASSWORD|PRIVATE|API_KEY)' -and $value.Length -ge 6) {
      $values += $value
    }
  }
  return @($values | Select-Object -Unique)
}

function Protect-ReleaseText {
  param(
    [AllowNull()][object]$Value,
    [string[]]$Secrets = @()
  )

  $text = if ($null -eq $Value) { "" } else { [string]$Value }
  foreach ($secret in $Secrets) {
    if (-not [string]::IsNullOrWhiteSpace($secret)) {
      $text = $text.Replace($secret, "***")
    }
  }
  $text = $text -replace 'https://x-access-token:[^@\s]+@', 'https://x-access-token:***@'
  return $text
}

function Invoke-ReleaseNative {
  param(
    [Parameter(Mandatory = $true)][string]$FilePath,
    [string[]]$Arguments = @(),
    [string[]]$Secrets = @(),
    [switch]$Quiet
  )

  $raw = @()
  $exitCode = 0
  $previousPreference = $ErrorActionPreference
  $ErrorActionPreference = "Continue"
  try {
    $raw = @(& $FilePath @Arguments 2>&1)
    $exitCode = $LASTEXITCODE
  } finally {
    $ErrorActionPreference = $previousPreference
  }

  $safe = @($raw | ForEach-Object { Protect-ReleaseText -Value $_ -Secrets $Secrets })
  if (-not $Quiet -and $safe.Count -gt 0) {
    $safe | ForEach-Object { Write-Host $_ }
  }
  if ($exitCode -ne 0) {
    $summary = ($safe | Select-Object -Last 40) -join [Environment]::NewLine
    throw "$FilePath fallo con codigo $exitCode.`n$summary"
  }
  return $safe
}

function Invoke-ReleaseGit {
  param(
    [Parameter(Mandatory = $true)][string[]]$Arguments,
    [string[]]$Secrets = @(),
    [switch]$Quiet
  )
  return Invoke-ReleaseNative -FilePath "git" -Arguments $Arguments -Secrets $Secrets -Quiet:$Quiet
}

function New-AuthenticatedGitUrl {
  param(
    [Parameter(Mandatory = $true)][string]$RepositoryUrl,
    [Parameter(Mandatory = $true)][string]$Token
  )

  if ($RepositoryUrl -notmatch '^https://') {
    throw "GIT_REPO_URL debe ser una URL HTTPS."
  }
  return ($RepositoryUrl -replace '^https://', "https://x-access-token:${Token}@")
}

function Get-HostingerContext {
  param(
    [Parameter(Mandatory = $true)][string]$EnvFile,
    [Parameter(Mandatory = $true)][string]$Domain
  )

  $token = Get-DotEnvValue -Path $EnvFile -Name "HOSTINGER_API_TOKEN" -Required
  $headers = @{ Authorization = "Bearer $token"; Accept = "application/json" }
  $response = Invoke-RestMethod -Uri "https://developers.hostinger.com/api/hosting/v1/websites" -Headers $headers
  $websites = if ($response.data) { $response.data } else { $response }
  $website = @($websites) | Where-Object { $_.domain -eq $Domain } | Select-Object -First 1
  if (-not $website) { throw "Hostinger no devolvio el dominio $Domain." }

  return [pscustomobject]@{
    Domain = $Domain
    Username = $website.username
    Headers = $headers
    Token = $token
  }
}

function Get-HostingerBuilds {
  param([Parameter(Mandatory = $true)]$Context)

  $uri = "https://developers.hostinger.com/api/hosting/v1/accounts/$($Context.Username)/websites/$($Context.Domain)/nodejs/builds?per_page=50"
  $response = Invoke-RestMethod -Uri $uri -Headers $Context.Headers
  $items = if ($response.data) { $response.data } else { $response }
  return @($items)
}

function Get-HostingerBuildLogs {
  param(
    [Parameter(Mandatory = $true)]$Context,
    [Parameter(Mandatory = $true)][string]$BuildId
  )

  $uri = "https://developers.hostinger.com/api/hosting/v1/accounts/$($Context.Username)/websites/$($Context.Domain)/nodejs/builds/$BuildId/logs"
  return Invoke-RestMethod -Uri $uri -Headers $Context.Headers
}

function Write-ReleaseJson {
  param(
    [Parameter(Mandatory = $true)][object]$Value,
    [Parameter(Mandatory = $true)][string]$Path
  )

  $directory = Split-Path -Parent $Path
  if (-not (Test-Path -LiteralPath $directory)) {
    New-Item -ItemType Directory -Path $directory -Force | Out-Null
  }
  $Value | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath $Path -Encoding UTF8
}
