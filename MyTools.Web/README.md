# MyTools Web

A browser-based port of MyTools' ini editor and sprite sheet editor, for editing an RPGWO
server folder on the go without the desktop exe. Built as a standalone Blazor WebAssembly app:
**everything runs in your browser tab** - no server, no upload to any backend, nothing leaves
your machine.

This is a separate, additive project alongside the original WPF app (`../MyTools.csproj`), which
it does not modify or depend on. It reuses the desktop app's ini-parsing engine and ~7,500-line
field schema (`Core/EditorDefinitions.cs`) essentially verbatim, and reimplements the WPF-specific
bits (imaging, dialogs) for the browser.

## What's in scope

- **Ini/definition editing** for all 9 server files (items, monsters, skills, item uses, multi
  uses, magic, treasure, world, animations): browse, search, edit fields/flags, add/delete
  entries, with the same backup-before-write behavior as the desktop app.
- **Sprite sheet editing**: view sheets, compose a new 10x10 sheet from picked tiles, batch-build
  sheets from loose cropped images, replace a single sprite cell, find what references a sprite id.

## What's out of scope (desktop-only)

- **Live Server Control** - the desktop app drives the real `server2.exe` process via Win32 window
  automation, which has no browser equivalent.
- **Master Maker** (`MASTER2.DAT`/.zlib packaging) - not requested for the web version; could be
  added later as a simple upload-to-zip tool if wanted.

## Running locally

```
dotnet run
```

Then open the printed localhost URL. `dotnet watch` also works for iterating on the UI.

## How opening a folder works

- **Chrome/Edge**: "Open Server Folder..." uses the File System Access API - edits (and their
  automatic `Backups/` copies) are written straight back to your real files. A page refresh only
  needs a one-click permission re-grant (browser-mandated) to resume exactly where you left off.
- **Any other browser** (Safari, Firefox, mobile): pick your folder via the upload control instead.
  Everything is held in memory in the tab; use **Download .zip** at any point to get your edits
  back out. A refresh restores your in-progress edits from an IndexedDB snapshot automatically.

## Publishing as a static site

```
dotnet publish -c Release
```

The output in `bin/Release/net8.0/publish/wwwroot` is a fully static site - upload it as-is to
any static host (Netlify, Cloudflare Pages, your own server, etc.).

For **GitHub Pages** specifically:
1. Add a `.nojekyll` file to the publish output (Jekyll otherwise ignores the `_framework/` folder).
2. If served from a subpath (`username.github.io/repo/`), edit `<base href="/" />` in
   `wwwroot/index.html` to `<base href="/repo/" />` before publishing.

## Known pre-existing schema quirks (found while building this, not introduced by it)

Two fields in the original `EditorDefinitions` schema (`Item`'s "Projectile Animation" and "Scan
Animation") have no underlying ini key at all, so they can't read or write a value - this port
just leaves them blank rather than erroring. This is a latent bug in the schema as originally
authored (verified byte-for-byte identical to the desktop app's `EditorService.cs`), not a
web-port regression - the desktop app would hit the same issue if it ever tried to commit those
two fields.

## Project layout

- `Core/` - the ported engine: ini parsing/writing (`IniEngine.cs`), the field schema
  (`EditorDefinitions.cs`), workspace/backup services (`ServerFiles.cs`), and the sprite sheet
  service (`ItemSpriteService.cs`, rewritten against SixLabors.ImageSharp instead of WPF imaging).
  All file I/O goes through `IVirtualFileSystem`/`InMemoryFileSystem` instead of `System.IO`.
- `Services/` - app-level glue: `AppState` (owns the virtual filesystem + workspace, orchestrates
  both folder-access modes), `InteropService` (JS interop wrapper), `DefinitionEditorService`
  (bridges the field schema against a specific entry's ini block).
- `wwwroot/js/interop.js` - File System Access API + IndexedDB persistence, all in one small module.
- `Pages/` - Dashboard, the generic definition editor (`/edit/{file}`), Sprite Sheets.
