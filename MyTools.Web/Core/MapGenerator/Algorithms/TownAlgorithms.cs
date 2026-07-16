using System;
using System.Collections.Generic;
using System.Linq;

namespace MyTools.Map.Generation
{
    // Town kind: "village" (scattered settlement nodes connected to nearest neighbors + loop
    // roads) and "walled" (concentric ring road(s) around the center). Both share the building
    // placement machinery (addTownBuildingsToRoadGrid-equivalent): rectangular footprints with
    // auto-tiled walls + a door wired back to the nearest road. Ported from
    // generators/town-road-algorithms.js (village/walled/plannedConnection/settlementNodes/ring/...)
    // and generator.js's town road-grid/building helpers.
    //
    // ctx.Walkable doubles as the road grid here (true = road tile), per GeneratorContext's doc
    // comment - kept as "roads" locally to mirror the reference's naming.
    public static class TownAlgorithms
    {
        private readonly struct SquareRect
        {
            public readonly int X, Y, Width, Height, Cx, Cy;
            public SquareRect(int x, int y, int width, int height, int cx, int cy)
            {
                X = x; Y = y; Width = width; Height = height; Cx = cx; Cy = cy;
            }
        }

        public static void RegisterAll()
        {
            GeneratorRegistry.Register("town", "village", ctx => Village(ctx));
            GeneratorRegistry.Register("town", "walled", ctx => Walled(ctx));
        }

        private static (int X, int Y) Center(GeneratorSettings settings) => (settings.width / 2, settings.height / 2);

        private static int Distance((int X, int Y) a, (int X, int Y) b) => Math.Abs(a.X - b.X) + Math.Abs(a.Y - b.Y);

        private static List<(int X, int Y)> NearestNodes((int X, int Y) target, IEnumerable<(int X, int Y)> candidates, int limit) =>
            candidates.OrderBy(c => Distance(target, c)).Take(limit).ToList();

        private static List<(int X, int Y)> Gates(GeneratorContext ctx)
        {
            var settings = ctx.Settings;
            var rng = ctx.Rng;
            var c = Center(settings);
            var result = new List<(int X, int Y)>
            {
                (0, Math.Max(2, Math.Min(settings.height - 3, c.Y + rng.NextInt(-3, 3)))),
                (settings.width - 1, Math.Max(2, Math.Min(settings.height - 3, c.Y + rng.NextInt(-3, 3))))
            };
            if (settings.townLayout != "village" || settings.townSquare || rng.NextDouble() < 0.65)
                result.Add((Math.Max(2, Math.Min(settings.width - 3, c.X + rng.NextInt(-3, 3))), 0));
            if (settings.townSquare || rng.NextDouble() < 0.55)
                result.Add((Math.Max(2, Math.Min(settings.width - 3, c.X + rng.NextInt(-3, 3))), settings.height - 1));
            return result;
        }

        private static int NodeCount(GeneratorSettings settings) => Math.Max(5, settings.townBuildings / 3);

        private static List<(int X, int Y)> SettlementNodes(GeneratorContext ctx)
        {
            var settings = ctx.Settings;
            var rng = ctx.Rng;
            var c = Center(settings);
            SquareRect? square = settings.townSquare ? TownSquareRect(settings) : null;
            int count = NodeCount(settings);
            var nodes = new List<(int X, int Y)>();
            int minDistance = Math.Max(5, Math.Min(settings.width, settings.height) / 8);
            int attempts = 0;
            double radiusX = settings.width * 0.34;
            double radiusY = settings.height * 0.34;
            while (nodes.Count < count && attempts < count * 80)
            {
                attempts++;
                double angle = rng.NextDouble() * Math.PI * 2;
                double spread = 0.35 + rng.NextDouble() * 0.65;
                int x = Math.Max(3, Math.Min(settings.width - 4, (int)Math.Round(c.X + Math.Cos(angle) * radiusX * spread + rng.NextInt(-3, 3))));
                int y = Math.Max(3, Math.Min(settings.height - 4, (int)Math.Round(c.Y + Math.Sin(angle) * radiusY * spread + rng.NextInt(-3, 3))));
                if (square is { } sq && x >= sq.X - 2 && x < sq.X + sq.Width + 2 && y >= sq.Y - 2 && y < sq.Y + sq.Height + 2) continue;
                if (nodes.Any(node => Distance(node, (x, y)) < minDistance)) continue;
                nodes.Add((x, y));
            }
            return nodes;
        }

