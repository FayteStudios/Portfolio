using System;
using System.Collections.Generic;
using System.Text;

namespace MyTools
{
    public class DefinitionReadResult<Def> where Def : Definition
    {
        public IniDoc doc { get; }
        public List<Def> definitions { get; } = new();
        public List<string> warnings { get; } = new();

        public DefinitionReadResult(IniDoc doc)
        {
            this.doc = doc;
        }
    }

    public class IniParseResult
    {
        public IniDoc doc;
        public IniParseResult(IniDoc doc)
        {
            this.doc = doc;
        }
    }

    public class IniParseOptions
    {
        public bool allowSemicolons { get; set; } = true;
        public bool allowApostrophes { get; set; } = true;
        public bool allowSections { get; set; } = true;
        public bool allowFlags { get; set; } = true;

        public bool trimKeys { get; set; } = true;
        public bool trimValues { get; set; } = true;
        public bool trimFlags { get; set; } = true;

        public bool stripInlineCommentsFromFlags { get; set; } = true;
    }

    public class IniParser
    {
        // folderPath-relative reads go through IVirtualFileSystem instead of File.ReadAllText -
        // everything else here is unchanged pure-string parsing from the desktop app.
        public IniParseResult ParseFile(IVirtualFileSystem fs, string path, IniParseOptions? options = null)
        {
            string text = fs.ReadAllText(path);
            IniParseResult result = ParseText(text, options);
            result.doc.source = path;
            return result;
        }
        public IniParseResult ParseText(string text, IniParseOptions? options = null)
        {
            options ??= new IniParseOptions();

            var doc = new IniDoc();
            doc.newLine = DetectNewLine(text);

            var result = new IniParseResult(doc);

            string[] lines = SplitLines(text);

            for (int index = 0; index < lines.Length; index++)
            {
                string line = lines[index];
                int lineNumber = index + 1;

                IniLine parsedLine = ParseLine(line, lineNumber, options, result);
                doc.lines.Add(parsedLine);
            }

            return result;
        }
        public IniLine ParseLine(string line, int lineNumber, IniParseOptions options, IniParseResult result)
        {
            string trimmedStart = line.TrimStart();

            if (string.IsNullOrWhiteSpace(line))
            {
                return new BlankLine
                {
                    lineNumber = lineNumber,
                    originalText = line,
                    text = line
                };
            }

            if (options.allowSemicolons && trimmedStart.StartsWith(';'))
            {
                return new Comment
                {
                    lineNumber = lineNumber,
                    originalText = line,
                    marker = ';',
                    text = trimmedStart
                };
            }

            if (options.allowApostrophes && trimmedStart.StartsWith('\''))
            {
                return new Comment
                {
                    lineNumber = lineNumber,
                    originalText = line,
                    marker = '\'',
                    text = trimmedStart
                };
            }

            if (options.allowSections && IsSectionLine(trimmedStart, out string sectionName))
            {
                return new SectionLine
                {
                    lineNumber = lineNumber,
                    originalText = line,
                    name = sectionName
                };
            }

            int separatorIndex = line.IndexOf('=');

            if (separatorIndex >= 0)
            {
                string rawKey = line[..separatorIndex];
                string rawValue = line[(separatorIndex + 1)..];

                string key = options.trimKeys ? rawKey.Trim() : rawKey;
                string value = options.trimValues ? rawValue.Trim() : rawValue;

                return new Key
                {
                    lineNumber = lineNumber,
                    originalText = line,
                    key = key,
                    value = value,
                    separator = "=",
                    isModded = false
                };
            }

            if (options.allowFlags)
            {
                string flagName = options.trimFlags ? line.Trim() : line;

                if (options.stripInlineCommentsFromFlags)
                {
                    flagName = StripInlineCommentFromFlag(flagName, options);
                }

                if (!string.IsNullOrWhiteSpace(flagName))
                {
                    return new Flag
                    {
                        lineNumber = lineNumber,
                        originalText = line,
                        name = flagName
                    };
                }
            }

            return new RawLine
            {
                lineNumber = lineNumber,
                originalText = line,
                reason = "Line was not recognized as a comment, section, key/value pair, or flag."
            };
        }
        private string StripInlineCommentFromFlag(string flagName, IniParseOptions options)
        {
            int cutIndex = -1;

            if (options.allowSemicolons)
            {
                int semicolonIndex = flagName.IndexOf(';');

                if (semicolonIndex >= 0)
                {
                    cutIndex = semicolonIndex;
                }
            }

            if (options.allowApostrophes)
            {
                int apostropheIndex = flagName.IndexOf('\'');

                if (apostropheIndex >= 0 && (cutIndex < 0 || apostropheIndex < cutIndex))
                {
                    cutIndex = apostropheIndex;
                }
            }

            if (cutIndex >= 0)
            {
                flagName = flagName[..cutIndex];
            }

            return flagName.Trim();
        }
        private bool IsSectionLine(string line, out string sectionName)
        {
            sectionName = "";
            if (!line.StartsWith('[') || !line.EndsWith(']'))
                return false;
            if (line.Length < 3)
                return false;
            sectionName = line[1..^1].Trim();
            return sectionName.Length > 0;
        }
        private string DetectNewLine(string text)
        {
            int crlfIndex = text.IndexOf("\r\n", StringComparison.Ordinal);
            int lfIndex = text.IndexOf('\n');
            int crIndex = text.IndexOf('\r');

            if (crlfIndex >= 0)
                return "\r\n";

            if (lfIndex >= 0)
                return "\n";

            if (crIndex >= 0)
                return "\r";

            return Environment.NewLine;
        }
        private string[] SplitLines(string text)
        {
            text = text.Replace("\r\n", "\n").Replace('\r', '\n');
            if (text.EndsWith('\n')) text = text[..^1];
            return text.Split('\n');
        }
    }

