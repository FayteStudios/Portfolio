using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;
using SixLabors.ImageSharp.Processing;
using SixLabors.ImageSharp.Formats.Bmp;
using SixLabors.ImageSharp.Formats.Png;
using SixLabors.ImageSharp.Formats.Jpeg;
using SixLabors.ImageSharp.Formats.Gif;

namespace MyTools
{
    // Web port of the desktop ItemSpriteService: same grid math, naming convention, oversized-
    // image rejection, and composite-id logic, but against SixLabors.ImageSharp (WASM-compatible,
    // pure managed) instead of WPF's BitmapSource/DrawingVisual/RenderTargetBitmap, and against
    // IVirtualFileSystem instead of System.IO directly.
    public sealed class ItemSpriteService
    {
        public const int SpriteSize = 32;

        private readonly IVirtualFileSystem fs;

        public ItemSpriteService(IVirtualFileSystem fs)
        {
            this.fs = fs;
        }

        private static readonly HashSet<string> SupportedExtensions = new(StringComparer.OrdinalIgnoreCase)
        {
            ".bmp",
            ".png",
            ".gif",
            ".jpg",
            ".jpeg"
        };

        public sealed record SpriteSheet(
            string path,
            string prefix,
            int sheetNumber,
            int columns,
            int rows)
        {
            public int FirstSpriteId => sheetNumber * 100;
            public int SpriteCount => columns * rows;
            public int LastSpriteId => FirstSpriteId + SpriteCount - 1;
            public string FileName => Path.GetFileName(path);
        }

        // In the web app, serverFolderPath is normally "" (the root of the loaded virtual
        // workspace), not a sentinel for "nothing loaded" the way it was for the desktop app's
        // real OS folder picker - so this always resolves to a real "Sprites" subfolder path.
        public string GetSpritesFolder(string serverFolderPath) =>
            ServerFiles.CombineVirtual(serverFolderPath, "Sprites");

        public bool IsSupportedImageFile(string path)
        {
            return SupportedExtensions.Contains(Path.GetExtension(path));
        }

        public Image<Rgba32> LoadSheetImage(string path)
        {
            return LoadImage(path);
        }

        public IReadOnlyList<SpriteSheet> LoadSheets(
            string serverFolderPath,
            string sheetPrefix)
        {
            string spriteFolder = GetSpritesFolder(serverFolderPath);

            if (!fs.DirectoryExists(spriteFolder))
                return Array.Empty<SpriteSheet>();

            List<SpriteSheet> sheets = new();

            foreach (string path in fs.EnumerateFiles(spriteFolder).OrderBy(value => value, StringComparer.OrdinalIgnoreCase))
            {
                if (!SupportedExtensions.Contains(Path.GetExtension(path)))
                    continue;

                string stem = Path.GetFileNameWithoutExtension(path);

                if (!stem.StartsWith(sheetPrefix, StringComparison.OrdinalIgnoreCase))
                    continue;

                string numberText = stem[sheetPrefix.Length..];

                if (!int.TryParse(numberText, out int sheetNumber))
                    continue;

                try
                {
                    using Image<Rgba32> image = LoadImage(path);
                    int columns = image.Width / SpriteSize;
                    int rows = image.Height / SpriteSize;

                    if (columns <= 0 || rows <= 0)
                        continue;

                    sheets.Add(new SpriteSheet(
                        path,
                        sheetPrefix,
                        sheetNumber,
                        columns,
                        rows));
                }
                catch
                {
                    // Skip
                }
            }

            return sheets.OrderBy(sheet => sheet.sheetNumber).ToList();
        }

        private static readonly Regex SheetFileNamePattern = new(@"^([A-Za-z]+)(\d+)$", RegexOptions.Compiled);

