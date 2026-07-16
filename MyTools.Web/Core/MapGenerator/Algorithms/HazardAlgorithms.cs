namespace MyTools.Map.Generation
{
    // Hazard kind: "lavaflows" (danger-surface streaks scattered across a mountain floor fill,
    // plus scattered rock obstacles). Ported from generators/hazard-algorithms.js's lavaflows/
    // surfaceRect/surfaceLine/wallRect.
    public static class HazardAlgorithms
    {
        public static void RegisterAll()
        {
            GeneratorRegistry.Register("hazard", "lavaflows", Lavaflows);
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

        private static void WallRect(GeneratorContext ctx, int x, int y, int width, int height)
        {
            for (int yy = y; yy < y + height; yy++)
                for (int xx = x; xx < x + width; xx++)
                    SetWall(ctx, xx, yy);
        }

        private static void Lavaflows(GeneratorContext ctx)
        {
            var settings = ctx.Settings;
            var rng = ctx.Rng;
            SurfaceRect(ctx, 0, 0, settings.width, settings.height, settings.worldMountainSurface);
            SurfaceLine(ctx, 0, settings.height - 3, settings.width - 1, 3, settings.roadSurface, 2);
            for (int i = 0; i < System.Math.Max(8, settings.worldSites); i++)
            {
                SurfaceLine(ctx, rng.NextInt(0, settings.width - 1), rng.NextInt(0, settings.height - 1), rng.NextInt(0, settings.width - 1), rng.NextInt(0, settings.height - 1), settings.worldDangerSurface, rng.NextInt(1, 3));
                WallRect(ctx, rng.NextInt(4, settings.width - 6), rng.NextInt(4, settings.height - 6), 2, 2);
            }
        }
    }
}
