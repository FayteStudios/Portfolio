// Sprite Warp Editor — client-side web port.
// Mirrors sprite_warp_editor.py: a layer stack of uploaded sprites is
// positioned/resized on an edit canvas, an anchor point is set, and
// "Commit Sprite" trims to content bounds and exports a PNG + manifest entry.
// Everything runs in the browser; uploads never leave the device.
(function () {
  "use strict";

  const DEFAULT_LAYER_WIDTH = 128;
  const DEFAULT_LAYER_HEIGHT = 128;
  const THUMBNAIL_SIZE = 48;
  const THUMBNAILS_PER_PAGE = 100;
  const NAMING_PAD = 6;
  const IMAGE_NAME_RE = /\.(png|jpe?g|bmp|webp|gif)$/i;

  // ------------------------------------------------------------
  // State
  // ------------------------------------------------------------

  let dbAvailable = false;
  let memIdCounter = 0;

  /** @type {{id:any,name:string,blob:Blob,bitmap?:ImageBitmap,bitmapPromise?:Promise}[]} */
  let libraryItems = [];
  let thumbnailPage = 0;

  /** @type {{name:string,bitmap:ImageBitmap,x:number,y:number,width:number,height:number,visible:boolean}[]} */
  let layers = [];
  let selectedLayerIndex = null;

  let anchor = { x: 32, y: 32 };

  let draggingLayer = false;
  let draggingAnchor = false;
  let lastMouseX = 0;
  let lastMouseY = 0;

  let isSyncingFields = false;

  let committedSprites = []; // {name, filename, blob, width, height, anchorX, anchorY, kind}
  let manifestSprites = []; // {name, width, height, anchorX, anchorY}

  // ------------------------------------------------------------
  // DOM references (populated on init)
  // ------------------------------------------------------------

  let canvas, ctx;
  let els = {};

  // ------------------------------------------------------------
  // Init
  // ------------------------------------------------------------

  document.addEventListener("DOMContentLoaded", init);

  async function init() {
    canvas = document.getElementById("editCanvas");
    ctx = canvas.getContext("2d");

    els = {
      layerList: document.getElementById("layerList"),
      thumbGrid: document.getElementById("thumbGrid"),
      pageLabel: document.getElementById("pageLabel"),
      persistNote: document.getElementById("persistNote"),
      dropzone: document.getElementById("dropzone"),
      fileInput: document.getElementById("fileInput"),
      folderInput: document.getElementById("folderInput"),
      fieldX: document.getElementById("fieldX"),
      fieldY: document.getElementById("fieldY"),
      fieldW: document.getElementById("fieldW"),
      fieldH: document.getElementById("fieldH"),
      fieldAnchorX: document.getElementById("fieldAnchorX"),
      fieldAnchorY: document.getElementById("fieldAnchorY"),
      committedList: document.getElementById("committedList"),
      committedCount: document.getElementById("committedCount"),
      toast: document.getElementById("toast"),
    };

    wireStaticButtons();
    wireFieldInputs();
    wireCanvasInteraction();
    wireKeyboard();
    wireUploads();

    await initLibrary();
    refreshLayerList();
    syncFieldsFromSelectedLayer();
    redraw();
  }

  function toast(message) {
    els.toast.textContent = message;
    els.toast.classList.add("visible");
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => els.toast.classList.remove("visible"), 3200);
  }

  // ------------------------------------------------------------
  // Library (IndexedDB-backed sprite uploads)
  // ------------------------------------------------------------

  async function initLibrary() {
    try {
      await SpriteWarpDB.open();
      dbAvailable = true;
      const records = await SpriteWarpDB.getAll();
      libraryItems = records.map((r) => ({ id: r.id, name: r.name, blob: r.blob }));
      els.persistNote.textContent = "Your uploaded sprites are saved in this browser for next time.";
    } catch (ex) {
      console.warn("IndexedDB unavailable, library will not persist between visits.", ex);
      dbAvailable = false;
      libraryItems = [];
      els.persistNote.textContent = "Private browsing detected — uploads will not be saved between visits.";
    }
    await renderThumbnailPage();
  }

  function sortedLibrary() {
    return [...libraryItems].sort((a, b) => a.name.localeCompare(b.name));
  }

  async function getBitmap(item) {
    if (item.bitmap) return item.bitmap;
    if (item.bitmapPromise) return item.bitmapPromise;
    item.bitmapPromise = createImageBitmap(item.blob).then((bmp) => {
      item.bitmap = bmp;
      return bmp;
    });
    return item.bitmapPromise;
  }

  function drawThumbnail(canvasEl, bitmap) {
    const tctx = canvasEl.getContext("2d");
    tctx.imageSmoothingEnabled = false;
    tctx.clearRect(0, 0, THUMBNAIL_SIZE, THUMBNAIL_SIZE);
    const scale = Math.min(THUMBNAIL_SIZE / bitmap.width, THUMBNAIL_SIZE / bitmap.height, 1);
    const w = Math.max(1, Math.round(bitmap.width * scale));
    const h = Math.max(1, Math.round(bitmap.height * scale));
    const dx = Math.floor((THUMBNAIL_SIZE - w) / 2);
    const dy = Math.floor((THUMBNAIL_SIZE - h) / 2);
    tctx.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height, dx, dy, w, h);
  }

  async function renderThumbnailPage() {
    const grid = els.thumbGrid;
    grid.innerHTML = "";

    const sorted = sortedLibrary();

    if (!sorted.length) {
      grid.innerHTML = `<div class="empty-hint">No sprites uploaded yet.<br>Drag images in, or use Upload Files.</div>`;
      els.pageLabel.textContent = "Page 0 / 0";
      return;
    }

    const maxPage = Math.max(0, Math.ceil(sorted.length / THUMBNAILS_PER_PAGE) - 1);
    if (thumbnailPage > maxPage) thumbnailPage = maxPage;
    if (thumbnailPage < 0) thumbnailPage = 0;

    const start = thumbnailPage * THUMBNAILS_PER_PAGE;
    const pageItems = sorted.slice(start, start + THUMBNAILS_PER_PAGE);

    els.pageLabel.textContent = `Page ${thumbnailPage + 1} / ${maxPage + 1}  ·  ${sorted.length} sprite(s)`;

    for (const item of pageItems) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "thumb-btn";
      btn.title = item.name;

      const thumbCanvas = document.createElement("canvas");
      thumbCanvas.width = THUMBNAIL_SIZE;
      thumbCanvas.height = THUMBNAIL_SIZE;
      btn.appendChild(thumbCanvas);

      const label = document.createElement("div");
      label.className = "thumb-label";
      label.textContent = item.name;
      btn.appendChild(label);

      btn.addEventListener("click", () => addLayerFromLibraryItem(item));
      grid.appendChild(btn);

      getBitmap(item)
        .then((bitmap) => drawThumbnail(thumbCanvas, bitmap))
        .catch(() => {
          label.textContent = `${item.name} (failed to load)`;
        });
    }
  }

  function previousPage() {
    if (thumbnailPage <= 0) return;
    thumbnailPage -= 1;
    renderThumbnailPage();
  }

  function nextPage() {
    const maxPage = Math.max(0, Math.ceil(sortedLibrary().length / THUMBNAILS_PER_PAGE) - 1);
    if (thumbnailPage >= maxPage) return;
    thumbnailPage += 1;
    renderThumbnailPage();
  }

  async function addFileToLibrary(file) {
    const exists = libraryItems.some((item) => item.name === file.name && item.blob.size === file.size);
    if (exists) return;

    let id;
    if (dbAvailable) {
      try {
        id = await SpriteWarpDB.addSprite({ name: file.name, blob: file });
      } catch (ex) {
        console.warn("Failed to persist sprite, keeping in-memory only.", ex);
        id = `mem-${memIdCounter++}`;
      }
    } else {
      id = `mem-${memIdCounter++}`;
    }

    libraryItems.push({ id, name: file.name, blob: file });
  }

  async function handleIncomingFiles(fileList) {
    const files = Array.from(fileList).filter((f) => IMAGE_NAME_RE.test(f.name));
    if (!files.length) {
      toast("No supported image files found (png, jpg, bmp, webp, gif).");
      return;
    }
    for (const file of files) {
      await addFileToLibrary(file);
    }
    await renderThumbnailPage();
    toast(`Added ${files.length} sprite(s) to the library.`);
  }

  async function clearLibrary() {
    if (!confirm("Remove all uploaded sprites from this browser? This cannot be undone.")) return;
    if (dbAvailable) {
      try {
        await SpriteWarpDB.clear();
      } catch (ex) {
        console.warn(ex);
      }
    }
    libraryItems = [];
    thumbnailPage = 0;
    await renderThumbnailPage();
    toast("Library cleared.");
  }

  // ------------------------------------------------------------
  // Drag & drop (files + folders)
  // ------------------------------------------------------------

  function collectEntry(entry, out) {
    return new Promise((resolve) => {
      if (!entry) {
        resolve();
      } else if (entry.isFile) {
        entry.file(
          (file) => {
            out.push(file);
            resolve();
          },
          () => resolve()
        );
      } else if (entry.isDirectory) {
        const reader = entry.createReader();
        const readBatch = () => {
          reader.readEntries(async (entries) => {
            if (!entries.length) {
              resolve();
              return;
            }
            for (const child of entries) {
              await collectEntry(child, out);
            }
            readBatch();
          }, () => resolve());
        };
        readBatch();
      } else {
        resolve();
      }
    });
  }

  async function getFilesFromDataTransfer(dataTransfer) {
    const out = [];
    const items = dataTransfer.items ? Array.from(dataTransfer.items) : [];

    if (items.length && items[0].webkitGetAsEntry) {
      const entries = items.map((i) => i.webkitGetAsEntry()).filter(Boolean);
      for (const entry of entries) {
        await collectEntry(entry, out);
      }
    } else {
      out.push(...Array.from(dataTransfer.files || []));
    }

    return out;
  }

  function wireUploads() {
    const dz = els.dropzone;

    dz.addEventListener("dragover", (e) => {
      e.preventDefault();
      dz.classList.add("dragover");
    });
    dz.addEventListener("dragleave", () => dz.classList.remove("dragover"));
    dz.addEventListener("drop", async (e) => {
      e.preventDefault();
      dz.classList.remove("dragover");
      const files = await getFilesFromDataTransfer(e.dataTransfer);
      await handleIncomingFiles(files);
    });

    document.getElementById("btnUploadFiles").addEventListener("click", () => els.fileInput.click());
    document.getElementById("btnUploadFolder").addEventListener("click", () => els.folderInput.click());

    els.fileInput.addEventListener("change", async (e) => {
      await handleIncomingFiles(e.target.files);
      e.target.value = "";
    });
    els.folderInput.addEventListener("change", async (e) => {
      await handleIncomingFiles(e.target.files);
      e.target.value = "";
    });

    document.getElementById("btnClearLibrary").addEventListener("click", clearLibrary);
    document.getElementById("btnPrevPage").addEventListener("click", previousPage);
    document.getElementById("btnNextPage").addEventListener("click", nextPage);
  }

  // ------------------------------------------------------------
  // Layers
  // ------------------------------------------------------------

  async function addLayerFromLibraryItem(item) {
    let bitmap;
    try {
      bitmap = await getBitmap(item);
    } catch (ex) {
      toast(`Could not load ${item.name}.`);
      return;
    }

    layers.push({
      name: item.name,
      bitmap,
      x: Math.round(canvas.width / 2 - DEFAULT_LAYER_WIDTH / 2),
      y: Math.round(canvas.height / 2 - DEFAULT_LAYER_HEIGHT / 2),
      width: DEFAULT_LAYER_WIDTH,
      height: DEFAULT_LAYER_HEIGHT,
      visible: true,
    });

    selectedLayerIndex = layers.length - 1;
    refreshLayerList();
    syncFieldsFromSelectedLayer();
    redraw();
  }

  function refreshLayerList() {
    const container = els.layerList;
    container.innerHTML = "";

    if (!layers.length) {
      container.innerHTML = `<div class="empty-hint">No layers yet. Click a sprite in the library to add one.</div>`;
      return;
    }

    layers.forEach((layer, index) => {
      const row = document.createElement("div");
      row.className = "layer-row" + (index === selectedLayerIndex ? " selected" : "");
      row.textContent = `${String(index).padStart(2, "0")}: ${layer.name} (${layer.width}x${layer.height})`;
      row.addEventListener("click", () => selectLayer(index));
      container.appendChild(row);
    });
  }

  function selectLayer(index) {
    selectedLayerIndex = index;
    refreshLayerList();
    syncFieldsFromSelectedLayer();
    redraw();
  }

  function getSelectedLayer() {
    if (selectedLayerIndex === null) return null;
    if (selectedLayerIndex < 0 || selectedLayerIndex >= layers.length) return null;
    return layers[selectedLayerIndex];
  }

  function removeSelectedLayer() {
    if (selectedLayerIndex === null) return;
    if (selectedLayerIndex < 0 || selectedLayerIndex >= layers.length) return;

    layers.splice(selectedLayerIndex, 1);

    if (!layers.length) {
      selectedLayerIndex = null;
    } else {
      selectedLayerIndex = Math.min(selectedLayerIndex, layers.length - 1);
    }

    refreshLayerList();
    syncFieldsFromSelectedLayer();
    redraw();
  }

  function clearAllLayers() {
    if (!layers.length) return;
    if (!confirm("Remove all layers from the canvas?")) return;
    layers = [];
    selectedLayerIndex = null;
    refreshLayerList();
    syncFieldsFromSelectedLayer();
    redraw();
  }

  function moveLayerUp() {
    if (selectedLayerIndex === null || selectedLayerIndex <= 0) return;
    const i = selectedLayerIndex;
    [layers[i - 1], layers[i]] = [layers[i], layers[i - 1]];
    selectedLayerIndex = i - 1;
    refreshLayerList();
    redraw();
  }

  function moveLayerDown() {
    if (selectedLayerIndex === null || selectedLayerIndex >= layers.length - 1) return;
    const i = selectedLayerIndex;
    [layers[i + 1], layers[i]] = [layers[i], layers[i + 1]];
    selectedLayerIndex = i + 1;
    refreshLayerList();
    redraw();
  }

  // ------------------------------------------------------------
  // Transform fields
  // ------------------------------------------------------------

  function syncFieldsFromSelectedLayer() {
    isSyncingFields = true;
    const layer = getSelectedLayer();

    if (!layer) {
      els.fieldX.value = 0;
      els.fieldY.value = 0;
      els.fieldW.value = 64;
      els.fieldH.value = 64;
    } else {
      els.fieldX.value = layer.x;
      els.fieldY.value = layer.y;
      els.fieldW.value = layer.width;
      els.fieldH.value = layer.height;
    }

    els.fieldAnchorX.value = anchor.x;
    els.fieldAnchorY.value = anchor.y;
    isSyncingFields = false;
  }

  function applyFieldsToSelectedLayer() {
    if (isSyncingFields) return;
    const layer = getSelectedLayer();
    if (!layer) return;

    const x = parseInt(els.fieldX.value, 10);
    const y = parseInt(els.fieldY.value, 10);
    const w = parseInt(els.fieldW.value, 10);
    const h = parseInt(els.fieldH.value, 10);

    if (Number.isNaN(x) || Number.isNaN(y) || Number.isNaN(w) || Number.isNaN(h)) return;

    layer.x = x;
    layer.y = y;
    layer.width = Math.max(1, w);
    layer.height = Math.max(1, h);

    refreshLayerList();
    redraw();
  }

  function applyAnchorFields() {
    if (isSyncingFields) return;
    const x = parseInt(els.fieldAnchorX.value, 10);
    const y = parseInt(els.fieldAnchorY.value, 10);
    if (Number.isNaN(x) || Number.isNaN(y)) return;
    anchor = { x, y };
    redraw();
  }

  function setSelectedSize(w, h) {
    const layer = getSelectedLayer();
    if (!layer) return;
    layer.width = w;
    layer.height = h;
    syncFieldsFromSelectedLayer();
    refreshLayerList();
    redraw();
  }

  function setCanvasSize(w, h) {
    canvas.width = w;
    canvas.height = h;
    redraw();
  }

  function calculateContentBounds() {
    const visible = layers.filter((l) => l.visible);
    if (!visible.length) return null;

    return {
      left: Math.min(...visible.map((l) => l.x)),
      top: Math.min(...visible.map((l) => l.y)),
      right: Math.max(...visible.map((l) => l.x + l.width)),
      bottom: Math.max(...visible.map((l) => l.y + l.height)),
    };
  }

  function centerAnchor() {
    const bounds = calculateContentBounds();
    if (!bounds) {
      anchor = { x: Math.round(canvas.width / 2), y: Math.round(canvas.height / 2) };
    } else {
      anchor = {
        x: Math.round((bounds.left + bounds.right) / 2),
        y: Math.round((bounds.top + bounds.bottom) / 2),
      };
    }
    syncFieldsFromSelectedLayer();
    redraw();
  }

  function bottomCenterAnchor() {
    const bounds = calculateContentBounds();
    if (!bounds) {
      anchor = { x: Math.round(canvas.width / 2), y: Math.round(canvas.height / 2) };
    } else {
      anchor = {
        x: Math.round((bounds.left + bounds.right) / 2),
        y: bounds.bottom,
      };
    }
    syncFieldsFromSelectedLayer();
    redraw();
  }

  // ------------------------------------------------------------
  // Canvas interaction (mouse / pointer + keyboard)
  // ------------------------------------------------------------

  function canvasPointFromEvent(e) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: Math.round(((e.clientX - rect.left) / rect.width) * canvas.width),
      y: Math.round(((e.clientY - rect.top) / rect.height) * canvas.height),
    };
  }

  function isNearAnchor(x, y) {
    return Math.abs(x - anchor.x) <= 8 && Math.abs(y - anchor.y) <= 8;
  }

  function findLayerAtPoint(x, y) {
    for (let i = layers.length - 1; i >= 0; i--) {
      const layer = layers[i];
      if (!layer.visible) continue;
      if (x >= layer.x && x < layer.x + layer.width && y >= layer.y && y < layer.y + layer.height) {
        return i;
      }
    }
    return null;
  }

  function wireCanvasInteraction() {
    canvas.addEventListener("pointerdown", (e) => {
      const { x, y } = canvasPointFromEvent(e);
      lastMouseX = x;
      lastMouseY = y;

      if (e.shiftKey) {
        anchor = { x, y };
        syncFieldsFromSelectedLayer();
        redraw();
        return;
      }

      if (isNearAnchor(x, y)) {
        draggingAnchor = true;
        return;
      }

      const hitIndex = findLayerAtPoint(x, y);
      if (hitIndex !== null) {
        selectLayer(hitIndex);
        draggingLayer = true;
      }
    });

    document.addEventListener("pointermove", (e) => {
      if (!draggingLayer && !draggingAnchor) return;

      const { x, y } = canvasPointFromEvent(e);
      const dx = x - lastMouseX;
      const dy = y - lastMouseY;

      if (draggingLayer) {
        const layer = getSelectedLayer();
        if (layer) {
          layer.x += dx;
          layer.y += dy;
          syncFieldsFromSelectedLayer();
        }
      } else if (draggingAnchor) {
        anchor = { x: anchor.x + dx, y: anchor.y + dy };
        syncFieldsFromSelectedLayer();
      }

      lastMouseX = x;
      lastMouseY = y;
      redraw();
    });

    document.addEventListener("pointerup", () => {
      draggingLayer = false;
      draggingAnchor = false;
    });
  }

  function wireKeyboard() {
    document.addEventListener("keydown", (e) => {
      const activeTag = document.activeElement && document.activeElement.tagName;
      if (activeTag === "INPUT" || activeTag === "TEXTAREA" || activeTag === "SELECT") return;

      const arrowKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
      if (!arrowKeys.includes(e.key)) return;

      const layer = getSelectedLayer();
      if (!layer) return;

      e.preventDefault();

      if (e.ctrlKey || e.metaKey) {
        resizeLayerFromKey(layer, e.key, 8);
      } else if (e.shiftKey) {
        resizeLayerFromKey(layer, e.key, 1);
      } else {
        moveLayerFromKey(layer, e.key, 1);
      }
    });
  }

  function moveLayerFromKey(layer, key, step) {
    if (key === "ArrowUp") layer.y -= step;
    else if (key === "ArrowDown") layer.y += step;
    else if (key === "ArrowLeft") layer.x -= step;
    else if (key === "ArrowRight") layer.x += step;
    syncFieldsFromSelectedLayer();
    redraw();
  }

  function resizeLayerFromKey(layer, key, step) {
    if (key === "ArrowUp") layer.height = Math.max(1, layer.height - step);
    else if (key === "ArrowDown") layer.height = Math.max(1, layer.height + step);
    else if (key === "ArrowLeft") layer.width = Math.max(1, layer.width - step);
    else if (key === "ArrowRight") layer.width = Math.max(1, layer.width + step);
    syncFieldsFromSelectedLayer();
    refreshLayerList();
    redraw();
  }

  // ------------------------------------------------------------
  // Rendering
  // ------------------------------------------------------------

  function redraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = false;

    drawGrid();

    layers.forEach((layer, index) => {
      if (!layer.visible) return;

      ctx.drawImage(
        layer.bitmap,
        0,
        0,
        layer.bitmap.width,
        layer.bitmap.height,
        layer.x,
        layer.y,
        layer.width,
        layer.height
      );

      if (index === selectedLayerIndex) {
        ctx.strokeStyle = "#00ff00";
        ctx.lineWidth = 2;
        ctx.strokeRect(layer.x + 1, layer.y + 1, layer.width - 2, layer.height - 2);
      }
    });

    drawAnchor();
  }

  function drawGrid() {
    const gridSize = 64;
    ctx.strokeStyle = "#303030";
    ctx.lineWidth = 1;

    for (let x = 0; x <= canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x + 0.5, 0);
      ctx.lineTo(x + 0.5, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y <= canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y + 0.5);
      ctx.lineTo(canvas.width, y + 0.5);
      ctx.stroke();
    }

    ctx.strokeStyle = "#606060";
    ctx.strokeRect(0.5, 0.5, canvas.width - 1, canvas.height - 1);
  }

  function drawAnchor() {
    const { x, y } = anchor;
    ctx.strokeStyle = "#ff0000";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(x - 10, y);
    ctx.lineTo(x + 10, y);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x, y - 10);
    ctx.lineTo(x, y + 10);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.stroke();
  }

  // ------------------------------------------------------------
  // Export / commit
  // ------------------------------------------------------------

  function renderCompositeTrimmed() {
    const bounds = calculateContentBounds();
    if (!bounds) throw new Error("No visible layers to export.");

    const { left, top, right, bottom } = bounds;
    const width = Math.max(1, right - left);
    const height = Math.max(1, bottom - top);

    const off = document.createElement("canvas");
    off.width = width;
    off.height = height;
    const octx = off.getContext("2d");
    octx.imageSmoothingEnabled = false;

    for (const layer of layers) {
      if (!layer.visible) continue;
      octx.drawImage(
        layer.bitmap,
        0,
        0,
        layer.bitmap.width,
        layer.bitmap.height,
        layer.x - left,
        layer.y - top,
        layer.width,
        layer.height
      );
    }

    return { canvas: off, adjustedAnchor: { x: anchor.x - left, y: anchor.y - top } };
  }

  function getNextSpriteName(kind) {
    const prefix = `${kind}_`;
    let maxN = 0;
    for (const sprite of committedSprites) {
      if (sprite.name.startsWith(prefix)) {
        const numText = sprite.name.slice(prefix.length);
        if (/^\d+$/.test(numText)) maxN = Math.max(maxN, parseInt(numText, 10));
      }
    }
    return `${prefix}${String(maxN + 1).padStart(NAMING_PAD, "0")}`;
  }

  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  }

  async function commitSprite() {
    if (!layers.length) {
      toast("Load at least one sprite first.");
      return;
    }

    let result;
    try {
      result = renderCompositeTrimmed();
    } catch (ex) {
      toast(ex.message);
      return;
    }

    const kind = document.querySelector('input[name="kind"]:checked').value;
    const name = getNextSpriteName(kind);
    const filename = `${name}.png`;

    const blob = await new Promise((resolve) => result.canvas.toBlob(resolve, "image/png"));

    committedSprites.push({
      name,
      filename,
      blob,
      width: result.canvas.width,
      height: result.canvas.height,
      anchorX: result.adjustedAnchor.x,
      anchorY: result.adjustedAnchor.y,
      kind,
    });

    manifestSprites.push({
      name,
      width: result.canvas.width,
      height: result.canvas.height,
      anchorX: result.adjustedAnchor.x,
      anchorY: result.adjustedAnchor.y,
    });

    downloadBlob(blob, filename);
    refreshCommittedList();
    toast(`Saved ${filename} — anchor (${result.adjustedAnchor.x}, ${result.adjustedAnchor.y})`);
  }

  function refreshCommittedList() {
    els.committedCount.textContent = `(${committedSprites.length})`;
    const container = els.committedList;
    container.innerHTML = "";

    if (!committedSprites.length) {
      container.innerHTML = `<div class="empty-hint">Nothing committed yet this session.</div>`;
      return;
    }

    committedSprites.forEach((sprite, index) => {
      const row = document.createElement("div");
      row.className = "committed-row";

      const thumbCanvas = document.createElement("canvas");
      thumbCanvas.width = 32;
      thumbCanvas.height = 32;
      row.appendChild(thumbCanvas);

      createImageBitmap(sprite.blob).then((bmp) => {
        const tctx = thumbCanvas.getContext("2d");
        tctx.imageSmoothingEnabled = false;
        const scale = Math.min(32 / bmp.width, 32 / bmp.height, 1);
        const w = Math.max(1, Math.round(bmp.width * scale));
        const h = Math.max(1, Math.round(bmp.height * scale));
        tctx.drawImage(bmp, 0, 0, bmp.width, bmp.height, (32 - w) / 2, (32 - h) / 2, w, h);
      });

      const meta = document.createElement("div");
      meta.className = "meta";
      meta.innerHTML = `<strong>${sprite.filename}</strong><br>${sprite.width}×${sprite.height} · anchor (${sprite.anchorX}, ${sprite.anchorY})`;
      row.appendChild(meta);

      const dlBtn = document.createElement("button");
      dlBtn.textContent = "Download";
      dlBtn.addEventListener("click", () => downloadBlob(sprite.blob, sprite.filename));
      row.appendChild(dlBtn);

      const rmBtn = document.createElement("button");
      rmBtn.textContent = "Remove";
      rmBtn.addEventListener("click", () => {
        committedSprites.splice(index, 1);
        manifestSprites.splice(index, 1);
        refreshCommittedList();
      });
      row.appendChild(rmBtn);

      container.appendChild(row);
    });
  }

  function clearCommittedList() {
    if (!committedSprites.length) return;
    if (!confirm("Clear the committed sprite list? Already-downloaded files are unaffected.")) return;
    committedSprites = [];
    manifestSprites = [];
    refreshCommittedList();
  }

  function buildManifestYaml() {
    return SpriteWarpYaml.serializeManifest(manifestSprites);
  }

  function downloadManifest() {
    if (!manifestSprites.length) {
      toast("Commit at least one sprite first.");
      return;
    }
    const text = buildManifestYaml();
    downloadBlob(new Blob([text], { type: "text/yaml" }), "sprite_info.yaml");
  }

  async function downloadZip() {
    if (!committedSprites.length) {
      toast("Commit at least one sprite first.");
      return;
    }

    const encoder = new TextEncoder();
    const files = [];

    for (const sprite of committedSprites) {
      files.push({ name: sprite.filename, data: await sprite.blob.arrayBuffer() });
    }
    files.push({ name: "sprite_info.yaml", data: encoder.encode(buildManifestYaml()) });

    const zipBlob = await SpriteWarpZip.createZip(files);
    downloadBlob(zipBlob, "sprites_export.zip");
  }

  // ------------------------------------------------------------
  // Static button wiring
  // ------------------------------------------------------------

  function wireStaticButtons() {
    document.getElementById("btnRemoveLayer").addEventListener("click", removeSelectedLayer);
    document.getElementById("btnLayerUp").addEventListener("click", moveLayerUp);
    document.getElementById("btnLayerDown").addEventListener("click", moveLayerDown);
    document.getElementById("btnClearLayers").addEventListener("click", clearAllLayers);

    document.getElementById("btnApplyTransform").addEventListener("click", applyFieldsToSelectedLayer);
    document.getElementById("btnApplyAnchor").addEventListener("click", applyAnchorFields);
    document.getElementById("btnCenterAnchor").addEventListener("click", centerAnchor);
    document.getElementById("btnBottomAnchor").addEventListener("click", bottomCenterAnchor);

    document.getElementById("btnCommit").addEventListener("click", commitSprite);
    document.getElementById("btnDownloadManifest").addEventListener("click", downloadManifest);
    document.getElementById("btnDownloadZip").addEventListener("click", downloadZip);
    document.getElementById("btnClearCommitted").addEventListener("click", clearCommittedList);

    document.querySelectorAll("[data-canvas-size]").forEach((btn) => {
      const size = parseInt(btn.dataset.canvasSize, 10);
      btn.addEventListener("click", () => setCanvasSize(size, size));
    });

    document.querySelectorAll("[data-qw]").forEach((btn) => {
      const w = parseInt(btn.dataset.qw, 10);
      const h = parseInt(btn.dataset.qh, 10);
      btn.addEventListener("click", () => setSelectedSize(w, h));
    });
  }

  function wireFieldInputs() {
    [els.fieldX, els.fieldY, els.fieldW, els.fieldH].forEach((input) => {
      input.addEventListener("input", applyFieldsToSelectedLayer);
    });
    [els.fieldAnchorX, els.fieldAnchorY].forEach((input) => {
      input.addEventListener("input", applyAnchorFields);
    });
  }
})();
