namespace MyTools.Map.Generation
{
    // World kind: "biomes" (fBm elevation/moisture/temperature classified into surfaces) and
    // "island" (same painter with a radial falloff mask so land only appears within a rough
    // circular island). Ported from generators/world-algorithms.js's classifyBiome/
    // paintNoiseBiomes/biomes/island, using NoiseField for the noise primitives.
    public static class WorldAlgorithms
    {
        public static void RegisterAll()
        {
            GeneratorRegistry.Register("world", "biomes", ctx => PaintNoiseBiomes(ctx, false));
            GeneratorRegistry.Register("world", "island", ctx => PaintNoiseBiomes(ctx, true));
        }

        private static void SetSurface(GeneratorContext ctx, int x, int y, int surfaceId)
        {
            var settings = ctx.Settings;
            if (x < 1 || y < 1 || x > settings.width || y > settings.height) return;
            ctx.Map.surfaces[(x, y)] = surfaceId;
        }

        private static int ClassifyBiome(GeneratorSettings s, double elevation, double moisture, double temperature)
        {
            if (elevation < s.worldWaterLevel) return s.worldWaterSurface;
            if (elevation < s.worldWaterLevel + 0.035) return s.worldBeachSurface;
            if (elevation > 0.78 && temperature < 0.55) return s.worldSnowSurface;
            if (elevation > 0.72) return s.worldMountainSurface;
            if (moisture > 0.72 && elevation < 0.55) return s.worldSwampSurface;
            if (moisture < 0.28 && temperature > 0.46) return s.worldDesertSurface;
            if (moisture > 0.54) return s.worldForestSurface;
            return s.floorSurface;
        }

        private static void PaintNoiseBiomes(GeneratorContext ctx, bool islandMask, int saltOffset = 0)
        {
            var settings = ctx.Settings;
            uint seed = NoiseField.HashSeed(settings.seed);
            double cx = (settings.width + 1) / 2.0;
            double cy = (settings.height + 1) / 2.0;
            double maxDistance = System.Math.Sqrt(cx * cx + cy * cy);
            for (int y = 1; y <= settings.height; y++)
            {
                for (int x = 1; x <= settings.width; x++)
                {
                    double elevation = NoiseField.Fbm(seed, x, y, settings.worldNoiseScale, 5, 10 + saltOffset);
                    if (islandMask)
                    {
                        double dx = x - cx;
                        double dy = y - cy;
                        double falloff = System.Math.Sqrt(dx * dx + dy * dy) / maxDistance;
                        elevation = elevation * 1.2 - falloff * 0.85 + 0.2;
                    }
                    double moisture = NoiseField.Fbm(seed, x, y, System.Math.Max(6, settings.worldNoiseScale * 85 / 100), 4, 80 + saltOffset);
                    double temperature = 1 - (y / (double)settings.height) * 0.55 + NoiseField.Fbm(seed, x, y, settings.worldNoiseScale * 2, 3, 120 + saltOffset) * 0.35;
                    SetSurface(ctx, x, y, ClassifyBiome(settings, elevation, moisture, temperature));
                }
            }
        }
    }
}
