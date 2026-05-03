@echo off
setlocal EnableDelayedExpansion

:: Check for administrative privileges
>nul 2>&1 "%SYSTEMROOT%\system32\cacls.exe" "%SYSTEMROOT%\system32\config\system"
if '%errorlevel%' NEQ '0' (
    echo [!] Requesting administrative privileges...
    goto :UACPrompt
) else ( goto :gotAdmin )

:UACPrompt
    echo Set UAC = CreateObject^("Shell.Application"^) > "%temp%\getadmin.vbs"
    set params = %*:"=""
    echo UAC.ShellExecute "cmd.exe", "/c %~s0 %params%", "", "runas", 1 >> "%temp%\getadmin.vbs"
    "%temp%\getadmin.vbs"
    del "%temp%\getadmin.vbs"
    exit /B

:gotAdmin
    pushd "%CD%"
    CD /D "%~dp0"

:: Launch embedded PowerShell script
:: We skip the first 33 lines of this file to reach the PS code
powershell -NoProfile -ExecutionPolicy Bypass -Command "Get-Content '%~f0' | Select-Object -Skip 33 | Out-String | Invoke-Expression"

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [!] Installer encountered an error.
    pause
)
exit /B

# --- POWERSHELL SCRIPT STARTS HERE ---

$RepoUrl = "https://github.com/Faryzal2020/CoolKidsCraft-Aeronautics.git"
$InstanceName = "Cool Kids Craft - Aeronautics"
$PrismInstancesPath = "$env:APPDATA\PrismLauncher\instances"
$TargetDir = Join-Path $PrismInstancesPath $InstanceName

Write-Host "==============================================" -ForegroundColor Cyan
Write-Host "   Cool Kids Craft - Aeronautics Installer" -ForegroundColor Cyan
Write-Host "==============================================" -ForegroundColor Cyan

# 1. Check for Prism Launcher
if (-not (Test-Path $PrismInstancesPath)) {
    Write-Host "[-] Prism Launcher not found at $env:APPDATA\PrismLauncher." -ForegroundColor Red
    Write-Host "Please install Prism Launcher first: https://prismlauncher.org/" -ForegroundColor Yellow
    exit 1
}

# 2. Find Prism Launcher Executable
$PrismExePaths = @(
    "$env:LOCALAPPDATA\Programs\PrismLauncher\prismlauncher.exe",
    "$env:ProgramFiles\Prism Launcher\prismlauncher.exe",
    "$env:ProgramFiles(x86)\Prism Launcher\prismlauncher.exe",
    "$env:APPDATA\PrismLauncher\prismlauncher.exe"
)

$PrismExe = $null
foreach ($path in $PrismExePaths) {
    if (Test-Path $path) {
        $PrismExe = $path
        break
    }
}

if (-not $PrismExe) {
    Write-Host "[!] Could not find prismlauncher.exe automatically." -ForegroundColor Yellow
    $PrismExe = Read-Host "Please paste the full path to your prismlauncher.exe (e.g. C:\Games\PrismLauncher\prismlauncher.exe)"
    if (-not (Test-Path $PrismExe)) {
        Write-Host "[-] Invalid path. Exiting." -ForegroundColor Red
        exit 1
    }
}
Write-Host "[+] Found Prism Launcher at: $PrismExe" -ForegroundColor Green

# 3. Check for Git
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "[*] Git not found. Installing via winget..." -ForegroundColor Cyan
    winget install --id Git.Git -e --source winget
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[-] Winget installation failed. Please install Git manually: https://git-scm.com/" -ForegroundColor Red
        exit 1
    }
    # Refresh environment variables for the current session
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path", "User")
}
Write-Host "[+] Git is ready." -ForegroundColor Green

# 4. Clone Repository
if (-not (Test-Path $TargetDir)) {
    Write-Host "[*] Cloning modpack repository..." -ForegroundColor Cyan
    git clone $RepoUrl $TargetDir
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[-] Failed to clone repository." -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "[*] Modpack folder already exists. Skipping clone." -ForegroundColor Yellow
}

# 5. Create Launcher Script
$LauncherScriptPath = Join-Path $TargetDir "Launch-Aeronautics.ps1"
$LauncherContent = @"
# Launch-Aeronautics.ps1
Set-Location "`$PSScriptRoot"
Write-Host "--- Checking for Modpack Updates ---" -ForegroundColor Cyan
git fetch --all
git reset --hard origin/main
Write-Host "--- Launching Prism Launcher ---" -ForegroundColor Green
& "$PrismExe" --launch "$InstanceName"
"@

$LauncherContent | Set-Content $LauncherScriptPath -Force
Write-Host "[+] Launcher script created at $LauncherScriptPath" -ForegroundColor Green

# 6. Create Desktop Shortcut
try {
    $WshShell = New-Object -ComObject WScript.Shell
    $ShortcutPath = Join-Path ([Environment]::GetFolderPath("Desktop")) "$InstanceName.lnk"
    $Shortcut = $WshShell.CreateShortcut($ShortcutPath)
    $Shortcut.TargetPath = "powershell.exe"
    $Shortcut.Arguments = "-ExecutionPolicy Bypass -File `"$LauncherScriptPath`""
    $Shortcut.WorkingDirectory = $TargetDir
    $Shortcut.Description = "Play $InstanceName"
    $Shortcut.IconLocation = "$PrismExe,0"
    $Shortcut.Save()
    Write-Host "[+] Desktop shortcut created!" -ForegroundColor Green
} catch {
    Write-Host "[!] Failed to create desktop shortcut: $($_.Exception.Message)" -ForegroundColor Yellow
}

Write-Host "==============================================" -ForegroundColor Cyan
Write-Host "   Installation Complete! Have fun!" -ForegroundColor Green
Write-Host "==============================================" -ForegroundColor Cyan
# No pause here, the batch wrapper handles it if there's an error, or just exits.
