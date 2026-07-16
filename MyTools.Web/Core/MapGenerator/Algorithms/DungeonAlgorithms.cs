using System;
using System.Collections.Generic;
using System.Linq;

namespace MyTools.Map.Generation
{
    // Dungeon kind: "rooms" (random non-overlapping rects + corridors + a few extra loop
    // connections) and "bsp" (binary space partition, one room per leaf, siblings connected).
    // Ported from generators/dungeon-algorithms.js's carveRooms/carveBsp and generator.js's
    // applyDungeonWalls.
    public static class DungeonAlgorithms
    {
        private sealed class Room
        {
            public int X;
            public int Y;
            public int Width;
            public int Height;
            public int Cx;
            public int Cy;
        }

        public static void RegisterAll()
        {
            GeneratorRegistry.Register("dungeon", "rooms", ctx => CarveRooms(ctx));
            GeneratorRegistry.Register("dungeon", "bsp", ctx => CarveBsp(ctx));
        }

        private static (int Min, int Max) RoomBounds(GeneratorSettings settings) =>
            (Math.Min(settings.questRoomMin, settings.questRoomMax), Math.Max(settings.questRoomMin, settings.questRoomMax));

        private static Room RandomRoom(GeneratorContext ctx, int roomMin, int roomMax)
        {
            var settings = ctx.Settings;
            var rng = ctx.Rng;
            int width = rng.NextInt(roomMin, roomMax);
            int height = rng.NextInt(roomMin, roomMax);
            int x = rng.NextInt(1, Math.Max(1, settings.width - width - 2));
            int y = rng.NextInt(1, Math.Max(1, settings.height - height - 2));
            return new Room { X = x, Y = y, Width = width, Height = height, Cx = x + width / 2, Cy = y + height / 2 };
        }

        private static bool RoomsOverlap(Room a, Room b, int padding = 2) =>
            a.X <= b.X + b.Width + padding && a.X + a.Width + padding >= b.X &&
            a.Y <= b.Y + b.Height + padding && a.Y + a.Height + padding >= b.Y;

        private static void ConnectRooms(GeneratorContext ctx, Room a, Room b, int? width = null)
        {
            int corridorWidth = width ?? ctx.Settings.mazePathWidth;
            if (ctx.Rng.NextDouble() < 0.5)
            {
                GridPrimitives.CarveCorridor(ctx.Walkable, a.Cx, a.Cy, b.Cx, a.Cy, corridorWidth);
                GridPrimitives.CarveCorridor(ctx.Walkable, b.Cx, a.Cy, b.Cx, b.Cy, corridorWidth);
            }
            else
            {
                GridPrimitives.CarveCorridor(ctx.Walkable, a.Cx, a.Cy, a.Cx, b.Cy, corridorWidth);
                GridPrimitives.CarveCorridor(ctx.Walkable, a.Cx, b.Cy, b.Cx, b.Cy, corridorWidth);
            }
        }

        private static List<Room> CarveRooms(GeneratorContext ctx)
        {
            var settings = ctx.Settings;
            var rng = ctx.Rng;
            var (roomMin, roomMax) = RoomBounds(settings);
            var rooms = new List<Room>();
            int attempts = 0;
            while (rooms.Count < settings.questRooms && attempts < settings.questRooms * 30)
            {
                attempts++;
                var room = RandomRoom(ctx, roomMin, roomMax);
                if (rooms.Any(other => RoomsOverlap(room, other))) continue;
                rooms.Add(room);
                GridPrimitives.CarveRect(ctx.Walkable, room.X, room.Y, room.Width, room.Height);
            }
            for (int i = 1; i < rooms.Count; i++) ConnectRooms(ctx, rooms[i - 1], rooms[i]);
            for (int i = 0; i < rooms.Count / 4; i++)
            {
                var a = rooms[rng.NextInt(0, rooms.Count - 1)];
                var b = rooms[rng.NextInt(0, rooms.Count - 1)];
                if (a == b) continue;
                ConnectRooms(ctx, a, b);
            }
            return rooms;
        }