    public class IniWriter
    {
        public void WriteFile(IVirtualFileSystem fs, string path, IniDoc doc)
        {
            string text = WriteToString(doc);
            fs.WriteAllText(path, text);
        }

        public string WriteToString(IniDoc doc)
        {
            var builder = new StringBuilder();

            for (int i = 0; i < doc.lines.Count; i++)
            {
                IniLine line = doc.lines[i];
                string output = WriteLine(line);

                builder.Append(output);
                if (i < doc.lines.Count - 1)
                {
                    builder.Append(doc.newLine);
                }
            }
            return builder.ToString();
        }

        private string WriteLine(IniLine line)
        {
            if (line is Key key)
            {
                if (!key.isModded && !string.IsNullOrEmpty(key.originalText))
                    return key.originalText;

                return key.key + key.separator + key.value;
            }

            if (line is Flag flag)
            {
                if (!string.IsNullOrEmpty(flag.originalText))
                    return flag.originalText;

                return flag.name;
            }

            if (line is SectionLine section)
            {
                if (!string.IsNullOrEmpty(section.originalText))
                    return section.originalText;

                return "[" + section.name + "]";
            }

            if (line is Comment comment)
            {
                if (!string.IsNullOrEmpty(comment.originalText))
                    return comment.originalText;

                if (string.IsNullOrEmpty(comment.text))
                    return comment.marker.ToString();

                if (comment.text.StartsWith(comment.marker))
                    return comment.text;

                return comment.marker + comment.text;
            }

            if (line is BlankLine)
            {
                return "";
            }

            return line.originalText;
        }
    }

    public class BlockWriter
    {
        // Block identity depends on ServerFileBlockMode: KeyBlock identifies a block by parsing
        // the marker Key's value as an int; NamedKeyBlock (treasure.ini) identifies it by the
        // marker Key's raw string value (e.g. "LowWeapon") since there is no numeric id at all;
        // FlagBlock (itemuse.ini/multiuse.ini) identifies it by the ordinal position of the
        // marker Flag, since a bare flag carries no value to key off of. blockId/blockName below
        // are only meaningful for the mode that actually uses them.

        public bool ContainsBlock(IniDoc doc, ServerFileInfo info, int blockId, string? blockName = null)
        {
            return FindBlock(doc, info, blockId, blockName) != null;
        }

        public bool SetField(IniDoc doc, ServerFileInfo info, int blockId, string? blockName, string fieldName, string value)
        {
            ValidateBlockArgs(doc, info.blockMarker, fieldName);

            IniBlock? block = FindBlock(doc, info, blockId, blockName);

            if (block == null)
                return false;

            Key? existingLine = FindFieldInBlock(
                doc,
                block.Value,
                fieldName);

            if (existingLine != null)
            {
                existingLine.value = value;
                existingLine.isModded = true;
                return true;
            }

            InsertFieldAtEndOfBlock(
                doc,
                block.Value,
                fieldName,
                value);

            return true;
        }

