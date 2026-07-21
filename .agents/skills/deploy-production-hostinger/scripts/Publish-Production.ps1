param(
  [string]$CommitMessage = "",
  [string]$Domain = "cejasinternacionales.com",
  [string]$ProductionBranch = "main",
  [ValidateRange(5, 120)][int]$BuildTimeoutMinutes = 30,
  [switch]$ConfirmProduction,
  [switch]$AllowUntracked,
  [switch]$PlanOnly
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest
. (Join-Path $PSScriptRoot "Release.Common.ps1")

$root = Get-ReleaseRepositoryRoot
$envFile = Join-Path $root ".env.local"
$qaScript = Join-Path $PSScriptRoot "Invoke-ReleaseQa.ps1"
$monitorScript = Join-Path $PSScriptRoot "Watch-HostingerBuild.ps1"
$smokeScript = Join-Path $PSScriptRoot "Test-ProductionSmoke.ps1"
$evidenceRoot = Join-Path $root "output\production-release"
$timestamp = (Get-Date).ToUniversalTime().ToString("yyyyMMdd-HHmmss")

if ($PlanOnly) {
  Write-Host @"
Plan de publicacion:
1. Exigir una rama fuente distinta de $ProductionBranch y un arbol limpio.
2. Verificar que la rama contiene el $ProductionBranch remoto actual.
3. Ejecutar todas las compuertas de QA sobre el commit exacto.
4. Subir la rama fuente y verificar su SHA remoto.
5. Crear y subir un tag de respaldo de produccion.
6. Crear un worktree temporal, hacer merge --no-ff y subir $ProductionBranch.
7. Esperar un build Git nuevo de Hostinger con Node 22 hasta estado completed.
8. Validar el dominio publico, SEO y seis viewports.
9. Crear un tag de release y confirmar que la rama de trabajo nunca cambio.
"@
  exit 0
}

if (-not $ConfirmProduction) {
  throw "Operacion bloqueada: usa -ConfirmProduction solo despues de una autorizacion explicita del usuario."
}

Push-Location $root
$sourceBranch = $null
$sourceSha = $null
$previousMainSha = $null
$mergeSha = $null
$backupTag = $null
$releaseTag = $null
$worktreePath = $null
$status = "failed"
$failure = $null
$startedAt = (Get-Date).ToUniversalTime()

try {
  $sourceBranch = (Invoke-ReleaseGit -Arguments @("branch", "--show-current") -Quiet | Select-Object -First 1).Trim()
  if ([string]::IsNullOrWhiteSpace($sourceBranch)) { throw "HEAD esta desacoplado; no se publica desde detached HEAD." }
  if ($sourceBranch -eq $ProductionBranch) { throw "La rama fuente no puede ser $ProductionBranch." }

  $statusLines = @(Invoke-ReleaseGit -Arguments @("status", "--porcelain") -Quiet | Where-Object { -not [string]::IsNullOrWhiteSpace($_) })
  $untrackedLines = @($statusLines | Where-Object { $_ -match '^\?\?' })
  $trackedChanges = @($statusLines | Where-Object { $_ -notmatch '^\?\?' })
  if ($trackedChanges.Count -gt 0) {
    throw "Existen cambios tracked o staged sin guardar. La release solo certifica commits completos.`n$($trackedChanges -join "`n")"
  }
  if ($untrackedLines.Count -gt 0 -and -not $AllowUntracked) {
    throw "Existen archivos nuevos sin versionar. Revisalos y guardalos, ignoralos de forma justificada o repite con -AllowUntracked.`n$($untrackedLines -join "`n")"
  }
  if ($untrackedLines.Count -gt 0) {
    Write-Warning "Se conservaran fuera de la release $($untrackedLines.Count) rutas untracked revisadas."
  }

  foreach ($marker in @("MERGE_HEAD", "REBASE_HEAD", "CHERRY_PICK_HEAD")) {
    $markerPath = Join-Path (Invoke-ReleaseGit -Arguments @("rev-parse", "--git-path", $marker) -Quiet | Select-Object -First 1) ""
    if (Test-Path -LiteralPath $markerPath) { throw "Existe una operacion Git incompleta: $marker." }
  }

  $trackedEnv = @(Invoke-ReleaseGit -Arguments @("ls-files", ".env", ".env.local") -Quiet)
  if (($trackedEnv -join "").Trim()) { throw ".env o .env.local estan versionados; la publicacion se cancela." }

  $gitToken = Get-DotEnvValue -Path $envFile -Name "GIT_ACCESS_TOKEN" -Required
  $repoUrl = Get-DotEnvValue -Path $envFile -Name "GIT_REPO_URL" -Required
  $null = Get-DotEnvValue -Path $envFile -Name "HOSTINGER_API_TOKEN" -Required
  $secrets = Get-ReleaseSecrets -EnvFile $envFile
  $authenticatedUrl = New-AuthenticatedGitUrl -RepositoryUrl $repoUrl -Token $gitToken
  $env:GIT_TERMINAL_PROMPT = "0"
  $env:GCM_INTERACTIVE = "never"

  Invoke-ReleaseGit -Arguments @("fetch", "--no-tags", $authenticatedUrl, "+refs/heads/$ProductionBranch`:refs/remotes/origin/$ProductionBranch") -Secrets $secrets | Out-Null
  $previousMainSha = (Invoke-ReleaseGit -Arguments @("rev-parse", "refs/remotes/origin/$ProductionBranch") -Quiet | Select-Object -First 1).Trim()
  $sourceSha = (Invoke-ReleaseGit -Arguments @("rev-parse", "HEAD") -Quiet | Select-Object -First 1).Trim()
  if ($sourceSha -eq $previousMainSha) { throw "No hay commits nuevos que promover desde $sourceBranch." }

  $previousPreference = $ErrorActionPreference
  $ErrorActionPreference = "Continue"
  try {
    & git merge-base --is-ancestor $previousMainSha $sourceSha *> $null
    $containsMain = ($LASTEXITCODE -eq 0)
  } finally {
    $ErrorActionPreference = $previousPreference
  }
  if (-not $containsMain) {
    throw "$sourceBranch no contiene el $ProductionBranch remoto actual. Integra main en la rama fuente, resuelve conflictos, prueba y repite."
  }

  if ([string]::IsNullOrWhiteSpace($CommitMessage)) {
    $CommitMessage = "release: merge $sourceBranch into $ProductionBranch ($timestamp UTC)"
  }

  & $qaScript

  Invoke-ReleaseGit -Arguments @("push", $authenticatedUrl, "HEAD:refs/heads/$sourceBranch") -Secrets $secrets | Out-Null
  $remoteSourceLine = @(Invoke-ReleaseGit -Arguments @("ls-remote", $authenticatedUrl, "refs/heads/$sourceBranch") -Secrets $secrets -Quiet) | Select-Object -First 1
  $remoteSourceSha = if ($remoteSourceLine) { ($remoteSourceLine -split "\s+")[0] } else { "" }
  if ($remoteSourceSha -ne $sourceSha) { throw "La rama remota $sourceBranch no coincide con el commit certificado." }

  $hostinger = Get-HostingerContext -EnvFile $envFile -Domain $Domain
  $idleDeadline = (Get-Date).AddMinutes($BuildTimeoutMinutes)
  do {
    $activeBuilds = @(Get-HostingerBuilds -Context $hostinger | Where-Object { $_.state -in @("pending", "running") })
    if ($activeBuilds.Count -eq 0) { break }
    Write-Host "[Hostinger] Esperando a que terminen $($activeBuilds.Count) builds anteriores..."
    Start-Sleep -Seconds 10
  } while ((Get-Date) -lt $idleDeadline)
  if ($activeBuilds.Count -gt 0) { throw "Hostinger no quedo libre para iniciar una release aislada." }

  $backupTag = "production-backup-$timestamp-$($previousMainSha.Substring(0, 8))"
  Invoke-ReleaseGit -Arguments @("tag", "-a", $backupTag, $previousMainSha, "-m", "Backup before $sourceBranch production release") -Quiet | Out-Null
  Invoke-ReleaseGit -Arguments @("push", $authenticatedUrl, "refs/tags/$backupTag`:refs/tags/$backupTag") -Secrets $secrets | Out-Null

  $remoteMainLine = @(Invoke-ReleaseGit -Arguments @("ls-remote", $authenticatedUrl, "refs/heads/$ProductionBranch") -Secrets $secrets -Quiet) | Select-Object -First 1
  $remoteMainSha = if ($remoteMainLine) { ($remoteMainLine -split "\s+")[0] } else { "" }
  if ($remoteMainSha -ne $previousMainSha) { throw "$ProductionBranch cambio durante las pruebas; se cancela sin sobrescribir trabajo remoto." }

  $worktreeParent = Join-Path $root "output\production-worktrees"
  if (-not (Test-Path -LiteralPath $worktreeParent)) {
    New-Item -ItemType Directory -Path $worktreeParent -Force | Out-Null
  }
  $worktreePath = Join-Path $worktreeParent "release-$timestamp"
  if (Test-Path -LiteralPath $worktreePath) { throw "El worktree temporal ya existe: $worktreePath" }

  try {
    Invoke-ReleaseGit -Arguments @("worktree", "add", "--detach", $worktreePath, "refs/remotes/origin/$ProductionBranch") -Secrets $secrets | Out-Null
    Invoke-ReleaseGit -Arguments @(
      "-C", $worktreePath,
      "-c", "user.name=Cejas Production Agent",
      "-c", "user.email=deploy@local.invalid",
      "merge", "--no-ff", $sourceSha, "-m", $CommitMessage
    ) -Secrets $secrets | Out-Null
    $mergeSha = (Invoke-ReleaseGit -Arguments @("-C", $worktreePath, "rev-parse", "HEAD") -Quiet | Select-Object -First 1).Trim()
    $releaseStartedAt = (Get-Date).ToUniversalTime()
    Invoke-ReleaseGit -Arguments @("-C", $worktreePath, "push", $authenticatedUrl, "HEAD:refs/heads/$ProductionBranch") -Secrets $secrets | Out-Null
  } finally {
    if ($worktreePath -and (Test-Path -LiteralPath $worktreePath)) {
      try { Invoke-ReleaseGit -Arguments @("worktree", "remove", "--force", $worktreePath) -Secrets $secrets -Quiet | Out-Null }
      catch { Write-Warning "No se pudo limpiar el worktree temporal: $($_.Exception.Message)" }
    }
  }

  $publishedLine = @(Invoke-ReleaseGit -Arguments @("ls-remote", $authenticatedUrl, "refs/heads/$ProductionBranch") -Secrets $secrets -Quiet) | Select-Object -First 1
  $publishedSha = if ($publishedLine) { ($publishedLine -split "\s+")[0] } else { "" }
  if ($publishedSha -ne $mergeSha) { throw "$ProductionBranch remoto no coincide con el merge de release." }

  & $monitorScript -Domain $Domain -NotBeforeUtc $releaseStartedAt.ToString("o") -SourceType "git" -ExpectedNodeVersion 22 -TimeoutMinutes $BuildTimeoutMinutes
  & $smokeScript -Domain $Domain

  $releaseTag = "production-release-$timestamp-$($mergeSha.Substring(0, 8))"
  Invoke-ReleaseGit -Arguments @("tag", "-a", $releaseTag, $mergeSha, "-m", "Verified production release for $Domain") -Quiet | Out-Null
  Invoke-ReleaseGit -Arguments @("push", $authenticatedUrl, "refs/tags/$releaseTag`:refs/tags/$releaseTag") -Secrets $secrets | Out-Null
  Invoke-ReleaseGit -Arguments @("fetch", "--no-tags", $authenticatedUrl, "+refs/heads/$ProductionBranch`:refs/remotes/origin/$ProductionBranch", "+refs/heads/$sourceBranch`:refs/remotes/origin/$sourceBranch") -Secrets $secrets | Out-Null

  $currentBranch = (Invoke-ReleaseGit -Arguments @("branch", "--show-current") -Quiet | Select-Object -First 1).Trim()
  if ($currentBranch -ne $sourceBranch) { throw "La rama activa cambio inesperadamente a $currentBranch." }
  $status = "completed"
  Write-Host "[Release] Produccion completada. $sourceBranch sigue siendo la rama activa."
} catch {
  $failure = $_.Exception.Message
  throw
} finally {
  $evidence = [pscustomobject]@{
    schema = 1
    status = $status
    domain = $Domain
    source_branch = $sourceBranch
    source_commit = $sourceSha
    previous_main_commit = $previousMainSha
    production_commit = $mergeSha
    backup_tag = $backupTag
    release_tag = $releaseTag
    started_at = $startedAt.ToString("o")
    finished_at = (Get-Date).ToUniversalTime().ToString("o")
    failure = $failure
  }
  Write-ReleaseJson -Value $evidence -Path (Join-Path $evidenceRoot "release-$timestamp.json")
  Pop-Location
}
