using System.Collections.Generic;

namespace MyTools.Map.Generation
{
    // Flat parameter bag for MapGeneratorEngine.Generate, mirroring generator.js's
    // normalizedGeneratorSettings - trimmed to only the fields the curated algorithm set
    // (Algorithms/*.cs) actually reads. The reference exposes ~198 algorithms and a much larger
    // settings surface; we only implement 15 of them (see the task brief), so most of that surface
    // has no reader here and was left out on purpose.
    public sealed class GeneratorSettings
    {
        // "maze" | "dungeon" | "town" | "world" | "interior" | "encounter" | "wilderness" |
        // "infrastructure" | "puzzle" | "landmark" | "hazard". Note: the reference JS calls the
        // dungeon kind "quest" internally (generateQuestMap/settings.mode==="quest") - we use
        // "dungeon" throughout instead, matching the task brief's kind list and GeneratorRegistry.
        public string mode = "maze";
        public string name = "Generated Map";
        public string seed = "";
        public int width = 64;
        public int height = 64;
        public int floorSurface = 100;
        public int roadSurface = 120;

        // Maze
        public string mazeLayout = "backtracker"; // backtracker | cellular
        public int mazePathWidth = 2;
        public int mazeDeadEnds = 75;
        public int mazeStartSurface = 101;
        public int mazeEndSurface = 102;
        public int mazeMarkerSize = 3;
        public bool mazeShowSolution;
        public int mazePathSurface = 103;

        // Dungeon
        public string dungeonLayout = "rooms"; // rooms | bsp
        public int questRooms = 12;
        public int questRoomMin = 5;
        public int questRoomMax = 10;

        // Town
        public string townLayout = "village"; // village | walled
        public string townBuildMode = "roadside"; // roadside | infill | scattered
        public int townBuildings = 14;
        public bool townSquare;
        public bool townSymmetry;
        public int townRoadWidth = 3;
        public int townLoopChance = 25;
        public int townSetback;
        public int townBuildingMin = 4;
        public int townBuildingMax = 10;
        public int townDoorPercent = 50;
        public bool townSurfaceInteriors;
        public string townHouseSurfaces = "";

        // World
        public string worldLayout = "biomes"; // biomes | island
        public int worldSites = 12;
        public int worldNoiseScale = 26;
        public double worldWaterLevel = 0.38;
        public int worldWaterSurface = 140;
        public int worldBeachSurface = 101;
        public int worldForestSurface = 110;
        public int worldMountainSurface = 130;
        public int worldSnowSurface = 134;
        public int worldSwampSurface = 115;
        public int worldDesertSurface = 121;
        public int worldResourceSurface = 122;
        public int worldRuinSurface = 123;
        public int worldDangerSurface = 124;

        // Interior / Encounter / Wilderness / Infrastructure / Puzzle / Landmark / Hazard layout
        // selectors (each kind currently has exactly one curated algorithm registered).
        public string interiorLayout = "inn";
        public string encounterLayout = "ambushroad";
        public string wildernessLayout = "grove";
        public string infrastructureLayout = "farmstead";
        public string puzzleLayout = "switchchambers";
        public string landmarkLayout = "obelisk";
        public string hazardLayout = "lavaflows";

        // Monsters
        public bool monsterSpawns;
        public bool monsterMobSpawns;
        public int monsterSpawnCount = 16;
        public string monsterIds = "";
        public string monsterRespawn = "5";

        // Wall shape key -> item id (see WallAutoTiler.WallTypeOptions) and feature key -> item id
        // (see FeaturePlacer.FeatureItemOptions).
        public Dictionary<string, int> walls = new();
        public Dictionary<string, int> featureItems = new();
    }
}
