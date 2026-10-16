const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function createPng(width, height, r, g, b) {
  // PNG signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData.writeUInt8(8, 8); // 8-bit depth
  ihdrData.writeUInt8(2, 9); // Color type 2: Truecolor RGB
  ihdrData.writeUInt8(0, 10); // Compression method
  ihdrData.writeUInt8(0, 11); // Filter method
  ihdrData.writeUInt8(0, 12); // Interlace method

  function createChunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type);
    const crc = require('zlib').crc32 ? require('zlib').crc32(Buffer.concat([typeBuf, data])) : 0;
    const crcBuf = Buffer.alloc(4);
    crcBuf.writeInt32BE(crc, 0);
    return Buffer.concat([len, typeBuf, data, crcBuf]);
  }

  // Raw image scanlines
  // Each scanline begins with 1 filter byte (0 = none) followed by RGB triplets
  const rowSize = 1 + width * 3;
  const rawData = Buffer.alloc(height * rowSize);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // Filter: None

    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 3;
      
      // Calculate distance from center for a rounded squircle badge effect
      const dx = (x - width / 2) / (width / 2);
      const dy = (y - height / 2) / (height / 2);
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Warm gradient from terracotta to deep rust
      const gradFactor = (y / height) * 0.2;
      let pr = Math.max(0, Math.min(255, Math.floor(r * (1 - gradFactor))));
      let pg = Math.max(0, Math.min(255, Math.floor(g * (1 - gradFactor))));
      let pb = Math.max(0, Math.min(255, Math.floor(b * (1 - gradFactor))));

      // Add a warm cream arch silhouette in the center
      const inArchX = Math.abs(x - width / 2) < width * 0.22;
      const inArchTop = y > height * 0.35 && y < height * 0.85;
      const archRadius = width * 0.22;
      const inArchCap = (y - height * 0.35) ** 2 + (x - width / 2) ** 2 < archRadius ** 2 && y <= height * 0.35 && y > height * 0.2;

      if ((inArchX && inArchTop) || inArchCap) {
        // Warm cream inner arch
        pr = 250;
        pg = 247;
        pb = 242;

        // Glowing mustard lantern inside
        const lanternDist = Math.sqrt((x - width / 2) ** 2 + (y - height * 0.48) ** 2);
        if (lanternDist < width * 0.08) {
          pr = 224;
          pg = 90;
          pb = 54;
        }
      }

      rawData[pxOffset] = pr;
      rawData[pxOffset + 1] = pg;
      rawData[pxOffset + 2] = pb;
    }
  }

  // Deflate compressed data
  const compressed = zlib.deflateSync(rawData);

  // CRC32 implementation for PNG chunks
  function makeCrcTable() {
    let c;
    const table = [];
    for (let n = 0; n < 256; n++) {
      c = n;
      for (let k = 0; k < 8; k++) {
        c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
      }
      table[n] = c;
    }
    return table;
  }

  const crcTable = makeCrcTable();
  function crc32(buf) {
    let crc = 0 ^ (-1);
    for (let i = 0; i < buf.length; i++) {
      crc = (crc >>> 8) ^ crcTable[(crc ^ buf[i]) & 0xff];
    }
    return (crc ^ (-1)) >>> 0;
  }

  function packChunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type);
    const body = Buffer.concat([typeBuf, data]);
    const crcVal = crc32(body);
    const crcBuf = Buffer.alloc(4);
    crcBuf.writeUInt32BE(crcVal, 0);
    return Buffer.concat([len, body, crcBuf]);
  }

  const ihdrChunk = packChunk('IHDR', ihdrData);
  const idatChunk = packChunk('IDAT', compressed);
  const iendChunk = packChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

const outDir = path.join(__dirname, '..', 'public', 'icons');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Generate 192, 512, maskable icons (Warm Coffee & Teak RGB: 126, 72, 44)
fs.writeFileSync(path.join(outDir, 'icon-192.png'), createPng(192, 192, 126, 72, 44));
fs.writeFileSync(path.join(outDir, 'icon-512.png'), createPng(512, 512, 126, 72, 44));
fs.writeFileSync(path.join(outDir, 'icon-maskable.png'), createPng(512, 512, 126, 72, 44));

// Also write favicon
fs.writeFileSync(path.join(__dirname, '..', 'public', 'favicon.ico'), createPng(64, 64, 126, 72, 44));
fs.writeFileSync(path.join(__dirname, '..', 'public', 'icon.svg'), fs.readFileSync(path.join(outDir, 'vibin-icon.svg')));

console.log('Vibin PWA icon assets generated successfully.');
