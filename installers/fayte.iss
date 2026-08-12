; Fayte Launcher installer.
;
; Build:
;   ISCC.exe /DSourceDir="<path to the extracted FayteLauncher folder>" installers\fayte.iss
;
; SourceDir must point at the folder that contains Launcher.exe -- that is, the
; FayteLauncher directory from inside the launcher build, not its parent.
;
; Installs per-user into %LOCALAPPDATA%\Programs\Fayte. That location is
; deliberate: the launcher rewrites its own files when it updates, so it must
; land somewhere writable without elevation. Program Files would break
; self-updating unless the whole thing ran as administrator.

#ifndef SourceDir
  #error Pass the payload path with /DSourceDir="..."
#endif

#define AppName        "Fayte"
#define AppVersion     "1.0.0"
#define AppPublisher   "Fayte Studios"
#define AppURL         "https://www.faytestudios.com"
#define AppExe         "Launcher.exe"

[Setup]
AppId={{02636B36-A6D1-4DA3-A249-0858B5DC4299}
AppName={#AppName}
AppVersion={#AppVersion}
AppVerName={#AppName}
AppPublisher={#AppPublisher}
AppPublisherURL={#AppURL}
AppSupportURL={#AppURL}
AppUpdatesURL={#AppURL}

; Per-user install: no UAC prompt, and the install directory stays writable so
; the launcher can patch itself.
PrivilegesRequired=lowest
PrivilegesRequiredOverridesAllowed=dialog
DefaultDirName={localappdata}\Programs\{#AppName}
DefaultGroupName={#AppName}
DisableProgramGroupPage=yes
UninstallDisplayName={#AppName}
UninstallDisplayIcon={app}\{#AppExe}

; These are self-contained win-x64 builds. x64compatible also covers ARM64
; machines running x64 under emulation.
ArchitecturesAllowed=x64compatible
ArchitecturesInstallIn64BitMode=x64compatible

LicenseFile=fayte-license.txt
WizardStyle=modern
Compression=lzma2/max
SolidCompression=yes
OutputDir=..\dist-installers
OutputBaseFilename=FayteSetup

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"

[Tasks]
Name: "desktopicon"; Description: "Create a desktop shortcut"; GroupDescription: "Shortcuts:"

[Files]
; Debug symbols are excluded -- players never need them and they are large.
Source: "{#SourceDir}\*"; DestDir: "{app}"; Flags: recursesubdirs createallsubdirs ignoreversion; Excludes: "*.pdb"

[Icons]
Name: "{autoprograms}\{#AppName}"; Filename: "{app}\{#AppExe}"; WorkingDir: "{app}"
Name: "{autodesktop}\{#AppName}"; Filename: "{app}\{#AppExe}"; WorkingDir: "{app}"; Tasks: desktopicon

[Run]
Filename: "{app}\{#AppExe}"; Description: "Launch {#AppName}"; WorkingDir: "{app}"; Flags: nowait postinstall skipifsilent

[UninstallDelete]
; The launcher writes patched game files and settings after install, so the
; install directory holds more than what Setup put there. Remove the leftovers
; rather than stranding an orphaned folder.
Type: filesandordirs; Name: "{app}"
