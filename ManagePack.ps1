# ManagePack.ps1
# Modpack Management Script for Cool Kids Craft - Aeronautics

function Show-Menu {
    Clear-Host
    Write-Host "==============================" -ForegroundColor Cyan
    Write-Host "   Pack Management Utility" -ForegroundColor Cyan
    Write-Host "==============================" -ForegroundColor Cyan
    Write-Host "1. Pack Distributables"
    Write-Host "2. Change Pack Version"
    Write-Host "3. Exit"
    Write-Host ""
}

function Pack-Distributables {
    Write-Host "--- Packing Distributables ---" -ForegroundColor Yellow
    
    $zipName = "Cool Kids Craft - Aeronautics.zip"
    $distDir = "dist"
    $zipPath = Join-Path $PWD.Path "$distDir\$zipName"
    
    if (-not (Test-Path $distDir)) {
        Write-Host "Creating dist folder..."
        New-Item -ItemType Directory -Path $distDir | Out-Null
    }

    Write-Host "Fetching file list (respecting .gitignore)..."
    # Get files not ignored by git
    try {
        $gitFiles = git ls-files --cached --others --exclude-standard
    } catch {
        Write-Host "Error: Git not found or not a git repository." -ForegroundColor Red
        return
    }
    
    # Get .packignore patterns
    $packIgnorePath = ".packignore"
    $packIgnorePatterns = @()
    if (Test-Path $packIgnorePath) {
        Write-Host "Applying .packignore filters..."
        $packIgnorePatterns = Get-Content $packIgnorePath | Where-Object { $_ -and -not $_.StartsWith("#") }
    }

    $filesToInclude = @()
    foreach ($file in $gitFiles) {
        $ignored = $false
        # Normalize file path for matching (forward slashes for consistency)
        $normFile = $file.Replace("\", "/")
        
        foreach ($pattern in $packIgnorePatterns) {
            $p = $pattern.Replace("\", "/").Trim("/")
            # Check if file starts with pattern (folder) or exactly matches (file)
            if ($normFile -eq $p -or $normFile.StartsWith("$p/")) {
                $ignored = $true
                break
            }
        }
        
        # Additional manual check for 'dist' folder just in case
        if ($normFile.StartsWith("dist/")) { $ignored = $true }

        if (-not $ignored) {
            $filesToInclude += $file
        }
    }

    if ($filesToInclude.Count -eq 0) {
        Write-Host "No files to pack!" -ForegroundColor Red
        Read-Host "Press Enter to continue"
        return
    }

    if (Test-Path $zipPath) {
        Write-Host "Removing existing zip..."
        Remove-Item $zipPath -Force
    }

    Write-Host "Preparing zip content ($($filesToInclude.Count) files)..."
    
    # Using a temporary directory to ensure correct structure and avoid Compress-Archive limitations
    $tempDirName = "build_temp_" + (Get-Date -Format "yyyyMMddHHmmss")
    $tempDir = Join-Path $env:TEMP $tempDirName
    New-Item -ItemType Directory -Path $tempDir | Out-Null
    
    try {
        foreach ($f in $filesToInclude) {
            $dest = Join-Path $tempDir $f
            $parentDir = Split-Path $dest
            if (-not (Test-Path $parentDir)) {
                New-Item -ItemType Directory -Path $parentDir | Out-Null
            }
            Copy-Item $f -Destination $dest
        }

        Write-Host "Compressing files into $zipName..."
        Compress-Archive -Path "$tempDir\*" -DestinationPath $zipPath -Force
        Write-Host "Success! Zip created at: $zipPath" -ForegroundColor Green
    } catch {
        Write-Host "Error during packing: $($_.Exception.Message)" -ForegroundColor Red
    } finally {
        if (Test-Path $tempDir) {
            Write-Host "Cleaning up..."
            Remove-Item $tempDir -Recurse -Force
        }
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
    $currentVersion = "Unknown"
    if ($versionLine) {
        $currentVersion = $versionLine.ToString().Split("=")[1]
    }

    Write-Host "Current modpack version: $currentVersion" -ForegroundColor Cyan
    $newVersion = Read-Host "Enter new version (e.g. 0.2, 0.1-hotfix-1)"
    
    if ([string]::IsNullOrWhiteSpace($newVersion)) {
        Write-Host "Version change cancelled."
        Read-Host "Press Enter to continue"
        return
    }

    $updated = $false
    $newContent = $content | ForEach-Object {
        if ($_ -match "^ExportVersion=") {
            $updated = $true
            "ExportVersion=$newVersion"
        } elseif ($_ -match "^ManagedPackVersionName=") {
            "ManagedPackVersionName=$newVersion"
        } else {
            $_
        }
    }

    if ($updated) {
        $newContent | Set-Content $cfgPath
        Write-Host "Success! Version updated to $newVersion in $cfgPath" -ForegroundColor Green
    } else {
        # If ExportVersion wasn't found, try to just add it
        Add-Content -Path $cfgPath -Value "`nExportVersion=$newVersion"
        Write-Host "ExportVersion was missing, added it as $newVersion" -ForegroundColor Green
    }
    
    Read-Host "`nPress Enter to return to menu"
}

# Main Execution Loop
do {
    Show-Menu
    $choice = Read-Host "Select an option (1-3)"
    
    switch ($choice) {
        "1" { Pack-Distributables }
        "2" { Change-PackVersion }
        "3" { 
            Write-Host "Exiting..." -ForegroundColor Gray
            return 
        }
        default { 
            Write-Host "Invalid selection '$choice'. Please enter 1, 2, or 3." -ForegroundColor Red
            Start-Sleep -Seconds 1
        }
    }
} while ($true)
