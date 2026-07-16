namespace MyTools.Map.Generation
{
    // Infrastructure kind: "farmstead" (farm rows + a barn building). Ported from
    // generators/infrastructure-algorithms.js's farmstead/wallFrame/door/surfaceLine.
    public static class InfrastructureAlgorithms
    {
        public static void RegisterAll()
        {
            GeneratorRegistry.Register("infrastructure", "farmstead", Farmstead);
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

        private static void Farmstead(GeneratorContext ctx)
        {
            var settings = ctx.Settings;
            SurfaceRect(ctx, 0, 0, settings.width, settings.height, settings.floorSurface);
            for (int y = 3; y < settings.height - 5; y += 5)
                SurfaceRect(ctx, 3, y, (int)(settings.width * 0.52), 3, settings.worldResourceSurface);
            int roadX = (int)(settings.width * 0.62);
            SurfaceLine(ctx, roadX, 0, roadX, settings.height - 1, settings.roadSurface, 3);
            int barn1X = (int)(settings.width * 0.68);
            WallFrame(ctx, barn1X, 5, 10, 8);
            Door(ctx, (int)(settings.width * 0.73), 12, 2);
            WallFrame(ctx, barn1X, settings.height - 14, 12, 9);
            Door(ctx, (int)(settings.width * 0.74), settings.height - 14, 2);
        }
    }
}
