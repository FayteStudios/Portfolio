using System;
using System.Collections.Generic;
using System.Linq;

namespace MyTools.Map.Generation
{
    // Maze kind: "backtracker" (classic recursive-backtracker carving) and "cellular"
    // (cellular-automaton cave, forced fully connected). Ported from
    // generators/maze-algorithms.js's carveDepthFirstMaze/carveCellularMaze plus generator.js's
    // openMazeLink/bitCount/mazeCellCount and the maze endpoint-marker post-processing
    // (applyMazeEndpointSurfaces and friends).
    public static class MazeAlgorithms
    {
        public static void RegisterAll()
        {
            GeneratorRegistry.Register("maze", "backtracker", ctx =>
            {
                var (pathWidth, cols, rows) = Dimensions(ctx.Settings);
                var visited = new bool[rows, cols];
                var links = new Dictionary<(int, int), int>();
                CarveDepthFirst(ctx, pathWidth, cols, rows, visited, links, ctx.Settings.mazeDeadEnds / 100.0);
            });

            GeneratorRegistry.Register("maze", "cellular", ctx =>
            {
                var (pathWidth, _, _) = Dimensions(ctx.Settings);
                CarveCellular(ctx, pathWidth);
            });
        }

        // Interior cell grid dimensions for a given path width, matching mazeCellCount.
        public static (int PathWidth, int Cols, int Rows) Dimensions(GeneratorSettings settings)
        {
            int pathWidth = Math.Max(1, Math.Min(settings.mazePathWidth, Math.Min(settings.width - 2, settings.height - 2)));
            int cols = CellCount(settings.width, pathWidth);
            int rows = CellCount(settings.height, pathWidth);
            return (pathWidth, cols, rows);
        }

        private static int CellCount(int size, int pathWidth)
        {
            int interior = Math.Max(1, size - 2);
            return Math.Max(1, (interior - pathWidth) / (pathWidth + 1) + 1);
        }

        private static void CarveDepthFirst(GeneratorContext ctx, int pathWidth, int cols, int rows, bool[,] visited, Dictionary<(int, int), int> links, double keepDeadEndChance)
        {
            var rng = ctx.Rng;
            var walkable = ctx.Walkable;
            var stack = new List<(int X, int Y)> { (0, 0) };
            visited[0, 0] = true;
            GridPrimitives.CarveRect(walkable, 1, 1, pathWidth, pathWidth);

            while (stack.Count > 0)
            {
                var current = stack[^1];
                var candidates = CellNeighbors(current, cols, rows).Where(c => !visited[c.Y, c.X]).ToList();
                rng.Shuffle(candidates);
                if (candidates.Count == 0)
                {
                    stack.RemoveAt(stack.Count - 1);
                    continue;
                }
                var next = candidates[0];
                visited[next.Y, next.X] = true;
                OpenMazeLink(current.X, current.Y, next.X, next.Y, walkable, links, pathWidth);
                stack.Add(next);
            }

            for (int cy = 0; cy < rows; cy++)
            {
                for (int cx = 0; cx < cols; cx++)
                {
                    var cellKey = (cx, cy);
                    links.TryGetValue(cellKey, out int linkMask);
                    if (BitCount(linkMask) != 1 || rng.NextDouble() < keepDeadEndChance) continue;
                    var neighbors = CellNeighbors((cx, cy), cols, rows).ToList();
                    rng.Shuffle(neighbors);
                    foreach (var next in neighbors)
                    {
                        links.TryGetValue(cellKey, out int before);
                        OpenMazeLink(cx, cy, next.X, next.Y, walkable, links, pathWidth);
                        links.TryGetValue(cellKey, out int after);
                        if (after != before) break;
                    }
                }
            }
        }

        private static IEnumerable<(int X, int Y)> CellNeighbors((int X, int Y) cell, int cols, int rows) =>
            new[] { (cell.X, cell.Y - 1), (cell.X + 1, cell.Y), (cell.X, cell.Y + 1), (cell.X - 1, cell.Y) }
                .Where(c => c.Item1 >= 0 && c.Item2 >= 0 && c.Item1 < cols && c.Item2 < rows);

