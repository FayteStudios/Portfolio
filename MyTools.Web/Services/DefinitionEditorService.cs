using System;
using System.Collections.Generic;
using System.Linq;

namespace MyTools.Web.Services
{
    // Bridges the EditorDefinitions field schema against a specific entry's block of IniDoc
    // lines: populates each field's current value for display, and writes edited values back
    // through BlockWriter on commit. This is new glue code (the desktop app's equivalent lives
    // inline in WPF UI code-behind) but only ever talks to the already-ported, already-verified
    // BlockWriter/EditorDefinitions - it doesn't reinterpret the ini format itself.
    public sealed class DefinitionEditorService
    {
        private readonly BlockWriter blockWriter = new();

        public List<EditorEntry> BuildFormFields(ServerWorkspace workspace, ServerFile file, Definition definition)
        {
            ServerFileInfo info = ServerFiles.Get(file);
            IniDoc? doc = workspace.GetDoc(file);
            List<EditorEntry> schema = EditorDefinitions.For(file).Select(Clone).ToList();

            if (doc == null)
                return schema;

            int start = 0;
            int end = doc.lines.Count;

            if (info.blockMode != ServerFileBlockMode.WholeFile)
            {
                string? blockName = info.blockMode == ServerFileBlockMode.NamedKeyBlock ? definition.name : null;

                if (!blockWriter.TryFindBlockRange(doc, info, definition.entryId, blockName, out start, out end))
                {
                    start = 0;
                    end = 0;
                }
            }

            foreach (EditorEntry field in schema)
            {
                if (IsIdentityField(info, field))
                {
                    // The schema includes a display field for the entry's own id/name (e.g.
                    // Item's "Item ID", Treasure's "Treasure" name) whose key is literally the
                    // block marker itself (e.g. "Item", "Treasure") - that value lives in the
                    // block's marker line, not in a separate keyed line inside the block body, so
                    // it can't be read the same way as every other field.
                    field.value = info.blockMode == ServerFileBlockMode.NamedKeyBlock
                        ? definition.name
                        : definition.entryId.ToString(System.Globalization.CultureInfo.InvariantCulture);

                    continue;
                }

                PopulateValue(field, doc.lines, start, end);
            }

            return schema;
        }

        // True for the one schema field per KeyBlock/NamedKeyBlock file whose key is the block's
        // own marker (Item/Monster/Skill/Spell/Animation/Treasure) - it identifies the block
        // rather than living inside it, so it's read-only here (renumbering/renaming an entry
        // isn't a plain field edit - it would need to move/rekey the whole block).
        public static bool IsIdentityField(ServerFileInfo info, EditorEntry field) =>
            info.blockMode is ServerFileBlockMode.KeyBlock or ServerFileBlockMode.NamedKeyBlock &&
            field.key.Equals(info.blockMarker, StringComparison.OrdinalIgnoreCase);

        private static void PopulateValue(EditorEntry field, List<IniLine> lines, int start, int end)
        {
            // A handful of schema entries (verified pre-existing in the original desktop app's
            // EditorDefinitions, not introduced by this port) have no key at all - there is
            // nothing to read or write for those, so leave them blank rather than matching every
            // line by an empty key.
            if (start == end || string.IsNullOrWhiteSpace(field.key))
                return;

            if (field.isFlag)
            {
                for (int i = start; i < end; i++)
                {
                    if (lines[i] is Flag flag && flag.name.Equals(field.key, StringComparison.OrdinalIgnoreCase))
                    {
                        field.value = "true";
                        return;
                    }
                }

                field.value = "";
                return;
            }

            for (int i = start; i < end; i++)
            {
                if (lines[i] is Key key && key.key.Equals(field.key, StringComparison.OrdinalIgnoreCase))
                {
                    field.value = key.value;
                    return;
                }
            }

            field.value = field.defaultValue;
        }

        // Empty + allowEmpty removes the field entirely (keeps the file clean instead of writing
        // "Key=" for something the user cleared); everything else is a plain SetField/SetFlag.
        public void Commit(IniDoc doc, ServerFile file, Definition definition, List<EditorEntry> fields)
        {
            ServerFileInfo info = ServerFiles.Get(file);
            string? blockName = info.blockMode == ServerFileBlockMode.NamedKeyBlock ? definition.name : null;

            foreach (EditorEntry field in fields)
            {
                if (string.IsNullOrWhiteSpace(field.key) || IsIdentityField(info, field))
                    continue;

                if (field.isFlag)
                {
                    blockWriter.SetFlag(doc, info, definition.entryId, blockName, field.key, field.value == "true");
                }
                else if (string.IsNullOrEmpty(field.value) && field.allowEmpty)
                {
                    blockWriter.RemoveField(doc, info, definition.entryId, blockName, field.key);
                }
                else
                {
                    blockWriter.SetField(doc, info, definition.entryId, blockName, field.key, field.value);
                }
            }
        }

        public int NextFreeId(List<Definition> definitions) =>
            definitions.Select(d => d.entryId).DefaultIfEmpty(0).Max() + 1;

        public void AddEntry(IniDoc doc, ServerFile file, int newId, string? newName)
        {
            ServerFileInfo info = ServerFiles.Get(file);
            blockWriter.AddBlock(doc, info, newId, newName);
        }

        public void DeleteEntry(IniDoc doc, ServerFile file, Definition definition)
        {
            ServerFileInfo info = ServerFiles.Get(file);
            string? blockName = info.blockMode == ServerFileBlockMode.NamedKeyBlock ? definition.name : null;

            if (blockWriter.TryFindBlockRange(doc, info, definition.entryId, blockName, out int start, out int end))
            {
                doc.lines.RemoveRange(start, end - start);
            }
        }

        private static EditorEntry Clone(EditorEntry source) => new()
        {
            group = source.group,
            type = source.type,
            kind = source.kind,
            defaultValue = source.defaultValue,
            key = source.key,
            label = source.label,
            value = source.value,
            required = source.required,
            allowEmpty = source.allowEmpty,
            options = new List<string>(source.options),
            picker = source.picker,
            description = source.description,
            allowMultiple = source.allowMultiple,
            appendPickedValue = source.appendPickedValue,
            valueSeparator = source.valueSeparator
        };
    }
}