        private static void PlannedConnection(GeneratorContext ctx, (int X, int Y) a, (int X, int Y) b, int bend)
        {
            var roads = ctx.Walkable;
            int roadWidth = ctx.Settings.townRoadWidth;
            var rng = ctx.Rng;
            int jitter = Math.Max(2, bend);
            if (rng.NextDouble() < 0.45)
            {
                Connectivity.CarveBentRoadPath(roads, a.X, a.Y, b.X, b.Y, roadWidth, rng, bend);
                return;
            }
            var mid = (
                X: Math.Max(0, Math.Min(roads.GetLength(1) - 1, (int)Math.Round((a.X + b.X) / 2.0) + rng.NextInt(-jitter, jitter))),
                Y: Math.Max(0, Math.Min(roads.GetLength(0) - 1, (int)Math.Round((a.Y + b.Y) / 2.0) + rng.NextInt(-jitter, jitter)))
            );
            Connectivity.CarveRoadPath(roads, a.X, a.Y, mid.X, mid.Y, roadWidth, rng);
            Connectivity.CarveRoadPath(roads, mid.X, mid.Y, b.X, b.Y, roadWidth, rng);
        }

        private static void Village(GeneratorContext ctx)
        {
            var settings = ctx.Settings;
            var rng = ctx.Rng;
            var c = Center(settings);
            var gateList = Gates(ctx);
            var anchors = new List<(int X, int Y)>(settings.townSquare ? gateList : new List<(int X, int Y)> { c }.Concat(gateList));
            var nodes = SettlementNodes(ctx);
            var connected = new List<(int X, int Y)>(anchors);
            const int bend = 7;
            if (!settings.townSquare)
                foreach (var gate in gateList) PlannedConnection(ctx, c, gate, bend);

            foreach (var node in nodes.OrderBy(n => Distance(n, c)))
            {
                foreach (var target in NearestNodes(node, connected, 2)) PlannedConnection(ctx, node, target, bend);
                connected.Add(node);
            }

            int loopCount = nodes.Count / 3;
            for (int i = 0; i < loopCount; i++)
            {
                if (nodes.Count == 0) continue;
                var a = nodes[rng.NextInt(0, nodes.Count - 1)];
                var targets = NearestNodes(a, nodes.Where(n => n != a && Distance(n, a) > 8), 3);
                if (targets.Count == 0) continue;
                var target = targets[rng.NextInt(0, targets.Count - 1)];
                PlannedConnection(ctx, a, target, bend);
            }
        }

        private static void Ring(GeneratorContext ctx, int left, int top, int right, int bottom)
        {
            var roads = ctx.Walkable;
            int roadWidth = ctx.Settings.townRoadWidth;
            GridPrimitives.CarveCorridor(roads, left, top, right, top, roadWidth);
            GridPrimitives.CarveCorridor(roads, right, top, right, bottom, roadWidth);
            GridPrimitives.CarveCorridor(roads, right, bottom, left, bottom, roadWidth);
            GridPrimitives.CarveCorridor(roads, left, bottom, left, top, roadWidth);
        }

        private static void Walled(GeneratorContext ctx)
        {
            var settings = ctx.Settings;
            var roads = ctx.Walkable;
            int roadWidth = settings.townRoadWidth;
            int margin = Math.Max(4, roadWidth * 2);
            int left = margin;
            int top = margin;
            int right = settings.width - 1 - margin;
            int bottom = settings.height - 1 - margin;
            var c = Center(settings);
            Ring(ctx, left, top, right, bottom);
            GridPrimitives.CarveCorridor(roads, c.X, top, c.X, bottom, roadWidth);
            GridPrimitives.CarveCorridor(roads, left, c.Y, right, c.Y, roadWidth);
            GridPrimitives.CarveCorridor(roads, c.X, 0, c.X, top, roadWidth);
            GridPrimitives.CarveCorridor(roads, c.X, bottom, c.X, settings.height - 1, roadWidth);
            GridPrimitives.CarveCorridor(roads, 0, c.Y, left, c.Y, roadWidth);
            GridPrimitives.CarveCorridor(roads, right, c.Y, settings.width - 1, c.Y, roadWidth);
            int innerPad = Math.Max(7, Math.Min(settings.width, settings.height) / 6);
            int innerLeft = Math.Max(left + 3, c.X - innerPad);
            int innerRight = Math.Min(right - 3, c.X + innerPad);
            int innerTop = Math.Max(top + 3, c.Y - innerPad);
            int innerBottom = Math.Min(bottom - 3, c.Y + innerPad);
            if (innerRight - innerLeft > 8 && innerBottom - innerTop > 8) Ring(ctx, innerLeft, innerTop, innerRight, innerBottom);
        }

