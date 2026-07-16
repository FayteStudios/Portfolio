using System;
using System.Collections.Generic;
using System.Linq;

namespace MyTools.Map.Generation
{
    // Flood-fill connected components over a bool[,] grid, plus bent-corridor repair that stitches
    // the smallest component into the largest until everything is reachable. Ported from
    // generator.js's roadComponents/connectRoadComponents/nearestRoadPoint/carveRoadPath/
    // carveBentRoadPath - used by maze/dungeon carving and by every town road algorithm.
    public static class Connectivity
    {
        public static List<List<(int X, int Y)>> Components(bool[,] grid)
        {
            int rows = grid.GetLength(0);
            int cols = grid.GetLength(1);
            var unvisited = new HashSet<(int X, int Y)>();
            for (int y = 0; y < rows; y++)
                for (int x = 0; x < cols; x++)
                    if (grid[y, x]) unvisited.Add((x, y));

            var components = new List<List<(int X, int Y)>>();
            while (unvisited.Count > 0)
            {
                var first = unvisited.First();
                var pending = new Stack<(int X, int Y)>();
                pending.Push(first);
                unvisited.Remove(first);
                var component = new List<(int X, int Y)>();
                while (pending.Count > 0)
                {
                    var current = pending.Pop();
                    component.Add(current);
                    foreach (var next in new[]
                             {
                                 (current.X, current.Y - 1), (current.X + 1, current.Y),
                                 (current.X, current.Y + 1), (current.X - 1, current.Y)
                             })
                    {
                        if (!unvisited.Contains(next)) continue;
                        unvisited.Remove(next);
                        pending.Push(next);
                    }
                }
                components.Add(component);
            }
            return components;
        }

        public static void ConnectComponents(bool[,] grid, SeededRandom rng, int width)
        {
            var components = Components(grid);
            while (components.Count > 1)
            {
                components.Sort((a, b) => b.Count - a.Count);
                var main = components[0];
                var current = components[^1];
                (int X, int Y) bestA = default;
                (int X, int Y) bestB = default;
                int bestDistance = int.MaxValue;
                bool found = false;
                foreach (var a in current)
                    foreach (var b in main)
                    {
                        int distance = Math.Abs(a.X - b.X) + Math.Abs(a.Y - b.Y);
                        if (distance < bestDistance)
                        {
                            bestDistance = distance;
                            bestA = a;
                            bestB = b;
                            found = true;
                        }
                    }
                if (!found) return;
                CarveBentRoadPath(grid, bestA.X, bestA.Y, bestB.X, bestB.Y, width, rng, 6);
                components = Components(grid);
            }
        }

        public static (int X, int Y)? NearestRoadPoint(int x, int y, bool[,] grid)
        {
            int rows = grid.GetLength(0);
            int cols = grid.GetLength(1);
            (int X, int Y)? best = null;
            int bestDistance = int.MaxValue;
            for (int yy = 0; yy < rows; yy++)
                for (int xx = 0; xx < cols; xx++)
                {
                    if (!grid[yy, xx]) continue;
                    int distance = Math.Abs(xx - x) + Math.Abs(yy - y);
                    if (distance < bestDistance)
                    {
                        bestDistance = distance;
                        best = (xx, yy);
                    }
                }
            return best;
        }

        public static void CarveRoadPath(bool[,] grid, int ax, int ay, int bx, int by, int width, SeededRandom rng)
        {
            if (rng.NextDouble() < 0.5)
            {
                GridPrimitives.CarveCorridor(grid, ax, ay, bx, ay, width);
                GridPrimitives.CarveCorridor(grid, bx, ay, bx, by, width);
            }
            else
            {
                GridPrimitives.CarveCorridor(grid, ax, ay, ax, by, width);
                GridPrimitives.CarveCorridor(grid, ax, by, bx, by, width);
            }
        }

        public static void CarveBentRoadPath(bool[,] grid, int ax, int ay, int bx, int by, int width, SeededRandom rng, int bend = 4)
        {
            int maxX = grid.GetLength(1) - 1;
            int maxY = grid.GetLength(0) - 1;
            int distance = Math.Abs(bx - ax) + Math.Abs(by - ay);
            if (distance < 10 || rng.NextDouble() < 0.35)
            {
                CarveRoadPath(grid, ax, ay, bx, by, width, rng);
                return;
            }

            int midX = Math.Max(0, Math.Min(maxX, (ax + bx) / 2 + rng.NextInt(-bend, bend)));
            int midY = Math.Max(0, Math.Min(maxY, (ay + by) / 2 + rng.NextInt(-bend, bend)));
            CarveRoadPath(grid, ax, ay, midX, midY, width, rng);
            CarveRoadPath(grid, midX, midY, bx, by, width, rng);
        }
    }
}
