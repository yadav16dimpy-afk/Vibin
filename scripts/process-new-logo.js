const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function processNewLogo() {
  const inputPath = '/Users/dimpy/.gemini/antigravity/brain/6f1be5a0-cb9f-4a59-b41c-ff9af27d3491/.user_uploaded/media_1792131895234_98878ef7.png';
  const publicDir = path.join(__dirname, '..', 'public');
  const imagesDir = path.join(publicDir, 'images');
  const iconsDir = path.join(publicDir, 'icons');

  // Exact coordinates measured from 884x902 image:
  // House: x: 80 to 570 (width ~ 490), y: 64 to 558 (height ~ 494)
  // VIBIN text: x: 140 to 510 (width ~ 370), y: 590 to 690 (height ~ 100)
  // Full lockup (House + VIBIN): x: 74, y: 58, width: 504, height: 636

  // 1. Full Lockup: House + VIBIN text
  await sharp(inputPath)
    .extract({
      left: 74,
      top: 58,
      width: 504,
      height: 638,
    })
    .extend({
      top: 24,
      bottom: 24,
      left: 24,
      right: 24,
      background: '#FAF8F5',
    })
    .png()
    .toFile(path.join(imagesDir, 'vibin-logo-trimmed.png'));

  console.log('Created vibin-logo-trimmed.png');

  // 2. House Emblem Mark only
  await sharp(inputPath)
    .extract({
      left: 74,
      top: 58,
      width: 504,
      height: 502,
    })
    .extend({
      top: 20,
      bottom: 20,
      left: 20,
      right: 20,
      background: '#FAF8F5',
    })
    .png()
    .toFile(path.join(imagesDir, 'vibin-mark.png'));

  console.log('Created vibin-mark.png');

  // 3. Wordmark VIBIN text
  await sharp(inputPath)
    .extract({
      left: 140,
      top: 588,
      width: 372,
      height: 104,
    })
    .extend({
      top: 10,
      bottom: 10,
      left: 16,
      right: 16,
      background: '#FAF8F5',
    })
    .png()
    .toFile(path.join(imagesDir, 'vibin-wordmark.png'));

  console.log('Created vibin-wordmark.png');

  // 4. Horizontal lockup for Navbar: House mark + VIBIN text side by side!
  // Resize house mark to height 120, wordmark to height 60
  const houseForNav = await sharp(path.join(imagesDir, 'vibin-mark.png'))
    .resize({ height: 96 })
    .toBuffer();
  const houseMeta = await sharp(houseForNav).metadata();

  const wordmarkForNav = await sharp(path.join(imagesDir, 'vibin-wordmark.png'))
    .resize({ height: 52 })
    .toBuffer();
  const wordmarkMeta = await sharp(wordmarkForNav).metadata();

  const navLockupWidth = houseMeta.width + wordmarkMeta.width + 18;
  const navLockupHeight = 96;

  await sharp({
    create: {
      width: navLockupWidth,
      height: navLockupHeight,
      channels: 4,
      background: '#FAF8F5',
    },
  })
    .composite([
      { input: houseForNav, left: 0, top: 0 },
      { input: wordmarkForNav, left: houseMeta.width + 14, top: Math.round((navLockupHeight - wordmarkMeta.height) / 2) },
    ])
    .png()
    .toFile(path.join(imagesDir, 'vibin-nav-logo.png'));

  console.log('Created vibin-nav-logo.png');

  // 5. PWA Icons
  const appIconMark = await sharp(path.join(imagesDir, 'vibin-mark.png'))
    .resize(360, 360, { fit: 'contain', background: '#FAF8F5' })
    .toBuffer();

  await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: '#FAF8F5',
    },
  })
    .composite([{ input: appIconMark, gravity: 'center' }])
    .png()
    .toFile(path.join(iconsDir, 'icon-512.png'));

  await sharp({
    create: {
      width: 192,
      height: 192,
      channels: 4,
      background: '#FAF8F5',
    },
  })
    .composite([{ input: await sharp(appIconMark).resize(136, 136).toBuffer(), gravity: 'center' }])
    .png()
    .toFile(path.join(iconsDir, 'icon-192.png'));

  fs.copyFileSync(path.join(iconsDir, 'icon-512.png'), path.join(iconsDir, 'icon-maskable.png'));

  await sharp(path.join(iconsDir, 'icon-192.png'))
    .resize(64, 64)
    .toFile(path.join(publicDir, 'favicon.ico'));

  console.log('All branding assets generated!');
}

processNewLogo().catch(console.error);
