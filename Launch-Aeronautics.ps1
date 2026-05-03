# Launch-Aeronautics.ps1
Set-Location "$PSScriptRoot"
Write-Host "--- Checking for Modpack Updates ---" -ForegroundColor Cyan
git fetch --all
git reset --hard origin/main
Write-Host "--- Launching Prism Launcher ---" -ForegroundColor Green
& "C:\Users\fary2\AppData\Local\Programs\PrismLauncher\prismlauncher.exe" --launch "Cool Kids Craft - Aeronautics"
