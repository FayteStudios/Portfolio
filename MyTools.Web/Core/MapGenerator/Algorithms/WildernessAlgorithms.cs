namespace MyTools.Map.Generation
{
    // Wilderness kind: "grove" (single-biome outdoor vignette - forest fill, a clearing, a path,
    // and scattered resource/obstacle blobs). Ported from generators/wilderness-algorithms.js's
    // grove/surfaceRect/surfaceCircle/surfaceLine/wallBlob.
    public static class WildernessAlgorithms
    {
        public static void RegisterAll()
        {
            GeneratorRegistry.Register("wilderness", "grove", Grove);
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

        private static void WallBlob(GeneratorContext ctx, int cx, int cy, int radius)
        {
            int r2 = radius * radius;
            for (int y = cy - radius; y <= cy + radius; y++)
                for (int x = cx - radius; x <= cx + radius; x++)
                    if ((x - cx) * (x - cx) + (y - cy) * (y - cy) <= r2) SetWall(ctx, x, y);
        }

        private static void Grove(GeneratorContext ctx)
        {
            var settings = ctx.Settings;
            var rng = ctx.Rng;
            SurfaceRect(ctx, 0, 0, settings.width, settings.height, settings.worldForestSurface);
            SurfaceCircle(ctx, settings.width / 2, settings.height / 2, (int)(System.Math.Min(settings.width, settings.height) * 0.28), settings.floorSurface);
            SurfaceLine(ctx, 0, settings.height / 2, settings.width - 1, settings.height / 2, settings.roadSurface, 2);
            for (int i = 0; i < System.Math.Max(8, settings.worldSites); i++)
            {
                if (rng.NextDouble() < 0.35)
                    SurfaceCircle(ctx, rng.NextInt(4, settings.width - 5), rng.NextInt(4, settings.height - 5), rng.NextInt(2, 4), settings.worldResourceSurface);
                else
                    WallBlob(ctx, rng.NextInt(3, settings.width - 4), rng.NextInt(3, settings.height - 4), 1);
            }
        }
    }
}
