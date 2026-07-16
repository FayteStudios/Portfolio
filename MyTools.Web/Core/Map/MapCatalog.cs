using System.Collections.Generic;
using System.Linq;

namespace MyTools.Map
{
    // Plain {id, name, image, imageType} shaped catalog entries - this is deliberately the exact
    // shape the reference map editor's rendering/palette/inspector code consumes (its own binary
    // .dat parser produces the same shape). Built directly from data our toolkit has already
    // parsed from item.ini/monster.ini, instead of requiring a separate itemdef2.dat/monsterdef.dat
    // upload - see MapCatalogBuilder.
    public sealed class MapCatalogItem
    {
        public int id;
        public string name = "";
        public int image;
        public int imageType;
        public string className = "";
    }

    public sealed class MapCatalogMonster
    {
        public int id;
        public string name = "";
        public int image;
        public int imageType;
    }

    public sealed class MapCatalogSurface
    {
        public int id;
        public string name = "";
    }

    public sealed class MapCatalog
    {
        public List<MapCatalogItem> items = new();
        public List<MapCatalogMonster> monsters = new();
        public List<MapCatalogSurface> surfaces = new();

        public Dictionary<int, MapCatalogItem> itemById = new();
        public Dictionary<int, MapCatalogMonster> monsterById = new();

        public MapCatalogItem? GetItem(int id) => itemById.GetValueOrDefault(id);
        public MapCatalogMonster? GetMonster(int id) => monsterById.GetValueOrDefault(id);
    }

    public static class MapCatalogBuilder
    {
        public static MapCatalog Build(ServerWorkspace workspace)
        {
            MapCatalog catalog = new()
            {
                items = BuildItems(workspace),
                monsters = BuildMonsters(workspace),
                surfaces = SurfaceCatalog.Build()
            };

            catalog.itemById = catalog.items.ToDictionary(item => item.id);
            catalog.monsterById = catalog.monsters.ToDictionary(monster => monster.id);
            return catalog;
        }

        private static List<MapCatalogItem> BuildItems(ServerWorkspace workspace)
        {
            IniDoc? doc = workspace.itemDoc;
            List<MapCatalogItem> results = new();

            if (doc == null)
                return results;

            DefinitionEditorFieldReader reader = new(doc, ServerFile.Items);

            foreach (Definition definition in workspace.items)
            {
                Dictionary<string, string> fields = reader.ReadBlock(definition);

                results.Add(new MapCatalogItem
                {
                    id = definition.entryId,
                    name = definition.name,
                    image = ParseIntOrZero(fields.GetValueOrDefault("Animation0")),
                    imageType = ParseIntOrZero(fields.GetValueOrDefault("ImageType")),
                    className = fields.GetValueOrDefault("Class") ?? ""
                });
            }

            return results;
        }

        private static List<MapCatalogMonster> BuildMonsters(ServerWorkspace workspace)
        {
            IniDoc? doc = workspace.monsterDoc;
            List<MapCatalogMonster> results = new();

            if (doc == null)
                return results;

            DefinitionEditorFieldReader reader = new(doc, ServerFile.Monsters);

            foreach (Definition definition in workspace.monsters)
            {
                Dictionary<string, string> fields = reader.ReadBlock(definition);

                results.Add(new MapCatalogMonster
                {
                    id = definition.entryId,
                    name = definition.name,
                    image = ParseIntOrZero(fields.GetValueOrDefault("Image")),
                    imageType = ParseIntOrZero(fields.GetValueOrDefault("ImageType"))
                });
            }

            return results;
        }

        private static int ParseIntOrZero(string? text) =>
            int.TryParse(text?.Trim(), out int value) ? value : 0;
    }

    // Small helper: reads a handful of named field values out of one definition's block of
    // IniDoc lines, without going through the full EditorDefinitions/DefinitionEditorService
    // machinery (the map catalog only needs a few raw values, not the whole editable form).
    public sealed class DefinitionEditorFieldReader
    {
        private readonly IniDoc doc;
        private readonly ServerFileInfo info;
        private readonly BlockWriter blockWriter = new();

        public DefinitionEditorFieldReader(IniDoc doc, ServerFile file)
        {
            this.doc = doc;
            info = ServerFiles.Get(file);
        }

        public Dictionary<string, string> ReadBlock(Definition definition)
        {
            Dictionary<string, string> values = new(System.StringComparer.OrdinalIgnoreCase);

            int start = 0;
            int end = doc.lines.Count;

            if (info.blockMode != ServerFileBlockMode.WholeFile)
            {
                string? blockName = info.blockMode == ServerFileBlockMode.NamedKeyBlock ? definition.name : null;

                if (!blockWriter.TryFindBlockRange(doc, info, definition.entryId, blockName, out start, out end))
                    return values;
            }

            for (int i = start; i < end; i++)
            {
                if (doc.lines[i] is Key key)
                    values[key.key] = key.value;
            }

            return values;
        }
    }
}
