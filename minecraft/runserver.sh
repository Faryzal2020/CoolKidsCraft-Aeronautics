#!/bin/bash
# --- Cool Kids Craft Aeronautics Server Wrapper ---
# This wrapper automatically restarts the startserver.sh script if it crashes.

# Change to script directory
cd "$(dirname "$0")"

while true; do
    echo "[WRAPPER] Starting startserver.sh..."
    
    # Check if startserver.sh exists
    if [ ! -f "./startserver.sh" ]; then
        echo "[WRAPPER] Error: startserver.sh not found!"
        exit 1
    fi
    
    # Ensure startserver.sh is executable
    chmod +x ./startserver.sh
    
    # Execute startserver.sh
    ./startserver.sh
    err=$?
    
    if [ $err -eq 0 ]; then
        echo "[WRAPPER] Server stopped cleanly. Exiting wrapper."
        exit 0
    fi
    
    echo "[WRAPPER] Server exited with non-zero code: $err"
    echo "[WRAPPER] Restarting in 10 seconds... (Press Ctrl+C to cancel)"
    sleep 10
done