        private static void OpenMazeLink(int cx, int cy, int nx, int ny, bool[,] walkable, Dictionary<(int, int), int> links, int pathWidth)
        {
            int step = pathWidth + 1;
            int x = 1 + cx * step;
            int y = 1 + cy * step;
            int nextX = 1 + nx * step;
            int nextY = 1 + ny * step;
            GridPrimitives.CarveRect(walkable, x, y, pathWidth, pathWidth);
            GridPrimitives.CarveRect(walkable, nextX, nextY, pathWidth, pathWidth);
            var currentKey = (cx, cy);
            var nextKey = (nx, ny);
            if (!links.ContainsKey(currentKey)) links[currentKey] = 0;
            if (!links.ContainsKey(nextKey)) links[nextKey] = 0;

            if (nx > cx)
            {
                GridPrimitives.CarveRect(walkable, x + pathWidth, y, 1, pathWidth);
                links[currentKey] |= 2;
                links[nextKey] |= 8;
            }
            else if (nx < cx)
            {
                GridPrimitives.CarveRect(walkable, x - 1, y, 1, pathWidth);
                links[currentKey] |= 8;
                links[nextKey] |= 2;
            }
            else if (ny > cy)
            {
                GridPrimitives.CarveRect(walkable, x, y + pathWidth, pathWidth, 1);
                links[currentKey] |= 4;
                links[nextKey] |= 1;
            }
            else if (ny < cy)
            {
                GridPrimitives.CarveRect(walkable, x, y - 1, pathWidth, 1);
                links[currentKey] |= 1;
                links[nextKey] |= 4;
            }
        }

        private static int BitCount(int value)
        {
            int count = 0;
            while (value != 0)
            {
                count += value & 1;
                value >>= 1;
            }
            return count;
        }

        private static void CarveCellular(GeneratorContext ctx, int pathWidth)
        {
            var settings = ctx.Settings;
            var rng = ctx.Rng;
            var walkable = ctx.Walkable;
            for (int y = 1; y < settings.height - 1; y++)
                for (int x = 1; x < settings.width - 1; x++)
                    walkable[y, x] = rng.NextDouble() > 0.48;

            var current = walkable;
            for (int pass = 0; pass < 4; pass++)
            {
                var next = GridPrimitives.MakeGrid(settings.width, settings.height);
                for (int y = 1; y < settings.height - 1; y++)
                    for (int x = 1; x < settings.width - 1; x++)
                        next[y, x] = WallNeighborCount(current, x, y) < 5;
                current = next;
            }
            for (int y = 0; y < settings.height; y++)
                for (int x = 0; x < settings.width; x++)
                    walkable[y, x] = current[y, x];

            Connectivity.ConnectComponents(walkable, rng, Math.Max(1, pathWidth));
        }

        private static int WallNeighborCount(bool[,] walkable, int x, int y)
        {
            int rows = walkable.GetLength(0);
            int cols = walkable.GetLength(1);
            int walls = 0;
            for (int yy = y - 1; yy <= y + 1; yy++)
                for (int xx = x - 1; xx <= x + 1; xx++)
                {
                    if (xx == x && yy == y) continue;
                    if (yy < 0 || xx < 0 || yy >= rows || xx >= cols || !walkable[yy, xx]) walls++;
                }
            return walls;
        }

        // Post-processing run by MapGeneratorEngine after the wall grid is applied: finds the
        // start/end tiles (nearest-to-origin, then farthest-by-BFS), paints their marker surfaces,
        // optionally paints the solved path, and blocks those tiles from monster spawning. Ported
        // from generator.js's applyMazeEndpointSurfaces/nearestWalkableTile/farthestWalkableTile/
        // walkablePathBetween/paintMazeSolutionPath/paintMazeEndpointSurface.
        public static void ApplyEndpointSurfaces(MapDocument map, GeneratorSettings settings, bool[,] walkable)
        {
            var start = NearestWalkableTile(walkable, 1, 1);
            if (start == null) return;
            var end = FarthestWalkableTile(walkable, start.Value);
            var startKey = (start.Value.X + 1, start.Value.Y + 1);
            var endKey = (end.X + 1, end.Y + 1);

            PaintSolutionPath(map, settings, WalkablePathBetween(walkable, start.Value, end));
            var startKeys = PaintEndpointSurface(map, walkable, start.Value, settings.mazeStartSurface, settings.mazeMarkerSize);
            var endKeys = PaintEndpointSurface(map, walkable, end, settings.mazeEndSurface, settings.mazeMarkerSize);

            foreach (var key in new[] { startKey, endKey }.Concat(startKeys).Concat(endKeys))
                map.generatorSpawnBlockedKeys.Add(key);
        }

