using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace MyTools.Web.Services
{
    public sealed class WorkspaceFileDto
    {
        public string path { get; set; } = "";
        public string bytesBase64 { get; set; } = "";
    }

    // Thin C# wrapper around wwwroot/js/interop.js. Every browser-specific capability (File
    // System Access API, IndexedDB persistence, blob downloads) is reached through here so the
    // rest of the app only deals with plain C# types.
    public sealed class InteropService : IAsyncDisposable
    {
        private readonly IJSRuntime js;
        private IJSObjectReference? module;

        public InteropService(IJSRuntime js)
        {
            this.js = js;
        }

        private async Task<IJSObjectReference> ModuleAsync()
        {
            module ??= await js.InvokeAsync<IJSObjectReference>("import", "./js/interop.js");
            return module;
        }

        public async Task<bool> IsFileSystemAccessSupportedAsync()
        {
            IJSObjectReference m = await ModuleAsync();
            return await m.InvokeAsync<bool>("isFileSystemAccessSupported");
        }

        public async Task<string?> PickDirectoryAsync()
        {
            IJSObjectReference m = await ModuleAsync();
            return await m.InvokeAsync<string?>("pickDirectory");
        }

        public async Task<string?> RestoreHandleAsync()
        {
            IJSObjectReference m = await ModuleAsync();
            return await m.InvokeAsync<string?>("restoreHandle");
        }

        public async Task ForgetHandleAsync()
        {
            IJSObjectReference m = await ModuleAsync();
            await m.InvokeVoidAsync("forgetHandle");
        }

        public async Task<string> RequestPermissionAsync()
        {
            IJSObjectReference m = await ModuleAsync();
            return await m.InvokeAsync<string>("requestPermissionForCurrentHandle");
        }

        public async Task<List<WorkspaceFileDto>> ReadWorkspaceFilesAsync(IEnumerable<string> rootFileNames)
        {
            IJSObjectReference m = await ModuleAsync();
            return await m.InvokeAsync<List<WorkspaceFileDto>>("readWorkspaceFiles", new object[] { rootFileNames });
        }

        public async Task WriteFileAsync(string path, string bytesBase64)
        {
            IJSObjectReference m = await ModuleAsync();
            await m.InvokeVoidAsync("writeFile", path, bytesBase64);
        }

        public async Task DownloadBlobAsync(string bytesBase64, string fileName, string mimeType)
        {
            IJSObjectReference m = await ModuleAsync();
            await m.InvokeVoidAsync("downloadBlob", bytesBase64, fileName, mimeType);
        }

        public async Task<WorkspaceFileDto?> ReadSingleFileAsync(ElementReference inputElement)
        {
            IJSObjectReference m = await ModuleAsync();
            WorkspaceFileDto? result = await m.InvokeAsync<WorkspaceFileDto?>("readSingleFile", inputElement);
            return result;
        }

        public async Task<List<WorkspaceFileDto>> ReadUploadedFilesAsync(ElementReference inputElement)
        {
            IJSObjectReference m = await ModuleAsync();
            return await m.InvokeAsync<List<WorkspaceFileDto>>("readUploadedFiles", inputElement);
        }

        public async Task<string> GetUploadFolderNameAsync(ElementReference inputElement)
        {
            IJSObjectReference m = await ModuleAsync();
            return await m.InvokeAsync<string>("getUploadFolderName", inputElement);
        }

        public async Task IdbPutAsync(string key, string json)
        {
            IJSObjectReference m = await ModuleAsync();
            await m.InvokeVoidAsync("idbPut", key, json);
        }

        public async Task<string?> IdbGetAsync(string key)
        {
            IJSObjectReference m = await ModuleAsync();
            return await m.InvokeAsync<string?>("idbGet", key);
        }

        public async Task IdbDeleteAsync(string key)
        {
            IJSObjectReference m = await ModuleAsync();
            await m.InvokeVoidAsync("idbDelete", key);
        }

        public async ValueTask DisposeAsync()
        {
            if (module is not null)
                await module.DisposeAsync();
        }
    }
}
