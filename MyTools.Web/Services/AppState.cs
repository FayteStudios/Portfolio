using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;

namespace MyTools.Web.Services
{
    public enum WorkspaceMode
    {
        None,
        FileSystemAccess,
        Upload
    }

    public sealed class UiPointer
    {
        public string mode { get; set; } = "";
        public string folderName { get; set; } = "";
        public string? selectedFile { get; set; }
        public int? selectedEntryId { get; set; }
    }

    public sealed class WorkspaceSnapshot
    {
        public string folderName { get; set; } = "";
        public List<WorkspaceFileDto> files { get; set; } = new();
    }

    // Central scoped state for the app: owns the in-memory virtual filesystem and the parsed
    // ServerWorkspace built from it, and orchestrates the two ways a real folder gets in and out
    // of that virtual filesystem (File System Access API vs. upload/download). The ported engine
    // (ServerWorkspaceService, IniWriter, BlockWriter, ...) only ever sees the virtual filesystem
    // - it has no idea which mode is active.
    public sealed class AppState
    {
        private const string UiPointerKey = "ui-pointer";
        private const string SnapshotKey = "workspace-snapshot";

        private readonly InteropService interop;
        private readonly ServerWorkspaceService workspaceService;

        public InMemoryFileSystem Fs { get; } = new();
        public ServerWorkspace? Workspace { get; private set; }
        public WorkspaceMode Mode { get; private set; } = WorkspaceMode.None;
        public string FolderDisplayName { get; private set; } = "";
        public string? LastError { get; private set; }

        public ServerFile? SelectedFile { get; private set; }
        public int? SelectedEntryId { get; private set; }

        public event Action? Changed;

        public AppState(InteropService interop)
        {
            this.interop = interop;
            workspaceService = new ServerWorkspaceService(Fs);
        }

        public bool IsLoaded => Workspace != null;

        private void NotifyChanged() => Changed?.Invoke();

        // Called once on app startup: try to silently resume a File System Access handle from a
        // previous visit (one-click permission re-grant, not a full re-pick), otherwise fall back
        // to whatever upload-mode snapshot was last saved to IndexedDB. Either way, a refresh
        // should never just lose whatever was open.
        public async Task InitializeAsync()
        {
            if (await interop.IsFileSystemAccessSupportedAsync())
            {
                string? name = await interop.RestoreHandleAsync();

                if (name != null)
                {
                    string permission = await interop.RequestPermissionAsync();

                    if (permission == "granted")
                    {
                        await HydrateFromFileSystemAccessAsync(name);
                        await RestoreUiPointerAsync();
                        return;
                    }
                }
            }

            string? snapshotJson = await interop.IdbGetAsync(SnapshotKey);

            if (string.IsNullOrEmpty(snapshotJson))
                return;

            WorkspaceSnapshot? snapshot = JsonSerializer.Deserialize<WorkspaceSnapshot>(snapshotJson);

            if (snapshot == null)
                return;

            Fs.Clear();

            foreach (WorkspaceFileDto file in snapshot.files)
                Fs.Set(file.path, Convert.FromBase64String(file.bytesBase64));

            Mode = WorkspaceMode.Upload;
            FolderDisplayName = snapshot.folderName;
            Workspace = workspaceService.Load("");
            await RestoreUiPointerAsync();
            NotifyChanged();
        }

        public async Task<bool> PickFolderAsync()
        {
            LastError = null;

            try
            {
                string? name = await interop.PickDirectoryAsync();

                if (name == null)
                    return false;

                await HydrateFromFileSystemAccessAsync(name);
                return true;
            }
            catch (Exception ex)
            {
                LastError = ex.Message;
                NotifyChanged();
                return false;
            }
        }

        private async Task HydrateFromFileSystemAccessAsync(string name)
        {
            Fs.Clear();

            List<WorkspaceFileDto> files = await interop.ReadWorkspaceFilesAsync(
                ServerFiles.All.Select(info => info.fileName));

            foreach (WorkspaceFileDto file in files)
                Fs.Set(file.path, Convert.FromBase64String(file.bytesBase64));

            Mode = WorkspaceMode.FileSystemAccess;
            FolderDisplayName = name;
            Workspace = workspaceService.Load("");
            NotifyChanged();
        }

        public async Task LoadFromUploadAsync(ElementReference inputElement)
        {
            LastError = null;

            try
            {
                List<WorkspaceFileDto> files = await interop.ReadUploadedFilesAsync(inputElement);
                string name = await interop.GetUploadFolderNameAsync(inputElement);

                Fs.Clear();

                foreach (WorkspaceFileDto file in files)
                    Fs.Set(file.path, Convert.FromBase64String(file.bytesBase64));

                Mode = WorkspaceMode.Upload;
                FolderDisplayName = string.IsNullOrWhiteSpace(name) ? "uploaded-folder" : name;
                Workspace = workspaceService.Load("");
                NotifyChanged();

                await SnapshotAsync();
            }
            catch (Exception ex)
            {
                LastError = ex.Message;
                NotifyChanged();
            }
        }

