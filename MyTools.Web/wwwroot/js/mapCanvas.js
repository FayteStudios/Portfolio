// Map Editor canvas rendering + input. C# owns all map/game logic and only hands this module
// (a) sheet image bytes to load once per workspace, and (b) a JSON "what's on screen" payload to
// draw per redraw; this module owns sprite cropping/chroma-keying/canvas drawing and forwards
// mouse events back to C# via a DotNetObjectReference. Modeled directly on the reference tool's
// own canvas approach (transparentSprite/drawSprite/spriteRect/worldSpriteRect), since that's
// already the right architecture for a browser tile-map editor.

const TILE = 32;
const CANVAS_BUFFER_TILES = 3;

const instances = new Map();

function makeInstance() {
    return {
        sheets: { item: new Map(), player: new Map(), background: new Map() },
        spriteCache: new Map(),
        mapCanvas: null, mapCtx: null,
        overlayCanvas: null, overlayCtx: null,
        minimapCanvas: null, minimapCtx: null,
        dotNetRef: null,
        width: 0, height: 0, tileSize: 32,
        mouseDown: false,
        brush: 1,
        hoverTile: null
    };
}

export function init(id, mapCanvasEl, overlayCanvasEl, minimapCanvasEl, dotNetRef) {
    const instance = makeInstance();
    instance.mapCanvas = mapCanvasEl;
    instance.mapCtx = mapCanvasEl.getContext("2d", { alpha: false });
    instance.overlayCanvas = overlayCanvasEl;
    instance.overlayCtx = overlayCanvasEl.getContext("2d");
    instance.minimapCanvas = minimapCanvasEl;
    instance.minimapCtx = minimapCanvasEl.getContext("2d");
    instance.dotNetRef = dotNetRef;
    instances.set(id, instance);

    const tileFromEvent = (event) => {
        const rect = mapCanvasEl.getBoundingClientRect();
        const x = Math.floor((event.clientX - rect.left) / (rect.width / mapCanvasEl.width) / TILE) + 1;
        const y = Math.floor((event.clientY - rect.top) / (rect.height / mapCanvasEl.height) / TILE) + 1;
        return { x, y };
    };

    mapCanvasEl.addEventListener("mousedown", (event) => {
        instance.isDragging = true;
        const tile = tileFromEvent(event);
        instance.dotNetRef.invokeMethodAsync("OnCanvasDown", tile.x, tile.y, event.button);
    });

    mapCanvasEl.addEventListener("mousemove", (event) => {
        const tile = tileFromEvent(event);
        instance.dotNetRef.invokeMethodAsync("OnCanvasMove", tile.x, tile.y);
    });

    mapCanvasEl.addEventListener("mouseleave", () => {
        instance.dotNetRef.invokeMethodAsync("OnCanvasLeave");
    });

    // Deliberately window-level (not canvas-only) so a drag that ends outside the canvas still
    // resets state - but only forwarded to .NET when a drag was actually in progress, since a
    // global listener otherwise fires (and issues an interop call) on every click anywhere on
    // the page, which was observed to interfere with Blazor's own click dispatch for unrelated
    // buttons (e.g. the Generator panel toggle) when clicked shortly after a canvas interaction.
    window.addEventListener("mouseup", () => {
        if (!instance.isDragging) return;
        instance.isDragging = false;
        instance.dotNetRef.invokeMethodAsync("OnCanvasUp");
    });

    mapCanvasEl.addEventListener("contextmenu", (event) => event.preventDefault());
    mapCanvasEl.addEventListener("auxclick", (event) => event.preventDefault());
}

export function dispose(id) {
    instances.delete(id);
}

