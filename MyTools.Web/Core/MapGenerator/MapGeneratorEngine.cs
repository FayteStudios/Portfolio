using System;

namespace MyTools.Map.Generation
{
    // Single entry point for the procedural map generator, mirroring generator.js's
    // buildGeneratedMap/generate<Kind>Map functions: resolve the seed, create the RNG, create an
    // empty MapDocument, fill the floor, run the selected algorithm, then run whatever shared
    // post-processing that kind needs (wall auto-tiling + semantic features + monster spawns for
    // maze/dungeon/interior/vignette kinds; road-to-surface sync + buildings for town; nothing
    // extra for world beyond monster spawns, since world paints surfaces directly).
    public static class MapGeneratorEngine
    {
        public static MapDocument Generate(GeneratorSettings settings, MapCatalog? catalog = null)
        {
            GeneratorRegistry.EnsureRegistered();

            // Mirrors normalizedGeneratorSettings' clamps closely enough to keep every algorithm's
            // array indexing in bounds; the reference's much larger clamp table (per-field min/max
            // for ~40 settings) isn't reproduced here since most of those fields aren't read by our
            // curated algorithm set.
            settings.width = Math.Clamp(settings.width, 8, 500);
            settings.height = Math.Clamp(settings.height, 8, 500);
            if (string.IsNullOrWhiteSpace(settings.seed)) settings.seed = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds().ToString();

            var rng = new SeededRandom(settings.seed);
            var map = MapDocument.CreateEmpty(settings.width, settings.height, settings.name);
            FillMapSurface(map, settings.floorSurface);

            switch (settings.mode)
            {
                case "maze": GenerateMaze(map, settings, rng); break;
                case "dungeon": GenerateDungeon(map, settings, rng); break;
                case "town": GenerateTown(map, settings, rng); break;
                case "world": GenerateWorld(map, settings, rng); break;
                case "interior": GenerateVignette(map, settings, rng, "interior", settings.interiorLayout, "inn"); break;
                case "encounter": GenerateVignette(map, settings, rng, "encounter", settings.encounterLayout, "ambushroad"); break;
                case "wilderness": GenerateVignette(map, settings, rng, "wilderness", settings.wildernessLayout, "grove"); break;
                case "infrastructure": GenerateVignette(map, settings, rng, "infrastructure", settings.infrastructureLayout, "farmstead"); break;
                case "puzzle": GenerateVignette(map, settings, rng, "puzzle", settings.puzzleLayout, "switchchambers"); break;
                case "landmark": GenerateVignette(map, settings, rng, "landmark", settings.landmarkLayout, "obelisk"); break;
                case "hazard": GenerateVignette(map, settings, rng, "hazard", settings.hazardLayout, "lavaflows"); break;
                default: GenerateMaze(map, settings, rng); break;
            }

            MonsterSpawner.Apply(map, settings, rng, catalog);
            return map;
        }

        private static void FillMapSurface(MapDocument map, int surfaceId)
        {
            for (int y = 1; y <= map.height; y++)
                for (int x = 1; x <= map.width; x++)
                    map.surfaces[(x, y)] = surfaceId;
        }

        private static void GenerateMaze(MapDocument map, GeneratorSettings settings, SeededRandom rng)
        {
            var walkable = GridPrimitives.MakeGrid(settings.width, settings.height);
            var ctx = new GeneratorContext(settings, rng, map, walkable);
            var algorithm = GeneratorRegistry.Get("maze", settings.mazeLayout) ?? GeneratorRegistry.Get("maze", "backtracker");
            algorithm?.Invoke(ctx);
            GridPrimitives.EnforceBorder(walkable);

            var walls = GridPrimitives.MakeGrid(settings.width, settings.height);
            for (int y = 0; y < settings.height; y++)
                for (int x = 0; x < settings.width; x++)
                    walls[y, x] = !walkable[y, x];
            WallAutoTiler.ApplyWallGrid(map, walls, settings.walls);
            MazeAlgorithms.ApplyEndpointSurfaces(map, settings, walkable);
        }

        private static void GenerateDungeon(MapDocument map, GeneratorSettings settings, SeededRandom rng)
        {
            var walkable = GridPrimitives.MakeGrid(settings.width, settings.height);
            var ctx = new GeneratorContext(settings, rng, map, walkable);
            var algorithm = GeneratorRegistry.Get("dungeon", settings.dungeonLayout) ?? GeneratorRegistry.Get("dungeon", "rooms");
            algorithm?.Invoke(ctx);
            GridPrimitives.EnforceBorder(walkable);
            DungeonAlgorithms.ApplyWalls(map, settings, walkable);
        }

        private static void GenerateTown(MapDocument map, GeneratorSettings settings, SeededRandom rng)
        {
            var roads = TownAlgorithms.CreateRoadGrid(settings, rng);
            TownAlgorithms.AddBuildingsToRoadGrid(map, settings, rng, roads);
            TownAlgorithms.SyncRoadGridToMap(map, roads, settings);
        }

        private static void GenerateWorld(MapDocument map, GeneratorSettings settings, SeededRandom rng)
        {
            var ctx = new GeneratorContext(settings, rng, map, GridPrimitives.MakeGrid(settings.width, settings.height));
            var algorithm = GeneratorRegistry.Get("world", settings.worldLayout) ?? GeneratorRegistry.Get("world", "biomes");
            algorithm?.Invoke(ctx);
        }

        // Shared shape for interior/encounter/wilderness/infrastructure/puzzle/landmark/hazard:
        // each carves a wall grid (ctx.Walkable doubling as "walls" for these kinds) and paints
        // surfaces directly; afterwards we fill any sealed-off pockets, auto-tile the walls, and
        // apply the kind's semantic feature rules.
        private static void GenerateVignette(MapDocument map, GeneratorSettings settings, SeededRandom rng, string kind, string layout, string fallbackKey)
        {
            var walls = GridPrimitives.MakeGrid(settings.width, settings.height);
            var ctx = new GeneratorContext(settings, rng, map, walls);
            var algorithm = GeneratorRegistry.Get(kind, layout) ?? GeneratorRegistry.Get(kind, fallbackKey);
            algorithm?.Invoke(ctx);
            GridPrimitives.FillDisconnectedOpenPockets(walls);
            WallAutoTiler.ApplyWallGrid(map, walls, settings.walls);
            FeaturePlacer.ApplySemanticFeatureItems(map, walls, settings, kind);
        }
    }
}
