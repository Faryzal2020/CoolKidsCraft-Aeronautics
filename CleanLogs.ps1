Param(
    [Parameter(Position = 0)]
    [string]$Pattern,

    [Parameter(Position = 1)]
    [ValidateSet("whitelist", "blacklist")]
    [string]$Mode = "whitelist",

    [Parameter(Position = 2)]
    [string]$TrimOption
)

$TrimTime = ! [string]::IsNullOrEmpty($TrimOption)

# Log Processing Script for Minecraft
# Description: Extracts filtered logs and removes duplicates.

$logPath = "minecraft\logs\latest.log"
$errorLogPath = "minecraft\logs\error_summary.log"

if (Test-Path $logPath) {
    $filterInfo = if ($Pattern) { "'$Pattern' ($Mode)" } else { "ERROR and FATAL lines" }
    $trimInfo = if ($TrimTime) { " (with timestamp trimming)" } else { "" }
    Write-Host "Processing $logPath for $filterInfo$trimInfo..." -ForegroundColor Cyan

    # 1. Read content and apply filters
    if ($Pattern) {
        if ($Mode -eq "whitelist") {
            $extractedLines = Get-Content $logPath | Select-String -Pattern $Pattern | Select-Object -ExpandProperty Line
        } else {
            $extractedLines = Get-Content $logPath | Where-Object { $_ -notmatch $Pattern }
        }
    } else {
        # Default: Extract lines containing ERROR or FATAL (case-insensitive)
        $extractedLines = Get-Content $logPath | Select-String -Pattern "ERROR", "FATAL" | Select-Object -ExpandProperty Line
    }

    # 2. Trim timestamps if requested
    if ($TrimTime) {
        # Regex matches the first bracketed group at the start of the line, e.g., [24Apr2026 00:13:47.058]
        $extractedLines = $extractedLines | ForEach-Object { $_ -replace '^\[[^\]]+\]\s*', '' }
    }

    # 3. Eliminate duplicate lines
    $uniqueLines = $extractedLines | Select-Object -Unique

    if ($uniqueLines) {
        # Save to error_summary.log
        $uniqueLines | Set-Content $errorLogPath
        Write-Host "Extracted $($uniqueLines.Count) unique lines to $errorLogPath" -ForegroundColor Green
    } else {
        Write-Host "No matching lines found." -ForegroundColor Yellow
    }
} else {
    Write-Host "Error: $logPath not found." -ForegroundColor Red
}



