namespace MyTools.Map.Generation
{
    // Puzzle kind: "switchchambers" (an enclosed corridor of four small rooms around a central
    // chamber, each with a resource-surface "switch" marker). This mirrors a level-editor stub in
    // the reference (not real switch/trigger wiring), so it's kept simple per the task brief.
    // Ported from generators/puzzle-algorithms.js's switchChambers/outer/wallFrame/door/
    // surfaceLine/surfaceRect.
    public static class PuzzleAlgorithms
    {
        public static void RegisterAll()
        {
            GeneratorRegistry.Register("puzzle", "switchchambers", SwitchChambers);
        }

        private static void SetSurface(GeneratorContext ctx, int x, int y, int surfaceId)
        {
            var settings = ctx.Settings;
            if (x < 0 || y < 0 || x >= settings.width || y >= settings.height) return;
            ctx.Map.surfaces[(x + 1, y + 1)] = surfaceId;
        }

        private static void SurfaceRect(GeneratorContext ctx, int x, int y, int width, int height, int surfaceId)
        {
            for (int yy = y; yy < y + height; yy++)
                for (int xx = x; xx < x + width; xx++)
                    SetSurface(ctx, xx, yy, surfaceId);
        }

        private static void SurfaceLine(GeneratorContext ctx, int ax, int ay, int bx, int by, int surfaceId, int width = 1)
        {
            int steps = System.Math.Max(System.Math.Max(System.Math.Abs(bx - ax), System.Math.Abs(by - ay)), 1);
            int radius = width / 2;
            for (int i = 0; i <= steps; i++)
            {
                double t = (double)i / steps;
                int x = (int)System.Math.Round(ax + (bx - ax) * t);
                int y = (int)System.Math.Round(ay + (by - ay) * t);
                for (int oy = -radius; oy <= radius; oy++)
                    for (int ox = -radius; ox <= radius; ox++)
                        SetSurface(ctx, x + ox, y + oy, surfaceId);
            }
        }

        private static void SetWall(GeneratorContext ctx, int x, int y, bool value = true)
        {
            var walls = ctx.Walkable;
            if (x < 0 || y < 0 || y >= walls.GetLength(0) || x >= walls.GetLength(1)) return;
            walls[y, x] = value;
        }

        private static void WallFrame(GeneratorContext ctx, int x, int y, int width, int height)
        {
            for (int xx = x; xx < x + width; xx++)
            {
                SetWall(ctx, xx, y);
                SetWall(ctx, xx, y + height - 1);
            }
            for (int yy = y; yy < y + height; yy++)
            {
                SetWall(ctx, x, yy);
                SetWall(ctx, x + width - 1, yy);
            }
        }

        private static void Door(GeneratorContext ctx, int x, int y, int width = 1)
        {
            int half = width / 2;
            for (int yy = y - half; yy <= y + half; yy++)
                for (int xx = x - half; xx <= x + half; xx++)
                    SetWall(ctx, xx, yy, false);
        }

        private static void Outer(GeneratorContext ctx) => WallFrame(ctx, 0, 0, ctx.Settings.width, ctx.Settings.height);

        private static void SwitchChambers(GeneratorContext ctx)
        {
            var settings = ctx.Settings;
            Outer(ctx);
            int midX = settings.width / 2;
            int midY = settings.height / 2;
            SurfaceLine(ctx, midX, 1, midX, settings.height - 2, settings.roadSurface, 3);
            SurfaceLine(ctx, 1, midY, settings.width - 2, midY, settings.roadSurface, 3);
            var rooms = new (int X, int Y, int Width, int Height)[]
            {
                (4, 4, 10, 8),
                (settings.width - 14, 4, 10, 8),
                (4, settings.height - 12, 10, 8),
                (settings.width - 14, settings.height - 12, 10, 8)
            };
            foreach (var room in rooms)
            {
                WallFrame(ctx, room.X, room.Y, room.Width, room.Height);
                Door(ctx, room.X + room.Width / 2, room.Y + room.Height / 2, 2);
                SurfaceRect(ctx, room.X + 3, room.Y + 3, 3, 2, settings.worldResourceSurface);
            }
            WallFrame(ctx, midX - 5, midY - 4, 11, 9);
            Door(ctx, midX, midY + 4, 3);
        }
    }
}
