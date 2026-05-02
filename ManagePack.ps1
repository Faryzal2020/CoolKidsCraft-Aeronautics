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
function Get-ConfigValue {
    param($key)
    if (-not (Test-Path "instance.cfg")) { return $null }
    $config = Get-Content "instance.cfg"
    $line = $config | Where-Object { $_.StartsWith("$key=") }
    if ($line) {
        return $line.Split("=")[1].Trim()
    }
    return $null
}

function Set-ConfigValue {
    param($key, $value)
    if (-not (Test-Path "instance.cfg")) { return }
    $config = Get-Content "instance.cfg"
    $newConfig = @()
    $found = $false
    foreach ($line in $config) {
        if ($line.StartsWith("$key=")) {
            $newConfig += "$key=$value"
            $found = $true
        } else {
            $newConfig += $line
        }
    }
    if (-not $found) {
        $newConfig += "$key=$value"
    }
    $newConfig | Set-Content "instance.cfg"
}

function Pack-Distributables {
    $name = Get-ConfigValue "ExportName"
    if (-not $name) { $name = Get-ConfigValue "name" }
    if (-not $name) { $name = "Modpack" }
    $version = Get-ConfigValue "ExportVersion"
    if (-not $version) { $version = "0.0.0" }
    
    $zipName = "$($name -replace ' ', '_')-v$version.zip"
    $distDir = Join-Path $PSScriptRoot "dist"
    $tempDir = Join-Path $PSScriptRoot "tmp_pack"
    
    if (-not (Test-Path $distDir)) { New-Item -ItemType Directory -Path $distDir | Out-Null }
    if (Test-Path $tempDir) { Remove-Item -Path $tempDir -Recurse -Force }
    New-Item -ItemType Directory -Path $tempDir | Out-Null

    Write-Host "--- Packing Client Distributables ($name v$version) ---" -ForegroundColor Yellow
    
    # 1. Get ignore patterns
    $patterns = Get-IgnorePatterns ".packignore"
    $systemFiles = @(".git", "ManagePack.ps1", ".serverpackignore", ".gitignore", ".packignore", "dist", "tmp", "tmp_pack")
    
    Write-Host "Staging files..."
    # Copy all files from root to tempDir, then remove ignored ones
    Get-ChildItem -Path $PSScriptRoot -Exclude $systemFiles | Copy-Item -Destination $tempDir -Recurse -Force
    
    foreach ($pattern in $patterns) {
        $fullPattern = Join-Path $tempDir $pattern
        if (Test-Path $fullPattern) {
            Write-Host "Excluding: $pattern"
            Remove-Item -Path $fullPattern -Recurse -Force -ErrorAction SilentlyContinue
        }
    }

    Write-Host "Compressing to $zipName..."
    $outputPath = Join-Path $distDir $zipName
    if (Test-Path $outputPath) { Remove-Item $outputPath }
    
    Compress-Archive -Path "$tempDir\*" -DestinationPath $outputPath -Force
    
    Write-Host "Cleaning up..."
    Remove-Item -Path $tempDir -Recurse -Force
    
    Write-Host "Success! Pack created at: $outputPath" -ForegroundColor Green
    Pause
}

function Change-Version {
    $currentVersion = Get-ConfigValue "ExportVersion"
    $newVersion = Read-Host "Enter new version (Current: $currentVersion)"
    if ($newVersion) {
        Set-ConfigValue "ExportVersion" $newVersion
        Write-Host "Version updated to $newVersion in instance.cfg" -ForegroundColor Green
    }
    Pause
}


function Sync-ServerBranch {
    Write-Host "--- Syncing Server Branch to GitHub ---" -ForegroundColor Yellow
    
    if (-not (Test-Path ".git")) {
        Write-Host "Error: Not a git repository. Please initialize git first." -ForegroundColor Red
        Pause
        return
    }

    # 1. Create temporary branch
    Write-Host "Preparing server branch..."
    git checkout -B server-sync-temp
    
    # 2. Get ignore patterns
    $patterns = Get-IgnorePatterns ".serverpackignore"
    
    # 3. Remove ignored files
    Write-Host "Applying exclusions from .serverpackignore..."
    # CRITICAL SAFETY CHECK: Never delete project metadata or this script!
    $systemFiles = @(".git", "ManagePack.ps1", ".serverpackignore", ".gitignore", ".packignore")
    
    foreach ($pattern in $patterns) {
        # Get-Item correctly handles wildcards and folder paths
        $targets = Get-Item -Path $pattern -ErrorAction SilentlyContinue
        foreach ($target in $targets) {
            # SAFETY CHECK: Never delete critical project files or the git directory
            if ($systemFiles -contains $target.Name -or $target.FullName -like "*\.git\*") {
                continue
            }
            
            if (Test-Path $target.FullName) {
                Write-Host "Removing: $($target.FullName)"
                Remove-Item -Path $target.FullName -Recurse -Force -ErrorAction SilentlyContinue
            }
        }
    }
    
    # 4. Commit and push
    Write-Host "Pushing to remote 'server' branch..."
    git add .
    git commit -m "Server sync: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
    git push origin server-sync-temp:server --force
    
    # 5. Switch back
    Write-Host "Restoring main branch..."
    git checkout main
    git branch -D server-sync-temp
    
    Write-Host "Success! Server branch updated on GitHub." -ForegroundColor Green
    Pause
}

# Main Loop
do {
    Show-Menu
    $choice = Read-Host "Select an option (1-4)"
    
    switch ($choice) {
        "1" { Pack-Distributables }
        "2" { Change-Version }
        "3" { Sync-ServerBranch }
        "4" { break }
        default { Write-Host "Invalid option." -ForegroundColor Red; Start-Sleep -Seconds 1 }
    }
} while ($choice -ne "4")