        // Like LoadSheets, but for an arbitrary folder (e.g. a reference/archive folder, not
        // necessarily the active server's own Sprites folder) and without needing to already know
        // the prefix - it finds every distinct "<prefix><number>.<ext>" sheet actually present
        // (item0.bmp, arms3.bmp, chest12.png, ...) rather than assuming a fixed prefix list.
        public List<SpriteSheet> ScanFolderForSheets(string folderPath)
        {
            List<SpriteSheet> sheets = new();

            if (!fs.DirectoryExists(folderPath))
                return sheets;

            foreach (string path in fs.EnumerateFiles(folderPath).OrderBy(value => value, StringComparer.OrdinalIgnoreCase))
            {
                if (!IsSupportedImageFile(path))
                    continue;

                string stem = Path.GetFileNameWithoutExtension(path);
                Match match = SheetFileNamePattern.Match(stem);

                if (!match.Success)
                    continue;

                string prefix = match.Groups[1].Value.ToLowerInvariant();

                if (!int.TryParse(match.Groups[2].Value, out int sheetNumber))
                    continue;

                try
                {
                    using Image<Rgba32> image = LoadImage(path);
                    int columns = image.Width / SpriteSize;
                    int rows = image.Height / SpriteSize;

                    if (columns <= 0 || rows <= 0)
                        continue;

                    sheets.Add(new SpriteSheet(path, prefix, sheetNumber, columns, rows));
                }
                catch
                {
                    // Skip files that can't be decoded.
                }
            }

            return sheets
                .OrderBy(sheet => sheet.prefix, StringComparer.OrdinalIgnoreCase)
                .ThenBy(sheet => sheet.sheetNumber)
                .ToList();
        }

        // Crops one tile out of an already-loaded sheet image by flat index, without re-reading
        // the file from the workspace. Opening a sheet in the editor needs up to 100 crops from
        // the same image - CropSprite below reloads the file on every call, which would mean up
        // to 100 redundant full-image decodes for one "open sheet" click.
        public Image<Rgba32> CropTile(Image<Rgba32> sheetImage, int index, int columns)
        {
            int column = index % columns;
            int row = index / columns;

            return sheetImage.Clone(ctx => ctx.Crop(new Rectangle(
                column * SpriteSize,
                row * SpriteSize,
                SpriteSize,
                SpriteSize)));
        }

        // Composes a full sheet from a sparse set of tile placements (some slots may be empty -
        // those stay white/blank, matching the legacy color-key convention) and writes it out.
        // Backs up the target first if it already exists, the same way ReplaceSprite does.
        public void ComposeAndSaveSheet(
            string targetPath,
            IReadOnlyList<(int index, Image<Rgba32> thumbnail)> placements,
            int columns,
            int rows)
        {
            int width = columns * SpriteSize;
            int height = rows * SpriteSize;

            using Image<Rgba32> sheet = new(width, height, Color.White);

            foreach ((int index, Image<Rgba32> thumbnail) in placements)
            {
                int column = index % columns;
                int row = index / columns;

                sheet.Mutate(ctx => ctx.DrawImage(
                    thumbnail,
                    new Point(column * SpriteSize, row * SpriteSize),
                    1f));
            }

            if (fs.FileExists(targetPath))
                new BackupManager(fs).CreateBackup(targetPath);

            SaveImage(targetPath, sheet);
        }

        public IReadOnlyList<SpriteSheet> LoadItemSheets(string serverFolderPath)
        {
            return LoadSheets(serverFolderPath, "item");
        }

        public IReadOnlyList<SpriteSheet> LoadPlayerSheets(string serverFolderPath)
        {
            return LoadSheets(serverFolderPath, "player");
        }

        public List<SpriteEntry> LoadSprites(
            string serverFolderPath,
            string sheetPrefix,
            bool includeImages = true)
        {
            List<SpriteEntry> rows = new();

            foreach (SpriteSheet sheet in LoadSheets(serverFolderPath, sheetPrefix))
            {
                for (int index = 0; index < sheet.SpriteCount; index++)
                {
                    int spriteId = sheet.FirstSpriteId + index;
                    int column = index % sheet.columns;
                    int row = index / sheet.columns;

                    rows.Add(new SpriteEntry
                    {
                        ID = spriteId,
                        sheetName = sheet.FileName,
                        sheetPath = sheet.path,
                        column = column,
                        row = row,
                        X = column * SpriteSize,
                        Y = row * SpriteSize,
                        width = SpriteSize,
                        height = SpriteSize
                    });
                }
            }

            return rows;
        }

        public List<SpriteEntry> LoadItemSprites(
            string serverFolderPath,
            bool includeImages = true)
        {
            return LoadSprites(serverFolderPath, "item", includeImages);
        }

