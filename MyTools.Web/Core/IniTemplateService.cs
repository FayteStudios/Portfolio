using System.Linq;
using System.Text;

namespace MyTools
{
    public static class IniTemplateService
    {
        // Builds a documentation-only header (every line is a ';' comment, so the server ignores
        // it) listing every field/flag MyTools knows about for this file, grouped the same way the
        // editor's tabs are, so someone editing the raw file by hand has the same reference the GUI
        // gives them.
        public static string BuildTemplate(ServerFileInfo info)
        {
            IReadOnlyList<EditorEntry> fields = EditorDefinitions.For(info.file);

            StringBuilder builder = new();

            builder.AppendLine($"; {info.fileName} - {info.displayName}");
            builder.AppendLine("; This file did not exist and was created by MyTools as a documentation");
            builder.AppendLine("; template. Everything below is a comment (starts with ';'), describing every");
            builder.AppendLine("; field/flag MyTools knows about for this file, so it can be hand-edited");
            builder.AppendLine("; without opening the app. Delete this header whenever you like - it has no");
            builder.AppendLine("; effect on the server.");
            builder.AppendLine(";");

            switch (info.blockMode)
            {
                case ServerFileBlockMode.WholeFile:
                    builder.AppendLine($"; {info.fileName} has one flat set of settings (no repeating entries).");
                    break;

                case ServerFileBlockMode.FlagBlock:
                    builder.AppendLine($"; Each entry starts with a bare '{info.blockMarker}' line (just the word, no");
                    builder.AppendLine("; '=') and runs until the next one. Example:");
                    builder.AppendLine($";   {info.blockMarker}");
                    builder.AppendLine(";   <Key>=<value>");
                    break;

                case ServerFileBlockMode.NamedKeyBlock:
                    builder.AppendLine($"; Each entry starts with '{info.blockMarker}=<name>' and runs until the next");
                    builder.AppendLine($"; '{info.blockMarker}=' line. Example:");
                    builder.AppendLine($";   {info.blockMarker}=SomeGroupName");
                    builder.AppendLine(";   <Key>=<value>");
                    break;

                default:
                    builder.AppendLine($"; Each entry starts with '{info.blockMarker}=<id>' (a whole number) and runs");
                    builder.AppendLine($"; until the next '{info.blockMarker}=' line. Example:");
                    builder.AppendLine($";   {info.blockMarker}=1");
                    builder.AppendLine(";   <Key>=<value>");
                    break;
            }

            builder.AppendLine(";");

            foreach (IGrouping<string, EditorEntry> group in fields.GroupBy(
                field => string.IsNullOrWhiteSpace(field.group) ? "General" : field.group))
            {
                builder.AppendLine($"; -- {group.Key} --");

                foreach (EditorEntry field in group)
                {
                    string shape = field.isFlag ? "flag, no value" : field.kind;
                    string multiple = field.allowMultiple ? " (repeatable)" : "";
                    string description = string.IsNullOrWhiteSpace(field.description) ? "" : $" - {field.description}";

                    builder.AppendLine($";   {field.key} ({shape}){multiple}{description}");
                }

                builder.AppendLine(";");
            }

            builder.AppendLine();

            return builder.ToString();
        }

        // Returns false (does nothing) if the file already exists - this only ever creates,
        // never overwrites.
        public static bool CreateMissingFile(IVirtualFileSystem fs, string folderPath, ServerFile file)
        {
            ServerFileInfo info = ServerFiles.Get(file);
            string path = ServerFiles.PathFor(folderPath, file);

            if (fs.FileExists(path))
                return false;

            fs.WriteAllText(path, BuildTemplate(info));
            return true;
        }
    }
}
