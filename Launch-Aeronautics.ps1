# Launch-Aeronautics.ps1
Set-Location "$PSScriptRoot"
Write-Host "--- Checking for Modpack Updates ---" -ForegroundColor Cyan

# Prevent Git from hanging on interactive "Should I try again?" prompts on Windows
$env:GIT_ASK_YESNO = "false"

# Check if Prism Launcher is running (common cause of locks)
if (Get-Process prismlauncher -ErrorAction SilentlyContinue) {
    Write-Host "Warning: Prism Launcher is currently running. This may cause Git file locks." -ForegroundColor Yellow
}

# Clear potential lock files
if (Test-Path ".git/index.lock") {
    Write-Host "Removing stale git index lock..." -ForegroundColor Yellow
    Remove-Item ".git/index.lock" -Force -ErrorAction SilentlyContinue
}

$retryCount = 0
$maxRetries = 5
$success = $false

while (-not $success -and $retryCount -lt $maxRetries) {
    if ($retryCount -gt 0) {
        Write-Host "Retrying in 2 seconds... (Attempt $($retryCount + 1)/$maxRetries)" -ForegroundColor Gray
        Start-Sleep -Seconds 2
    }

    # Run git fetch
    git fetch --all --prune
    if ($LASTEXITCODE -eq 0) {
        # Run git reset
        git reset --hard origin/main
        if ($LASTEXITCODE -eq 0) {
            $success = $true
        } else {
            Write-Host "Git reset failed." -ForegroundColor Red
        }
    } else {
        Write-Host "Git fetch failed. A file may be locked by another process." -ForegroundColor Red
    }

    $retryCount++
}

if (-not $success) {
    Write-Host "--- Update Failed ---" -ForegroundColor Red
    Write-Host "Could not sync with GitHub. This usually happens if another program (like VS Code or Prism) is locking the files."
    $choice = Read-Host "Would you like to launch the game anyway? (y/n)"
    if ($choice -ne "y") {
        Write-Host "Launch aborted."
        exit
    }
}

Write-Host "--- Launching Prism Launcher ---" -ForegroundColor Green
& "C:\Users\fary2\AppData\Local\Programs\PrismLauncher\prismlauncher.exe" --launch "Cool Kids Craft - Aeronautics"
