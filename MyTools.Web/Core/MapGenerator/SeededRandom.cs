using System;
using System.Collections.Generic;

namespace MyTools.Map.Generation
{
    // Deterministic PRNG for the map generator: an FNV-1a hash of the seed string seeds a
    // mulberry32 generator. Ported step-for-step from the reference JS (createRng/randomInt/
    // shuffleInPlace in generator.js) so the *algorithm* matches; bit-for-bit parity with the JS
    // Number-based math isn't attempted (not required per the task brief), but the structure -
    // FNV-1a seed hash feeding a mulberry32 stream - is the same.
    public sealed class SeededRandom
    {
        private uint state;

        public SeededRandom(string seed)
        {
            uint value = 2166136261u;
            string text = seed ?? "";
            foreach (char c in text)
            {
                value ^= c;
                value = unchecked(value * 16777619u);
            }
            state = value;
        }

        // Next float in [0, 1), one mulberry32 step.
        public double NextDouble()
        {
            unchecked
            {
                state += 0x6d2b79f5u;
                uint t = state;
                t = (t ^ (t >> 15)) * (t | 1u);
                t ^= t + (t ^ (t >> 7)) * (t | 61u);
                return (t ^ (t >> 14)) / 4294967296.0;
            }
        }

        public int NextInt(int min, int max)
        {
            if (max < min) (min, max) = (max, min);
            return min + (int)Math.Floor(NextDouble() * (max - min + 1));
        }

        public void Shuffle<T>(IList<T> values)
        {
            for (int i = values.Count - 1; i > 0; i--)
            {
                int j = (int)Math.Floor(NextDouble() * (i + 1));
                (values[i], values[j]) = (values[j], values[i]);
            }
        }
    }
}
