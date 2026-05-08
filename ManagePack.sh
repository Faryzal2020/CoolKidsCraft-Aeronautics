#!/bin/bash

# ManagePack.sh
# Modpack Management Script for Cool Kids Craft - Aeronautics (macOS/Linux version)
export GIT_ASK_YESNO="false"

# Colors
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)
CONFIG_FILE="$SCRIPT_DIR/instance.cfg"

show_menu() {
    clear
    echo -e "${CYAN}==============================${NC}"
    echo -e "${CYAN}   Pack Management Utility${NC}"
    echo -e "${CYAN}==============================${NC}"
    echo "1. Pack Client Distributable"
    echo "2. Change Pack Version"
    echo "3. Sync Server Branch (GitHub)"
    echo "4. Exit"
    echo ""
}

get_config_value() {
    local key=$1
    if [[ ! -f "$CONFIG_FILE" ]]; then
        return 1
    fi
    # Use grep to find the line and sed to extract the value
    local value=$(grep "^$key=" "$CONFIG_FILE" | head -n 1 | cut -d'=' -f2- | tr -d '\r' | xargs)
    echo "$value"
}

set_config_value() {
    local key=$1
    local value=$2
    if [[ ! -f "$CONFIG_FILE" ]]; then
        echo "Error: instance.cfg not found."
        return 1
    fi

    if grep -q "^$key=" "$CONFIG_FILE"; then
        # Replace existing key
        # Using a temporary file for safety with sed on macOS/BSD
        sed -i '' "s/^$key=.*/$key=$value/" "$CONFIG_FILE"
    else
        # Append new key
        echo "$key=$value" >> "$CONFIG_FILE"
    fi
}

get_ignore_patterns() {
    local path=$1
    if [[ -f "$path" ]]; then
        # Read lines, remove comments and empty lines
        grep -v '^#' "$path" | grep -v '^$' | tr -d '\r'
    fi
}

pack_distributables() {
    local name=$(get_config_value "ExportName")
    if [[ -z "$name" ]]; then name=$(get_config_value "name"); fi
    if [[ -z "$name" ]]; then name="Modpack"; fi
    
    local version=$(get_config_value "ExportVersion")
    if [[ -z "$version" ]]; then version="0.0.0"; fi
    
    # Sanitize name for filename
    local safe_name=$(echo "$name" | tr ' ' '_')
    local zip_name="${safe_name}-v${version}.zip"
    local dist_dir="$SCRIPT_DIR/dist"
    local temp_dir="$SCRIPT_DIR/tmp_pack"
    
    mkdir -p "$dist_dir"
    rm -rf "$temp_dir"
    mkdir -p "$temp_dir"

    echo -e "${YELLOW}--- Packing Client Distributables ($name v$version) ---${NC}"
    
    # 1. Get ignore patterns
    local system_files=(".git" "ManagePack.ps1" "ManagePack.sh" ".serverpackignore" ".gitignore" ".packignore" "dist" "tmp" "tmp_pack")
    
    echo "Staging files..."
    # Copy all files from root to tempDir, excluding system files
    # We use a loop or find to avoid copying the script itself and other meta files
    rsync -a --exclude-from=<(printf "%s\n" "${system_files[@]}") "$SCRIPT_DIR/" "$temp_dir/"

    # 2. Apply .packignore patterns
    local patterns=$(get_ignore_patterns "$SCRIPT_DIR/.packignore")
    if [[ -n "$patterns" ]]; then
        while IFS= read -r pattern; do
            if [[ -n "$pattern" ]]; then
                echo "Excluding: $pattern"
                # Using find to handle wildcards and recursive deletion in temp_dir
                # Quote the path pattern to handle spaces
                find "$temp_dir" -path "$temp_dir/$pattern" -print0 2>/dev/null | xargs -0 rm -rf
            fi
        done <<< "$patterns"
    fi

    echo "Compressing to $zip_name..."
    local output_path="$dist_dir/$zip_name"
    rm -f "$output_path"
    
    (cd "$temp_dir" && zip -r "$output_path" . > /dev/null)
    
    echo "Cleaning up..."
    rm -rf "$temp_dir"
    
    echo -e "${GREEN}Success! Pack created at: $output_path${NC}"
    read -p "Press Enter to continue..."
}

change_version() {
    local current_version=$(get_config_value "ExportVersion")
    echo -n "Enter new version (Current: $current_version): "
    read new_version
    if [[ -n "$new_version" ]]; then
        set_config_value "ExportVersion" "$new_version"
        echo -e "${GREEN}Version updated to $new_version in instance.cfg${NC}"
    fi
    read -p "Press Enter to continue..."
}

sync_server_branch() {
    echo -e "${YELLOW}--- Syncing Server Branch to GitHub ---${NC}"
    
    if [[ ! -d ".git" ]]; then
        echo -e "${RED}Error: Not a git repository. Please initialize git first.${NC}"
        read -p "Press Enter to continue..."
        return
    fi

    # 1. Create temporary branch
    echo "Preparing server branch..."
    git checkout -B server-sync-temp
    
    # 2. Apply exclusions from .serverpackignore
    echo "Applying exclusions from .serverpackignore..."
    local patterns=$(get_ignore_patterns "$SCRIPT_DIR/.serverpackignore")
    local system_files=(".git" "ManagePack.ps1" "ManagePack.sh" ".serverpackignore" ".gitignore" ".packignore")
    
    if [[ -n "$patterns" ]]; then
        while IFS= read -r pattern; do
            if [[ -n "$pattern" ]]; then
                # Find matching files/dirs using print0 to handle spaces
                # SAFETY CHECK: Don't delete system files
                find . -path "./$pattern" -print0 2>/dev/null | while IFS= read -r -d '' target; do
                    local base_target=$(basename "$target")
                    local is_system=false
                    for sys in "${system_files[@]}"; do
                        if [[ "$base_target" == "$sys" ]]; then is_system=true; break; fi
                    done
                    
                    if [[ "$is_system" == false && "$target" != "./.git"* ]]; then
                        echo "Removing: $target"
                        rm -rf "$target"
                    fi
                done
            fi
        done <<< "$patterns"
    fi
    
    # 3. Commit and push
    echo "Pushing to remote 'server' branch..."
    git add .
    git commit -m "Server sync: $(date '+%Y-%m-%d %H:%M:%S')"
    git push origin server-sync-temp:server --force
    
    # 4. Switch back
    echo "Restoring main branch..."
    git checkout main
    git branch -D server-sync-temp
    
    echo -e "${GREEN}Success! Server branch updated on GitHub.${NC}"
    read -p "Press Enter to continue..."
}

# Main Loop
while true; do
    show_menu
    echo -n "Select an option (1-4): "
    read choice
    
    case "$choice" in
        1) pack_distributables ;;
        2) change_version ;;
        3) sync_server_branch ;;
        4) break ;;
        *) echo -e "${RED}Invalid option.${NC}"; sleep 1 ;;
    esac
done
