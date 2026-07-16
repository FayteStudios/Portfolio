using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace MyTools.Web.Services
{
    public sealed class SheetPayload
    {
        public string kind { get; set; } = "";
        public int number { get; set; }
        public string bytesBase64 { get; set; } = "";
    }

    public sealed class SurfaceCellPayload
    {
        public int x { get; set; }
        public int y { get; set; }
        public int surface { get; set; }
    }

    public sealed class EntityCellPayload
    {
        public int x { get; set; }
        public int y { get; set; }
        public int image { get; set; }
        public int imageType { get; set; }
    }

    public sealed class MapDrawPayload
    {
        public int width { get; set; }
        public int height { get; set; }
        public bool showSurface { get; set; }
        public bool showItems { get; set; }
        public bool showMonsters { get; set; }
        public bool showGrid { get; set; }
        public List<SurfaceCellPayload> surfaces { get; set; } = new();
        public List<EntityCellPayload> items { get; set; } = new();
        public List<EntityCellPayload> monsters { get; set; } = new();
    }

    public sealed class TilePayload
    {
        public int x { get; set; }
        public int y { get; set; }
    }

    // Thin wrapper around wwwroot/js/mapCanvas.js - the map editor's equivalent of InteropService.
    public sealed class MapCanvasInterop : IAsyncDisposable
    {
        private readonly IJSRuntime js;
        private IJSObjectReference? module;
        private readonly string instanceId = Guid.NewGuid().ToString("N");

        public MapCanvasInterop(IJSRuntime js)
        {
            this.js = js;
        }

        private async Task<IJSObjectReference> ModuleAsync()
        {
            module ??= await js.InvokeAsync<IJSObjectReference>("import", "./js/mapCanvas.js");
            return module;
        }

        public async Task InitAsync(ElementReference mapCanvas, ElementReference overlayCanvas, ElementReference minimapCanvas, object dotNetRef)
        {
            IJSObjectReference m = await ModuleAsync();
            await m.InvokeVoidAsync("init", instanceId, mapCanvas, overlayCanvas, minimapCanvas, dotNetRef);
        }

        public async Task LoadSheetsAsync(IEnumerable<SheetPayload> sheets)
        {
            IJSObjectReference m = await ModuleAsync();
            await m.InvokeVoidAsync("loadSheets", instanceId, sheets);
        }

        public async Task SetViewAsync(int width, int height, int tileSize)
        {
            IJSObjectReference m = await ModuleAsync();
            await m.InvokeVoidAsync("setView", instanceId, width, height, tileSize);
        }

        public async Task SetBrushAsync(int brush)
        {
            IJSObjectReference m = await ModuleAsync();
            await m.InvokeVoidAsync("setBrush", instanceId, brush);
        }

        public async Task DrawMapAsync(MapDrawPayload payload)
        {
            IJSObjectReference m = await ModuleAsync();
            await m.InvokeVoidAsync("drawMap", instanceId, payload);
        }

        public async Task DrawOverlayAsync(TilePayload? hover, TilePayload? locked)
        {
            IJSObjectReference m = await ModuleAsync();
            await m.InvokeVoidAsync("drawOverlay", instanceId, hover, locked);
        }

        public async Task DrawMinimapAsync(MapDrawPayload payload)
        {
            IJSObjectReference m = await ModuleAsync();
            await m.InvokeVoidAsync("drawMinimap", instanceId, payload);
        }

        public async Task DrawIconAsync(ElementReference canvas, string layer, int entryId, int image, int imageType)
        {
            IJSObjectReference m = await ModuleAsync();
            await m.InvokeVoidAsync("drawIcon", instanceId, canvas, layer, entryId, image, imageType);
        }

        public async ValueTask DisposeAsync()
        {
            if (module is not null)
            {
                try { await module.InvokeVoidAsync("dispose", instanceId); } catch { /* page already gone */ }
                await module.DisposeAsync();
            }
        }
    }
}