        public List<SpriteEntry> LoadPlayerSprites(
            string serverFolderPath,
            bool includeImages = true)
        {
            return LoadSprites(serverFolderPath, "player", includeImages);
        }

        public Image<Rgba32>? GetItemSpriteImage(
            string? serverFolderPath,
            string? spriteIdText)
        {
            if (string.IsNullOrWhiteSpace(serverFolderPath))
                return null;

            if (!TryParseInt(spriteIdText, out int spriteId))
                return null;

            return GetSpriteImage(serverFolderPath, "item", spriteId);
        }

        public Image<Rgba32>? GetPlayerSpriteImage(
            string? serverFolderPath,
            string? spriteIdText)
        {
            if (string.IsNullOrWhiteSpace(serverFolderPath))
                return null;

            if (!TryParseInt(spriteIdText, out int spriteId))
                return null;

            return GetSpriteImage(serverFolderPath, "player", spriteId);
        }

        public Image<Rgba32>? GetSpriteImage(
            string serverFolderPath,
            string sheetPrefix,
            int spriteId)
        {
            SpriteSheet? sheet = LoadSheets(serverFolderPath, sheetPrefix)
                .FirstOrDefault(value => value.FirstSpriteId <= spriteId && spriteId <= value.LastSpriteId);

            if (sheet is null)
                return null;

            return CropSprite(sheet, spriteId);
        }

        public Image<Rgba32>? GetItemCompositeImage(
            string serverFolderPath,
            string? animation0Text,
            string? imageTypeText)
        {
            return GetCompositeImage(serverFolderPath, "item", animation0Text, imageTypeText);
        }

        // ImageType is a cell COUNT, not a sequential mode index: 1 -> single tile, 2 -> two
        // tiles stacked vertically (base, base+10), 4 -> a 2x2 block (base at top-left, +1 east,
        // +10 south, +11 southeast). Anything else (0, blank, unrecognized) falls back to a
        // single tile. This is how the server itself renders a multi-cell sprite (e.g. a dragon
        // spanning more than one tile) - Monster.ini's Image/ImageType pair uses the exact same
        // convention as Item.ini's Animation0/ImageType, just against the "monster" sprite prefix
        // instead of "item".
        public Image<Rgba32>? GetCompositeImage(
            string serverFolderPath,
            string spritePrefix,
            string? baseIdText,
            string? imageTypeText)
        {
            if (!TryParseInt(baseIdText, out int baseId))
                return null;

            int imageType = TryParseInt(imageTypeText, out int parsedImageType)
                ? parsedImageType
                : 1;

            List<int> ids = CompositeIds(baseId, imageType).ToList();

            List<Image<Rgba32>> tiles = ids
                .Select(id => GetSpriteImage(serverFolderPath, spritePrefix, id))
                .Where(image => image is not null)
                .Cast<Image<Rgba32>>()
                .ToList();

            if (tiles.Count == 0)
                return null;

            if (imageType == 2)
                return Compose(tiles, 1, 2);

            if (imageType == 4)
                return Compose(tiles, 2, 2);

            Image<Rgba32> first = tiles[0];

            for (int i = 1; i < tiles.Count; i++)
                tiles[i].Dispose();

            return first;
        }

        public IReadOnlyList<int> CompositeIds(
            int animation0,
            int imageType)
        {
            if (imageType == 2)
                return new[] { animation0, animation0 + 10 };

            if (imageType == 4)
                return new[] { animation0, animation0 + 1, animation0 + 10, animation0 + 11 };

            return new[] { animation0 };
        }

        public IReadOnlyList<int> CompositeIds(
            int animation0,
            string? imageTypeText)
        {
            int imageType = TryParseInt(imageTypeText, out int parsedImageType)
                ? parsedImageType
                : 1;

            return CompositeIds(animation0, imageType);
        }

        public Image<Rgba32>? CropSprite(
            SpriteSheet sheet,
            int spriteId)
        {
            int index = spriteId - sheet.FirstSpriteId;

            if (index < 0 || index >= sheet.SpriteCount)
                return null;

            using Image<Rgba32> image = LoadImage(sheet.path);

            int column = index % sheet.columns;
            int row = index / sheet.columns;

            return image.Clone(ctx => ctx.Crop(new Rectangle(
                column * SpriteSize,
                row * SpriteSize,
                SpriteSize,
                SpriteSize)));
        }

