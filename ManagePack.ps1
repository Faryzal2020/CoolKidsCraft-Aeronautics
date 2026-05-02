# ManagePack.ps1
# Modpack Management Script for Cool Kids Craft - Aeronautics

function Show-Menu {
    Clear-Host
    Write-Host "==============================" -ForegroundColor Cyan
    Write-Host "   Pack Management Utility" -ForegroundColor Cyan
    Write-Host "==============================" -ForegroundColor Cyan
    Write-Host "1. Pack Client Distributable"
    Write-Host "2. Change Pack Version"
    Write-Host "3. Sync Server Branch (GitHub)"
    Write-Host "4. Exit"
    Write-Host ""
}

function Get-IgnorePatterns {
    param($path)
    if (Test-Path $path) {
        return Get-Content $path | Where-Object { $_ -and -not $_.StartsWith("#") }
    }
    return @()
}

function Pack-Distributables {
    Write-Host "--- Packing Client Distributables ---" -ForegroundColor Yellow
    
    $zipName = "Cool Kids Craft - Aeronautics.zip"
    $distDir = "dist"
    $zipPath = Join-Path $PWD.Path "$distDir\$zipName"
    
    if (-not (Test-Path $distDir)) {
        New-Item -ItemType Directory -Path $distDir | Out-Null
    }

    $gitFiles = git ls-files --cached --others --exclude-standard
    $packIgnorePatterns = Get-IgnorePatterns ".packignore"

    $filesToInclude = @()
    foreach ($file in $gitFiles) {
        $ignored = $false
        $normFile = $file.Replace("\", "/")
        foreach ($pattern in $packIgnorePatterns) {
            $p = $pattern.Replace("\", "/").Trim("/")
            if ($normFile -eq $p -or $normFile.StartsWith("$p/")) {
                $ignored = $true
                break
            }
        }
        if ($normFile.StartsWith("dist/")) { $ignored = $true }
        if (-not $ignored) { $filesToInclude += $file }
    }

    if (Test-Path $zipPath) { Remove-Item $zipPath -Force }

    $tempDir = Join-Path $env:TEMP ("build_temp_" + (Get-Date -Format "yyyyMMddHHmmss"))
    New-Item -ItemType Directory -Path $tempDir | Out-Null
    
    try {
        foreach ($f in $filesToInclude) {
            $dest = Join-Path $tempDir $f
            $parentDir = Split-Path $dest
            if (-not (Test-Path $parentDir)) { New-Item -ItemType Directory -Path $parentDir | Out-Null }
            Copy-Item $f -Destination $dest
        }
        Compress-Archive -Path "$tempDir\*" -DestinationPath $zipPath -Force
        Write-Host "Success! Zip created at: $zipPath" -ForegroundColor Green
    } finally {
        if (Test-Path $tempDir) { Remove-Item $tempDir -Recurse -Force }
    }
    Read-Host "`nPress Enter to return to menu"
}

function Sync-ServerBranch {
    Write-Host "--- Syncing Server Branch to GitHub ---" -ForegroundColor Yellow
    
    # 1. Check for uncommitted changes in main
    $status = git status --porcelain
    if ($status) {
        Write-Host "Error: You have uncommitted changes. Please commit or stash them first." -ForegroundColor Red
        Read-Host "Press Enter to continue"
        return
    }

    $currentBranch = git rev-parse --abbrev-ref HEAD
    if ($currentBranch -ne "main") {
        Write-Host "Warning: You are not on 'main'. Proceeding with current branch '$currentBranch' as source." -ForegroundColor Yellow
    }

    # 2. Get Ignore Patterns
    $ignorePatterns = Get-IgnorePatterns ".serverpackignore"
    if ($ignorePatterns.Count -eq 0) {
        Write-Host "Error: .serverpackignore not found or empty!" -ForegroundColor Red
        Read-Host "Press Enter to continue"
        return
    }

    # 3. Create a temporary orphan branch for the server
    Write-Host "Preparing server branch..." -ForegroundColor Cyan
    $tempBranch = "server-sync-temp"
    
    # Cleanup previous attempt if any
    git branch -D $tempBranch 2>$null
    
    # Create new branch from current
    git checkout -b $tempBranch
    
    try {
        Write-Host "Applying exclusions from .serverpackignore..." -ForegroundColor Cyan
        foreach ($pattern in $ignorePatterns) {
            $path = $pattern.Trim()
            if (Test-Path $path) {
                Write-Host "Removing: $path" -ForegroundColor Gray
                Remove-Item -Path $path -Recurse -Force
            }
        }

        # 4. Commit and Push
        git add -A
        $version = "unknown"
        if (Test-Path "instance.cfg") {
            $version = (Get-Content "instance.cfg" | Select-String "ExportVersion=").ToString().Split("=")[1]
        }
        
        git commit -m "Server Release v$version" --allow-empty
        
        Write-Host "Pushing to remote 'server' branch..." -ForegroundColor Cyan
        git push origin "$($tempBranch):server" --force
        
        Write-Host "Success! Server branch updated on GitHub." -ForegroundColor Green
    } catch {
        Write-Host "Error during sync: $($_.Exception.Message)" -ForegroundColor Red
    } finally {
        # 5. Switch back and cleanup
        git checkout $currentBranch
        git branch -D $tempBranch
    }

    Read-Host "`nPress Enter to return to menu"
}

function Change-PackVersion {
    Write-Host "--- Change Pack Version ---" -ForegroundColor Yellow
    $cfgPath = "instance.cfg"
    if (-not (Test-Path $cfgPath)) {
        Write-Host "Error: instance.cfg not found!" -ForegroundColor Red
        Read-Host "Press Enter to continue"
        return
    }

    $content = Get-Content $cfgPath
    $versionLine = $content | Select-String "^ExportVersion="
    $currentVersion = if ($versionLine) { $versionLine.ToString().Split("=")[1] } else { "Unknown" }

    Write-Host "Current modpack version: $currentVersion" -ForegroundColor Cyan
    $newVersion = Read-Host "Enter new version"
    
    if ([string]::IsNullOrWhiteSpace($newVersion)) { return }

    $updated = $false
    $newContent = $content | ForEach-Object {
        if ($_ -match "^ExportVersion=") { $updated = $true; "ExportVersion=$newVersion" }
        elseif ($_ -match "^ManagedPackVersionName=") { "ManagedPackVersionName=$newVersion" }
        else { $_ }
    }

    if ($updated) { $newContent | Set-Content $cfgPath }
    else { Add-Content -Path $cfgPath -Value "`nExportVersion=$newVersion" }
    
    Write-Host "Success! Version updated to $newVersion" -ForegroundColor Green
    Read-Host "`nPress Enter to return to menu"
}

do {
    Show-Menu
    $choice = Read-Host "Select an option (1-4)"
    switch ($choice) {
        "1" { Pack-Distributables }
        "2" { Change-PackVersion }
        "3" { Sync-ServerBranch }
        "4" { return }
    }
} while ($true)
