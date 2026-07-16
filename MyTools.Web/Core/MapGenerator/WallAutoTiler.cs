using System.Collections.Generic;

namespace MyTools.Map.Generation
{
    // 4-neighbor bitmask -> wall "shape" classification, ported from generator.js's wallMaskAt/
    // wallKeyForMask/WALL_TYPE_OPTIONS/applyWallGrid/setGeneratedWall.
    public static class WallAutoTiler
    {
        public static readonly (string Key, string Label)[] WallTypeOptions =
        {
            ("full", "Block"),
            ("ns", "NS"),
            ("ew", "EW"),
            ("ne", "NE"),
            ("nw", "NW"),
            ("se", "SE"),
            ("sw", "SW"),
            ("teeN", "N T"),
            ("teeE", "E T"),
            ("teeS", "S T"),
            ("teeW", "W T"),
            ("cross", "Cross"),
            ("capN", "N End"),
            ("capE", "E End"),
            ("capS", "S End"),
            ("capW", "W End"),
            ("doorNs", "NS Door"),
            ("doorEw", "EW Door")
        };

        public static int MaskAt(bool[,] grid, int x, int y)
        {
            int rows = grid.GetLength(0);
            int cols = grid.GetLength(1);
            int mask = 0;
            if (y > 0 && grid[y - 1, x]) mask |= 1;
            if (x < cols - 1 && grid[y, x + 1]) mask |= 2;
            if (y < rows - 1 && grid[y + 1, x]) mask |= 4;
            if (x > 0 && grid[y, x - 1]) mask |= 8;
            return mask;
        }

        public static string KeyForMask(int mask) => mask switch
        {
            5 => "ns",
            10 => "ew",
            3 => "sw",
            9 => "se",
            6 => "nw",
            12 => "ne",
            14 => "teeN",
            13 => "teeE",
            11 => "teeS",
            7 => "teeW",
            15 => "cross",
            4 => "capN",
            8 => "capE",
            1 => "capS",
            2 => "capW",
            _ => "full"
        };

        // walls[wallKey] if set (and nonzero), else walls["full"], else fallbackItemId.
        public static int WallIdForKey(Dictionary<string, int> walls, string wallKey, int fallbackItemId = 0)
        {
            if (walls.TryGetValue(wallKey, out int keyed) && keyed > 0) return keyed;
            if (walls.TryGetValue("full", out int full) && full > 0) return full;
            return fallbackItemId;
        }

        public static MapItemRecord CreateItemRecord(int itemId, int x, int y) => new()
        {
            dirty = true,
            itemId = itemId,
            x = x,
            y = y
        };

        public static void SetWall(MapDocument map, int x, int y, string wallKey, Dictionary<string, int> walls, int fallbackItemId = 0)
        {
            var key = (x, y);
            int itemId = WallIdForKey(walls, wallKey, fallbackItemId);
            map.generatorWallKinds[key] = wallKey;
            if (itemId > 0)
                map.items[key] = CreateItemRecord(itemId, x, y);
            else
                map.items.Remove(key);
        }

        // Walks every set cell of a wall grid (indexed [y, x], 0-based) and stamps the matching
        // auto-tiled wall item onto the 1-based map tile at (x+1, y+1).
        public static void ApplyWallGrid(MapDocument map, bool[,] grid, Dictionary<string, int> walls, int fallbackItemId = 0)
        {
            int rows = grid.GetLength(0);
            int cols = grid.GetLength(1);
            for (int y = 0; y < rows; y++)
                for (int x = 0; x < cols; x++)
                {
                    if (!grid[y, x]) continue;
                    SetWall(map, x + 1, y + 1, KeyForMask(MaskAt(grid, x, y)), walls, fallbackItemId);
                }
        }
    }
}
