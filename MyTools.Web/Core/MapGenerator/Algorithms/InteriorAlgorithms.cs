namespace MyTools.Map.Generation
{
    // Interior kind: "inn" (central hallway + rows of small guest rooms with doors). Ported from
    // generators/interior-algorithms.js's inn/outer/wallRect/door/surfaceRect.
    public static class InteriorAlgorithms
    {
        public static void RegisterAll()
        {
            GeneratorRegistry.Register("interior", "inn", Inn);
        }

        private static void SetWall(GeneratorContext ctx, int x, int y, bool value = true)
        {
            var walls = ctx.Walkable;
            if (x < 0 || y < 0 || y >= walls.GetLength(0) || x >= walls.GetLength(1)) return;
            walls[y, x] = value;
        }

        private static void WallRect(GeneratorContext ctx, int x, int y, int width, int height)
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

        private static void Outer(GeneratorContext ctx) => WallRect(ctx, 0, 0, ctx.Settings.width, ctx.Settings.height);

        private static void SurfaceRect(GeneratorContext ctx, int x, int y, int width, int height, int surfaceId)
        {
            var settings = ctx.Settings;
            for (int yy = y; yy < y + height; yy++)
                for (int xx = x; xx < x + width; xx++)
                {
                    if (xx < 0 || yy < 0 || xx >= settings.width || yy >= settings.height) continue;
                    ctx.Map.surfaces[(xx + 1, yy + 1)] = surfaceId;
                }
        }

        private static void Inn(GeneratorContext ctx)
        {
            var settings = ctx.Settings;
            var rng = ctx.Rng;
            Outer(ctx);
            int hallY = settings.height / 2;
            SurfaceRect(ctx, 2, hallY - 2, settings.width - 4, 5, settings.roadSurface);
            for (int x = 6; x < settings.width - 8; x += 7)
            {
                WallRect(ctx, x, 3, 5, 6);
                Door(ctx, x + 2, 8);
                WallRect(ctx, x, settings.height - 9, 5, 6);
                Door(ctx, x + 2, settings.height - 9);
            }
            WallRect(ctx, settings.width - 10, hallY - 7, 7, 6);
            Door(ctx, settings.width - 7, hallY - 1);
            WallRect(ctx, 3, hallY + 2, 8, 6);
            Door(ctx, 7, hallY + 2);
            for (int i = 0; i < 8; i++)
                SetWall(ctx, rng.NextInt(4, settings.width - 5), rng.NextInt(hallY - 1, hallY + 1));
            Door(ctx, settings.width / 2, settings.height - 2, 2);
        }
    }
}
