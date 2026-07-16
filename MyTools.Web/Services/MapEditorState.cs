using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using MyTools;
using MyTools.Map;
using MyTools.Map.Generation;

namespace MyTools.Web.Services
{
    public enum MapTool { Paint, Erase, Inspect }
    public enum MapLayer { Surface, Item, Monster }

    public sealed class MapPaintDefaults
    {
        public int itemData0, itemData1, itemData2, itemData3, itemData4;
        public int itemReset, itemUses, itemTrigger, itemPutIn;
        public float itemTimeout;
        public string itemText = "";
        public int monsterTimeout;
    }

    public sealed class MapInspectorState
    {
        public int x, y;
        public int surfaceId;
        public int itemId;
        public string itemName = "";
        public float itemTimeout;
        public string itemText = "";
        public int itemData1, itemData2, itemData3, itemData4, itemData5;
        public int itemReset, itemUses, itemTrigger, itemPutIn;
        public int monsterId;
        public string monsterName = "";
        public int monsterTimeout;
    }

    public sealed class MapViewState
    {
        public bool showSurface = true;
        public bool showItems = true;
        public bool showMonsters = true;
        public bool showGrid = true;
        public int tileSize = 32;
    }

    public sealed record SpriteSheetBytes(string kind, int number, byte[] bytes);

    // Owns the active MapDocument and all editor tool/view/inspector state - the map-editor
    // equivalent of AppState. Reuses AppState's already-loaded workspace (for the item/monster
    // catalog) and virtual filesystem (for sprite sheet bytes) directly, rather than requiring a
    // separate data upload the way the reference tool does.
    public sealed class MapEditorState
    {
        private static readonly Regex SheetFileNamePattern = new(@"^(item|player|background)(\d+)$", RegexOptions.IgnoreCase | RegexOptions.Compiled);

        private readonly AppState appState;

        public MapDocument? Map { get; private set; }
        public MapCatalog Catalog { get; private set; } = new();
        public string MapTitle => Map == null ? "No map loaded" : $"{Map.name} ({Map.width} x {Map.height})";

        public MapLayer Layer { get; private set; } = MapLayer.Surface;
        public MapTool Tool { get; private set; } = MapTool.Paint;
        public int Brush { get; set; } = 1;
        public MapViewState View { get; } = new();
        public MapPaintDefaults PaintDefaults { get; } = new();
        public MapInspectorState Inspector { get; } = new();
        public bool InspectorLocked { get; private set; }
        public string Search { get; set; } = "";
        public string? LastError { get; private set; }

        public int SelectedSurface { get; set; }
        public int SelectedItem { get; set; }
        public int SelectedMonster { get; set; }

        public GeneratorSettings GeneratorSettings { get; } = new();

        public event Action? Changed;

        private (int x, int y)? lastPaintTile;

        public MapEditorState(AppState appState)
        {
            this.appState = appState;
        }

        public bool IsLoaded => Map != null;

        public void RebuildCatalog()
        {
            Catalog = appState.IsLoaded && appState.Workspace != null
                ? MapCatalogBuilder.Build(appState.Workspace)
                : new MapCatalog();

            Changed?.Invoke();
        }

        // Scans the loaded workspace's Sprites/ folder for item###.bmp / player###.bmp /
        // background###.bmp sheets (same convention ItemSpriteService already uses) so the
        // canvas renderer can load real art without a separate upload step.
        public List<SpriteSheetBytes> GetSpriteSheetBytes()
        {
            List<SpriteSheetBytes> results = new();

            if (!appState.IsLoaded)
                return results;

            string spritesFolder = "Sprites";

            foreach (string path in appState.Fs.EnumerateFiles(spritesFolder))
            {
                string stem = System.IO.Path.GetFileNameWithoutExtension(path);
                Match match = SheetFileNamePattern.Match(stem);

                if (!match.Success)
                    continue;

                if (!int.TryParse(match.Groups[2].Value, out int number))
                    continue;

                string kind = match.Groups[1].Value.ToLowerInvariant();
                results.Add(new SpriteSheetBytes(kind, number, appState.Fs.ReadAllBytes(path)));
            }

            return results;
        }

