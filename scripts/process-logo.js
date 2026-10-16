const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function processLogo() {
  const inputPath = path.join(__dirname, '..', 'public', 'images', 'vibin-logo.png');
  const publicDir = path.join(__dirname, '..', 'public');
  const imagesDir = path.join(publicDir, 'images');
  const iconsDir = path.join(publicDir, 'icons');

  if (!fs.existsSync(iconsDir)) fs.mkdirSync(iconsDir, { recursive: true });

  console.log('Processing official Vibin logo...');

  // 1. Trimmed full logo (with tight clean padding)
  await sharp(inputPath)
    .trim()
    .extend({
      top: 24,
      bottom: 24,
      left: 24,
      right: 24,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toFile(path.join(imagesDir, 'vibin-logo-trimmed.png'));

  console.log('Created vibin-logo-trimmed.png');

  // 2. Extract upper mark (the house + sun + arch + leaf)
  // Trimmed image is 579 x 621. The mark is approximately top 50%
  const trimmed = await sharp(inputPath).trim().toBuffer();
  const trimmedMeta = await sharp(trimmed).metadata();

  const markHeight = Math.floor(trimmedMeta.height * 0.48);
  const markWidth = Math.floor(trimmedMeta.width * 0.58);
  const markLeft = Math.floor((trimmedMeta.width - markWidth) / 2);

  await sharp(trimmed)
    .extract({
      left: markLeft,
      top: 0,
      width: markWidth,
      height: markHeight,
    })
    .trim()
    .extend({
      top: 30,
      bottom: 30,
      left: 30,
      right: 30,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .resize(256, 256, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(imagesDir, 'vibin-mark.png'));

  console.log('Created vibin-mark.png (app mark / icon)');

  // 3. Generate PWA app icons (512x512, 192x192, maskable) with Warm Sand / Cream background and centered logo mark
  const bgCream = { r: 248, g: 244, b: 238, alpha: 1 }; // #F8F4EE

  await sharp(trimmed)
    .resize(380, 380, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({
      top: 66,
      bottom: 66,
      left: 66,
      right: 66,
      background: bgCream,
    })
    .resize(512, 512)
    .png()
    .toFile(path.join(iconsDir, 'icon-512.png'));

  await sharp(trimmed)
    .resize(380, 380, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({
      top: 66,
      bottom: 66,
      left: 66,
      right: 66,
      background: bgCream,
    })
    .resize(512, 512)
    .png()
    .toFile(path.join(iconsDir, 'icon-maskable.png'));

  await sharp(trimmed)
    .resize(140, 140, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({
      top: 26,
      bottom: 26,
      left: 26,
      right: 26,
      background: bgCream,
    })
    .resize(192, 192)
    .png()
    .toFile(path.join(iconsDir, 'icon-192.png'));

  // 4. Favicon (64x64)
  await sharp(trimmed)
    .resize(48, 48, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({
      top: 8,
      bottom: 8,
      left: 8,
      right: 8,
      background: bgCream,
    })
    .resize(64, 64)
    .png()
    .toFile(path.join(publicDir, 'favicon.ico'));

  console.log('All icons and favicon updated with official company logo!');
}

processLogo().catch(console.error);