        // --- Town square -----------------------------------------------------------------

        private static SquareRect TownSquareRect(GeneratorSettings settings)
        {
            int maxSize = Math.Max(3, Math.Min(settings.width, settings.height) - 4);
            int minSize = Math.Min(maxSize, Math.Max(settings.townRoadWidth * 3, 7));
            int size = Math.Max(minSize, Math.Min(settings.width, settings.height) / 5);
            size = Math.Min(size, maxSize);
            if (size % 2 == 0) size += 1;
            if (size > maxSize) size -= 2;
            size = Math.Max(minSize, size);
            return new SquareRect(
                (settings.width - size) / 2,
                (settings.height - size) / 2,
                size, size,
                settings.width / 2, settings.height / 2);
        }

        private static SquareRect AddTownSquareRoads(GeneratorSettings settings, bool[,] roads)
        {
            var square = TownSquareRect(settings);
            GridPrimitives.CarveRect(roads, square.X, square.Y, square.Width, square.Height);
            GridPrimitives.CarveCorridor(roads, square.Cx, 0, square.Cx, settings.height - 1, settings.townRoadWidth);
            GridPrimitives.CarveCorridor(roads, 0, square.Cy, settings.width - 1, square.Cy, settings.townRoadWidth);
            return square;
        }

        private static List<(int X, int Y, int SquareSide)> TownSquareFrontageTiles(GeneratorSettings settings, bool[,] roads)
        {
            var tiles = new List<(int X, int Y, int SquareSide)>();
            if (!settings.townSquare) return tiles;
            var square = TownSquareRect(settings);
            for (int x = square.X; x < square.X + square.Width; x++)
            {
                if (roads[square.Y, x]) tiles.Add((x, square.Y, 0));
                int bottomY = square.Y + square.Height - 1;
                if (roads[bottomY, x]) tiles.Add((x, bottomY, 2));
            }
            for (int y = square.Y; y < square.Y + square.Height; y++)
            {
                if (roads[y, square.X]) tiles.Add((square.X, y, 3));
                int rightX = square.X + square.Width - 1;
                if (roads[y, rightX]) tiles.Add((rightX, y, 1));
            }
            return tiles;
        }

        private static void ApplyTownRoadSymmetry(bool[,] roads)
        {
            int height = roads.GetLength(0);
            int width = roads.GetLength(1);
            for (int y = 0; y < height; y++)
                for (int x = 0; x < width; x++)
                {
                    if (!roads[y, x]) continue;
                    roads[y, width - 1 - x] = true;
                    roads[height - 1 - y, x] = true;
                    roads[height - 1 - y, width - 1 - x] = true;
                }
        }

        // --- Road-grid cleanup -------------------------------------------------------------

        private static int RoadNeighborCount(bool[,] roads, int x, int y)
        {
            int rows = roads.GetLength(0), cols = roads.GetLength(1);
            int count = 0;
            if (y > 0 && roads[y - 1, x]) count++;
            if (x < cols - 1 && roads[y, x + 1]) count++;
            if (y < rows - 1 && roads[y + 1, x]) count++;
            if (x > 0 && roads[y, x - 1]) count++;
            return count;
        }

        private static void PruneNarrowRoadDeadEnds(bool[,] roads, int maxPasses = 80)
        {
            int rows = roads.GetLength(0), cols = roads.GetLength(1);
            for (int pass = 0; pass < maxPasses; pass++)
            {
                var toRemove = new List<(int X, int Y)>();
                for (int y = 1; y < rows - 1; y++)
                    for (int x = 1; x < cols - 1; x++)
                    {
                        if (!roads[y, x]) continue;
                        if (RoadNeighborCount(roads, x, y) <= 1) toRemove.Add((x, y));
                    }
                if (toRemove.Count == 0) return;
                foreach (var cell in toRemove) roads[cell.Y, cell.X] = false;
            }
        }

        private static void FillRoadPinholes(bool[,] roads)
        {
            int rows = roads.GetLength(0), cols = roads.GetLength(1);
            var toFill = new List<(int X, int Y)>();
            for (int y = 1; y < rows - 1; y++)
                for (int x = 1; x < cols - 1; x++)
                {
                    if (roads[y, x]) continue;
                    bool north = roads[y - 1, x];
                    bool east = roads[y, x + 1];
                    bool south = roads[y + 1, x];
                    bool west = roads[y, x - 1];
                    if ((north && south && (east || west)) || (east && west && (north || south))) toFill.Add((x, y));
                }
            foreach (var cell in toFill) roads[cell.Y, cell.X] = true;
        }

