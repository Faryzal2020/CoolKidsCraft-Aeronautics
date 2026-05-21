@echo off
:: --- Cool Kids Craft Aeronautics Server Start Script ---
:: This script is optimized for Windows environments.

setlocal EnableExtensions

:: --- Configuration ---
set "NEOFORGE_VERSION=21.1.228"
set "INSTALLER=neoforge-%NEOFORGE_VERSION%-installer.jar"
set "NEOFORGE_URL=https://maven.neoforged.net/releases/net/neoforged/neoforge/%NEOFORGE_VERSION%/neoforge-%NEOFORGE_VERSION%-installer.jar"

:: Change to script directory
cd /d "%~dp0"

:: Load environment variables from server.env if it exists
if exist server.env (
    echo [CKCA] Loading configurations from server.env
    for /f "usebackq tokens=* delims=" %%x in ("server.env") do (
        echo %%x | findstr /r "^[a-zA-Z_][a-zA-Z0-9_]*=" >nul
        if not errorlevel 1 (
            set "%%x"
        )
    )
)

:: --- Default Variables ---
if not defined CKCA_JAVA set "CKCA_JAVA=java"
if not defined CKCA_RESTART set "CKCA_RESTART=true"
if not defined CKCA_INSTALL_ONLY set "CKCA_INSTALL_ONLY=false"
if not defined CKCA_MAX_RAM set "CKCA_MAX_RAM=4G"
if not defined CKCA_MIN_RAM set "CKCA_MIN_RAM=4G"
if not defined CKCA_USE_AIKAR set "CKCA_USE_AIKAR=true"
if not defined CKCA_GC_TYPE set "CKCA_GC_TYPE=G1GC"
if not defined CKCA_AGREE_EULA set "CKCA_AGREE_EULA=false"

:: --- Checks ---
"%CKCA_JAVA%" -version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Java not found. Please install Java 21 or set CKCA_JAVA.
    exit /b 1
)

:: --- Pre-flight Mod Check ---
if exist mods (
    dir /b mods | findstr /i /r "iris oculus chloride fancymenu drippyloadingscreen entity_texture_features euphoriapatcher shouldersurfing" >nul
    if not errorlevel 1 goto :warn_client_mods
)
goto :skip_client_mods

:warn_client_mods
echo [WARN] Detected potential client-only mods in the 'mods' folder.
echo These may cause the server to crash. It is recommended to use a clean server export.
set "choice=n"
set /p choice="Continue anyway? (y/N): "
if /i not "%choice%"=="y" (
    echo [ERROR] Startup aborted by user due to client-side mods.
    exit /b 1
)

:skip_client_mods

:: --- Installer Logic ---
if not exist libraries (
    echo [CKCA] NeoForge libraries missing. Initializing installation...
    if not exist "%INSTALLER%" (
        echo [CKCA] Downloading NeoForge installer: %NEOFORGE_VERSION%
        powershell -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri '%NEOFORGE_URL%' -OutFile '%INSTALLER%'"
    )

    echo [CKCA] Running NeoForge installer...
    "%CKCA_JAVA%" -jar "%INSTALLER%" -installServer
    echo [CKCA] Installation complete.
)

:: --- File Generation ---
if not exist server.properties (
    echo [CKCA] Generating default server.properties
    (
        echo allow-flight=true
        echo motd=Cool Kids Craft Aeronautics
        echo max-tick-time=180000
    ) > server.properties
)

if not exist user_jvm_args.txt (
    echo [CKCA] Generating user_jvm_args.txt
    echo # Add your custom JVM arguments here > user_jvm_args.txt
)

:: EULA Check/Auto-Accept
if not exist eula.txt (
    if "%CKCA_AGREE_EULA%"=="true" (
        echo [CKCA] Automatically accepting EULA...
        echo eula=true> eula.txt
    ) else (
        echo [WARN] EULA not accepted. Please set CKCA_AGREE_EULA=true in server.env or manually edit eula.txt
    )
) else (
    findstr /i "eula=true" eula.txt >nul
    if errorlevel 1 (
        if "%CKCA_AGREE_EULA%"=="true" (
            echo [CKCA] Automatically accepting EULA...
            echo eula=true> eula.txt
        ) else (
            echo [WARN] EULA not accepted. Please set CKCA_AGREE_EULA=true in server.env or manually edit eula.txt
        )
    )
)

if "%CKCA_INSTALL_ONLY%"=="true" (
    echo [CKCA] Installation only mode complete. Exiting.
    exit /b 0
)

:: --- JVM Options Construction ---
set "JVM_OPTS=-Xms%CKCA_MIN_RAM% -Xmx%CKCA_MAX_RAM%"

if "%CKCA_GC_TYPE%"=="ZGC" (
    set "JVM_OPTS=%JVM_OPTS% -XX:+UseZGC -XX:+ZGenerational"
) else if "%CKCA_GC_TYPE%"=="Shenandoah" (
    set "JVM_OPTS=%JVM_OPTS% -XX:+UseShenandoahGC"
) else (
    :: Default to G1GC
    set "JVM_OPTS=%JVM_OPTS% -XX:+UseG1GC"
    if "%CKCA_USE_AIKAR%"=="true" (
        set "JVM_OPTS=%JVM_OPTS% -XX:+UnlockExperimentalVMOptions -XX:MaxGCPauseMillis=200 -XX:+UnlockDiagnosticVMOptions -XX:+DisableExplicitGC -XX:+AlwaysPreTouch -XX:G1NewSizePercent=30 -XX:G1MaxNewSizePercent=40 -XX:G1HeapRegionSize=8M -XX:G1ReservePercent=20 -XX:G1HeapWastePercent=5 -XX:G1MixedGCCountTarget=4 -XX:InitiatingHeapOccupancyPercent=15 -XX:G1MixedGCLiveThresholdPercent=90 -XX:G1RSetUpdatingPauseTimePercent=5 -XX:SurvivorRatio=32 -XX:+PerfDisableSharedMem -XX:MaxTenuringThreshold=1"
    )
)

if not "%CKCA_EXTRA_JVM_ARGS%"=="" (
    set "JVM_OPTS=%JVM_OPTS% %CKCA_EXTRA_JVM_ARGS%"
)

:: --- Start Loop ---
:loop
echo [CKCA] Starting server with %CKCA_MAX_RAM% RAM...
"%CKCA_JAVA%" %JVM_OPTS% @user_jvm_args.txt @libraries\net\neoforged\neoforge\%NEOFORGE_VERSION%\win_args.txt nogui

set "server_exit=%ERRORLEVEL%"

if %server_exit% neq 0 (
    echo [CKCA] Server crashed/exited with non-zero code %server_exit%. Exiting script.
    exit /b %server_exit%
)

if /i "%CKCA_RESTART%"=="false" (
    echo [CKCA] Automatic restart disabled. Exiting.
    exit /b 0
)

echo [CKCA] Server stopped cleanly. Restarting in 10 seconds... (Ctrl+C to cancel)
timeout /t 10
goto loop
