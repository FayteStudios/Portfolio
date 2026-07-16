using System.Collections.Generic;

namespace MyTools.Map.Generation
{
    // Single-feature-item placement (tree/rock/crate/... on one tile) plus the kind/layout-aware
    // "which feature goes on which wall tile" rules, ported from generator.js's FEATURE_ITEM_OPTIONS/
    // setGeneratedFeature/semanticFeatureKindForWall/applySemanticFeatureItems.
    public static class FeaturePlacer
    {
        public static readonly (string Key, string Label)[] FeatureItemOptions =
        {
            ("tree", "Tree"),
            ("rock", "Rock"),
            ("crate", "Crate"),
            ("grave", "Grave"),
            ("pillar", "Pillar"),
            ("switch", "Switch"),
            ("trap", "Trap"),
            ("resource", "Resource"),
            ("portal", "Portal"),
            ("statue", "Statue"),
            ("wagon", "Wagon"),
            ("fence", "Fence")
        };

        public static bool SetFeature(MapDocument map, int x, int y, string featureKey, Dictionary<string, int> featureItems)
        {
            if (!featureItems.TryGetValue(featureKey, out int itemId) || itemId <= 0) return false;
            var key = (x, y);
            map.generatorFeatureKinds[key] = featureKey;
            map.generatorWallKinds.Remove(key);
            map.items[key] = WallAutoTiler.CreateItemRecord(itemId, x, y);
            return true;
        }

        // x, y here are 0-based wall-grid coordinates; surface lookups use the 1-based map tile.
        public static string SemanticFeatureKindForWall(GeneratorSettings settings, MapDocument map, int x, int y, string modeName)
        {
            map.surfaces.TryGetValue((x + 1, y + 1), out int surfaceId);
            if (surfaceId == settings.worldForestSurface) return "tree";
            if (surfaceId == settings.worldMountainSurface || surfaceId == settings.worldDesertSurface || surfaceId == settings.worldSnowSurface) return "rock";
            if (surfaceId == settings.worldRuinSurface) return "grave";
            if (surfaceId == settings.worldResourceSurface) return "resource";
            if (surfaceId == settings.worldDangerSurface) return "trap";

            switch (modeName)
            {
                case "wilderness":
                    return settings.wildernessLayout is "grove" or "swamp" or "huntinggrounds" ? "tree" : "rock";
                case "encounter":
                    if (settings.encounterLayout is "ambushroad" or "forestclearing") return "tree";
                    if (settings.encounterLayout == "caravan") return "wagon";
                    if (settings.encounterLayout is "outpost" or "tollgate" or "siegebreach") return "crate";
                    if (settings.encounterLayout is "ruinsfield" or "ritualcircle" or "leyduel") return "pillar";
                    return "rock";
                case "infrastructure":
                    if (settings.infrastructureLayout is "farmstead" or "orchard") return "tree";
                    if (settings.infrastructureLayout == "graveyard") return "grave";
                    if (settings.infrastructureLayout is "docks" or "canal" or "checkpoint" or "citywalls" or "moatedkeep") return "crate";
                    return "rock";
                case "puzzle":
                    if (settings.puzzleLayout is "pressureplates" or "switchchambers" or "floodlocks" or "keymaze") return "switch";
                    if (settings.puzzleLayout is "trapgauntlet" or "torchpath") return "trap";
                    return "pillar";
                case "landmark":
                    if (settings.landmarkLayout == "gianttree") return "tree";
                    if (settings.landmarkLayout == "battlefield") return "grave";
                    if (settings.landmarkLayout == "portalshrine") return "portal";
                    if (settings.landmarkLayout is "obelisk" or "stonecircle") return "statue";
                    return "rock";
                case "hazard":
                    if (settings.hazardLayout is "spikefield" or "collapsingfloor" or "lavaflows" or "poisonbog" or "firebreak") return "trap";
                    if (settings.hazardLayout == "lightningrods") return "pillar";
                    return "rock";
                case "interior":
                    return settings.interiorLayout is "warehouse" or "workshop" or "market" or "inn" ? "crate" : "pillar";
                case "quest":
                    if (settings.dungeonLayout is "caves" or "noisecaves" or "ridgecaves" or "dla" or "cavernrooms" or "mineshaft" or "dragonlair") return "rock";
                    if (settings.dungeonLayout is "crypt" or "zombiestreets") return "grave";
                    if (settings.dungeonLayout is "elffactory" or "banditcamp" or "library" or "jailbreak") return "crate";
                    if (settings.dungeonLayout is "spiderden" or "ratnest" or "sewers") return "rock";
                    break;
            }
            return "";
        }

        public static int ApplySemanticFeatureItems(MapDocument map, bool[,] wallGrid, GeneratorSettings settings, string modeName)
        {
            int changed = 0;
            int rows = wallGrid.GetLength(0);
            int cols = wallGrid.GetLength(1);
            for (int y = 0; y < rows; y++)
                for (int x = 0; x < cols; x++)
                {
                    if (!wallGrid[y, x]) continue;
                    string featureKey = SemanticFeatureKindForWall(settings, map, x, y, modeName);
                    if (string.IsNullOrEmpty(featureKey)) continue;
                    if (SetFeature(map, x + 1, y + 1, featureKey, settings.featureItems)) changed++;
                }
            return changed;
        }
    }
}
