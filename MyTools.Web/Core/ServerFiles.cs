using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace MyTools
{
    public static class ServerFiles
    {
        public static readonly IReadOnlyList<ServerFileInfo> All = new List<ServerFileInfo>
        {
            new(ServerFile.Items, "Items", "item.ini", "Item", ServerFileBlockMode.KeyBlock),
            new(ServerFile.Monsters, "Monsters", "monster.ini", "Monster", ServerFileBlockMode.KeyBlock),
            new(ServerFile.Skills, "Skills", "skill.ini", "Skill", ServerFileBlockMode.KeyBlock),
            new(ServerFile.Usages, "Item Uses", "itemuse.ini", "Itemuse", ServerFileBlockMode.FlagBlock),
            new(ServerFile.MultiUses, "Multi Uses", "multiuse.ini", "MultiUse", ServerFileBlockMode.FlagBlock),
            new(ServerFile.Magic, "Magic", "magic.ini", "Spell", ServerFileBlockMode.KeyBlock),
            new(ServerFile.Treasure, "Treasure", "treasure.ini", "Treasure", ServerFileBlockMode.NamedKeyBlock),
            new(ServerFile.World, "World", "world.ini", "", ServerFileBlockMode.WholeFile),
            new(ServerFile.Animations, "Animations", "animation.ini", "Animation", ServerFileBlockMode.KeyBlock)
        };

        public static ServerFileInfo Get(ServerFile file)
        {
            return All.First(info => info.file == file);
        }

        public static string PathFor(string folderPath, ServerFile file)
        {
            return CombineVirtual(folderPath, Get(file).fileName);
        }

        // The desktop app uses Path.Combine against a real OS folder path; here folderPath is
        // usually "" (the workspace root of the virtual filesystem), so this just avoids a leading
        // "/" when there's nothing to combine with.
        public static string CombineVirtual(string folderPath, string fileName)
        {
            if (string.IsNullOrWhiteSpace(folderPath))
                return fileName;

            return folderPath.TrimEnd('/') + "/" + fileName;
        }
    }

    public class ServerFolderScanner
    {
        private readonly IniParser parser = new();
        private readonly IVirtualFileSystem fs;

        public ServerFolderScanner(IVirtualFileSystem fs)
        {
            this.fs = fs;
        }

        public List<ServerFileStatus> Scan(string folderPath)
        {
            List<ServerFileStatus> statuses = new();

            foreach (ServerFileInfo info in ServerFiles.All)
            {
                statuses.Add(ScanFile(folderPath, info));
            }

            return statuses;
        }

        private ServerFileStatus ScanFile(string folderPath, ServerFileInfo info)
        {
            string path = ServerFiles.CombineVirtual(folderPath, info.fileName);

            ServerFileStatus status = new()
            {
                file = info.file,
                displayName = info.displayName,
                fileName = info.fileName,
                path = path,
                exists = fs.FileExists(path),
                loaded = false
            };

            if (!status.exists)
                return status;

            try
            {
                IniParseResult parseResult = parser.ParseFile(fs, path);
                IniDoc doc = parseResult.doc;

                status.loaded = true;
                status.keyCount = doc.keyCount;
                status.flagCount = doc.flagCount;
                status.rawCount = doc.rawCount;
                status.entryCount = CountEntries(info.file, doc);

                return status;
            }
            catch (Exception ex)
            {
                status.loaded = false;
                status.error = ex.Message;
                return status;
            }
        }

        private int CountEntries(ServerFile file, IniDoc doc)
        {
            if (file == ServerFile.World)
                return doc.keyCount + doc.flagCount;

            if (file == ServerFile.Usages)
                return doc.flags.Count(flag => flag.name.Equals("Itemuse", StringComparison.OrdinalIgnoreCase));

            if (file == ServerFile.MultiUses)
                return doc.flags.Count(flag => flag.name.Equals("MultiUse", StringComparison.OrdinalIgnoreCase));

            string marker = ServerFiles.Get(file).blockMarker;

            if (string.IsNullOrWhiteSpace(marker))
                return 0;

            return doc.keyLines.Count(line => line.key.Equals(marker, StringComparison.OrdinalIgnoreCase));
        }
    }

    public class ServerWorkspaceService
    {
        private readonly ServerFolderScanner scanner;
        private readonly IniParser parser = new();
        private readonly DefReader definitionReader = new();
        private readonly IVirtualFileSystem fs;

        public ServerWorkspaceService(IVirtualFileSystem fs)
        {
            this.fs = fs;
            scanner = new ServerFolderScanner(fs);
        }

        public ServerWorkspace Load(string folderPath)
        {
            ServerWorkspace workspace = new()
            {
                folderPath = folderPath,
                files = scanner.Scan(folderPath)
            };

            foreach (ServerFileInfo info in ServerFiles.All)
            {
                IniDoc? doc = LoadDoc(folderPath, info.file);

                if (doc == null)
                    continue;

                DefinitionReadResult<Definition> readResult = definitionReader.Read(doc, info.file);

                SetWorkspaceDoc(workspace, info.file, doc);
                SetWorkspaceDefinitions(workspace, info.file, readResult.definitions);
            }

            return workspace;
        }

        private IniDoc? LoadDoc(string folderPath, ServerFile file)
        {
            string path = ServerFiles.PathFor(folderPath, file);

            if (!fs.FileExists(path))
                return null;

            try
            {
                return parser.ParseFile(fs, path).doc;
            }
            catch
            {
                return null;
            }
        }

        private static void SetWorkspaceDoc(ServerWorkspace workspace, ServerFile file, IniDoc doc)
        {
            switch (file)
            {
                case ServerFile.Items:
                    workspace.itemDoc = doc;
                    break;

                case ServerFile.Monsters:
                    workspace.monsterDoc = doc;
                    break;

                case ServerFile.Skills:
                    workspace.skillDoc = doc;
                    break;

                case ServerFile.Usages:
                    workspace.usageDoc = doc;
                    break;

                case ServerFile.MultiUses:
                    workspace.multiUseDoc = doc;
                    break;

                case ServerFile.Magic:
                    workspace.magicDoc = doc;
                    break;

                case ServerFile.Treasure:
                    workspace.treasureDoc = doc;
                    break;

                case ServerFile.World:
                    workspace.worldDoc = doc;
                    break;

                case ServerFile.Animations:
                    workspace.animationDoc = doc;
                    break;

                default:
                    throw new InvalidOperationException($"Unsupported server file type: {file}");
            }
        }

        private static void SetWorkspaceDefinitions(ServerWorkspace workspace, ServerFile file, List<Definition> definitions)
        {
            switch (file)
            {
                case ServerFile.Items:
                    workspace.items = definitions;
                    break;

                case ServerFile.Monsters:
                    workspace.monsters = definitions;
                    break;

                case ServerFile.Skills:
                    workspace.skills = definitions;
                    break;

                case ServerFile.Usages:
                    workspace.usages = definitions;
                    break;

                case ServerFile.MultiUses:
                    workspace.multiUses = definitions;
                    break;

                case ServerFile.Magic:
                    workspace.magic = definitions;
                    break;

                case ServerFile.Treasure:
                    workspace.treasures = definitions;
                    break;

                case ServerFile.World:
                    workspace.world = definitions;
                    break;

                case ServerFile.Animations:
                    workspace.animations = definitions;
                    break;

                default:
                    throw new InvalidOperationException($"Unsupported server file type: {file}");
            }
        }
    }

    public class BackupManager
    {
        private readonly IVirtualFileSystem fs;

        public BackupManager(IVirtualFileSystem fs)
        {
            this.fs = fs;
        }

        public string CreateBackup(string filePath)
        {
            if (!fs.FileExists(filePath))
                throw new FileNotFoundException("Cannot back up a missing file.", filePath);

            string directory = GetDirectoryName(filePath);
            string backupDirectory = ServerFiles.CombineVirtual(directory, "Backups");
            fs.CreateDirectory(backupDirectory);

            string fileName = Path.GetFileNameWithoutExtension(filePath);
            string extension = Path.GetExtension(filePath);
            string timestamp = DateTime.Now.ToString("yyyyMMdd_HHmmss");

            string backupPath = ServerFiles.CombineVirtual(
                backupDirectory,
                $"{fileName}_{timestamp}{extension}");

            fs.CopyFile(filePath, backupPath, overwrite: false);

            return backupPath;
        }

        private static string GetDirectoryName(string filePath)
        {
            string normalized = filePath.Replace('\\', '/');
            int slashIndex = normalized.LastIndexOf('/');
            return slashIndex < 0 ? "" : normalized[..slashIndex];
        }
    }

    public class SaveOperationService
    {
        private readonly BackupManager backupManager;
        private readonly IVirtualFileSystem fs;

        public SaveOperationService(IVirtualFileSystem fs)
        {
            this.fs = fs;
            backupManager = new BackupManager(fs);
        }

        public SaveValidation SaveWithBackup(string filePath, Action saveAction)
        {
            SaveValidation result = new()
            {
                path = filePath
            };

            try
            {
                if (fs.FileExists(filePath))
                {
                    result.backupPath = backupManager.CreateBackup(filePath);
                }

                saveAction();

                result.success = true;
                return result;
            }
            catch (Exception ex)
            {
                result.success = false;
                result.error = ex.Message;
                return result;
            }
        }
    }
}
