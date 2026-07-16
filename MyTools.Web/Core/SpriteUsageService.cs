using System;
using System.Collections.Generic;
using System.Linq;

namespace MyTools
{
    public static class SpriteUsageService
    {
        public sealed record SpriteReference(
            ServerFile file,
            int entryId,
            string entryName,
            string fieldLabel,
            string fieldKey);

        public static List<SpriteReference> FindReferences(ServerWorkspace workspace, string category, int spriteId)
        {
            List<SpriteReference> results = new();

            foreach (ServerFile file in Enum.GetValues<ServerFile>())
            {
                List<EditorEntry> matchingFields = EditorDefinitions.For(file)
                    .Where(field => !string.IsNullOrWhiteSpace(field.picker) &&
                                    string.Equals(NormalizeSpriteCategory(field.picker), category, StringComparison.OrdinalIgnoreCase))
                    .ToList();

                if (matchingFields.Count == 0)
                    continue;

                IniDoc? doc = workspace.GetDoc(file);
                List<Definition> definitions = workspace.GetDefinitions(file);

                if (doc == null || definitions.Count == 0)
                    continue;

                ScanFile(file, doc, definitions, matchingFields, spriteId, results);
            }

            return results;
        }

        private static void ScanFile(
            ServerFile file,
            IniDoc doc,
            List<Definition> definitions,
            List<EditorEntry> matchingFields,
            int spriteId,
            List<SpriteReference> results)
        {
            ServerFileInfo info = ServerFiles.Get(file);

            if (info.blockMode == ServerFileBlockMode.WholeFile)
            {
                ScanBlock(file, definitions[0], doc.lines, matchingFields, spriteId, results);
                return;
            }

            int definitionIndex = -1;
            List<IniLine> currentLines = new();

            void Flush()
            {
                if (definitionIndex < 0 || definitionIndex >= definitions.Count)
                    return;

                ScanBlock(file, definitions[definitionIndex], currentLines, matchingFields, spriteId, results);
            }

            foreach (IniLine line in doc.lines)
            {
                bool isMarker = info.blockMode == ServerFileBlockMode.FlagBlock
                    ? line is Flag flagLine && flagLine.name.Equals(info.blockMarker, StringComparison.OrdinalIgnoreCase)
                    : line is Key markerKeyLine && markerKeyLine.key.Equals(info.blockMarker, StringComparison.OrdinalIgnoreCase);

                if (isMarker)
                {
                    Flush();
                    definitionIndex++;
                    currentLines = new List<IniLine>();
                }

                currentLines.Add(line);
            }

            Flush();
        }

        private static void ScanBlock(
            ServerFile file,
            Definition definition,
            List<IniLine> lines,
            List<EditorEntry> matchingFields,
            int spriteId,
            List<SpriteReference> results)
        {
            foreach (IniLine line in lines)
            {
                if (line is not Key keyLine)
                    continue;

                EditorEntry? matchedField = matchingFields.FirstOrDefault(
                    field => field.key.Equals(keyLine.key, StringComparison.OrdinalIgnoreCase));

                if (matchedField == null)
                    continue;

                if (!int.TryParse(keyLine.value.Trim(), out int referencedId) || referencedId != spriteId)
                    continue;

                results.Add(new SpriteReference(
                    file,
                    definition.entryId,
                    definition.name,
                    string.IsNullOrWhiteSpace(matchedField.label) ? matchedField.key : matchedField.label,
                    matchedField.key));
            }
        }

        private static string? NormalizeSpriteCategory(string picker)
        {
            if (picker.Equals("itemSprite", StringComparison.OrdinalIgnoreCase) ||
                picker.Equals("sprite", StringComparison.OrdinalIgnoreCase))
                return "item";

            if (picker.Equals("monsterSprite", StringComparison.OrdinalIgnoreCase))
                return "monster";

            if (picker.Equals("playerSprite", StringComparison.OrdinalIgnoreCase))
                return "player";

            if (picker.Equals("wearSprite", StringComparison.OrdinalIgnoreCase))
                return "wearing";

            return null;
        }
    }
}