        private static void PruneThinRoadLines(bool[,] roads, int roadWidth, int maxPasses = 20)
        {
            if (roadWidth <= 1) return;
            int rows = roads.GetLength(0), cols = roads.GetLength(1);
            for (int pass = 0; pass < maxPasses; pass++)
            {
                var toRemove = new List<(int X, int Y)>();
                for (int y = 1; y < rows - 1; y++)
                    for (int x = 1; x < cols - 1; x++)
                    {
                        if (!roads[y, x]) continue;
                        bool north = roads[y - 1, x];
                        bool east = roads[y, x + 1];
                        bool south = roads[y + 1, x];
                        bool west = roads[y, x - 1];
                        bool narrowHorizontal = east && west && !north && !south;
                        bool narrowVertical = north && south && !east && !west;
                        if (narrowHorizontal || narrowVertical) toRemove.Add((x, y));
                    }
                if (toRemove.Count == 0) return;
                foreach (var cell in toRemove) roads[cell.Y, cell.X] = false;
                PruneNarrowRoadDeadEnds(roads, 8);
            }
        }

        private static void CleanTownRoadGrid(bool[,] roads, int roadWidth)
        {
            FillRoadPinholes(roads);
            PruneNarrowRoadDeadEnds(roads);
            PruneThinRoadLines(roads, roadWidth);
            FillRoadPinholes(roads);
            PruneNarrowRoadDeadEnds(roads);
        }

        private static List<(int X, int Y)> CollectRoadTiles(bool[,] roads)
        {
            var tiles = new List<(int X, int Y)>();
            int rows = roads.GetLength(0), cols = roads.GetLength(1);
            for (int y = 0; y < rows; y++)
                for (int x = 0; x < cols; x++)
                    if (roads[y, x]) tiles.Add((x, y));
            return tiles;
        }

        // --- Road grid construction (called by MapGeneratorEngine) --------------------------

        public static bool[,] CreateRoadGrid(GeneratorSettings settings, SeededRandom rng)
        {
            var roads = GridPrimitives.MakeGrid(settings.width, settings.height);
            var ctx = new GeneratorContext(settings, rng, MapDocument.CreateEmpty(settings.width, settings.height), roads);
            var algorithm = GeneratorRegistry.Get("town", settings.townLayout) ?? GeneratorRegistry.Get("town", "village");
            algorithm?.Invoke(ctx);
            if (settings.townSquare) AddTownSquareRoads(settings, roads);
            if (settings.townSymmetry) ApplyTownRoadSymmetry(roads);
            Connectivity.ConnectComponents(roads, rng, settings.townRoadWidth);
            CleanTownRoadGrid(roads, settings.townRoadWidth);
            return roads;
        }

        public static void SyncRoadGridToMap(MapDocument map, bool[,] roads, GeneratorSettings settings)
        {
            map.generatorRoadKeys.Clear();
            int rows = roads.GetLength(0), cols = roads.GetLength(1);
            for (int y = 0; y < rows; y++)
                for (int x = 0; x < cols; x++)
                {
                    if (!roads[y, x]) continue;
                    var key = (x + 1, y + 1);
                    if (map.items.ContainsKey(key)) continue;
                    map.surfaces[key] = settings.roadSurface;
                    map.generatorRoadKeys.Add(key);
                }
        }

        // --- Building placement --------------------------------------------------------------

        private static bool RectTouchesRoad(int x, int y, int width, int height, bool[,] roads)
        {
            int rows = roads.GetLength(0), cols = roads.GetLength(1);
            for (int yy = Math.Max(0, y - 1); yy < Math.Min(rows, y + height + 1); yy++)
                for (int xx = Math.Max(0, x - 1); xx < Math.Min(cols, x + width + 1); xx++)
                    if (roads[yy, xx]) return true;
            return false;
        }

        private static bool RectOverlapsGrid(int x, int y, int width, int height, bool[,] grid)
        {
            int rows = grid.GetLength(0), cols = grid.GetLength(1);
            for (int yy = Math.Max(0, y - 1); yy < Math.Min(rows, y + height + 1); yy++)
                for (int xx = Math.Max(0, x - 1); xx < Math.Min(cols, x + width + 1); xx++)
                    if (grid[yy, xx]) return true;
            return false;
        }