        private static Image<Rgba32> Compose(
            IReadOnlyList<Image<Rgba32>> tiles,
            int columns,
            int rows)
        {
            Image<Rgba32> canvas = new(columns * SpriteSize, rows * SpriteSize);

            for (int index = 0; index < tiles.Count; index++)
            {
                int x = index % columns;
                int y = index / columns;

                if (y >= rows)
                    break;

                Image<Rgba32> tile = tiles[index];

                canvas.Mutate(ctx => ctx.DrawImage(
                    tile,
                    new Point(x * SpriteSize, y * SpriteSize),
                    1f));
            }

            foreach (Image<Rgba32> tile in tiles)
                tile.Dispose();

            return canvas;
        }

        private Image<Rgba32> LoadImage(string path)
        {
            byte[] bytes = fs.ReadAllBytes(path);
            using MemoryStream stream = new(bytes);
            return Image.Load<Rgba32>(stream);
        }

        private static bool TryParseInt(
            string? text,
            out int value)
        {
            value = 0;

            if (string.IsNullOrWhiteSpace(text))
                return false;

            return int.TryParse(text.Trim(), out value);
        }

        // Generous ceiling for "this is a single sprite." A real RPGWO icon is 32-64px; a raw,
        // uncropped sheet is 320px+. Anything past this is almost certainly a whole sheet, not
        // one sprite, and stretching it into a single 32x32 cell just produces noise - this is
        // what happens if someone points the sheet builder at raw/uncropped art instead of
        // already-cropped single-sprite images.
        public const int MaxSourceSpriteSize = 128;

        // Returns "{filename} ({width}x{height})" for every supported image in the folder that's
        // bigger than MaxSourceSpriteSize in either dimension, so the caller can refuse the whole
        // operation up front and say exactly why, instead of silently squashing full sheets into
        // single cells.
        public List<string> FindOversizedImages(string sourceFolder)
        {
            List<string> oversized = new();

            if (!fs.DirectoryExists(sourceFolder))
                return oversized;

            foreach (string path in fs.EnumerateFiles(sourceFolder).Where(IsSupportedImageFile))
            {
                Image<Rgba32> image;

                try
                {
                    image = LoadImage(path);
                }
                catch
                {
                    continue;
                }

                using (image)
                {
                    if (image.Width > MaxSourceSpriteSize || image.Height > MaxSourceSpriteSize)
                    {
                        oversized.Add($"{Path.GetFileName(path)} ({image.Width}x{image.Height})");
                    }
                }
            }

            return oversized;
        }

        private static void ThrowIfOversized(List<string> oversized)
        {
            if (oversized.Count == 0)
                return;

            throw new InvalidOperationException(
                $"{oversized.Count} image(s) are larger than {MaxSourceSpriteSize}x{MaxSourceSpriteSize}px, which " +
                "usually means they're already a full sprite sheet (many icons), not a single sprite. This action " +
                "only accepts already-cropped single-sprite images, not raw/uncropped sheets.\n\nOversized: " +
                string.Join(", ", oversized.Take(10)) +
                (oversized.Count > 10 ? $", and {oversized.Count - 10} more" : ""));
        }

        private void ThrowIfOversizedFile(string path)
        {
            Image<Rgba32> image;

            try
            {
                image = LoadImage(path);
            }
            catch
            {
                return;
            }

            using (image)
            {
                if (image.Width > MaxSourceSpriteSize || image.Height > MaxSourceSpriteSize)
                {
                    ThrowIfOversized(new List<string> { $"{Path.GetFileName(path)} ({image.Width}x{image.Height})" });
                }
            }
        }

        // Patches a single 32x32 cell of an existing sheet in place. Backs up the sheet first via
        // BackupManager, the same way the ini editor backs up before every commit - this is the
        // one sprite action that overwrites an existing file rather than only ever creating new
        // ones, so it's the one that needs a safety net under it.
        public void ReplaceSprite(string sheetPath, int column, int row, string sourceImagePath)
        {
            ThrowIfOversizedFile(sourceImagePath);

            using Image<Rgba32> existingSheet = LoadImage(sheetPath);
            using Image<Rgba32> replacement = LoadImage(sourceImagePath);

            Image<Rgba32> result = existingSheet.Clone(ctx => { });

            result.Mutate(ctx => ctx.DrawImage(
                replacement,
                new Point(column * SpriteSize, row * SpriteSize),
                1f));

            new BackupManager(fs).CreateBackup(sheetPath);
            SaveImage(sheetPath, result);
            result.Dispose();
        }

