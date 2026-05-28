# compile_hnn_mobs.ps1
# This script converts cataclysm_mobs_hnn.csv into Hostile Neural Networks JSON data models.

$csvPath = "cataclysm_mobs_hnn.csv"
$outputDir = "minecraft/kubejs/data/hostilenetworks/data_models"

if (-not (Test-Path $csvPath)) {
    Write-Error "CSV template '$csvPath' not found!"
    exit 1
}

# Ensure output directory exists
if (-not (Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
}

Write-Host "Reading $csvPath..."
$mobs = Import-Csv -Path $csvPath

foreach ($mob in $mobs) {
    if ([string]::IsNullOrWhiteSpace($mob.entity_id)) { continue }

    # Extract short name for filename (e.g. 'ignis' from 'cataclysm:ignis')
    $filename = $mob.entity_id.Split(":")[-1]
    $jsonPath = Join-Path $outputDir "$filename.json"
    
    Write-Host "Generating HNN JSON: $filename.json"

    # Build fabricator drops list
    $fabricatorDrops = @()
    if (-not [string]::IsNullOrWhiteSpace($mob.fabricator_drops)) {
        $dropEntries = $mob.fabricator_drops -split ";"
        foreach ($entry in $dropEntries) {
            $parts = $entry -split ","
            if ($parts.Count -ge 2) {
                $dropId = $parts[0].Trim()
                $dropCount = [int]$parts[1].Trim()
                
                $dropObj = [ordered]@{
                    id = $dropId
                }
                
                # Check optional parameter
                if ($parts.Count -ge 3 -and $parts[2].Trim().ToLower() -eq "true") {
                    $dropObj.Add("optional", $true)
                }
                
                $dropObj.Add("count", $dropCount)
                $fabricatorDrops += $dropObj
            }
        }
    }

    # Construct the JSON object hierarchy
    $jsonObj = [ordered]@{
        "neoforge:conditions" = @(
            [ordered]@{
                type = "neoforge:mod_loaded"
                modid = "cataclysm"
            }
        )
        entity = $mob.entity_id
        variants = @()
        name = [ordered]@{
            translate = $mob.name_translate
            color = $mob.name_color
        }
        display = [ordered]@{
            y_offset = [double]$mob.display_y_offset
            scale = [double]$mob.display_scale
        }
        sim_cost = [int]$mob.sim_cost
        input = [ordered]@{
            item = "hostilenetworks:prediction_matrix"
        }
        base_drop = [ordered]@{
            id = $mob.base_drop_id
            count = [int]$mob.base_drop_count
        }
        trivia = $mob.trivia_key
        fabricator_drops = $fabricatorDrops
    }

    # Convert to JSON with nice formatting (4 spaces)
    $jsonText = $jsonObj | ConvertTo-Json -Depth 5
    
    # Write to file
    $jsonText | Out-File -FilePath $jsonPath -Encoding utf8 -Force
}

Write-Host "Done! Successfully compiled JSON files to: $outputDir"
