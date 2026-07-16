namespace MyTools.Map.Generation
{
    // Per-run state handed to a registered algorithm. "Walkable" doubles as the town kind's road
    // grid (true = carved) - both are just a bool[height, width] the algorithm mutates in place,
    // matching the reference's mutate-in-place style. Catalog is optional and only used by
    // MonsterSpawner's id-list fallback.
    public sealed class GeneratorContext
    {
        public GeneratorSettings Settings { get; }
        public SeededRandom Rng { get; }
        public MapDocument Map { get; }
        public bool[,] Walkable { get; set; }
        public MapCatalog? Catalog { get; }

        public GeneratorContext(GeneratorSettings settings, SeededRandom rng, MapDocument map, bool[,] walkable, MapCatalog? catalog = null)
        {
            Settings = settings;
            Rng = rng;
            Map = map;
            Walkable = walkable;
            Catalog = catalog;
        }
    }
}