        private static bool RectCellsOverlapGrid(int x, int y, int width, int height, bool[,] grid)
        {
            int rows = grid.GetLength(0), cols = grid.GetLength(1);
            for (int yy = Math.Max(0, y); yy < Math.Min(rows, y + height); yy++)
                for (int xx = Math.Max(0, x); xx < Math.Min(cols, x + width); xx++)
                    if (grid[yy, xx]) return true;
            return false;
        }

        private static bool RectInsideGrid(int x, int y, int width, int height, bool[,] grid) =>
            x >= 1 && y >= 1 && y + height < grid.GetLength(0) - 1 && x + width < grid.GetLength(1) - 1;

        private sealed class Placement
        {
            public int X, Y, DoorSide;
            public (int X, int Y)? RoadAccess;
            public (int X, int Y)? RoadAnchor;
        }

        private static Placement BuildingPlacementFromRoad((int X, int Y) road, int side, int width, int height, SeededRandom rng, GeneratorSettings settings)
        {
            int shift = rng.NextInt(-2, 2);
            int setback = Math.Max(0, Math.Min(8, settings.townSetback));
            return side switch
            {
                0 => new Placement { X = road.X - width / 2 + shift, Y = road.Y - height - setback, DoorSide = 1, RoadAnchor = road },
                1 => new Placement { X = road.X + 1 + setback, Y = road.Y - height / 2 + shift, DoorSide = 2, RoadAnchor = road },
                2 => new Placement { X = road.X - width / 2 + shift, Y = road.Y + 1 + setback, DoorSide = 0, RoadAnchor = road },
                _ => new Placement { X = road.X - width - setback, Y = road.Y - height / 2 + shift, DoorSide = 3, RoadAnchor = road }
            };
        }

        private static (int X, int Y) DoorPointForBuilding(int x, int y, int width, int height, int doorSide) => doorSide switch
        {
            0 => (x + width / 2, y - 1),
            1 => (x + width / 2, y + height),
            2 => (x - 1, y + height / 2),
            _ => (x + width, y + height / 2)
        };

        private static (int X, int Y) DoorWallPointForBuilding(int x, int y, int width, int height, int doorSide) => doorSide switch
        {
            0 => (x + width / 2, y),
            1 => (x + width / 2, y + height - 1),
            2 => (x, y + height / 2),
            _ => (x + width - 1, y + height / 2)
        };

        private static string DoorWallKeyForSide(int doorSide) => doorSide is 0 or 1 ? "doorEw" : "doorNs";

        private static bool HasDoorWallItem(GeneratorSettings settings, int doorSide) =>
            WallAutoTiler.WallIdForKey(settings.walls, DoorWallKeyForSide(doorSide)) > 0;

        private static bool PointInGrid((int X, int Y) point, bool[,] grid) =>
            point.X >= 0 && point.Y >= 0 && point.Y < grid.GetLength(0) && point.X < grid.GetLength(1);

        private static (int X, int Y)? NearestRoadPointForDoorSide(int x, int y, int width, int height, int doorSide, bool[,] roads, (int X, int Y) from)
        {
            bool Allowed((int X, int Y) road) => doorSide switch
            {
                0 => road.Y <= y - 1,
                1 => road.Y >= y + height,
                2 => road.X <= x - 1,
                _ => road.X >= x + width
            };

            int rows = roads.GetLength(0), cols = roads.GetLength(1);
            (int X, int Y)? best = null;
            int bestDistance = int.MaxValue;
            for (int yy = 0; yy < rows; yy++)
                for (int xx = 0; xx < cols; xx++)
                {
                    if (!roads[yy, xx]) continue;
                    var road = (X: xx, Y: yy);
                    if (!Allowed(road)) continue;
                    int distance = Math.Abs(xx - from.X) + Math.Abs(yy - from.Y);
                    if (distance < bestDistance)
                    {
                        bestDistance = distance;
                        best = road;
                    }
                }
            return best;
        }