export function loadSheets(id, sheets) {
    const instance = instances.get(id);
    if (!instance) return;

    for (const kind of Object.keys(instance.sheets)) instance.sheets[kind].clear();
    instance.spriteCache.clear();

    for (const entry of sheets) {
        const bytes = base64ToArrayBuffer(entry.bytesBase64);
        const blob = new Blob([bytes], { type: "image/bmp" });
        const url = URL.createObjectURL(blob);
        const img = new Image();
        img.src = url;
        instance.sheets[entry.kind]?.set(entry.number, img);
    }
}

export function setView(id, width, height, tileSize) {
    const instance = instances.get(id);
    if (!instance) return;

    instance.width = width;
    instance.height = height;
    instance.tileSize = tileSize;

    const bufferedW = Math.max(TILE, (width + CANVAS_BUFFER_TILES) * TILE);
    const bufferedH = Math.max(TILE, (height + CANVAS_BUFFER_TILES) * TILE);
    instance.mapCanvas.width = bufferedW;
    instance.mapCanvas.height = bufferedH;
    instance.mapCtx.imageSmoothingEnabled = false;

    const visualTile = tileSize;
    const visualW = Math.max(visualTile, (width + CANVAS_BUFFER_TILES) * visualTile);
    const visualH = Math.max(visualTile, (height + CANVAS_BUFFER_TILES) * visualTile);
    instance.mapCanvas.style.width = `${visualW}px`;
    instance.mapCanvas.style.height = `${visualH}px`;

    instance.overlayCanvas.width = bufferedW;
    instance.overlayCanvas.height = bufferedH;
    instance.overlayCanvas.style.width = `${visualW}px`;
    instance.overlayCanvas.style.height = `${visualH}px`;
    instance.overlayCtx.imageSmoothingEnabled = false;
}

export function setBrush(id, brush) {
    const instance = instances.get(id);
    if (instance) instance.brush = brush;
}

// payload: { width, height, showSurface, showItems, showMonsters, showGrid,
//            surfaces: [{x,y,surface}], items: [{x,y,image,imageType}], monsters: [{x,y,image,imageType}] }
export function drawMap(id, payload) {
    const instance = instances.get(id);
    if (!instance) return;
    const ctx = instance.mapCtx;
    const canvas = instance.mapCanvas;

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (!payload) return;

    ctx.fillStyle = "#808080";
    ctx.fillRect(0, 0, payload.width * TILE, payload.height * TILE);

    if (payload.showSurface) {
        for (const cell of payload.surfaces) {
            const dx = (cell.x - 1) * TILE;
            const dy = (cell.y - 1) * TILE;
            if (!drawSprite(instance, ctx, "background", cell.surface, 0, dx, dy, TILE, TILE)) {
                ctx.fillStyle = fallbackSurfaceColor(cell.surface);
                ctx.fillRect(dx, dy, TILE, TILE);
            }
        }
    }

    if (payload.showItems) {
        for (const cell of payload.items) {
            drawWorldSprite(instance, ctx, "item", cell.image, cell.imageType, (cell.x - 1) * TILE, (cell.y - 1) * TILE);
        }
    }

    if (payload.showMonsters) {
        for (const cell of payload.monsters) {
            drawWorldSprite(instance, ctx, "player", cell.image, cell.imageType, (cell.x - 1) * TILE, (cell.y - 1) * TILE);
        }
    }

    drawBadges(ctx, payload);
    if (payload.showGrid) drawGrid(ctx, payload.width, payload.height);
}

function drawBadges(ctx, payload) {
    ctx.fillStyle = "#2ecc71";
    for (const cell of payload.items) {
        const dx = (cell.x - 1) * TILE;
        const dy = (cell.y - 1) * TILE;
        ctx.fillRect(dx + TILE - 6, dy + 1, 5, 5);
    }
    ctx.fillStyle = "#7d1f1f";
    for (const cell of payload.monsters) {
        const dx = (cell.x - 1) * TILE;
        const dy = (cell.y - 1) * TILE;
        ctx.fillRect(dx + 1, dy + TILE - 6, 5, 5);
    }
}

