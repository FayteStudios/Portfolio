using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace MyTools.Map.Generation
{
    // Scatters monsterSpawnCount monster spawns onto random open/walkable tiles, optionally
    // seeding a 2-5 unit cluster per placement. Ported from generator.js's
    // applyGeneratedMonsterSpawns/tryPlaceMonster/spawnableTiles/parseGeneratorIdList/
    // parseRespawnRange.
    public static class MonsterSpawner
    {
        public static int Apply(MapDocument map, GeneratorSettings settings, SeededRandom rng, MapCatalog? catalog)
        {
            if (!settings.monsterSpawns || settings.monsterSpawnCount <= 0) return 0;
            var ids = ResolveMonsterIds(settings, catalog);
            if (ids.Count == 0) return 0;

            var tiles = SpawnableTiles(map);
            rng.Shuffle(tiles);

            int placed = 0;
            int index = 0;
            while (placed < settings.monsterSpawnCount && index < tiles.Count)
            {
                var anchor = tiles[index];
                index++;
                if (!TryPlaceMonster(map, settings, rng, ids, anchor.X, anchor.Y)) continue;
                placed++;
                if (!settings.monsterMobSpawns) continue;

                int mobSize = rng.NextInt(2, 5);
                int clusterPlaced = 1;
                var candidates = new List<(int X, int Y)>
                {
                    (anchor.X + 1, anchor.Y), (anchor.X - 1, anchor.Y),
                    (anchor.X, anchor.Y + 1), (anchor.X, anchor.Y - 1),
                    (anchor.X + 1, anchor.Y + 1), (anchor.X - 1, anchor.Y - 1),
                    (anchor.X + 1, anchor.Y - 1), (anchor.X - 1, anchor.Y + 1)
                };
                rng.Shuffle(candidates);
                foreach (var candidate in candidates)
                {
                    if (placed >= settings.monsterSpawnCount || clusterPlaced >= mobSize) break;
                    if (TryPlaceMonster(map, settings, rng, ids, candidate.X, candidate.Y))
                    {
                        placed++;
                        clusterPlaced++;
                    }
                }
            }
            return placed;
        }

        // Judgment call / deviation from the reference: the JS version simply yields zero spawns
        // when monsterIds is empty. The task brief asks for a catalog fallback so "spawn monsters"
        // still does something useful out of the box, so we sample every known monster id here.
        private static List<int> ResolveMonsterIds(GeneratorSettings settings, MapCatalog? catalog)
        {
            var ids = ParseIdList(settings.monsterIds);
            if (ids.Count > 0) return ids;
            if (catalog == null || catalog.monsters.Count == 0) return ids;
            return catalog.monsters.Select(m => m.id).Where(id => id > 0).Distinct().ToList();
        }

        private static List<int> ParseIdList(string text)
        {
            var seen = new List<int>();
            foreach (string part in (text ?? "").Split(','))
            {
                if (!int.TryParse(part.Trim(), out int value)) continue;
                if (value <= 0 || value > 32767) continue;
                if (!seen.Contains(value)) seen.Add(value);
            }
            return seen;
        }

        private static readonly Regex RespawnPattern = new(@"^(\d+)(?:\s*-\s*(\d+))?$", RegexOptions.Compiled);

        private static (int Min, int Max) ParseRespawnRange(string text)
        {
            var match = RespawnPattern.Match((text ?? "").Trim());
            if (!match.Success) return (5, 5);
            int first = ClampInt(match.Groups[1].Value, 0, 32767, 5);
            int second = match.Groups[2].Success ? ClampInt(match.Groups[2].Value, 0, 32767, first) : first;
            return (Math.Min(first, second), Math.Max(first, second));
        }

        private static int ClampInt(string text, int min, int max, int fallback) =>
            int.TryParse(text, out int value) ? Math.Max(min, Math.Min(max, value)) : fallback;

        private static int RandomRespawn(GeneratorSettings settings, SeededRandom rng)
        {
            var (min, max) = ParseRespawnRange(settings.monsterRespawn);
            return rng.NextInt(min, max);
        }

        private static List<(int X, int Y)> SpawnableTiles(MapDocument map)
        {
            var tiles = new List<(int X, int Y)>();
            for (int y = 1; y <= map.height; y++)
                for (int x = 1; x <= map.width; x++)
                {
                    var key = (x, y);
                    if (map.generatorSpawnBlockedKeys.Contains(key)) continue;
                    if (map.items.ContainsKey(key) || map.monsters.ContainsKey(key)) continue;
                    if (!map.surfaces.TryGetValue(key, out int surface) || surface <= 0) continue;
                    tiles.Add((x, y));
                }
            return tiles;
        }

        private static bool TryPlaceMonster(MapDocument map, GeneratorSettings settings, SeededRandom rng, List<int> ids, int x, int y)
        {
            if (x < 1 || y < 1 || x > map.width || y > map.height) return false;
            var key = (x, y);
            if (map.items.ContainsKey(key) || map.monsters.ContainsKey(key)) return false;
            if (!map.surfaces.TryGetValue(key, out int surface) || surface <= 0) return false;
            int monsterId = ids[rng.NextInt(0, ids.Count - 1)];
            map.monsters[key] = new MapMonsterRecord
            {
                dirty = true,
                monsterId = monsterId,
                x = x,
                y = y,
                timeout = RandomRespawn(settings, rng)
            };
            return true;
        }
    }
}