        private static Placement? NearestRoadPointAroundRect(int x, int y, int width, int height, bool[,] roads)
        {
            var candidates = new List<(int X, int Y, int DoorSide)>();
            for (int xx = x; xx < x + width; xx++)
            {
                candidates.Add((xx, y - 1, 0));
                candidates.Add((xx, y + height, 1));
            }
            for (int yy = y; yy < y + height; yy++)
            {
                candidates.Add((x - 1, yy, 2));
                candidates.Add((x + width, yy, 3));
            }

            (int X, int Y, int DoorSide)? bestFrom = null;
            (int X, int Y)? bestTo = null;
            int bestDistance = int.MaxValue;
            foreach (var candidate in candidates)
            {
                if (candidate.X < 0 || candidate.Y < 0 || candidate.Y >= roads.GetLength(0) || candidate.X >= roads.GetLength(1)) continue;
                var road = NearestRoadPointForDoorSide(x, y, width, height, candidate.DoorSide, roads, (candidate.X, candidate.Y));
                if (road == null) continue;
                int distance = Math.Abs(road.Value.X - candidate.X) + Math.Abs(road.Value.Y - candidate.Y);
                if (distance < bestDistance)
                {
                    bestDistance = distance;
                    bestFrom = candidate;
                    bestTo = road;
                }
            }
            if (bestFrom == null || bestTo == null) return null;
            return new Placement
            {
                DoorSide = bestFrom.Value.DoorSide,
                RoadAccess = (bestFrom.Value.X, bestFrom.Value.Y),
                RoadAnchor = bestTo
            };
        }

        private static void CarveExteriorDoorConnection(bool[,] roads, (int X, int Y) from, (int X, int Y) to, int doorSide, int width)
        {
            if (!PointInGrid(from, roads) || !PointInGrid(to, roads)) return;
            if (doorSide is 0 or 1)
            {
                GridPrimitives.CarveCorridor(roads, from.X, from.Y, to.X, from.Y, width);
                GridPrimitives.CarveCorridor(roads, to.X, from.Y, to.X, to.Y, width);
            }
            else
            {
                GridPrimitives.CarveCorridor(roads, from.X, from.Y, from.X, to.Y, width);
                GridPrimitives.CarveCorridor(roads, from.X, to.Y, to.X, to.Y, width);
            }
        }

        private static void CarveDoorRoadConnection(bool[,] roads, int x, int y, int width, int height, Placement placement, GeneratorSettings settings)
        {
            var door = DoorPointForBuilding(x, y, width, height, placement.DoorSide);
            if (!PointInGrid(door, roads)) return;
            var access = placement.RoadAccess is { } ra && PointInGrid(ra, roads) ? ra : door;

            bool AnchorAllowed((int X, int Y) road) => placement.DoorSide switch
            {
                0 => road.Y <= y - 1,
                1 => road.Y >= y + height,
                2 => road.X <= x - 1,
                _ => road.X >= x + width
            };

            (int X, int Y)? anchoredRoad = placement.RoadAnchor is { } anchor && PointInGrid(anchor, roads) && AnchorAllowed(anchor) ? anchor : null;
            var target = anchoredRoad ?? NearestRoadPointForDoorSide(x, y, width, height, placement.DoorSide, roads, access);
            if (target == null) return;
            CarveExteriorDoorConnection(roads, door, access, placement.DoorSide, settings.townRoadWidth);
            CarveExteriorDoorConnection(roads, access, target.Value, placement.DoorSide, settings.townRoadWidth);
        }

        private static void SetBuildingDoor(bool[,] buildingWalls, Dictionary<(int X, int Y), string> doorWalls, GeneratorSettings settings, SeededRandom rng, int x, int y, int width, int height, int doorSide)
        {
            var door = DoorWallPointForBuilding(x, y, width, height, doorSide);
            string doorKey = DoorWallKeyForSide(doorSide);
            bool useDoorWall = HasDoorWallItem(settings, doorSide) && rng.NextInt(1, 100) <= settings.townDoorPercent;
            if (useDoorWall)
            {
                buildingWalls[door.Y, door.X] = true;
                doorWalls[(door.X + 1, door.Y + 1)] = doorKey;
            }
            else
            {
                buildingWalls[door.Y, door.X] = false;
            }
        }

        private static List<int> HouseSurfaceIds(GeneratorSettings settings)
        {
            var ids = (settings.townHouseSurfaces ?? "")
                .Split(',')
                .Select(part => int.TryParse(part.Trim(), out int value) ? value : (int?)null)
                .Where(v => v is >= 1 and <= 32767)
                .Select(v => v!.Value)
                .Distinct()
                .ToList();
            if (ids.Count > 0) return ids;
            return Enumerable.Range(101, 34).ToList();
        }

        private static int RandomHouseSurfaceId(GeneratorSettings settings, SeededRandom rng)
        {
            var ids = HouseSurfaceIds(settings);
            return ids[rng.NextInt(0, ids.Count - 1)];
        }

