# Shipping a new launcher build

What to do when you have a fresh launcher build and want players to get it.

**First, check whether you need to do anything at all.** Both launchers patch
themselves and the game from your patch server. If the change is in the game,
or in a part of the launcher the launcher can update on its own, players will
pick it up next time they open it. You only need a new installer when the thing
players *download* has to change — a launcher rebuild that can't self-update
into place, a new install layout, or a first-run fix.

---

## The short version

```powershell
.\installers\build.ps1 -Fayte "Z:\path\to\FayteLauncher.zip"
```

Then upload `dist-installers\FayteSetup.exe` to the
[`launchers` release](https://github.com/FayteStudios/Portfolio/releases/tag/launchers),
replacing the existing asset. Keep the filename identical. Nothing on the
website needs touching.

Both at once:

```powershell
.\installers\build.ps1 -Fayte "Z:\...\FayteLauncher.zip" -HnH "Z:\...\HnHLauncher.zip"
```

---

## Step by step

### 1. Bump the version

Open the `.iss` file for the game and edit one line near the top:

| Game | File | Line |
|---|---|---|
| Fayte | `installers/fayte.iss` | `#define AppVersion "1.0.0"` |
| Hearth & Harvest | `installers/hearth-and-harvest.iss` | `#define AppVersion "0.3.0"` |

This matters more than it looks. Windows uses it to decide whether an install
is an upgrade or a fresh one, and it's what shows in Settings → Apps. If you
ship two different builds under the same version number, a player who already
has it installed can end up on the older one with no sign anything went wrong.

For Hearth & Harvest, `Files\version.txt` in your build tells you what the
launcher thinks its version is. Matching it keeps things easy to reason about.

### 2. Build

```powershell
.\installers\build.ps1 -Fayte "Z:\path\to\FayteLauncher.zip"
```

You can pass either the `.zip` from your build or an already-extracted folder.
The script unpacks it if needed, finds the launcher executable itself, and
fails loudly if it can't — so you can't accidentally build an installer around
the wrong folder.

Takes about 15 seconds for Fayte, about 35 for Hearth & Harvest.

### 3. Check it before you publish

Install it yourself. The whole point of this format is the first-run
experience, and that's the part no build step can verify:

- The wizard runs without an administrator prompt
- A Start Menu entry appears, and launches the right thing
- The launcher starts, signs in, and patches as expected

To test without disturbing your real install, install to a throwaway folder:

```powershell
.\dist-installers\FayteSetup.exe /DIR="$env:TEMP\test-fayte"
```

Uninstall it from Settings → Apps, or run `unins000.exe` in that folder, when
you're done.

### 4. Publish

Go to the [`launchers` release](https://github.com/FayteStudios/Portfolio/releases/tag/launchers),
delete the old asset, upload the new one.

**The filename has to match exactly** — `FayteSetup.exe` or
`HearthAndHarvestSetup.exe`. The website links to fixed URLs built from those
names, so a rename silently breaks the download button.

That's it. No commit, no deploy, no site rebuild. The link is already pointing
at the right place.

### 5. Only if the size changed a lot

The download pages quote an approximate size. If the new build has moved by
more than a few MB, update the line in the relevant page and push:

- `public/FayteLauncher/index.html`
- `public/HnHLauncher/index.html`

Look for `class="meta"`.

---

## Things that will bite you

**Never change `AppId`.** The GUID near the top of each `.iss` is how Windows
recognises an existing install. Change it and every player who upgrades ends up
with two entries in Settings → Apps and two copies on disk, neither aware of
the other. It's the one value in these files that must stay frozen forever.

**Don't move the launcher out of `Files\` for Hearth & Harvest.** That folder
is replaced wholesale when the launcher updates itself. Anything that has to
survive an update — the uninstaller, the shortcuts — lives outside it. Flatten
the layout and self-updating breaks.

**Don't install to Program Files.** Both launchers rewrite their own files, so
the install directory has to be writable without elevation. That's why these
install to `%LOCALAPPDATA%\Programs\`. Program Files would mean a UAC prompt on
every update, or updates that silently fail.

**Expect the SmartScreen warning.** Neither installer is code signed, so
Windows shows "unknown publisher" until a download builds reputation — and
reputation resets with each new build. The download pages tell players to
expect it. The only real fix is a code signing certificate (an EV one clears
SmartScreen immediately; a standard one still has to build reputation).

---

## If something goes wrong

| Symptom | Cause |
|---|---|
| `Could not find the Inno Setup compiler` | Not installed, or somewhere else. `winget install JRSoftware.InnoSetup`, or pass `-Iscc "path\to\ISCC.exe"`. |
| `payload has no <exe> anywhere` | Wrong archive, or a build that didn't produce the launcher. Check the zip actually contains it. |
| Installer builds but the app won't start | Something's missing from the payload. Compare the installed folder against your build output — a file the app needs may not have been in the zip. |
| Player gets two entries in Settings → Apps | `AppId` was changed between builds. Restore the original GUID from git history; affected players need to uninstall both manually. |
| Download button 404s | The release asset was renamed or deleted. Filenames must stay exactly `FayteSetup.exe` and `HearthAndHarvestSetup.exe`. |

---

## How the pieces fit

```
your launcher build (.zip)
        │
        ▼
  build.ps1 ──► fayte.iss / hearth-and-harvest.iss ──► dist-installers\*.exe
                        │                                      │
                 licence text shown                     uploaded by hand to
                 in the wizard                          the 'launchers' release
                                                               │
                                                               ▼
                                                   download buttons on
                                                   faytestudios.com
```

The website links never change. Everything downstream of the release is fixed,
which is why shipping an update is a file upload and nothing more.