        private static List<Room> CarveBsp(GeneratorContext ctx)
        {
            var settings = ctx.Settings;
            var rng = ctx.Rng;
            var (roomMin, roomMax) = RoomBounds(settings);
            int minLeaf = Math.Max(roomMin + 4, 8);
            var leaves = new List<(int X, int Y, int Width, int Height)> { (1, 1, settings.width - 2, settings.height - 2) };
            int attempts = 0;
            while (leaves.Count < settings.questRooms && attempts < settings.questRooms * 12)
            {
                attempts++;
                leaves.Sort((a, b) => (b.Width * b.Height) - (a.Width * a.Height));
                int index = leaves.FindIndex(leaf => leaf.Width >= minLeaf * 2 || leaf.Height >= minLeaf * 2);
                if (index < 0) break;
                var leaf = leaves[index];
                leaves.RemoveAt(index);
                bool vertical = leaf.Width != leaf.Height ? leaf.Width > leaf.Height : rng.NextDouble() < 0.5;
                if (vertical && leaf.Width >= minLeaf * 2)
                {
                    int split = rng.NextInt(leaf.X + minLeaf, leaf.X + leaf.Width - minLeaf);
                    leaves.Add((leaf.X, leaf.Y, split - leaf.X, leaf.Height));
                    leaves.Add((split, leaf.Y, leaf.X + leaf.Width - split, leaf.Height));
                }
                else if (!vertical && leaf.Height >= minLeaf * 2)
                {
                    int split = rng.NextInt(leaf.Y + minLeaf, leaf.Y + leaf.Height - minLeaf);
                    leaves.Add((leaf.X, leaf.Y, leaf.Width, split - leaf.Y));
                    leaves.Add((leaf.X, split, leaf.Width, leaf.Y + leaf.Height - split));
                }
                else
                {
                    leaves.Add(leaf);
                    break;
                }
            }

            var rooms = new List<Room>();
            foreach (var leaf in leaves)
            {
                int maxWidth = Math.Max(roomMin, Math.Min(roomMax, leaf.Width - 2));
                int maxHeight = Math.Max(roomMin, Math.Min(roomMax, leaf.Height - 2));
                int width = rng.NextInt(roomMin, maxWidth);
                int height = rng.NextInt(roomMin, maxHeight);
                int x = rng.NextInt(leaf.X, Math.Max(leaf.X, leaf.X + leaf.Width - width - 1));
                int y = rng.NextInt(leaf.Y, Math.Max(leaf.Y, leaf.Y + leaf.Height - height - 1));
                var room = new Room { X = x, Y = y, Width = width, Height = height, Cx = x + width / 2, Cy = y + height / 2 };
                rooms.Add(room);
                GridPrimitives.CarveRect(ctx.Walkable, room.X, room.Y, room.Width, room.Height);
            }
            for (int i = 1; i < rooms.Count; i++) ConnectRooms(ctx, rooms[i - 1], rooms[i]);
            return rooms;
        }

        // Post-processing run by MapGeneratorEngine: negates the walkable grid into a wall grid,
        // auto-tiles it, then applies the "quest" semantic feature rules (matching the reference's
        // internal modeName for the dungeon kind).
        public static void ApplyWalls(MapDocument map, GeneratorSettings settings, bool[,] walkable)
        {
            var walls = GridPrimitives.MakeGrid(settings.width, settings.height);
            for (int y = 0; y < settings.height; y++)
                for (int x = 0; x < settings.width; x++)
                    walls[y, x] = !walkable[y, x];
            WallAutoTiler.ApplyWallGrid(map, walls, settings.walls);
            FeaturePlacer.ApplySemanticFeatureItems(map, walls, settings, "quest");
        }
    }
}
