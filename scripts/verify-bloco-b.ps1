# Bloco B: verificacao consolidada no Windows. Somente ambiente local.
# Uso: powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\verify-bloco-b.ps1
$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"

$repo = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
Set-Location $repo

$expectedBranch = "feat/bloco-b-design-system-shells"
$branch = (git branch --show-current).Trim()
if ($LASTEXITCODE -ne 0 -or $branch -ne $expectedBranch) {
    throw "Branch incorreta: '$branch'. Esperada: '$expectedBranch'."
}
$dirty = @(git status --porcelain)
if ($LASTEXITCODE -ne 0 -or $dirty.Count -gt 0) {
    throw "O repositorio contem alteracoes locais. Nenhum pull/teste foi iniciado. Use git status para revisar."
}
if (-not (Test-Path (Join-Path $repo ".env"))) {
    throw "Arquivo .env local ausente. Copie .env.example para .env, defina senha forte apenas localmente e execute novamente."
}

$stamp = Get-Date -Format "yyyyMMdd-HHmmss"
$folder = Join-Path $env:TEMP ("Fomento-Bloco-B-" + $stamp)
New-Item -ItemType Directory -Path $folder -Force | Out-Null
$script:checks = New-Object System.Collections.Generic.List[object]

function Invoke-Check {
    param(
        [string] $Title,
        [string] $Executable,
        [string[]] $Arguments
    )
    $slug = ($Title -replace "[^A-Za-z0-9-]", "-").ToLowerInvariant()
    $log = Join-Path $folder ($slug + ".log")
    $code = 1
    $previousErrorActionPreference = $ErrorActionPreference
    Write-Host ("[INICIANDO] {0}" -f $Title) -ForegroundColor Cyan
    try {
        # Windows PowerShell 5.1 pode converter mensagens normais no stderr do Git/npm
        # em NativeCommandError. O codigo de saida do processo e a fonte de verdade.
        # Apenas neste escopo, manter erros de stderr como nao terminantes e capturar
        # toda a saida no log para permitir diagnostico posterior.
        $ErrorActionPreference = "Continue"
        $global:LASTEXITCODE = 0
        & $Executable @Arguments *> $log
        $code = [int] $LASTEXITCODE
    } catch {
        $_ | Out-String | Add-Content -Path $log -Encoding UTF8
        $code = 1
    } finally {
        $ErrorActionPreference = $previousErrorActionPreference
    }
    $state = if ($code -eq 0) { "PASS" } else { "FAIL" }
    $script:checks.Add([pscustomobject]@{
        Etapa = $Title; Status = $state; ExitCode = $code; Log = $log
    })
    Write-Host ("[{0}] {1}" -f $state, $Title) -ForegroundColor $(if ($code -eq 0) { "Green" } else { "Red" })
    if ($code -ne 0) {
        Write-Host "Ultimas linhas do erro:"
        if ((Test-Path $log) -and (Get-Item $log).Length -gt 0) {
            Get-Content -Path $log -Tail 14
        } else {
            Write-Host "Log vazio. Verifique os detalhes no RESUMO.txt."
        }
    }
    return ($code -eq 0)
}

try {
    $gitFetch = Invoke-Check -Title "git-fetch" -Executable "git.exe" -Arguments @("fetch", "origin")
    if (-not $gitFetch) { throw "Nao foi possivel atualizar referencias Git." }

    $gitPull = Invoke-Check -Title "git-pull" -Executable "git.exe" -Arguments @("pull", "--ff-only", "origin", $expectedBranch)
    if (-not $gitPull) { throw "O pull nao foi concluido por fast-forward." }

    $installed = Invoke-Check -Title "npm-ci" -Executable "npm.cmd" -Arguments @("ci")
    if (-not $installed) { throw "Instalacao falhou; testes dependentes nao podem ser executados com confiabilidade." }

    $null = Invoke-Check -Title "env-check" -Executable "npm.cmd" -Arguments @("run", "env:check")
    $null = Invoke-Check -Title "lint-typecheck-unit-build" -Executable "npm.cmd" -Arguments @("run", "verify:static")
    $null = Invoke-Check -Title "testes-offline" -Executable "npm.cmd" -Arguments @("run", "test:offline")
    $null = Invoke-Check -Title "gate-documental" -Executable "npm.cmd" -Arguments @("run", "docs:gate")
    $browser = Invoke-Check -Title "instalar-chromium" -Executable "npx.cmd" -Arguments @("playwright", "install", "chromium")
    if ($browser) {
        $null = Invoke-Check -Title "playwright-e2e" -Executable "npm.cmd" -Arguments @("run", "test:e2e")
    } else {
        $script:checks.Add([pscustomobject]@{ Etapa = "playwright-e2e"; Status = "SKIP"; ExitCode = -1; Log = "Chromium indisponivel" })
    }

    $dockerConfig = Invoke-Check -Title "docker-compose-config" -Executable "docker.exe" -Arguments @("compose", "--profile", "test", "config", "--quiet")
    if ($dockerConfig) {
        $dbUp = Invoke-Check -Title "subir-bancos" -Executable "docker.exe" -Arguments @("compose", "--profile", "test", "up", "-d", "--wait", "postgres", "postgres-test")
        if ($dbUp) {
            $null = Invoke-Check -Title "conexao-db-dev" -Executable "npm.cmd" -Arguments @("run", "db:ping")
            $null = Invoke-Check -Title "conexao-db-test" -Executable "npm.cmd" -Arguments @("run", "db:ping", "--", "--test")
        } else {
            $script:checks.Add([pscustomobject]@{ Etapa = "conexao-db-dev/test"; Status = "SKIP"; ExitCode = -1; Log = "Containers nao subiram" })
        }
    }
    $null = Invoke-Check -Title "git-diff-check" -Executable "git.exe" -Arguments @("diff", "--check")
} catch {
    Write-Host ("[INTERRUPCAO] " + $_.Exception.Message) -ForegroundColor Red
    $script:checks.Add([pscustomobject]@{ Etapa = "interrupcao"; Status = "FAIL"; ExitCode = 1; Log = $_.Exception.Message })
} finally {
    $summary = Join-Path $folder "RESUMO.txt"
    $commit = (git log -1 --oneline) -join " "
    $header = @(
        "Fomento / Bloco B - verificacao Windows",
        ("Data: " + (Get-Date -Format "yyyy-MM-dd HH:mm:ss")),
        ("Branch: " + $branch),
        ("Commit: " + $commit),
        "Relatorios: resultados informados pelo executor local; nao substituem o gate CI independente.",
        ""
    )
    $header | Set-Content -Path $summary -Encoding UTF8
    $script:checks | Format-Table -AutoSize | Out-String | Add-Content -Path $summary -Encoding UTF8

    $zip = $folder + ".zip"
    Compress-Archive -Path (Join-Path $folder "*") -DestinationPath $zip -Force
    Write-Host ""
    Write-Host "===== RESUMO FINAL =====" -ForegroundColor Cyan
    $script:checks | Format-Table Etapa, Status, ExitCode -AutoSize
    Write-Host ("Commit: " + $commit)
    Write-Host ("Arquivo de evidencias: " + $zip)
    Write-Host "O ZIP inclui somente logs dos comandos, sem copiar .env."
    if (@($script:checks | Where-Object { $_.Status -ne "PASS" }).Count -gt 0) {
        Write-Host "RESULTADO: EXISTEM FALHAS OU ETAPAS NAO EXECUTADAS" -ForegroundColor Yellow
        exit 1
    } else {
        Write-Host "RESULTADO: TODAS AS VERIFICACOES PASSARAM" -ForegroundColor Green
        exit 0
    }
}
