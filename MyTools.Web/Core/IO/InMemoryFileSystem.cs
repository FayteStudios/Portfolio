using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace MyTools
{
    // In-memory backing store for IVirtualFileSystem. Used directly for the upload/download
    // fallback path, and as the working cache the File System Access path hydrates from/flushes
    // to (see FileSystemAccessService in the app layer) - either way, all the ported engine code
    // only ever talks to this.
    public sealed class InMemoryFileSystem : IVirtualFileSystem
    {
        private sealed class Entry
        {
            public byte[] bytes = Array.Empty<byte>();
            public DateTime lastWriteTime = DateTime.Now;
        }

        private readonly Dictionary<string, Entry> files = new(StringComparer.OrdinalIgnoreCase);

        public static string Normalize(string path)
        {
            string normalized = path.Replace('\\', '/').Trim();
            while (normalized.StartsWith("./", StringComparison.Ordinal))
                normalized = normalized[2..];
            return normalized.TrimStart('/');
        }

        public bool FileExists(string path) => files.ContainsKey(Normalize(path));

        public bool DirectoryExists(string path)
        {
            string prefix = Normalize(path);
            if (string.IsNullOrEmpty(prefix))
                return true;

            prefix = prefix.TrimEnd('/') + "/";
            return files.Keys.Any(key => key.StartsWith(prefix, StringComparison.OrdinalIgnoreCase));
        }

        public string ReadAllText(string path) => DecodeText(ReadAllBytes(path));

        public void WriteAllText(string path, string text) => WriteAllBytes(path, Encoding.UTF8.GetBytes(text));

        public byte[] ReadAllBytes(string path)
        {
            string key = Normalize(path);

            if (!files.TryGetValue(key, out Entry? entry))
                throw new FileNotFoundException($"File not found in workspace: {path}", path);

            return entry.bytes;
        }

        public void WriteAllBytes(string path, byte[] bytes)
        {
            string key = Normalize(path);
            files[key] = new Entry { bytes = bytes, lastWriteTime = DateTime.Now };
        }

        public void CopyFile(string sourcePath, string destPath, bool overwrite)
        {
            string destKey = Normalize(destPath);

            if (!overwrite && files.ContainsKey(destKey))
                throw new IOException($"Destination already exists: {destPath}");

            byte[] bytes = ReadAllBytes(sourcePath);
            files[destKey] = new Entry { bytes = bytes, lastWriteTime = DateTime.Now };
        }

        // Directories are implicit (derived from file paths) - nothing to materialize.
        public void CreateDirectory(string path)
        {
        }

        public IEnumerable<string> EnumerateFiles(string directoryPath)
        {
            string prefix = Normalize(directoryPath);
            prefix = string.IsNullOrEmpty(prefix) ? "" : prefix.TrimEnd('/') + "/";

            foreach (string key in files.Keys)
            {
                if (!key.StartsWith(prefix, StringComparison.OrdinalIgnoreCase))
                    continue;

                string remainder = key[prefix.Length..];

                if (remainder.Contains('/'))
                    continue; // non-recursive: skip files in nested subfolders

                yield return prefix + remainder;
            }
        }

        public DateTime GetLastWriteTime(string path)
        {
            string key = Normalize(path);
            return files.TryGetValue(key, out Entry? entry) ? entry.lastWriteTime : DateTime.Now;
        }

        // Bulk helpers used by the app layer (upload ingestion, FS Access hydration, snapshotting).
        public void Set(string path, byte[] bytes) => WriteAllBytes(path, bytes);

        public IReadOnlyDictionary<string, byte[]> SnapshotAll() =>
            files.ToDictionary(pair => pair.Key, pair => pair.Value.bytes, StringComparer.OrdinalIgnoreCase);

        public IReadOnlyCollection<string> AllPaths() => files.Keys.ToList();

        public void Clear() => files.Clear();

        public void Remove(string path) => files.Remove(Normalize(path));

        public void RemoveFolder(string folderPath)
        {
            string prefix = Normalize(folderPath).TrimEnd('/') + "/";

            foreach (string key in files.Keys.Where(key => key.StartsWith(prefix, StringComparison.OrdinalIgnoreCase)).ToList())
                files.Remove(key);
        }

        private static string DecodeText(byte[] bytes)
        {
            if (bytes.Length >= 3 && bytes[0] == 0xEF && bytes[1] == 0xBB && bytes[2] == 0xBF)
                return Encoding.UTF8.GetString(bytes, 3, bytes.Length - 3);

            return Encoding.UTF8.GetString(bytes);
        }
    }
}
