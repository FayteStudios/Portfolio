# Launcher installers

Inno Setup scripts that turn a launcher build into a Windows install wizard.

The output is what the download pages under `public/` link to, hosted as assets
on the `launchers` GitHub Release.

## Building

Needs [Inno Setup 6](https://jrsoftware.org/isinfo.php). `ISCC.exe` usually
lands in `%LOCALAPPDATA%\Programs\Inno Setup 6\`.

Point `SourceDir` at the folder holding the launcher executable — not its
parent:

```
ISCC.exe /DSourceDir="<...>\FayteLauncher"        installers\fayte.iss
ISCC.exe /DSourceDir="<...>\HnHLauncher\Files"    installers\hearth-and-harvest.iss
```

Both write to `dist-installers/`, which is gitignored. Upload the resulting
`FayteSetup.exe` and `HearthAndHarvestSetup.exe` to the `launchers` release;
the download pages point at fixed URLs, so nothing else needs changing.

## Decisions worth knowing

**Per-user install.** Both go to `%LOCALAPPDATA%\Programs\`, not Program Files.
The launchers rewrite their own files when they update, so the install
directory has to be writable without elevation. Program Files would mean a UAC
prompt on every self-update, or a launcher that silently fails to update.

**Hearth & Harvest keeps its `Files` subfolder.** The payload installs to
`{app}\Files` rather than being flattened into the install root, because the
launcher replaces that entire directory when it updates itself. Anything that
has to survive an update — the uninstaller, shortcuts — lives outside it. The
Start Menu shortcut points into `Files` and keeps working because the launcher
restores the same filename.

**Shortcuts are created at install time**, which is the point of packaging this
way. The archives previously shipped a `.lnk` built on the developer's machine,
carrying an absolute path that existed nowhere else — so it resolved
unreliably, leaked the build path, and made the archive look like a well-known
malware pattern to scanners.

**Debug symbols are excluded.** `*.pdb` accounted for roughly 200 MB of the raw
Hearth & Harvest payload. Players never load them.

**Neither installer is code signed**, so SmartScreen shows an unknown-publisher
warning until the download builds reputation. The download pages tell people to
expect it. A code signing certificate is the only real fix.
