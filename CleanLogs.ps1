# Log Processing Script for Minecraft
# Description: Extracts error logs, removes duplicates, and trims (clears) the latest.log file.

$logPath = "minecraft\logs\latest.log"
$errorLogPath = "minecraft\logs\error_summary.log"

if (Test-Path $logPath) {
    Write-Host "Processing $logPath..." -ForegroundColor Cyan

    # 1. Extract lines containing ERROR or FATAL (case-insensitive)
    # 2. Eliminate duplicate lines
    $errorLines = Get-Content $logPath | Select-String -Pattern "ERROR", "FATAL" | Select-Object -ExpandProperty Line -Unique

    if ($errorLines) {
        # Save to error_summary.log
        $errorLines | Set-Content $errorLogPath
        Write-Host "Extracted $($errorLines.Count) unique error lines to $errorLogPath" -ForegroundColor Green
    } else {
        Write-Host "No error lines found." -ForegroundColor Yellow
    }

    # 3. Trim (Clear) the latest.log file
    try {
        Clear-Content $logPath -ErrorAction Stop
        Write-Host "$logPath has been trimmed (cleared)." -ForegroundColor Green
    } catch {
        Write-Host "Failed to trim $logPath. It might be in use by another process (e.g., Minecraft)." -ForegroundColor Red
    }
} else {
    Write-Host "Error: $logPath not found." -ForegroundColor Red
}