        public bool RemoveField(IniDoc doc, ServerFileInfo info, int blockId, string? blockName, string fieldName)
        {
            ValidateBlockArgs(doc, info.blockMarker, fieldName);

            IniBlock? block = FindBlock(doc, info, blockId, blockName);

            if (block == null)
                return false;

            bool removedAny = false;

            for (int index = block.Value.endIndexExclusive - 1; index > block.Value.startIndex; index--)
            {
                if (doc.lines[index] is not Key keyLine)
                    continue;

                if (!keyLine.key.Equals(fieldName, StringComparison.OrdinalIgnoreCase))
                    continue;

                doc.lines.RemoveAt(index);
                removedAny = true;
            }

            return removedAny;
        }

        public bool SetFlag(IniDoc doc, ServerFileInfo info, int blockId, string? blockName, string flagName, bool enabled)
        {
            ValidateBlockArgs(doc, info.blockMarker, flagName);

            IniBlock? block = FindBlock(doc, info, blockId, blockName);

            if (block == null)
                return false;

            List<int> matchingFlagIndexes = FindFlagIndexesInBlock(
                doc,
                block.Value,
                flagName);

            if (enabled)
            {
                if (matchingFlagIndexes.Count > 0)
                    return true;

                InsertFlagAtEndOfBlock(
                    doc,
                    block.Value,
                    flagName);

                return true;
            }

            for (int i = matchingFlagIndexes.Count - 1; i >= 0; i--)
            {
                doc.lines.RemoveAt(matchingFlagIndexes[i]);
            }

            return true;
        }

        public bool AddBlock(IniDoc doc, ServerFileInfo info, int blockId, string? blockName = null)
        {
            if (doc == null)
                throw new ArgumentNullException(nameof(doc));

            if (string.IsNullOrWhiteSpace(info.blockMarker))
                throw new ArgumentException("Block key is required.", nameof(info));

            if (ContainsBlock(doc, info, blockId, blockName))
                return false;

            if (doc.lines.Count > 0 && doc.lines[^1] is not BlankLine)
            {
                doc.lines.Add(new BlankLine
                {
                    originalText = "",
                    text = ""
                });
            }

            if (info.blockMode == ServerFileBlockMode.FlagBlock)
            {
                doc.lines.Add(new Flag
                {
                    lineNumber = 0,
                    originalText = "",
                    name = info.blockMarker
                });

                return true;
            }

            string markerValue = info.blockMode == ServerFileBlockMode.NamedKeyBlock
                ? (blockName ?? "")
                : blockId.ToString(System.Globalization.CultureInfo.InvariantCulture);

            doc.lines.Add(new Key
            {
                lineNumber = 0,
                originalText = "",
                key = info.blockMarker,
                value = markerValue,
                separator = "=",
                isModded = true
            });

            return true;
        }

        // Shared by every place that used to hand-roll "scan doc.lines for the block marker" with
        // an inline int.TryParse check (load-into-editor, search, commit's rename branch, delete).
        public bool TryFindBlockRange(IniDoc doc, ServerFileInfo info, int blockId, string? blockName, out int startIndex, out int endIndexExclusive)
        {
            IniBlock? block = FindBlock(doc, info, blockId, blockName);

            startIndex = block?.startIndex ?? -1;
            endIndexExclusive = block?.endIndexExclusive ?? -1;

            return block != null;
        }

        private IniBlock? FindBlock(IniDoc doc, ServerFileInfo info, int blockId, string? blockName)
        {
            return info.blockMode switch
            {
                ServerFileBlockMode.NamedKeyBlock => FindNamedKeyBlock(doc, info.blockMarker, blockName ?? ""),
                ServerFileBlockMode.FlagBlock => FindFlagBlockByOrdinal(doc, info.blockMarker, blockId),
                _ => FindNumericKeyBlock(doc, info.blockMarker, blockId)
            };
        }

        private IniBlock? FindNumericKeyBlock(IniDoc doc, string blockKey, int blockId)
        {
            for (int index = 0; index < doc.lines.Count; index++)
            {
                if (doc.lines[index] is not Key keyLine)
                    continue;

                if (!keyLine.key.Equals(blockKey, StringComparison.OrdinalIgnoreCase))
                    continue;

                if (!int.TryParse(keyLine.value.Trim(), out int parsedId))
                    continue;

                if (parsedId != blockId)
                    continue;

                int endIndexExclusive = FindNextKeyMarkerIndex(
                    doc,
                    blockKey,
                    index + 1);

                return new IniBlock(index, endIndexExclusive);
            }

            return null;
        }

