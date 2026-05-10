@echo off
setlocal enabledelayedexpansion

:: Set working directory to script location
pushd "%~dp0"

echo.
echo ===========================================
echo    Checking for Modpack Updates...
echo ===========================================
echo.

:: Prevent Git from hanging on interactive prompts
set GIT_ASK_YESNO=false

:: Check if Prism Launcher is running (common cause of locks)
tasklist /FI "IMAGENAME eq prismlauncher.exe" 2>NUL | find /I /N "prismlauncher.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo [WARNING] Prism Launcher is currently running. 
    echo           This may cause file lock errors during update.
    echo.
)

:: Clear potential lock files
if exist ".git\index.lock" (
    echo [INFO] Removing stale git index lock...
    del /f /q ".git\index.lock" 2>nul
)

set "retryCount=0"
set "maxRetries=5"

:retry_loop
set /a "retryCount+=1"

if %retryCount% gtr 1 (
    echo.
    echo [RETRY] Attempt %retryCount% of %maxRetries%...
    timeout /t 2 /nobreak >nul
)

:: Run git fetch
echo [1/2] Fetching updates from GitHub...
git fetch --all --prune
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Git fetch failed. A file may be locked by another process.
    if %retryCount% lss %maxRetries% goto retry_loop
    goto update_failed
)

:: Run git reset
echo [2/2] Applying updates (Hard Reset to origin/main)...
git reset --hard origin/main
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Git reset failed.
    if %retryCount% lss %maxRetries% goto retry_loop
    goto update_failed
)

echo.
echo ===========================================
echo    Update Successful!
echo ===========================================
echo Your modpack is now up to date.
echo.
pause
popd
exit /b 0

:update_failed
echo.
echo ===========================================
echo    Update Failed!
echo ===========================================
echo Could not sync with GitHub. 
echo This usually happens if another program (like VS Code or Prism) is locking the files.
echo.
pause
popd
exit /b 1
