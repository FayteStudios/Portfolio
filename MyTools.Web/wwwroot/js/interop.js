// JS interop for MyTools.Web: File System Access API (primary path, Chromium) with IndexedDB
// handle persistence so a page refresh only needs a one-click permission re-grant, plus a
// generic IndexedDB string-blob store used by the upload/download fallback path to snapshot
// in-progress edits across a refresh. Everything here is invoked from C# via IJSRuntime; no
// state lives only in C# that the browser side needs back, and vice versa.

let currentHandle = null;

export function isFileSystemAccessSupported() {
    return typeof window.showDirectoryPicker === "function";
}

export async function pickDirectory() {
    currentHandle = await window.showDirectoryPicker({ mode: "readwrite" });
    await storeHandle(currentHandle);
    return currentHandle.name;
}

// Called on page load to silently pick back up the last-used folder handle (if any) without
// re-prompting a full folder picker - the browser still requires a one-click permission
// re-grant (requestPermissionForCurrentHandle), which is unavoidable, but that's it.
export async function restoreHandle() {
    const handle = await loadHandle();
    if (!handle) return null;
    currentHandle = handle;
    return handle.name;
}

export async function forgetHandle() {
    currentHandle = null;
    const db = await openDb();
    await runTx(db, HANDLE_STORE, "readwrite", store => store.delete("serverFolder"));
}

export async function requestPermissionForCurrentHandle() {
    if (!currentHandle) return "no-handle";

    const opts = { mode: "readwrite" };
    let permission = await currentHandle.queryPermission(opts);

    if (permission !== "granted") {
        permission = await currentHandle.requestPermission(opts);
    }

    return permission;
}

// Reads only what MyTools.Web actually needs: the known root ini filenames (whichever of them
// exist) plus every file directly inside "Sprites" (non-recursive, matching the desktop app's
// own convention) - not a full recursive tree walk, since a real server folder can contain a lot
// of unrelated data. Returns [{ path, bytesBase64 }, ...].
export async function readWorkspaceFiles(rootFileNames) {
    if (!currentHandle) return [];

    const results = [];

    for (const name of rootFileNames) {
        try {
            const fileHandle = await currentHandle.getFileHandle(name);
            const file = await fileHandle.getFile();
            results.push({ path: name, bytesBase64: arrayBufferToBase64(await file.arrayBuffer()) });
        } catch {
            // Not present - fine, most files are optional.
        }
    }

    try {
        const spritesHandle = await currentHandle.getDirectoryHandle("Sprites");

        for await (const [entryName, entryHandle] of spritesHandle.entries()) {
            if (entryHandle.kind !== "file") continue;

            const file = await entryHandle.getFile();
            results.push({
                path: "Sprites/" + entryName,
                bytesBase64: arrayBufferToBase64(await file.arrayBuffer())
            });
        }
    } catch {
        // No Sprites folder yet - fine.
    }

    return results;
}

// Writes one file back to the real, picked folder, creating any missing intermediate
// directories (e.g. "Backups", "Sprites") along the way.
export async function writeFile(path, bytesBase64) {
    if (!currentHandle) throw new Error("No folder handle - pick a folder first.");

    const parts = path.split("/").filter(p => p.length > 0);
    let dir = currentHandle;

    for (let i = 0; i < parts.length - 1; i++) {
        dir = await dir.getDirectoryHandle(parts[i], { create: true });
    }

    const fileHandle = await dir.getFileHandle(parts[parts.length - 1], { create: true });
    const writable = await fileHandle.createWritable();
    await writable.write(base64ToArrayBuffer(bytesBase64));
    await writable.close();
}

export function downloadBlob(bytesBase64, fileName, mimeType) {
    const bytes = base64ToArrayBuffer(bytesBase64);
    const blob = new Blob([bytes], { type: mimeType || "application/octet-stream" });
    const url = URL.createObjectURL(blob);

    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    setTimeout(() => URL.revokeObjectURL(url), 30000);
}

