using System;
using System.Collections.Generic;
using System.Linq;

namespace MyTools.Map.Generation
{
    // bool[,] grid helpers shared by every algorithm, ported from generator.js's makeBoolGrid/
    // carveRect/clearGridRect/carveCorridor. Grids are indexed [y, x] (row-major, matching the
    // reference's grid[y][x]) and sized [height, width].
    public static class GridPrimitives
    {
        public static bool[,] MakeGrid(int width, int height, bool value = false)
        {
            var grid = new bool[height, width];
            if (value)
            {
                for (int y = 0; y < height; y++)
                    for (int x = 0; x < width; x++)
                        grid[y, x] = true;
            }
            return grid;
        }

        public static void CarveRect(bool[,] grid, int x, int y, int width, int height) => SetRect(grid, x, y, width, height, true);

        public static void ClearRect(bool[,] grid, int x, int y, int width, int height) => SetRect(grid, x, y, width, height, false);

        private static void SetRect(bool[,] grid, int x, int y, int width, int height, bool value)
        {
            int rows = grid.GetLength(0);
            int cols = grid.GetLength(1);
            int y0 = Math.Max(0, y);
            int y1 = Math.Min(rows, y + height);
            int x0 = Math.Max(0, x);
            int x1 = Math.Min(cols, x + width);
            for (int yy = y0; yy < y1; yy++)
                for (int xx = x0; xx < x1; xx++)
                    grid[yy, xx] = value;
        }

        // Straight axis-aligned corridor between two points; only meaningful when ax==bx or
        // ay==by, matching the reference (diagonal calls are simply a no-op there too).
        public static void CarveCorridor(bool[,] grid, int ax, int ay, int bx, int by, int width)
        {
            int startX = Math.Min(ax, bx);
            int startY = Math.Min(ay, by);
            if (ax == bx)
                CarveRect(grid, ax - width / 2, startY, width, Math.Abs(by - ay) + 1);
            else if (ay == by)
                CarveRect(grid, startX, ay - width / 2, Math.Abs(bx - ax) + 1, width);
        }

        // Forces the outermost ring of the grid closed, matching enforceDungeonBorder - used after
        // freeform carving (cellular/BSP/etc.) so a wall auto-tiler always has a border to key off.
        public static void EnforceBorder(bool[,] grid)
        {
            int rows = grid.GetLength(0);
            int cols = grid.GetLength(1);
            for (int x = 0; x < cols; x++)
            {
                grid[0, x] = false;
                grid[rows - 1, x] = false;
            }
            for (int y = 0; y < rows; y++)
            {
                grid[y, 0] = false;
                grid[y, cols - 1] = false;
            }
        }

        // Keeps only the largest connected component of "open" (false) cells, filling every other
        // pocket back in as wall (true). Ported from generator.js's fillDisconnectedOpenWallPockets
        // - run after the vignette kinds (interior/encounter/wilderness/infrastructure/puzzle/
        // landmark/hazard) carve their walls, so a stray sealed-off room never blocks monster
        // spawning or leaves an unreachable area.
        public static void FillDisconnectedOpenPockets(bool[,] walls)
        {
            int rows = walls.GetLength(0);
            int cols = walls.GetLength(1);
            var unvisited = new HashSet<(int X, int Y)>();
            for (int y = 0; y < rows; y++)
                for (int x = 0; x < cols; x++)
                    if (!walls[y, x]) unvisited.Add((x, y));

            var largest = new HashSet<(int X, int Y)>();
            while (unvisited.Count > 0)
            {
                var first = unvisited.First();
                var component = new HashSet<(int X, int Y)> { first };
                var pending = new Stack<(int X, int Y)>();
                pending.Push(first);
                unvisited.Remove(first);
                while (pending.Count > 0)
                {
                    var (x, y) = pending.Pop();
                    foreach (var next in new[] { (x, y - 1), (x + 1, y), (x, y + 1), (x - 1, y) })
                    {
                        if (!unvisited.Contains(next)) continue;
                        unvisited.Remove(next);
                        component.Add(next);
                        pending.Push(next);
                    }
                }
                if (component.Count > largest.Count) largest = component;
            }

            for (int y = 0; y < rows; y++)
                for (int x = 0; x < cols; x++)
                    if (!largest.Contains((x, y))) walls[y, x] = true;
        }
    }
}