        private static void SurfaceBuildingEndPieces(MapDocument map, bool[,] buildingWalls, int surfaceId, int x, int y, int width, int height)
        {
            for (int yy = y; yy < y + height; yy++)
                for (int xx = x; xx < x + width; xx++)
                {
                    if (!buildingWalls[yy, xx]) continue;
                    string wallKey = WallAutoTiler.KeyForMask(WallAutoTiler.MaskAt(buildingWalls, xx, yy));
                    if (wallKey is not ("capN" or "capE" or "capS" or "capW")) continue;
                    map.surfaces[(xx + 1, yy + 1)] = surfaceId;
                }
        }

        private static void ApplyBuildingInteriorSurface(MapDocument map, GeneratorSettings settings, SeededRandom rng, bool[,] buildingWalls, int x, int y, int width, int height, int doorSide)
        {
            int surfaceId = settings.townSurfaceInteriors ? RandomHouseSurfaceId(settings, rng) : settings.floorSurface;
            SetMapSurfaceRect(map, x + 2, y + 2, Math.Max(1, width - 2), Math.Max(1, height - 2), surfaceId);
            if (settings.townSurfaceInteriors)
            {
                var door = DoorWallPointForBuilding(x, y, width, height, doorSide);
                map.surfaces[(door.X + 1, door.Y + 1)] = surfaceId;
                SurfaceBuildingEndPieces(map, buildingWalls, surfaceId, x, y, width, height);
            }
        }

        private static void SetMapSurfaceRect(MapDocument map, int x, int y, int width, int height, int surfaceId)
        {
            for (int yy = Math.Max(1, y); yy <= Math.Min(map.height, y + height - 1); yy++)
                for (int xx = Math.Max(1, x); xx <= Math.Min(map.width, x + width - 1); xx++)
                    map.surfaces[(xx, yy)] = surfaceId;
        }

        private static void MarkExistingItemFootprints(bool[,] occupied, MapDocument map)
        {
            var remaining = new HashSet<(int X, int Y)>(map.items.Keys);
            while (remaining.Count > 0)
            {
                var first = remaining.First();
                var pending = new Stack<(int X, int Y)>();
                pending.Push(first);
                remaining.Remove(first);
                int minX = int.MaxValue, maxX = int.MinValue, minY = int.MaxValue, maxY = int.MinValue;
                while (pending.Count > 0)
                {
                    var (x, y) = pending.Pop();
                    minX = Math.Min(minX, x - 1);
                    maxX = Math.Max(maxX, x - 1);
                    minY = Math.Min(minY, y - 1);
                    maxY = Math.Max(maxY, y - 1);
                    foreach (var next in new[] { (x, y - 1), (x + 1, y), (x, y + 1), (x - 1, y) })
                    {
                        if (!remaining.Contains(next)) continue;
                        remaining.Remove(next);
                        pending.Push(next);
                    }
                }
                if (minX != int.MaxValue) GridPrimitives.CarveRect(occupied, minX - 1, minY - 1, maxX - minX + 3, maxY - minY + 3);
            }
        }

        private static bool PlaceTownBuilding(MapDocument map, GeneratorSettings settings, SeededRandom rng, bool[,] roads, bool[,] buildingWalls, Dictionary<(int X, int Y), string> doorWalls, bool[,] buildingFootprints, bool[,] occupied, Placement placement, int width, int height, bool connectRoad)
        {
            int x = placement.X;
            int y = placement.Y;
            if (!RectInsideGrid(x, y, width, height, roads)) return false;
            if (RectCellsOverlapGrid(x, y, width, height, roads)) return false;
            if (RectOverlapsGrid(x, y, width, height, occupied)) return false;

            if (connectRoad) CarveDoorRoadConnection(roads, x, y, width, height, placement, settings);

            GridPrimitives.ClearRect(roads, x, y, width, height);
            GridPrimitives.CarveRect(occupied, x - 1, y - 1, width + 2, height + 2);
            GridPrimitives.CarveRect(buildingFootprints, x, y, width, height);
            for (int xx = x; xx < x + width; xx++)
            {
                buildingWalls[y, xx] = true;
                buildingWalls[y + height - 1, xx] = true;
            }
            for (int yy = y; yy < y + height; yy++)
            {
                buildingWalls[yy, x] = true;
                buildingWalls[yy, x + width - 1] = true;
            }
            SetBuildingDoor(buildingWalls, doorWalls, settings, rng, x, y, width, height, placement.DoorSide);
            ApplyBuildingInteriorSurface(map, settings, rng, buildingWalls, x, y, width, height, placement.DoorSide);
            return true;
        }

