# Cool Kids Craft - Aeronautics

## Follow these steps

### 1. Prerequisite: Install Prism Launcher
You must have **Prism Launcher** installed before using these installers.
- **Windows**: [Download Prism Launcher](https://prismlauncher.org/download/windows/)
- **macOS**: [Download Prism Launcher](https://prismlauncher.org/download/macos/)
- **Linux**: [Download Prism Launcher](https://prismlauncher.org/download/linux/)
---

### 2. Installation

Choose the installer for your Operating System:

#### Windows
1. Download **`CKCA-Windows-Installer.bat`** from the releases page](https://github.com/Faryzal2020/CoolKidsCraft-Aeronautics/releases/tag/Installer-script).
2. Double-click the file to run it.
3. If prompted by Windows SmartScreen, click *More Info* -> *Run Anyway*.
4. The installer will automatically:
   - Check for Prism Launcher.
   - Install **Git** via winget (if missing).
   - Clone the modpack repository.
   - Create a **Desktop Shortcut** for you.

#### macOS / Linux
1. Download **`CKCA-MacOS-Linux-Installer.sh`** from the releases page](https://github.com/Faryzal2020/CoolKidsCraft-Aeronautics/releases/tag/Installer-script).
2. Open your terminal.
3. Navigate to the folder where you downloaded the file.
4. Run the script: `bash CKCA-MacOS-Linux-Installer.sh`
5. The installer will automatically:
   - Setup the modpack in your Prism Launcher instances folder.
   - Create a **Desktop Shortcut** (`.command` on Mac, `.desktop` on Linux).

---

### 3. How to Play & Update
- **To Play**: Simply double-click the **Cool Kids Craft - Aeronautics** shortcut on your Desktop.
- **To Update**: Every time you use the desktop shortcut, it will automatically check for updates via Git and apply them before launching the game. This ensures you are always on the latest version!

---

## 🛠️ Manual Management (For Developers)
If you are contributing to the pack, use the included `ManagePack.ps1` script (Windows) to manage versions and sync with the server branch.
