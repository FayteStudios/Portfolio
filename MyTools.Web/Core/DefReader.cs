using System;
using System.Collections.Generic;

namespace MyTools
{
    public class DefReader
    {
        public DefinitionReadResult<Definition> Read(IniDoc doc, ServerFile fileType)
        {
            ArgumentNullException.ThrowIfNull(doc);

            ServerFileInfo info = ServerFiles.Get(fileType);

            return info.blockMode switch
            {
                ServerFileBlockMode.KeyBlock => ReadKeyBlocks(doc, info),
                ServerFileBlockMode.NamedKeyBlock => ReadNamedKeyBlocks(doc, info),
                ServerFileBlockMode.FlagBlock => ReadFlagBlocks(doc, info),
                ServerFileBlockMode.WholeFile => ReadWholeFile(doc, info),
                _ => throw new InvalidOperationException($"Unsupported block mode: {info.blockMode}")
            };
        }
        private DefinitionReadResult<Definition> ReadNamedKeyBlocks(IniDoc doc, ServerFileInfo info)
        {
            DefinitionReadResult<Definition> result = new(doc);

            Definition? current = null;
            int ordinal = 0;

            void Flush()
            {
                if (current == null)
                    return;

                result.definitions.Add(current);
                current = null;
            }

            foreach (IniLine line in doc.lines)
            {
                if (line is Key keyLine &&
                    keyLine.key.Equals(info.blockMarker, StringComparison.OrdinalIgnoreCase))
                {
                    Flush();

                    ordinal++;

                    current = new Definition
                    {
                        fileType = info.file,
                        ordinal = ordinal,
                        entryId = ordinal,
                        name = keyLine.value.Trim()
                    };

                    continue;
                }

                if (current == null)
                    continue;

                if (line is Key key)
                {
                    ApplyKey(current, key.key, key.value);
                    continue;
                }

                if (line is Flag flag)
                {
                    ApplyKey(current, flag.name, "true");
                    continue;
                }
            }

            Flush();

            return result;
        }
        private DefinitionReadResult<Definition> ReadKeyBlocks(IniDoc doc, ServerFileInfo info)
        {
            DefinitionReadResult<Definition> result = new(doc);

            Definition? current = null;

            void Flush()
            {
                if (current == null)
                    return;

                result.definitions.Add(current);
                current = null;
            }

            foreach (IniLine line in doc.lines)
            {
                if (line is Key keyLine &&
                    keyLine.key.Equals(info.blockMarker, StringComparison.OrdinalIgnoreCase))
                {
                    Flush();

                    current = new Definition
                    {
                        fileType = info.file
                    };

                    if (int.TryParse(keyLine.value.Trim(), out int parsedId))
                    {
                        current.entryId = parsedId;
                    }

                    ApplyKey(current, keyLine.key, keyLine.value);
                    continue;
                }

                if (current == null)
                    continue;

                if (line is Key key)
                {
                    ApplyKey(current, key.key, key.value);
                    continue;
                }

                if (line is Flag flag)
                {
                    ApplyKey(current, flag.name, "true");
                    continue;
                }
            }

            Flush();

            return result;
        }

        private DefinitionReadResult<Definition> ReadFlagBlocks(IniDoc doc, ServerFileInfo info)
        {
            DefinitionReadResult<Definition> result = new(doc);

            Definition? current = null;
            Dictionary<string, string> currentValues = new(StringComparer.OrdinalIgnoreCase);
            int ordinal = 0;

            void Flush()
            {
                if (current == null)
                    return;

                current.name = ResolveFlagBlockName(info.file, currentValues, current.name);
                result.definitions.Add(current);
                current = null;
            }

            foreach (IniLine line in doc.lines)
            {
                if (line is Flag flagLine &&
                    flagLine.name.Equals(info.blockMarker, StringComparison.OrdinalIgnoreCase))
                {
                    Flush();

                    ordinal++;

                    current = new Definition
                    {
                        fileType = info.file,
                        ordinal = ordinal,
                        entryId = ordinal
                    };

                    currentValues = new(StringComparer.OrdinalIgnoreCase);

                    ApplyKey(current, flagLine.name, "true");
                    continue;
                }

                if (current == null)
                    continue;

                if (line is Key key)
                {
                    currentValues[key.key] = key.value;
                    ApplyKey(current, key.key, key.value);
                    continue;
                }

                if (line is Flag flag)
                {
                    ApplyKey(current, flag.name, "true");
                    continue;
                }
            }

            Flush();

            return result;
        }