        public void NewMap(int width, int height, string name)
        {
            Map = MapDocument.CreateEmpty(Math.Clamp(width, 8, 2000), Math.Clamp(height, 8, 2000), name);
            LastError = null;
            ResetUiState();
            Changed?.Invoke();
        }

        public void OpenMapBytes(byte[] bytes, string name)
        {
            try
            {
                Map = MapBinaryFormat.Parse(bytes, StripExtension(name));
                LastError = null;
                ResetUiState();
            }
            catch (Exception ex)
            {
                LastError = $"Could not open {name}: {ex.Message}";
            }

            Changed?.Invoke();
        }

        public void OpenRsfText(string text, string name)
        {
            try
            {
                Map = RsfFormat.Parse(text, StripExtension(name));
                LastError = null;
                ResetUiState();
            }
            catch (Exception ex)
            {
                LastError = $"Could not open {name}: {ex.Message}";
            }

            Changed?.Invoke();
        }

        public byte[] ExportMapBytes() => Map == null ? Array.Empty<byte>() : MapBinaryFormat.Build(Map);

        public string ExportRsfText() => Map == null ? "" : RsfFormat.Build(Map);

        public string ExportFileBaseName() => Map == null ? "map" : StripExtension(Map.name);

        private static string StripExtension(string name)
        {
            int dot = name.LastIndexOf('.');
            return dot > 0 ? name[..dot] : name;
        }

        private void ResetUiState()
        {
            InspectorLocked = false;
            lastPaintTile = null;

            if (Map != null)
                SetInspectorFromTile(1, 1);
        }

        public void SetLayer(MapLayer layer) { Layer = layer; Changed?.Invoke(); }

        public void SetTool(MapTool tool) { Tool = tool; Changed?.Invoke(); }

        public MapCatalogItem? GetItem(int id) => Catalog.GetItem(id);

        public MapCatalogMonster? GetMonster(int id) => Catalog.GetMonster(id);

        // Applies the active tool as an NxN brush stamp anchored at (x,y). Returns the touched
        // region (for the caller to redraw), or null if nothing changed.
        public (int minX, int minY, int maxX, int maxY)? ApplyToolAt(int x, int y, bool updateInspector = true)
        {
            if (Map == null)
                return null;

            int brush = Math.Clamp(Brush, 1, 10);
            bool changed = false;

            for (int ox = 0; ox < brush; ox++)
            {
                for (int oy = 0; oy < brush; oy++)
                {
                    int tx = x + ox;
                    int ty = y + oy;

                    if (tx < 1 || ty < 1 || tx > Map.width || ty > Map.height)
                        continue;

                    if (Tool == MapTool.Inspect)
                    {
                        // Inspect never mutates - only the hover/click-driven SetInspectorFromTile
                        // call below (when unlocked) reflects it.
                    }
                    else if (Tool == MapTool.Erase)
                    {
                        EraseTile(tx, ty);
                        changed = true;
                    }
                    else
                    {
                        PaintTile(tx, ty);
                        changed = true;
                    }
                }
            }

            if (updateInspector && !InspectorLocked)
                SetInspectorFromTile(x, y);

            return changed ? (x, y, x + brush - 1, y + brush - 1) : null;
        }

