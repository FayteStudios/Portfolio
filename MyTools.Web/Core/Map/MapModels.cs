using System.Collections.Generic;

namespace MyTools.Map
{
    // One MapDocument = one flat area/floor (matches the original tool's model exactly - RPGWO
    // floor transitions are ordinary CAVEUP/CAVEDOWN items linking separate map documents, not a
    // z-axis within a single grid, so no multi-floor support belongs here).
    public sealed class MapDocument
    {
        public string name = "Untitled";
        public int width;
        public int height;
        public string version = "2.0       RPGWO Edit";
        public string notes = "";

        public Dictionary<(int x, int y), int> surfaces = new();
        public Dictionary<(int x, int y), MapItemRecord> items = new();
        public Dictionary<(int x, int y), MapMonsterRecord> monsters = new();

        // Generator bookkeeping so a post-generation tweak (e.g. changing which item id a wall
        // shape uses) can re-target exactly the tiles a generator run touched, without rerunning
        // the whole algorithm. Editor-only state - never persisted to .map/.rsf.
        public Dictionary<(int x, int y), string> generatorWallKinds = new();
        public HashSet<(int x, int y)> generatorRoadKeys = new();
        public Dictionary<(int x, int y), string> generatorFeatureKinds = new();
        public HashSet<(int x, int y)> generatorSpawnBlockedKeys = new();

        public static MapDocument CreateEmpty(int width, int height, string name = "Untitled") => new()
        {
            name = name,
            width = width,
            height = height
        };
    }

    // One item spawn/placement per tile. rawRecord preserves the exact original 345-byte record
    // until the editor actually touches it (dirty=true), so unknown/unparsed sub-fields survive a
    // save untouched - the same lossless-round-trip discipline as IniDoc/IniWriter.
    public sealed class MapItemRecord
    {
        public byte[]? rawRecord;
        public bool dirty;
        public int itemId;
        public int x;
        public int y;
        public int data1;
        public int data2;
        public int data3;
        public int data4;
        public int data5;
        public int reset;
        public int uses;
        public int trigger;
        public float timeout;
        public string text = "";
        public int putIn;
    }

    // One monster spawn point per tile - a static (monsterId, respawn timeout) pair, not a
    // roaming zone/radius.
    public sealed class MapMonsterRecord
    {
        public byte[]? rawRecord;
        public bool dirty;
        public int monsterId;
        public int x;
        public int y;
        public int timeout;
    }
}
