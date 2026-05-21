@echo off
:: --- Cool Kids Craft Aeronautics Server Wrapper ---
:: This wrapper automatically restarts the startserver.bat script if it crashes.

cd /d "%~dp0"

:loop
echo [WRAPPER] Starting startserver.bat...
call startserver.bat
set "err=%ERRORLEVEL%"

if %err% equ 0 (
    echo [WRAPPER] Server stopped cleanly. Exiting wrapper.
    pause
    exit /b 0
)

echo [WRAPPER] Server exited with non-zero code: %err%
echo [WRAPPER] Restarting in 10 seconds... (Press Ctrl+C to cancel)
timeout /t 10
goto loop