        // Bresenham-walks every tile between the last painted tile and (x,y) so a fast mouse drag
        // doesn't leave gaps, applying the brush stamp at each step. Mirrors the reference tool's
        // applyStrokeTo exactly.
        public (int minX, int minY, int maxX, int maxY)? ApplyStrokeTo(int x, int y)
        {
            if (Map == null)
                return null;

            (int x, int y) from = lastPaintTile ?? (x, y);
            int dx = Math.Abs(x - from.x);
            int dy = Math.Abs(y - from.y);
            int sx = from.x < x ? 1 : -1;
            int sy = from.y < y ? 1 : -1;
            int err = dx - dy;
            int cx = from.x, cy = from.y;
            bool changed = false;
            int brush = Math.Clamp(Brush, 1, 10);

            int dirtyMinX = x, dirtyMinY = y, dirtyMaxX = x + brush - 1, dirtyMaxY = y + brush - 1;

            while (true)
            {
                var region = ApplyToolAt(cx, cy, updateInspector: false);
                changed = changed || region != null;

                dirtyMinX = Math.Min(dirtyMinX, cx);
                dirtyMinY = Math.Min(dirtyMinY, cy);
                dirtyMaxX = Math.Max(dirtyMaxX, cx + brush - 1);
                dirtyMaxY = Math.Max(dirtyMaxY, cy + brush - 1);

                if (cx == x && cy == y)
                    break;

                int doubled = err * 2;

                if (doubled > -dy) { err -= dy; cx += sx; }
                if (doubled < dx) { err += dx; cy += sy; }
            }

            lastPaintTile = (x, y);

            if (!changed)
                return null;

            if (!InspectorLocked)
                SetInspectorFromTile(x, y);

            return (dirtyMinX, dirtyMinY, dirtyMaxX, dirtyMaxY);
        }

        public void EndStroke() => lastPaintTile = null;

        private void PaintTile(int x, int y)
        {
            (int x, int y) key = (x, y);

            if (Layer == MapLayer.Surface)
            {
                Map!.surfaces[key] = SelectedSurface;
            }
            else if (Layer == MapLayer.Item && SelectedItem != 0)
            {
                Map!.generatorWallKinds.Remove(key);
                Map.items[key] = new MapItemRecord
                {
                    dirty = true,
                    itemId = SelectedItem,
                    x = x,
                    y = y,
                    data1 = PaintDefaults.itemData0,
                    data2 = PaintDefaults.itemData1,
                    data3 = PaintDefaults.itemData2,
                    data4 = PaintDefaults.itemData3,
                    data5 = PaintDefaults.itemData4,
                    reset = PaintDefaults.itemReset,
                    uses = PaintDefaults.itemUses,
                    trigger = PaintDefaults.itemTrigger,
                    timeout = PaintDefaults.itemTimeout,
                    text = PaintDefaults.itemText.Length > 200 ? PaintDefaults.itemText[..200] : PaintDefaults.itemText,
                    putIn = PaintDefaults.itemPutIn
                };
            }
            else if (Layer == MapLayer.Monster && SelectedMonster != 0)
            {
                Map!.monsters[key] = new MapMonsterRecord
                {
                    dirty = true,
                    monsterId = SelectedMonster,
                    x = x,
                    y = y,
                    timeout = PaintDefaults.monsterTimeout
                };
            }
        }

        private void EraseTile(int x, int y)
        {
            (int x, int y) key = (x, y);

            if (Layer == MapLayer.Surface)
                Map!.surfaces.Remove(key);

            if (Layer == MapLayer.Item)
            {
                Map!.items.Remove(key);
                Map.generatorWallKinds.Remove(key);
            }

            if (Layer == MapLayer.Monster)
                Map!.monsters.Remove(key);
        }