        public sealed record SheetBuildResult(
            string path,
            int sheetNumber,
            int firstSpriteId,
            int lastSpriteId,
            int spriteCount);

        // Assembles a folder of loose sprite images into new numbered sheets, continuing right
        // after whatever sheets already exist for this prefix rather than overwriting id 0.
        // Writes directly in the {prefix}{N}.ext / 0-indexed / 10x10 convention this service
        // itself expects, so the result is immediately usable without manual renaming. Refuses
        // the whole folder (no partial writes) if anything in it looks like a full sheet rather
        // than a single sprite - see FindOversizedImages.
        public List<SheetBuildResult> BuildSheetsFromFolder(
            string sourceFolder,
            string serverFolderPath,
            string prefix)
        {
            if (!fs.DirectoryExists(sourceFolder))
                throw new DirectoryNotFoundException($"Source folder does not exist: {sourceFolder}");

            ThrowIfOversized(FindOversizedImages(sourceFolder));

            List<string> sourceFiles = fs.EnumerateFiles(sourceFolder)
                .Where(path => SupportedExtensions.Contains(Path.GetExtension(path)))
                .OrderBy(path => path, StringComparer.OrdinalIgnoreCase)
                .ToList();

            List<SheetBuildResult> results = new();

            if (sourceFiles.Count == 0)
                return results;

            string spritesFolder = GetSpritesFolder(serverFolderPath);
            fs.CreateDirectory(spritesFolder);

            int nextSheetNumber = LoadSheets(serverFolderPath, prefix)
                .Select(sheet => sheet.sheetNumber)
                .DefaultIfEmpty(-1)
                .Max() + 1;

            const int columns = 10;
            const int rows = 10;
            const int spritesPerSheet = columns * rows;
            int width = columns * SpriteSize;
            int height = rows * SpriteSize;

            for (int offset = 0; offset < sourceFiles.Count; offset += spritesPerSheet)
            {
                List<string> batch = sourceFiles.Skip(offset).Take(spritesPerSheet).ToList();
                int sheetNumber = nextSheetNumber + (offset / spritesPerSheet);

                // Legacy color-key convention: the old client treats near-white as transparent,
                // so a curated PNG with real alpha transparency needs a white backing, not a
                // black/transparent one, to look right in-game.
                using Image<Rgba32> sheet = new(width, height, Color.White);

                int placedCount = 0;

                foreach (string sourcePath in batch)
                {
                    Image<Rgba32> sprite;

                    try
                    {
                        sprite = LoadImage(sourcePath);
                    }
                    catch
                    {
                        continue;
                    }

                    using (sprite)
                    {
                        int column = placedCount % columns;
                        int row = placedCount / columns;

                        sheet.Mutate(ctx => ctx.DrawImage(
                            sprite,
                            new Point(column * SpriteSize, row * SpriteSize),
                            1f));

                        placedCount++;
                    }
                }

                if (placedCount == 0)
                    continue;

                string sheetPath = ServerFiles.CombineVirtual(spritesFolder, $"{prefix}{sheetNumber}.bmp");
                SaveImage(sheetPath, sheet);

                int firstId = sheetNumber * 100;

                results.Add(new SheetBuildResult(
                    sheetPath,
                    sheetNumber,
                    firstId,
                    firstId + placedCount - 1,
                    placedCount));
            }

            return results;
        }

        private void SaveImage(string path, Image<Rgba32> image)
        {
            using MemoryStream stream = new();

            switch (Path.GetExtension(path).ToLowerInvariant())
            {
                case ".png":
                    image.Save(stream, new PngEncoder());
                    break;
                case ".jpg":
                case ".jpeg":
                    image.Save(stream, new JpegEncoder());
                    break;
                case ".gif":
                    image.Save(stream, new GifEncoder());
                    break;
                default:
                    image.Save(stream, new BmpEncoder());
                    break;
            }

            fs.WriteAllBytes(path, stream.ToArray());
        }
    }
}
