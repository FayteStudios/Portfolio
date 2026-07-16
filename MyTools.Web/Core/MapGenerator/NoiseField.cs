using System;

namespace MyTools.Map.Generation
{
    // Seeded value-noise / fBm field, ported from generators/world-algorithms.js
    // (seedNumber/hashNoise/gradient/perlinNoise/fbm). Used by the World kind's biome painter and
    // available to any other algorithm that wants organic patches.
    public static class NoiseField
    {
        public static uint HashSeed(string seed)
        {
            uint value = 2166136261u;
            string text = string.IsNullOrEmpty(seed) ? "world" : seed;
            foreach (char c in text)
            {
                value ^= c;
                value = unchecked(value * 16777619u);
            }
            return value;
        }

        public static double HashNoise(uint seed, int x, int y, int salt)
        {
            unchecked
            {
                uint value = seed
                    + (uint)(x + 374761393) * 668265263u
                    + (uint)(y + 1442695041) * 2246822519u
                    + (uint)(salt + 1) * 3266489917u;
                value = (value ^ (value >> 15)) * (value | 1u);
                value ^= value + (value ^ (value >> 7)) * (value | 61u);
                return (value ^ (value >> 14)) / 4294967295.0;
            }
        }

        private static double Lerp(double a, double b, double t) => a + (b - a) * t;

        private static double Fade(double t) => t * t * t * (t * (t * 6 - 15) + 10);

        private static (double X, double Y) Gradient(uint seed, int x, int y, int salt)
        {
            double angle = HashNoise(seed, x, y, salt) * Math.PI * 2;
            return (Math.Cos(angle), Math.Sin(angle));
        }

        private static double GradientDot(uint seed, int gx, int gy, double x, double y, int salt)
        {
            var g = Gradient(seed, gx, gy, salt);
            return g.X * (x - gx) + g.Y * (y - gy);
        }

        public static double Perlin(uint seed, int x, int y, int scale, int salt)
        {
            int size = Math.Max(2, scale);
            double sx = (double)x / size;
            double sy = (double)y / size;
            int x0 = (int)Math.Floor(sx);
            int y0 = (int)Math.Floor(sy);
            int x1 = x0 + 1;
            int y1 = y0 + 1;
            double tx = Fade(sx - x0);
            double ty = Fade(sy - y0);
            double a = GradientDot(seed, x0, y0, sx, sy, salt);
            double b = GradientDot(seed, x1, y0, sx, sy, salt);
            double c = GradientDot(seed, x0, y1, sx, sy, salt);
            double d = GradientDot(seed, x1, y1, sx, sy, salt);
            return Math.Max(0, Math.Min(1, Lerp(Lerp(a, b, tx), Lerp(c, d, tx), ty) + 0.5));
        }

        public static double Fbm(uint seed, int x, int y, int scale, int octaves, int salt)
        {
            double total = 0;
            double amplitude = 1;
            double weight = 0;
            int currentScale = scale;
            for (int i = 0; i < octaves; i++)
            {
                total += Perlin(seed, x, y, currentScale, salt + i * 13) * amplitude;
                weight += amplitude;
                amplitude *= 0.5;
                currentScale = Math.Max(2, currentScale / 2);
            }
            return total / Math.Max(1, weight);
        }
    }
}
