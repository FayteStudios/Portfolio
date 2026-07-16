// Minimal dependency-free ZIP writer (STORE method, no compression).
// Good enough for bundling a handful of PNGs + a manifest for download.
(function () {
  "use strict";

  let crcTable = null;

  function getCrcTable() {
    if (crcTable) return crcTable;
    crcTable = new Uint32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) {
        c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      }
      crcTable[n] = c >>> 0;
    }
    return crcTable;
  }

  function crc32(bytes) {
    const table = getCrcTable();
    let crc = 0xffffffff;
    for (let i = 0; i < bytes.length; i++) {
      crc = table[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8);
    }
    return (crc ^ 0xffffffff) >>> 0;
  }

  function dosDateTime(date) {
    const dosTime =
      ((date.getHours() & 0x1f) << 11) |
      ((date.getMinutes() & 0x3f) << 5) |
      ((Math.floor(date.getSeconds() / 2)) & 0x1f);
    const dosDate =
      (((date.getFullYear() - 1980) & 0x7f) << 9) |
      (((date.getMonth() + 1) & 0xf) << 5) |
      (date.getDate() & 0x1f);
    return { dosTime, dosDate };
  }

  // files: [{ name: string, data: ArrayBuffer | Uint8Array }]
  async function createZip(files) {
    const encoder = new TextEncoder();
    const localParts = [];
    const centralParts = [];
    let offset = 0;

    const { dosTime, dosDate } = dosDateTime(new Date());

    for (const file of files) {
      const nameBytes = encoder.encode(file.name);
      const data = file.data instanceof Uint8Array ? file.data : new Uint8Array(file.data);
      const crc = crc32(data);
      const size = data.length;

      const localHeader = new DataView(new ArrayBuffer(30));
      localHeader.setUint32(0, 0x04034b50, true);
      localHeader.setUint16(4, 20, true);
      localHeader.setUint16(6, 0, true);
      localHeader.setUint16(8, 0, true);
      localHeader.setUint16(10, dosTime, true);
      localHeader.setUint16(12, dosDate, true);
      localHeader.setUint32(14, crc, true);
      localHeader.setUint32(18, size, true);
      localHeader.setUint32(22, size, true);
      localHeader.setUint16(26, nameBytes.length, true);
      localHeader.setUint16(28, 0, true);

      localParts.push(new Uint8Array(localHeader.buffer), nameBytes, data);

      const centralHeader = new DataView(new ArrayBuffer(46));
      centralHeader.setUint32(0, 0x02014b50, true);
      centralHeader.setUint16(4, 20, true);
      centralHeader.setUint16(6, 20, true);
      centralHeader.setUint16(8, 0, true);
      centralHeader.setUint16(10, 0, true);
      centralHeader.setUint16(12, dosTime, true);
      centralHeader.setUint16(14, dosDate, true);
      centralHeader.setUint32(16, crc, true);
      centralHeader.setUint32(20, size, true);
      centralHeader.setUint32(24, size, true);
      centralHeader.setUint16(28, nameBytes.length, true);
      centralHeader.setUint16(30, 0, true);
      centralHeader.setUint16(32, 0, true);
      centralHeader.setUint16(34, 0, true);
      centralHeader.setUint16(36, 0, true);
      centralHeader.setUint32(38, 0, true);
      centralHeader.setUint32(42, offset, true);

      centralParts.push(new Uint8Array(centralHeader.buffer), nameBytes);

      offset += 30 + nameBytes.length + size;
    }

    const centralStart = offset;
    let centralSize = 0;
    for (const part of centralParts) centralSize += part.length;

    const endRecord = new DataView(new ArrayBuffer(22));
    endRecord.setUint32(0, 0x06054b50, true);
    endRecord.setUint16(4, 0, true);
    endRecord.setUint16(6, 0, true);
    endRecord.setUint16(8, files.length, true);
    endRecord.setUint16(10, files.length, true);
    endRecord.setUint32(12, centralSize, true);
    endRecord.setUint32(16, centralStart, true);
    endRecord.setUint16(20, 0, true);

    const blobParts = [...localParts, ...centralParts, new Uint8Array(endRecord.buffer)];
    return new Blob(blobParts, { type: "application/zip" });
  }

  window.SpriteWarpZip = { createZip };
})();