        // itemuse.ini/multiuse.ini entries have no Name field at all - label them by their main
        // output instead (e.g. an ore-smelting recipe shows as "Iron Bar") so the entry list is
        // actually browsable, rather than showing a bare sequential number for every row.
        private static readonly string[] UsageNameFallbackKeys =
        {
            "SuccessFocus", "SuccessTool",
            "SuccessItem1", "SuccessItem2", "SuccessItem3", "SuccessItem4", "SuccessItem5",
            "SuccessItem6", "SuccessItem7", "SuccessItem8", "SuccessItem9", "SuccessItem10"
        };

        private static string ResolveFlagBlockName(ServerFile file, Dictionary<string, string> values, string fallback)
        {
            string[] outputKeys = file switch
            {
                ServerFile.Usages => UsageNameFallbackKeys,
                ServerFile.MultiUses => new[] { "SuccessItem" },
                _ => Array.Empty<string>()
            };

            foreach (string key in outputKeys)
            {
                if (values.TryGetValue(key, out string? value) && IsMeaningfulName(value))
                    return CleanDisplayToken(value);
            }

            if (file == ServerFile.Usages &&
                values.TryGetValue("ItemTool", out string? tool) && IsMeaningfulName(tool) &&
                values.TryGetValue("ItemFocus", out string? focus) && IsMeaningfulName(focus))
            {
                return $"{CleanDisplayToken(tool)} on {CleanDisplayToken(focus)}";
            }

            if (file == ServerFile.MultiUses &&
                values.TryGetValue("FocusItem", out string? focusItem) && IsMeaningfulName(focusItem))
            {
                return CleanDisplayToken(focusItem);
            }

            return fallback;
        }

        private static bool IsMeaningfulName(string? value) =>
            !string.IsNullOrWhiteSpace(value) && !value.Trim().Equals("nothing", StringComparison.OrdinalIgnoreCase);

        private static string CleanDisplayToken(string value)
        {
            // Some RPGWO data uses "<id> ::: <friendly name>" (e.g. "11 ::: Pine Tree") where the
            // id is what the server actually parses and the rest is a human comment. Prefer the
            // comment for display since it's far more readable than a bare id.
            int markerIndex = value.IndexOf(":::", StringComparison.Ordinal);
            return markerIndex >= 0 ? value[(markerIndex + 3)..].Trim() : value.Trim();
        }

        private DefinitionReadResult<Definition> ReadWholeFile(IniDoc doc, ServerFileInfo info)
        {
            DefinitionReadResult<Definition> result = new(doc);

            Definition definition = new()
            {
                fileType = info.file,
                entryId = 1,
                ordinal = 1
            };

            foreach (IniLine line in doc.lines)
            {
                if (line is Key key)
                {
                    ApplyKey(definition, key.key, key.value);
                    continue;
                }

                if (line is Flag flag)
                {
                    ApplyKey(definition, flag.name, "true");
                    continue;
                }
            }

            result.definitions.Add(definition);

            return result;
        }

        public static void ApplyKey(Definition key, string keyName, string value)
        {
            // Definition only tracks identity (fileType/entryId/ordinal/ID/name) - the editor UI
            // reads INI content directly from IniDoc/EditorEntry, not from Definition, so Name is
            // the only key this needs to recognize.
            if (keyName.Equals("Name", StringComparison.OrdinalIgnoreCase))
                key.name = value;
        }

    }
}
