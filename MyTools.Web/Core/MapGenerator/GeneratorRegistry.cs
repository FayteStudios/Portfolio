using System.Collections.Generic;
using System.Linq;

namespace MyTools.Map.Generation
{
    public delegate void GeneratorAlgorithm(GeneratorContext ctx);

    // kind -> key -> algorithm, mirroring generators/registry.js's WildeditRegisterGenerator /
    // window.WildeditGeneratorAlgorithms. Each Algorithms/*.cs file registers its own kind's
    // entries from a static RegisterAll(); EnsureRegistered() is the composition root that runs
    // them all exactly once (called from MapGeneratorEngine.Generate, so callers never need to
    // remember to do it themselves).
    public static class GeneratorRegistry
    {
        private static readonly Dictionary<string, Dictionary<string, GeneratorAlgorithm>> registries = new()
        {
            ["maze"] = new(),
            ["dungeon"] = new(),
            ["town"] = new(),
            ["world"] = new(),
            ["interior"] = new(),
            ["encounter"] = new(),
            ["wilderness"] = new(),
            ["infrastructure"] = new(),
            ["puzzle"] = new(),
            ["landmark"] = new(),
            ["hazard"] = new()
        };

        private static bool registered;

        public static void Register(string kind, string key, GeneratorAlgorithm algorithm)
        {
            if (!registries.TryGetValue(kind, out var kindRegistry))
            {
                kindRegistry = new Dictionary<string, GeneratorAlgorithm>();
                registries[kind] = kindRegistry;
            }
            kindRegistry[key] = algorithm;
        }

        public static GeneratorAlgorithm? Get(string kind, string key) =>
            registries.TryGetValue(kind, out var kindRegistry) && kindRegistry.TryGetValue(key, out var algorithm)
                ? algorithm
                : null;

        // Enumerates registered algorithm keys for a kind, for a UI dropdown.
        public static IReadOnlyList<string> Keys(string kind) =>
            registries.TryGetValue(kind, out var kindRegistry) ? kindRegistry.Keys.ToList() : new List<string>();

        public static IReadOnlyList<string> Kinds => registries.Keys.ToList();

        public static void EnsureRegistered()
        {
            if (registered) return;
            registered = true;
            MazeAlgorithms.RegisterAll();
            DungeonAlgorithms.RegisterAll();
            TownAlgorithms.RegisterAll();
            WorldAlgorithms.RegisterAll();
            InteriorAlgorithms.RegisterAll();
            EncounterAlgorithms.RegisterAll();
            WildernessAlgorithms.RegisterAll();
            InfrastructureAlgorithms.RegisterAll();
            PuzzleAlgorithms.RegisterAll();
            LandmarkAlgorithms.RegisterAll();
            HazardAlgorithms.RegisterAll();
        }
    }
}