function drawGrid(ctx, width, height) {
    ctx.strokeStyle = "rgba(255,255,255,0.12)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = 0; x <= width; x += 1) {
        ctx.moveTo(x * TILE + 0.5, 0);
        ctx.lineTo(x * TILE + 0.5, height * TILE);
    }
    for (let y = 0; y <= height; y += 1) {
        ctx.moveTo(0, y * TILE + 0.5);
        ctx.lineTo(width * TILE, y * TILE + 0.5);
    }
    ctx.stroke();
}

// Overlay: hover highlight, locked-tile highlight, brush preview square.
export function drawOverlay(id, hover, locked) {
    const instance = instances.get(id);
    if (!instance) return;
    const ctx = instance.overlayCtx;
    ctx.clearRect(0, 0, instance.overlayCanvas.width, instance.overlayCanvas.height);

    if (hover) {
        const size = instance.brush * TILE;
        ctx.strokeStyle = "#ffd400";
        ctx.lineWidth = 2;
        ctx.strokeRect((hover.x - 1) * TILE + 1, (hover.y - 1) * TILE + 1, size - 2, size - 2);
    }

    if (locked) {
        ctx.strokeStyle = "#ff4d4d";
        ctx.lineWidth = 2;
        ctx.strokeRect((locked.x - 1) * TILE + 1, (locked.y - 1) * TILE + 1, TILE - 2, TILE - 2);
    }
}

export function drawMinimap(id, payload) {
    const instance = instances.get(id);
    if (!instance) return;
    const ctx = instance.minimapCtx;
    const canvas = instance.minimapCanvas;
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (!payload || payload.width <= 0 || payload.height <= 0) return;

    const buffer = document.createElement("canvas");
    buffer.width = payload.width;
    buffer.height = payload.height;
    const bctx = buffer.getContext("2d");
    const image = bctx.createImageData(payload.width, payload.height);

    for (const cell of payload.surfaces) {
        const color = minimapSurfaceColor(cell.surface);
        const idx = ((cell.y - 1) * payload.width + (cell.x - 1)) * 4;
        image.data[idx] = color[0];
        image.data[idx + 1] = color[1];
        image.data[idx + 2] = color[2];
        image.data[idx + 3] = 255;
    }
    for (const cell of payload.items) {
        const idx = ((cell.y - 1) * payload.width + (cell.x - 1)) * 4;
        image.data[idx] = 214; image.data[idx + 1] = 130; image.data[idx + 2] = 40; image.data[idx + 3] = 220;
    }
    for (const cell of payload.monsters) {
        const idx = ((cell.y - 1) * payload.width + (cell.x - 1)) * 4;
        image.data[idx] = 200; image.data[idx + 1] = 40; image.data[idx + 2] = 40; image.data[idx + 3] = 220;
    }

    bctx.putImageData(image, 0, 0);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(buffer, 0, 0, canvas.width, canvas.height);
}

function minimapSurfaceColor(surface) {
    if (!surface) return [40, 40, 40];
    if (surface >= 140 && surface <= 200) {
        const depth = Math.min(1, (surface - 140) / 60);
        return [20, Math.round(60 + depth * 40), Math.round(120 + depth * 100)];
    }
    if (surface >= 100 && surface < 140) return [70, 110, 60];
    return [110, 100, 90];
}

function fallbackSurfaceColor(surface) {
    if (surface >= 140 && surface <= 200) return "#1c4f7c";
    if (surface >= 100 && surface < 140) return "#3f5c30";
    return "#6e6458";
}

function spriteRect(instance, kind, imageNumber, imageType) {
    if (!imageNumber) return null;
    const oneIndexed = kind === "player";
    const index = oneIndexed ? imageNumber - 1 : imageNumber;
    if (index < 0) return null;

    let sheetNumber = Math.floor(index / 100);
    let position = index % 100;
    if (kind === "background") {
        sheetNumber = Math.floor(imageNumber / 100) - 1;
        position = imageNumber - (sheetNumber + 1) * 100;
    }

    const sheet = instance.sheets[kind]?.get(sheetNumber);
    if (!sheet || !sheet.complete || sheet.naturalWidth === 0) return null;

    const col = position % 10;
    const row = Math.floor(position / 10);
    const size = spriteSize(kind, imageType);
    return { sheet, sx: col * TILE, sy: row * TILE, sw: size[0], sh: size[1] };
}

