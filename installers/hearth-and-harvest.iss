; Hearth & Harvest Launcher installer.
;
; Build:
;   ISCC.exe /DSourceDir="<path to the extracted Files folder>" installers\hearth-and-harvest.iss
;
; SourceDir must point at the Files folder from inside HnHLauncher -- the one
; containing HearthAndHarvestLauncher.exe.
;
; The payload keeps its Files subfolder rather than being flattened into the
; install root. That layout is load-bearing: the launcher replaces the whole
; Files directory when it updates itself, so anything that must survive an
; update has to live outside it. The shortcuts point into Files and keep
; working because the launcher restores the same filename.
;
; Installs per-user into %LOCALAPPDATA%\Programs\Hearth and Harvest, so the
; launcher can rewrite its own files without elevation.

#ifndef SourceDir
  #error Pass the payload path with /DSourceDir="..."
#endif

#define AppName        "Hearth and Harvest"
#define AppVersion     "0.3.0"
#define AppPublisher   "Fayte Studios"
#define AppURL         "https://www.faytestudios.com"
#define AppExe         "Files\HearthAndHarvestLauncher.exe"

[Setup]
AppId={{C1F61B49-A2D7-4A6D-A015-363AAEEE95A6}
AppName={#AppName}
AppVersion={#AppVersion}
AppVerName={#AppName}
AppPublisher={#AppPublisher}
AppPublisherURL={#AppURL}
AppSupportURL={#AppURL}
AppUpdatesURL={#AppURL}

PrivilegesRequired=lowest
PrivilegesRequiredOverridesAllowed=dialog
DefaultDirName={localappdata}\Programs\{#AppName}
DefaultGroupName={#AppName}
DisableProgramGroupPage=yes
UninstallDisplayName={#AppName}
UninstallDisplayIcon={app}\{#AppExe}

ArchitecturesAllowed=x64compatible
ArchitecturesInstallIn64BitMode=x64compatible

LicenseFile=hearth-and-harvest-license.txt
WizardStyle=modern
Compression=lzma2/max
SolidCompression=yes
OutputDir=..\dist-installers
OutputBaseFilename=HearthAndHarvestSetup

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"

[Tasks]
Name: "desktopicon"; Description: "Create a desktop shortcut"; GroupDescription: "Shortcuts:"

[Files]
; Debug symbols are excluded -- they account for roughly 200 MB of the raw
; payload and players never need them.
Source: "{#SourceDir}\*"; DestDir: "{app}\Files"; Flags: recursesubdirs createallsubdirs ignoreversion; Excludes: "*.pdb"

[Icons]
Name: "{autoprograms}\{#AppName}"; Filename: "{app}\{#AppExe}"; WorkingDir: "{app}\Files"
Name: "{autodesktop}\{#AppName}"; Filename: "{app}\{#AppExe}"; WorkingDir: "{app}\Files"; Tasks: desktopicon

[Run]
Filename: "{app}\{#AppExe}"; Description: "Launch {#AppName}"; WorkingDir: "{app}\Files"; Flags: nowait postinstall skipifsilent

[UninstallDelete]
; The launcher downloads the game into Files\client after install, so the
; install directory holds more than what Setup put there.
Type: filesandordirs; Name: "{app}"
