# Builds the launcher installers.
#
# Accepts either a launcher .zip straight out of your build, or an already
# extracted folder. It locates the launcher executable itself, so you do not
# have to work out which subfolder to point at.
#
#   .\installers\build.ps1 -Fayte "Z:\path\FayteLauncher.zip"
#   .\installers\build.ps1 -HnH   "Z:\path\HnHLauncher.zip"
#   .\installers\build.ps1 -Fayte "...\FayteLauncher.zip" -HnH "...\HnHLauncher.zip"
#
# Output lands in dist-installers\. See UPDATING.md.

[CmdletBinding()]
param(
    [string]$Fayte,
    [string]$HnH,
    [string]$Iscc = "$env:LOCALAPPDATA\Programs\Inno Setup 6\ISCC.exe"
)

$ErrorActionPreference = 'Stop'

$here = Split-Path -Parent $MyInvocation.MyCommand.Path
$outDir = Join-Path (Split-Path -Parent $here) 'dist-installers'

if (-not $Fayte -and -not $HnH) {
    Write-Host "Nothing to do. Pass -Fayte and/or -HnH with a launcher .zip or folder." -ForegroundColor Yellow
    Write-Host 'Example: .\installers\build.ps1 -Fayte "Z:\builds\FayteLauncher.zip"'
    exit 1
}

if (-not (Test-Path $Iscc)) {
    Write-Host "Could not find the Inno Setup compiler at:" -ForegroundColor Red
    Write-Host "  $Iscc"
    Write-Host "Install it with:  winget install JRSoftware.InnoSetup"
    Write-Host "Or pass the path with -Iscc."
    exit 1
}

# Unpacks a .zip to a temp folder, or passes a folder straight through.
function Resolve-Payload {
    param([string]$Path, [string]$Label)

    if (-not (Test-Path $Path)) {
        throw "$Label source does not exist: $Path"
    }

    if ((Get-Item $Path).PSIsContainer) {
        return $Path
    }

    if ([System.IO.Path]::GetExtension($Path) -ne '.zip') {
        throw "$Label source must be a .zip or a folder: $Path"
    }

    $dest = Join-Path $env:TEMP ("launcher-build-" + [System.IO.Path]::GetFileNameWithoutExtension($Path))
    if (Test-Path $dest) { Remove-Item $dest -Recurse -Force }

    Write-Host "  unpacking $([System.IO.Path]::GetFileName($Path))..."
    Expand-Archive -LiteralPath $Path -DestinationPath $dest -Force
    return $dest
}

# Finds the folder holding the launcher executable. Pointing Inno at the parent
# folder is the easiest mistake to make and produces an installer that looks
# fine and installs nothing runnable, so this is checked rather than assumed.
function Find-ExeDir {
    param([string]$Root, [string]$ExeName, [string]$Label)

    $hit = Get-ChildItem -Path $Root -Filter $ExeName -Recurse -File -ErrorAction SilentlyContinue |
           Select-Object -First 1

    if (-not $hit) {
        throw "$Label payload has no $ExeName anywhere under $Root. Wrong archive?"
    }

    return $hit.DirectoryName
}

function Build-Installer {
    param([string]$Label, [string]$Source, [string]$ExeName, [string]$Script)

    Write-Host ""
    Write-Host "=== $Label ===" -ForegroundColor Cyan

    $payload = Resolve-Payload -Path $Source -Label $Label
    $exeDir = Find-ExeDir -Root $payload -ExeName $ExeName -Label $Label

    Write-Host "  payload: $exeDir"

    $iss = Join-Path $here $Script
    & $Iscc "/DSourceDir=$exeDir" $iss | Select-Object -Last 3

    if ($LASTEXITCODE -ne 0) {
        # Leave the unpacked payload behind so it can be inspected.
        throw "$Label build failed (ISCC exit code $LASTEXITCODE). Payload left at $payload"
    }

    # Only remove what this script unpacked. A folder passed in by hand is the
    # caller's, and deleting it would be a nasty surprise.
    if ($payload -ne $Source -and $payload.StartsWith($env:TEMP)) {
        Remove-Item $payload -Recurse -Force -ErrorAction SilentlyContinue
    }
}

if ($Fayte) {
    Build-Installer -Label 'Fayte' -Source $Fayte -ExeName 'Launcher.exe' -Script 'fayte.iss'
}

if ($HnH) {
    Build-Installer -Label 'Hearth and Harvest' -Source $HnH -ExeName 'HearthAndHarvestLauncher.exe' -Script 'hearth-and-harvest.iss'
}

Write-Host ""
Write-Host "Built:" -ForegroundColor Green
Get-ChildItem $outDir -Filter *.exe -ErrorAction SilentlyContinue |
    Sort-Object Name |
    ForEach-Object {
        "  {0,-30} {1,7:N1} MB   {2}" -f $_.Name, ($_.Length / 1MB), $_.LastWriteTime
    }

Write-Host ""
Write-Host "Upload these to the 'launchers' release, keeping the filenames exactly as they are."
