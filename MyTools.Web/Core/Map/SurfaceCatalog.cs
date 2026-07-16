using System.Collections.Generic;

namespace MyTools.Map
{
    // Surfaces aren't read from any ini/dat file - the reference tool's own catalog is a
    // hardcoded, purely illustrative list of plausible/known ids for the palette (a map's actual
    // surface values aren't limited to this list; anything can be painted by numeric id via the
    // "Selected ID" field). Ported verbatim from its buildSurfaceCatalog().
    public static class SurfaceCatalog
    {
        public const int WaterMinSurface = 140;
        public const int WaterMaxSurface = 200;

        private static readonly int[] ElevationIds =
        {
            238, 258, 278, 298, 318, 338, 358, 378, 398, 418,
            438, 458, 478, 518, 538, 558, 578, 598, 618, 638, 658, 678
        };

        public static List<MapCatalogSurface> Build()
        {
            List<MapCatalogSurface> surfaces = new();

            for (int id = 100; id < 140; id++)
                surfaces.Add(new MapCatalogSurface { id = id, name = $"Flat {id}" });

            for (int id = WaterMinSurface; id <= WaterMaxSurface; id++)
                surfaces.Add(new MapCatalogSurface { id = id, name = $"Water {id}" });

            foreach (int id in ElevationIds)
                surfaces.Add(new MapCatalogSurface { id = id, name = $"Elevation {id}" });

            return surfaces;
        }

        public static bool IsWater(int surface) => surface >= WaterMinSurface && surface <= WaterMaxSurface;
    }
}