        public void SetInspectorFromTile(int x, int y)
        {
            if (Map == null || x < 1 || y < 1 || x > Map.width || y > Map.height)
                return;

            (int x, int y) key = (x, y);
            int surface = Map.surfaces.GetValueOrDefault(key);
            Map.items.TryGetValue(key, out MapItemRecord? item);
            Map.monsters.TryGetValue(key, out MapMonsterRecord? monster);
            MapCatalogItem? itemDef = item != null ? GetItem(item.itemId) : null;
            MapCatalogMonster? monsterDef = monster != null ? GetMonster(monster.monsterId) : null;

            Inspector.x = x;
            Inspector.y = y;
            Inspector.surfaceId = surface;
            Inspector.itemId = item?.itemId ?? 0;
            Inspector.itemName = itemDef?.name ?? "";
            Inspector.itemTimeout = item?.timeout ?? 0;
            Inspector.itemText = item?.text ?? "";
            Inspector.itemData1 = item?.data1 ?? 0;
            Inspector.itemData2 = item?.data2 ?? 0;
            Inspector.itemData3 = item?.data3 ?? 0;
            Inspector.itemData4 = item?.data4 ?? 0;
            Inspector.itemData5 = item?.data5 ?? 0;
            Inspector.itemReset = item?.reset ?? 0;
            Inspector.itemUses = item?.uses ?? 0;
            Inspector.itemTrigger = item?.trigger ?? 0;
            Inspector.itemPutIn = item?.putIn ?? 0;
            Inspector.monsterId = monster?.monsterId ?? 0;
            Inspector.monsterName = monsterDef?.name ?? "";
            Inspector.monsterTimeout = monster?.timeout ?? 0;
        }

        public void LockInspectorAt(int x, int y)
        {
            InspectorLocked = true;
            SetInspectorFromTile(x, y);
            Changed?.Invoke();
        }

        public void UnlockInspector()
        {
            InspectorLocked = false;
            Changed?.Invoke();
        }

        public void SaveLockedTile()
        {
            if (Map == null || !InspectorLocked)
                return;

            int x = Inspector.x, y = Inspector.y;

            if (x < 1 || y < 1 || x > Map.width || y > Map.height)
                return;

            (int x, int y) key = (x, y);
            Map.items.TryGetValue(key, out MapItemRecord? previousItem);
            Map.monsters.TryGetValue(key, out MapMonsterRecord? previousMonster);

            if (Inspector.surfaceId > 0)
                Map.surfaces[key] = Inspector.surfaceId;
            else
                Map.surfaces.Remove(key);

            if (Inspector.itemId > 0)
            {
                Map.items[key] = new MapItemRecord
                {
                    rawRecord = previousItem?.rawRecord,
                    dirty = true,
                    itemId = Inspector.itemId,
                    x = x,
                    y = y,
                    data1 = Inspector.itemData1,
                    data2 = Inspector.itemData2,
                    data3 = Inspector.itemData3,
                    data4 = Inspector.itemData4,
                    data5 = Inspector.itemData5,
                    reset = Inspector.itemReset,
                    uses = Inspector.itemUses,
                    trigger = Inspector.itemTrigger,
                    timeout = Inspector.itemTimeout,
                    text = Inspector.itemText.Length > 200 ? Inspector.itemText[..200] : Inspector.itemText,
                    putIn = Inspector.itemPutIn
                };
            }
            else
            {
                Map.items.Remove(key);
            }

            Map.generatorWallKinds.Remove(key);

            if (Inspector.monsterId > 0)
            {
                Map.monsters[key] = new MapMonsterRecord
                {
                    rawRecord = previousMonster?.rawRecord,
                    dirty = true,
                    monsterId = Inspector.monsterId,
                    x = x,
                    y = y,
                    timeout = Inspector.monsterTimeout
                };
            }
            else
            {
                Map.monsters.Remove(key);
            }

            SetInspectorFromTile(x, y);
            Changed?.Invoke();
        }

        public void GenerateMap(bool regenerate)
        {
            try
            {
                GeneratorSettings.seed = regenerate || string.IsNullOrWhiteSpace(GeneratorSettings.seed)
                    ? DateTime.UtcNow.Ticks.ToString()
                    : GeneratorSettings.seed;

                Map = MapGeneratorEngine.Generate(GeneratorSettings, Catalog);
                LastError = null;
                ResetUiState();
            }
            catch (Exception ex)
            {
                LastError = ex.Message;
            }

            Changed?.Invoke();
        }
    }
}
