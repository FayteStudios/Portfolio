using System.Collections.Generic;

namespace MyTools
{
    // Stands in for System.IO in the browser: the ported desktop engine (IniParser, IniWriter,
    // ServerFolderScanner, BackupManager, ...) reads/writes through this instead of touching disk
    // directly, so the same synchronous parsing/writing code can run against an in-memory snapshot
    // of an uploaded/picked folder. All paths are relative, forward-slash-separated, and compared
    // case-insensitively (matching the Windows filesystem semantics the original files assume).
    public interface IVirtualFileSystem
    {
        bool FileExists(string path);
        bool DirectoryExists(string path);
        string ReadAllText(string path);
        void WriteAllText(string path, string text);
        byte[] ReadAllBytes(string path);
        void WriteAllBytes(string path, byte[] bytes);
        void CopyFile(string sourcePath, string destPath, bool overwrite);
        void CreateDirectory(string path);

        // Non-recursive: only direct children of directoryPath, matching Directory.EnumerateFiles.
        IEnumerable<string> EnumerateFiles(string directoryPath);
        System.DateTime GetLastWriteTime(string path);
    }
}