        private IniBlock? FindNamedKeyBlock(IniDoc doc, string blockKey, string blockName)
        {
            for (int index = 0; index < doc.lines.Count; index++)
            {
                if (doc.lines[index] is not Key keyLine)
                    continue;

                if (!keyLine.key.Equals(blockKey, StringComparison.OrdinalIgnoreCase))
                    continue;

                if (!keyLine.value.Trim().Equals(blockName.Trim(), StringComparison.OrdinalIgnoreCase))
                    continue;

                int endIndexExclusive = FindNextKeyMarkerIndex(
                    doc,
                    blockKey,
                    index + 1);

                return new IniBlock(index, endIndexExclusive);
            }

            return null;
        }

        private IniBlock? FindFlagBlockByOrdinal(IniDoc doc, string blockKey, int ordinal)
        {
            int seen = 0;

            for (int index = 0; index < doc.lines.Count; index++)
            {
                if (doc.lines[index] is not Flag flagLine)
                    continue;

                if (!flagLine.name.Equals(blockKey, StringComparison.OrdinalIgnoreCase))
                    continue;

                seen++;

                if (seen != ordinal)
                    continue;

                int endIndexExclusive = FindNextFlagMarkerIndex(
                    doc,
                    blockKey,
                    index + 1);

                return new IniBlock(index, endIndexExclusive);
            }

            return null;
        }

        private int FindNextKeyMarkerIndex(IniDoc doc, string blockKey, int searchStartIndex)
        {
            for (int index = searchStartIndex; index < doc.lines.Count; index++)
            {
                if (doc.lines[index] is not Key keyLine)
                    continue;

                if (keyLine.key.Equals(blockKey, StringComparison.OrdinalIgnoreCase))
                    return index;
            }

            return doc.lines.Count;
        }

        private int FindNextFlagMarkerIndex(IniDoc doc, string blockKey, int searchStartIndex)
        {
            for (int index = searchStartIndex; index < doc.lines.Count; index++)
            {
                if (doc.lines[index] is not Flag flagLine)
                    continue;

                if (flagLine.name.Equals(blockKey, StringComparison.OrdinalIgnoreCase))
                    return index;
            }

            return doc.lines.Count;
        }

        private Key? FindFieldInBlock(IniDoc doc, IniBlock block, string fieldName)
        {
            for (int index = block.startIndex + 1; index < block.endIndexExclusive; index++)
            {
                if (doc.lines[index] is not Key keyLine)
                    continue;

                if (keyLine.key.Equals(fieldName, StringComparison.OrdinalIgnoreCase))
                    return keyLine;
            }

            return null;
        }

        private List<int> FindFlagIndexesInBlock(IniDoc doc, IniBlock block, string flagName)
        {
            List<int> indexes = new();

            for (int index = block.startIndex + 1; index < block.endIndexExclusive; index++)
            {
                if (doc.lines[index] is not Flag flagLine)
                    continue;

                if (flagLine.name.Equals(flagName, StringComparison.OrdinalIgnoreCase))
                {
                    indexes.Add(index);
                }
            }

            return indexes;
        }

        private void InsertFieldAtEndOfBlock(IniDoc doc, IniBlock block, string fieldName, string value)
        {
            int insertIndex = FindInsertionIndex(doc, block);

            doc.lines.Insert(
                insertIndex,
                new Key
                {
                    lineNumber = 0,
                    originalText = "",
                    key = fieldName,
                    value = value,
                    separator = "=",
                    isModded = true
                });
        }

        private void InsertFlagAtEndOfBlock(IniDoc doc, IniBlock block, string flagName)
        {
            int insertIndex = FindInsertionIndex(doc, block);

            doc.lines.Insert(
                insertIndex,
                new Flag
                {
                    lineNumber = 0,
                    originalText = "",
                    name = flagName
                });
        }

        private int FindInsertionIndex(IniDoc doc, IniBlock block)
        {
            int insertIndex = block.endIndexExclusive;

            for (int index = block.endIndexExclusive - 1; index > block.startIndex; index--)
            {
                if (doc.lines[index] is BlankLine)
                {
                    insertIndex = index;
                    continue;
                }

                break;
            }

            return insertIndex;
        }

        private void ValidateBlockArgs(IniDoc doc, string blockKey, string fieldOrFlagName)
        {
            if (doc == null)
                throw new ArgumentNullException(nameof(doc));

            if (string.IsNullOrWhiteSpace(blockKey))
                throw new ArgumentException("Block key is required.", nameof(blockKey));

            if (string.IsNullOrWhiteSpace(fieldOrFlagName))
                throw new ArgumentException("Field or flag name is required.", nameof(fieldOrFlagName));
        }

        private readonly record struct IniBlock(int startIndex, int endIndexExclusive);
    }
}