        public static int AddBuildingsToRoadGrid(MapDocument map, GeneratorSettings settings, SeededRandom rng, bool[,] roads)
        {
            var buildingWalls = GridPrimitives.MakeGrid(settings.width, settings.height);
            var doorWalls = new Dictionary<(int X, int Y), string>();
            var buildingFootprints = GridPrimitives.MakeGrid(settings.width, settings.height);
            var occupied = GridPrimitives.MakeGrid(settings.width, settings.height);
            MarkExistingItemFootprints(occupied, map);
            int buildingMin = Math.Min(settings.townBuildingMin, settings.townBuildingMax);
            int buildingMax = Math.Max(settings.townBuildingMin, settings.townBuildingMax);
            int placed = 0;

            bool TryRoadside()
            {
                int width = rng.NextInt(buildingMin, buildingMax);
                int height = rng.NextInt(buildingMin, buildingMax);
                var squareTiles = TownSquareFrontageTiles(settings, roads);
                var roadTiles = squareTiles.Count > 0 && rng.NextDouble() < 0.75
                    ? squareTiles.Select(t => (t.X, t.Y, (int?)t.SquareSide)).ToList()
                    : CollectRoadTiles(roads).Select(t => (t.X, t.Y, (int?)null)).ToList();
                if (roadTiles.Count == 0) return false;
                var road = roadTiles[rng.NextInt(0, roadTiles.Count - 1)];
                Placement placement;
                if (road.Item3 is int squareSide)
                    placement = BuildingPlacementFromRoad((road.X, road.Y), squareSide, width, height, rng, settings);
                else
                    placement = BuildingPlacementFromRoad((road.X, road.Y), rng.NextInt(0, 3), width, height, rng, settings);
                return PlaceTownBuilding(map, settings, rng, roads, buildingWalls, doorWalls, buildingFootprints, occupied, placement, width, height, true);
            }

            bool TryInfill()
            {
                int width = rng.NextInt(buildingMin, buildingMax);
                int height = rng.NextInt(buildingMin, buildingMax);
                int x = rng.NextInt(1, Math.Max(1, settings.width - width - 2));
                int y = rng.NextInt(1, Math.Max(1, settings.height - height - 2));
                if (!RectTouchesRoad(x, y, width, height, roads)) return false;
                var spur = NearestRoadPointAroundRect(x, y, width, height, roads);
                var placement = spur ?? new Placement { DoorSide = rng.NextInt(0, 3) };
                placement.X = x;
                placement.Y = y;
                return PlaceTownBuilding(map, settings, rng, roads, buildingWalls, doorWalls, buildingFootprints, occupied, placement, width, height, true);
            }

            bool TryScattered()
            {
                int width = rng.NextInt(buildingMin, buildingMax);
                int height = rng.NextInt(buildingMin, buildingMax);
                int x = rng.NextInt(1, Math.Max(1, settings.width - width - 2));
                int y = rng.NextInt(1, Math.Max(1, settings.height - height - 2));
                var spur = NearestRoadPointAroundRect(x, y, width, height, roads);
                var placement = spur ?? new Placement { DoorSide = rng.NextInt(0, 3) };
                placement.X = x;
                placement.Y = y;
                return PlaceTownBuilding(map, settings, rng, roads, buildingWalls, doorWalls, buildingFootprints, occupied, placement, width, height, true);
            }

            Func<bool> primary = settings.townBuildMode == "infill" ? TryInfill : settings.townBuildMode == "scattered" ? TryScattered : TryRoadside;
            Func<bool> secondary = settings.townBuildMode == "roadside" ? TryInfill : TryRoadside;
            int attempts = 0;
            while (placed < settings.townBuildings && attempts < settings.townBuildings * 120)
            {
                attempts++;
                if (primary() || secondary()) placed++;
            }

            for (int y = 0; y < settings.height; y++)
                for (int x = 0; x < settings.width; x++)
                    if (buildingFootprints[y, x]) roads[y, x] = false;

            CleanTownRoadGrid(roads, settings.townRoadWidth);
            WallAutoTiler.ApplyWallGrid(map, buildingWalls, settings.walls);
            foreach (var (key, doorKey) in doorWalls)
                WallAutoTiler.SetWall(map, key.X, key.Y, doorKey, settings.walls);
            return placed;
        }
    }
}