function spriteSize(kind, imageType) {
    if (kind === "item") {
        if (imageType === 1) return [32, 64];
        if (imageType === 2) return [64, 64];
        if (imageType === 3) return [96, 96];
    }
    if (kind === "player") {
        if (imageType === 1 || imageType === 2) return [64, 64];
        if (imageType === 3) return [96, 96];
    }
    return [32, 32];
}

function transparentSprite(instance, kind, imageNumber, imageType) {
    const cacheKey = `${kind}:${imageNumber}:${imageType}`;
    if (instance.spriteCache.has(cacheKey)) return instance.spriteCache.get(cacheKey);

    const rect = spriteRect(instance, kind, imageNumber, imageType);
    if (!rect) return null;
    if (rect.sx >= rect.sheet.naturalWidth || rect.sy >= rect.sheet.naturalHeight) return null;

    const canvas = document.createElement("canvas");
    const sw = Math.max(1, Math.min(rect.sw, rect.sheet.naturalWidth - rect.sx));
    const sh = Math.max(1, Math.min(rect.sh, rect.sheet.naturalHeight - rect.sy));
    canvas.width = sw;
    canvas.height = sh;
    const local = canvas.getContext("2d");
    local.imageSmoothingEnabled = false;
    local.drawImage(rect.sheet, rect.sx, rect.sy, sw, sh, 0, 0, sw, sh);

    if (kind !== "background") {
        const data = local.getImageData(0, 0, sw, sh);
        for (let i = 0; i < data.data.length; i += 4) {
            if (data.data[i] > 250 && data.data[i + 1] > 250 && data.data[i + 2] > 250) {
                data.data[i + 3] = 0;
            }
        }
        local.putImageData(data, 0, 0);
    }

    instance.spriteCache.set(cacheKey, canvas);
    return canvas;
}

function drawSprite(instance, target, kind, imageNumber, imageType, x, y, w, h) {
    const sprite = transparentSprite(instance, kind, imageNumber, imageType);
    if (!sprite) return false;
    target.drawImage(sprite, x, y, w || sprite.width, h || sprite.height);
    return true;
}

function drawWorldSprite(instance, target, kind, imageNumber, imageType, x, y) {
    const sprite = transparentSprite(instance, kind, imageNumber, imageType);
    if (!sprite) return false;
    let drawX = x;
    let drawY = y - Math.max(0, sprite.height - TILE);
    if (sprite.width === TILE * 2) { drawX = x - TILE; drawY = y; }
    target.drawImage(sprite, drawX, drawY, sprite.width, sprite.height);
    return true;
}

// Renders one 32x32 palette-button icon (used by Blazor via a small wrapper call per button).
export function drawIcon(id, canvasEl, layer, entryId, image, imageType) {
    const instance = instances.get(id);
    if (!instance) return;
    const ctx = canvasEl.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, TILE, TILE);

    if (layer === "surface") {
        if (!drawSprite(instance, ctx, "background", entryId, 0, 0, 0, TILE, TILE)) {
            ctx.fillStyle = fallbackSurfaceColor(entryId);
            ctx.fillRect(0, 0, TILE, TILE);
        }
        return;
    }

    const kind = layer === "item" ? "item" : "player";
    if (!drawSprite(instance, ctx, kind, image, imageType, 0, 0)) {
        ctx.fillStyle = "#444";
        ctx.fillRect(0, 0, TILE, TILE);
    }
}

function base64ToArrayBuffer(base64) {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return bytes.buffer;
}
