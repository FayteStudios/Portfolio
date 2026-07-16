namespace MyTools.Map.Generation
{
    // Encounter kind: "ambushroad" (a road through the map with forest ambush cover to the
    // sides). Ported from generators/encounter-algorithms.js's ambushRoad/wallRect/circleSurface/
    // surfaceLine.
    public static class EncounterAlgorithms
    {
        public static void RegisterAll()
        {
            GeneratorRegistry.Register("encounter", "ambushroad", AmbushRoad);
        }

        private static void SetWall(GeneratorContext ctx, int x, int y, bool value = true)
        {
            var walls = ctx.Walkable;
            if (x < 0 || y < 0 || y >= walls.GetLength(0) || x >= walls.GetLength(1)) return;
            walls[y, x] = value;
        }

        private static void WallRect(GeneratorContext ctx, int x, int y, int width, int height)
        {
            for (int yy = y; yy < y + height; yy++)
                for (int xx = x; xx < x + width; xx++)
                    SetWall(ctx, xx, yy);
        }

        private static void SetSurface(GeneratorContext ctx, int x, int y, int surfaceId)
        {
            var settings = ctx.Settings;
            if (x < 0 || y < 0 || x >= settings.width || y >= settings.height) return;
            ctx.Map.surfaces[(x + 1, y + 1)] = surfaceId;
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

        private static void CircleSurface(GeneratorContext ctx, int cx, int cy, int radius, int surfaceId)
        {
            int r2 = radius * radius;
            for (int y = cy - radius; y <= cy + radius; y++)
                for (int x = cx - radius; x <= cx + radius; x++)
                    if ((x - cx) * (x - cx) + (y - cy) * (y - cy) <= r2) SetSurface(ctx, x, y, surfaceId);
        }

        private static void AmbushRoad(GeneratorContext ctx)
        {
            var settings = ctx.Settings;
            int y = settings.height / 2;
            SurfaceLine(ctx, 0, y - 3, settings.width - 1, y + 3, settings.roadSurface, 5);
            for (int x = 4; x < settings.width - 4; x += 9)
            {
                WallRect(ctx, x, y - 8, 3, 2);
                WallRect(ctx, x + 4, y + 6, 3, 2);
                CircleSurface(ctx, x, y - 11, 3, settings.worldForestSurface);
                CircleSurface(ctx, x + 4, y + 10, 3, settings.worldForestSurface);
            }
        }
    }
}