// --- Upload fallback (Safari/Firefox - no File System Access API) ---
// Blazor's built-in <InputFile> doesn't expose webkitRelativePath, which is the only way to
// recover folder structure from a <input webkitdirectory> selection, so these read the raw DOM
// element's .files directly instead.

export async function readUploadedFiles(inputElement) {
    const files = inputElement.files;
    const results = [];

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const relPath = file.webkitRelativePath || file.name;
        const parts = relPath.split("/");
        // Drop the top-level picked-folder name itself so paths line up with the "" workspace
        // root convention the FS Access path also uses (e.g. "Sprites/item0.bmp", not
        // "MyServer/Sprites/item0.bmp").
        const path = parts.length > 1 ? parts.slice(1).join("/") : parts[0];

        results.push({ path, bytesBase64: arrayBufferToBase64(await file.arrayBuffer()) });
    }

    return results;
}

export function getUploadFolderName(inputElement) {
    const files = inputElement.files;
    if (files.length === 0) return "";

    const relPath = files[0].webkitRelativePath || "";
    return relPath.split("/")[0] || "uploaded-folder";
}

// Reads a single plain <input type=file> selection (Map Editor's "Open .map/.rsf" - no
// directory/relative-path complexity needed here, just one file's name + bytes).
export async function readSingleFile(inputElement) {
    const file = inputElement.files && inputElement.files[0];
    if (!file) return null;

    return { path: file.name, bytesBase64: arrayBufferToBase64(await file.arrayBuffer()) };
}

// --- Generic IndexedDB string-blob store (used by the upload/download fallback path to
// snapshot the in-memory workspace as JSON across a refresh) ---

const DB_NAME = "mytools-web";
const DB_VERSION = 1;
const HANDLE_STORE = "handles";
const BLOB_STORE = "blobs";

function openDb() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = () => {
            const db = request.result;
            if (!db.objectStoreNames.contains(HANDLE_STORE)) db.createObjectStore(HANDLE_STORE);
            if (!db.objectStoreNames.contains(BLOB_STORE)) db.createObjectStore(BLOB_STORE);
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

function runTx(db, storeName, mode, action) {
    return new Promise((resolve, reject) => {
        const tx = db.transaction(storeName, mode);
        const store = tx.objectStore(storeName);
        const result = action(store);

        tx.oncomplete = () => resolve(result && result.result !== undefined ? result.result : undefined);
        tx.onerror = () => reject(tx.error);
    });
}

async function storeHandle(handle) {
    const db = await openDb();
    await runTx(db, HANDLE_STORE, "readwrite", store => store.put(handle, "serverFolder"));
}

async function loadHandle() {
    const db = await openDb();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(HANDLE_STORE, "readonly");
        const request = tx.objectStore(HANDLE_STORE).get("serverFolder");
        request.onsuccess = () => resolve(request.result || null);
        request.onerror = () => reject(request.error);
    });
}

export async function idbPut(key, jsonValue) {
    const db = await openDb();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(BLOB_STORE, "readwrite");
        tx.objectStore(BLOB_STORE).put(jsonValue, key);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
}

export async function idbGet(key) {
    const db = await openDb();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(BLOB_STORE, "readonly");
        const request = tx.objectStore(BLOB_STORE).get(key);
        request.onsuccess = () => resolve(request.result || null);
        request.onerror = () => reject(request.error);
    });
}

export async function idbDelete(key) {
    const db = await openDb();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(BLOB_STORE, "readwrite");
        tx.objectStore(BLOB_STORE).delete(key);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
}

function arrayBufferToBase64(buffer) {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const chunkSize = 0x8000;

    for (let i = 0; i < bytes.length; i += chunkSize) {
        binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunkSize));
    }

    return btoa(binary);
}

function base64ToArrayBuffer(base64) {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);

    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }

    return bytes.buffer;
}
