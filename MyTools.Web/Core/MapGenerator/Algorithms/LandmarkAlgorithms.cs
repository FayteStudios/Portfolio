namespace MyTools.Map.Generation
{
    // Landmark kind: "obelisk" (a single centered feature-wall block with a road ring and
    // cross-roads radiating out). Ported from generators/landmark-algorithms.js's obelisk/
    // surfaceCircle/surfaceLine/wallRect.
    public static class LandmarkAlgorithms
    {
        public static void RegisterAll()
        {
            GeneratorRegistry.Register("landmark", "obelisk", Obelisk);
        }

        private static void SetSurface(GeneratorContext ctx, int x, int y, int surfaceId)
        {
            var settings = ctx.Settings;
            if (x < 0 || y < 0 || x >= settings.width || y >= settings.height) return;
            ctx.Map.surfaces[(x + 1, y + 1)] = surfaceId;
        }

        private static void SurfaceCircle(GeneratorContext ctx, int cx, int cy, int radius, int surfaceId)
        {
            int r2 = radius * radius;
            for (int y = cy - radius; y <= cy + radius; y++)
                for (int x = cx - radius; x <= cx + radius; x++)
                    if ((x - cx) * (x - cx) + (y - cy) * (y - cy) <= r2) SetSurface(ctx, x, y, surfaceId);
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

        private static void WallRect(GeneratorContext ctx, int x, int y, int width, int height)
        {
            for (int yy = y; yy < y + height; yy++)
                for (int xx = x; xx < x + width; xx++)
                    SetWall(ctx, xx, yy);
        }

        private static void Obelisk(GeneratorContext ctx)
        {
            var settings = ctx.Settings;
            int cx = settings.width / 2;
            int cy = settings.height / 2;
            SurfaceCircle(ctx, cx, cy, (int)(System.Math.Min(settings.width, settings.height) * 0.28), settings.roadSurface);
            WallRect(ctx, cx - 2, cy - 2, 5, 5);
            SurfaceLine(ctx, cx, 0, cx, settings.height - 1, settings.roadSurface, 3);
            SurfaceLine(ctx, 0, cy, settings.width - 1, cy, settings.roadSurface, 3);
        }
    }
}