        public void ReloadWorkspace()
        {
            Workspace = workspaceService.Load("");
            NotifyChanged();
        }

        // Saves one server file's IniDoc back through the same backup-then-write path the
        // desktop app uses, then propagates the write out to wherever the real bytes need to
        // live: the actual picked folder (File System Access) or the IndexedDB snapshot (Upload).
        public async Task SaveIniAsync(ServerFile file, IniDoc doc)
        {
            string path = ServerFiles.PathFor("", file);
            SaveOperationService saveService = new(Fs);
            IniWriter writer = new();

            SaveValidation result = saveService.SaveWithBackup(path, () => writer.WriteFile(Fs, path, doc));

            if (!result.success)
            {
                LastError = result.error;
                NotifyChanged();
                return;
            }

            ReloadWorkspace();

            if (Mode == WorkspaceMode.FileSystemAccess)
            {
                await FlushToDiskAsync(path);

                if (!string.IsNullOrEmpty(result.backupPath))
                    await FlushToDiskAsync(result.backupPath);
            }
            else if (Mode == WorkspaceMode.Upload)
            {
                await SnapshotAsync();
            }
        }

        // For non-ini writes (new/replaced sprite sheets) that don't go through SaveIniAsync:
        // pushes the given paths out to wherever the real bytes need to live, same as a save.
        public async Task FlushPathsAsync(IEnumerable<string> paths)
        {
            if (Mode == WorkspaceMode.FileSystemAccess)
            {
                foreach (string path in paths)
                    await FlushToDiskAsync(path);
            }
            else if (Mode == WorkspaceMode.Upload)
            {
                await SnapshotAsync();
            }
        }

        public async Task FlushToDiskAsync(string path)
        {
            byte[] bytes = Fs.ReadAllBytes(path);
            await interop.WriteFileAsync(path, Convert.ToBase64String(bytes));
        }

        public async Task SetSelectionAsync(ServerFile? file, int? entryId)
        {
            SelectedFile = file;
            SelectedEntryId = entryId;
            await SaveUiPointerAsync();
        }

        private async Task SnapshotAsync()
        {
            WorkspaceSnapshot snapshot = new()
            {
                folderName = FolderDisplayName,
                files = Fs.AllPaths()
                    .Select(path => new WorkspaceFileDto
                    {
                        path = path,
                        bytesBase64 = Convert.ToBase64String(Fs.ReadAllBytes(path))
                    })
                    .ToList()
            };

            string json = JsonSerializer.Serialize(snapshot);
            await interop.IdbPutAsync(SnapshotKey, json);
        }

        private async Task SaveUiPointerAsync()
        {
            UiPointer pointer = new()
            {
                mode = Mode.ToString(),
                folderName = FolderDisplayName,
                selectedFile = SelectedFile?.ToString(),
                selectedEntryId = SelectedEntryId
            };

            string json = JsonSerializer.Serialize(pointer);
            await interop.IdbPutAsync(UiPointerKey, json);
        }

        private async Task RestoreUiPointerAsync()
        {
            string? json = await interop.IdbGetAsync(UiPointerKey);

            if (string.IsNullOrEmpty(json))
                return;

            UiPointer? pointer = JsonSerializer.Deserialize<UiPointer>(json);

            if (pointer == null)
                return;

            if (Enum.TryParse(pointer.selectedFile, out ServerFile parsedFile))
                SelectedFile = parsedFile;

            SelectedEntryId = pointer.selectedEntryId;
        }

        public async Task ForgetWorkspaceAsync()
        {
            Fs.Clear();
            Workspace = null;
            Mode = WorkspaceMode.None;
            FolderDisplayName = "";
            SelectedFile = null;
            SelectedEntryId = null;
            LastError = null;

            await interop.ForgetHandleAsync();
            await interop.IdbDeleteAsync(SnapshotKey);
            await interop.IdbDeleteAsync(UiPointerKey);

            NotifyChanged();
        }

        public async Task<(string base64, string fileName)> ExportZipAsync()
        {
            using MemoryStream zipStream = new();

            using (ZipArchive archive = new(zipStream, ZipArchiveMode.Create, leaveOpen: true))
            {
                foreach (string path in Fs.AllPaths())
                {
                    ZipArchiveEntry entry = archive.CreateEntry(path, CompressionLevel.Optimal);
                    using Stream entryStream = entry.Open();
                    byte[] bytes = Fs.ReadAllBytes(path);
                    await entryStream.WriteAsync(bytes);
                }
            }

            string base64 = Convert.ToBase64String(zipStream.ToArray());
            string fileName = string.IsNullOrWhiteSpace(FolderDisplayName)
                ? "mytools-export.zip"
                : $"{FolderDisplayName}.zip";

            return (base64, fileName);
        }

        public async Task DownloadZipAsync()
        {
            (string base64, string fileName) = await ExportZipAsync();
            await interop.DownloadBlobAsync(base64, fileName, "application/zip");
        }
    }
}
