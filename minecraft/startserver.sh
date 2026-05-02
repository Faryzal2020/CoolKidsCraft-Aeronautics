#!/bin/bash
# --- Cool Kids Craft Aeronautics Server Start Script ---
# This script is optimized for Ubuntu/Linux environments.

# Exit on error, undefined vars, and pipe failures
set -euo pipefail

# --- Configuration ---
NEOFORGE_VERSION="21.1.228"
INSTALLER="neoforge-$NEOFORGE_VERSION-installer.jar"
NEOFORGE_URL="https://maven.neoforged.net/releases/net/neoforged/neoforge/$NEOFORGE_VERSION/neoforge-$NEOFORGE_VERSION-installer.jar"

# --- ANSI Colors ---
BLUE='\033[0;34m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

log() { printf "${BLUE}[CKCA]${NC} %b\n" "$1"; }
warn() { printf "${YELLOW}[WARN]${NC} %b\n" "$1"; }
error() { printf "${RED}[ERROR]${NC} %b\n" "$1"; exit 1; }

# Change to script directory
cd "$(dirname "$0")"

# Load environment variables from server.env if it exists
if [ -f server.env ]; then
    log "Loading configurations from server.env"
    set -a
    source server.env
    set +a
fi

# --- Default Variables ---
JAVA_CMD="${CKCA_JAVA:-java}"
RESTART="${CKCA_RESTART:-true}"
INSTALL_ONLY="${CKCA_INSTALL_ONLY:-false}"
MAX_RAM="${CKCA_MAX_RAM:-4G}"
MIN_RAM="${CKCA_MIN_RAM:-4G}"
USE_AIKAR="${CKCA_USE_AIKAR:-true}"
GC_TYPE="${CKCA_GC_TYPE:-G1GC}"
AGREE_EULA="${CKCA_AGREE_EULA:-false}"

# --- Checks ---
if ! command -v "$JAVA_CMD" >/dev/null 2>&1; then
    error "Java not found. Please install Java 21 or set CKCA_JAVA."
fi

JAVA_VERSION=$("$JAVA_CMD" -fullversion 2>&1 | awk -F '"' '/version/ {print $2}' | cut -d'.' -f1)
if [[ -z "$JAVA_VERSION" ]] || [ "$JAVA_VERSION" -lt 21 ]; then
    error "Minecraft 1.21 requires Java 21. Found Java ${JAVA_VERSION:-unknown}."
fi

# --- Installer Logic ---
if [ ! -d libraries ]; then
    log "NeoForge libraries missing. Initializing installation..."
    if [ ! -f "$INSTALLER" ]; then
        log "Downloading NeoForge installer: $NEOFORGE_VERSION"
        if command -v wget >/dev/null 2>&1; then
            wget -q --show-progress -O "$INSTALLER" "$NEOFORGE_URL"
        elif command -v curl >/dev/null 2>&1; then
            curl -L -o "$INSTALLER" "$NEOFORGE_URL"
        else
            error "Neither wget nor curl found. Cannot download installer."
        fi
    fi

    log "Running NeoForge installer..."
    "$JAVA_CMD" -jar "$INSTALLER" -installServer > /dev/null
    log "${GREEN}Installation complete.${NC}"
fi

# --- File Generation ---
if [ ! -f server.properties ]; then
    log "Generating default server.properties"
    printf "allow-flight=true\nmotd=Cool Kids Craft Aeronautics\nmax-tick-time=180000" > server.properties
fi

if [ ! -f user_jvm_args.txt ]; then
    log "Generating user_jvm_args.txt"
    printf "# Add your custom JVM arguments here\n" > user_jvm_args.txt
fi

# EULA Check/Auto-Accept
if [ ! -f eula.txt ] || ! grep -q "eula=true" eula.txt; then
    if [ "$AGREE_EULA" = "true" ]; then
        log "Automatically accepting EULA..."
        echo "eula=true" > eula.txt
    else
        warn "EULA not accepted. Please set CKCA_AGREE_EULA=true in server.env or manually edit eula.txt"
    fi
fi

if [ "$INSTALL_ONLY" = "true" ]; then
    log "${GREEN}Installation only mode complete. Exiting.${NC}"
    exit 0
fi

# --- JVM Options Construction ---
JVM_OPTS="-Xms${MIN_RAM} -Xmx${MAX_RAM}"

case "$GC_TYPE" in
    "ZGC")
        JVM_OPTS="$JVM_OPTS -XX:+UseZGC -XX:+ZGenerational"
        ;;
    "Shenandoah")
        JVM_OPTS="$JVM_OPTS -XX:+UseShenandoahGC"
        ;;
    *) # Default to G1GC
        JVM_OPTS="$JVM_OPTS -XX:+UseG1GC"
        if [ "$USE_AIKAR" = "true" ]; then
            JVM_OPTS="$JVM_OPTS -XX:+UnlockExperimentalVMOptions -XX:MaxGCPauseMillis=200 -XX:+UnlockDiagnosticVMOptions -XX:+DisableExplicitGC -XX:+AlwaysPreTouch -XX:G1NewSizePercent=30 -XX:G1MaxNewSizePercent=40 -XX:G1HeapRegionSize=8M -XX:G1ReservePercent=20 -XX:G1HeapWastePercent=5 -XX:G1MixedGCCountTarget=4 -XX:InitiatingHeapOccupancyPercent=15 -XX:G1MixedGCLiveThresholdPercent=90 -XX:G1RSetUpdatingPauseTimePercent=5 -XX:SurvivorRatio=32 -XX:+PerfDisableSharedMem -XX:MaxTenuringThreshold=1"
        fi
        ;;
esac

if [ -n "${CKCA_EXTRA_JVM_ARGS:-}" ]; then
    JVM_OPTS="$JVM_OPTS $CKCA_EXTRA_JVM_ARGS"
fi

# --- Start Loop ---
while true; do
    log "Starting server with ${MAX_RAM} RAM..."
    "$JAVA_CMD" $JVM_OPTS @user_jvm_args.txt @libraries/net/neoforged/neoforge/$NEOFORGE_VERSION/unix_args.txt nogui

    if [ "$RESTART" = "false" ]; then
        log "Automatic restart disabled. Exiting."
        exit 0
    fi

    log "${YELLOW}Server stopped. Restarting in 10 seconds... (Ctrl+C to cancel)${NC}"
    sleep 10
done