        private static (int X, int Y)? NearestWalkableTile(bool[,] walkable, int targetX, int targetY)
        {
            int rows = walkable.GetLength(0);
            int cols = walkable.GetLength(1);
            (int X, int Y)? best = null;
            int bestDistance = int.MaxValue;
            for (int y = 0; y < rows; y++)
                for (int x = 0; x < cols; x++)
                {
                    if (!walkable[y, x]) continue;
                    int distance = Math.Abs(x - targetX) + Math.Abs(y - targetY);
                    if (distance < bestDistance)
                    {
                        best = (x, y);
                        bestDistance = distance;
                    }
                }
            return best;
        }

        private static (int X, int Y) FarthestWalkableTile(bool[,] walkable, (int X, int Y) start)
        {
            var pending = new Queue<(int X, int Y)>();
            pending.Enqueue(start);
            var distances = new Dictionary<(int X, int Y), int> { [start] = 0 };
            var farthest = start;
            int farthestDistance = 0;
            while (pending.Count > 0)
            {
                var current = pending.Dequeue();
                int currentDistance = distances[current];
                if (currentDistance > farthestDistance)
                {
                    farthest = current;
                    farthestDistance = currentDistance;
                }
                foreach (var next in Neighbors(current))
                {
                    if (!InBounds(walkable, next) || !walkable[next.Y, next.X]) continue;
                    if (distances.ContainsKey(next)) continue;
                    distances[next] = currentDistance + 1;
                    pending.Enqueue(next);
                }
            }
            return farthest;
        }

        private static List<(int X, int Y)> WalkablePathBetween(bool[,] walkable, (int X, int Y) start, (int X, int Y) end)
        {
            var pending = new List<(int X, int Y)> { start };
            var parents = new Dictionary<(int X, int Y), (int X, int Y)?> { [start] = null };
            int index = 0;
            while (index < pending.Count)
            {
                var current = pending[index];
                index++;
                if (current.Equals(end)) break;
                foreach (var next in Neighbors(current))
                {
                    if (!InBounds(walkable, next) || !walkable[next.Y, next.X]) continue;
                    if (parents.ContainsKey(next)) continue;
                    parents[next] = current;
                    pending.Add(next);
                }
            }
            if (!parents.ContainsKey(end)) return new List<(int X, int Y)>();
            var path = new List<(int X, int Y)>();
            (int X, int Y)? currentKey = end;
            while (currentKey != null)
            {
                path.Add(currentKey.Value);
                currentKey = parents[currentKey.Value];
            }
            path.Reverse();
            return path;
        }

        private static IEnumerable<(int X, int Y)> Neighbors((int X, int Y) p) => new[]
        {
            (p.X, p.Y - 1), (p.X + 1, p.Y), (p.X, p.Y + 1), (p.X - 1, p.Y)
        };

        private static bool InBounds(bool[,] grid, (int X, int Y) p) =>
            p.Y >= 0 && p.X >= 0 && p.Y < grid.GetLength(0) && p.X < grid.GetLength(1);

        private static void PaintSolutionPath(MapDocument map, GeneratorSettings settings, List<(int X, int Y)> path)
        {
            if (!settings.mazeShowSolution || settings.mazePathSurface <= 0 || path.Count <= 2) return;
            foreach (var point in path.Skip(1).Take(path.Count - 2))
                map.surfaces[(point.X + 1, point.Y + 1)] = settings.mazePathSurface;
        }

        private static List<(int X, int Y)> PaintEndpointSurface(MapDocument map, bool[,] walkable, (int X, int Y) point, int surfaceId, int markerSize)
        {
            var painted = new List<(int X, int Y)>();
            if (surfaceId <= 0) return painted;
            int radius = Math.Max(1, markerSize) / 2;
            int rows = walkable.GetLength(0);
            int cols = walkable.GetLength(1);
            for (int y = point.Y - radius; y <= point.Y + radius; y++)
                for (int x = point.X - radius; x <= point.X + radius; x++)
                {
                    if (y < 0 || x < 0 || y >= rows || x >= cols || !walkable[y, x]) continue;
                    var key = (x + 1, y + 1);
                    map.surfaces[key] = surfaceId;
                    painted.Add(key);
                }
            return painted;
        }
    }
}
