const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 1. Generate og-image.html
const ogHtmlPath = path.join(rootDir, 'scratch', 'og_template.html');
const ogPngPath = path.join(publicDir, 'og-image.png');

const ogHtmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Space+Grotesk:wght@600;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1200px;
    height: 630px;
    background-color: #212F45;
    color: #FDFDFB;
    font-family: 'Inter', sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 88px 96px;
    overflow: hidden;
    position: relative;
  }
  .accent-stroke {
    width: 120px;
    height: 6px;
    background-color: #C57A2E;
    border-radius: 3px;
    margin-bottom: 32px;
  }
  .brand-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 76px;
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1.05;
    color: #FDFDFB;
    margin-bottom: 24px;
  }
  .tagline {
    font-size: 32px;
    line-height: 1.35;
    color: #EEF0E7;
    font-weight: 400;
    max-width: 900px;
  }
  .footer-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid rgba(205, 208, 194, 0.2);
    padding-top: 28px;
  }
  .footer-meta span {
    font-size: 20px;
    color: #8C9389;
    letter-spacing: 0.02em;
  }
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: rgba(253, 253, 251, 0.08);
    border: 1px solid rgba(205, 208, 194, 0.25);
    padding: 8px 18px;
    border-radius: 999px;
    font-size: 18px;
    color: #EEF0E7;
  }
  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #3E7C4C;
  }
</style>
</head>
<body>
  <div>
    <div class="accent-stroke"></div>
    <div class="brand-title">Saurik Track</div>
    <div class="tagline">GPS attendance + van-stock for field teams</div>
  </div>
  <div class="footer-meta">
    <div class="badge">
      <div class="dot"></div>
      <span>Field Visibility & Van Inventory</span>
    </div>
    <span>sauriktrack.com</span>
  </div>
</body>
</html>`;

fs.writeFileSync(ogHtmlPath, ogHtmlContent);

console.log('Generating og-image.png (1200x630)...');
try {
  const fileUrl = 'file:///' + ogHtmlPath.replace(/\\/g, '/');
  execSync(`"${chromePath}" --headless --hide-scrollbars --window-size=1200,630 --screenshot="${ogPngPath}" "${fileUrl}"`, { stdio: 'inherit' });
  console.log('og-image.png created successfully via Chrome.');
} catch (err) {
  console.error('Headless chrome failed, fallback to pure PNG generation:', err.message);
  const png = new PNG({ width: 1200, height: 630 });
  for (let y = 0; y < 630; y++) {
    for (let x = 0; x < 1200; x++) {
      const idx = (1200 * y + x) << 2;
      png.data[idx] = 0x21;
      png.data[idx + 1] = 0x2F;
      png.data[idx + 2] = 0x45;
      png.data[idx + 3] = 0xFF;
      if (x >= 96 && x <= 216 && y >= 88 && y <= 94) {
        png.data[idx] = 0xC5;
        png.data[idx + 1] = 0x7A;
        png.data[idx + 2] = 0x2E;
      }
    }
  }
  fs.writeFileSync(ogPngPath, PNG.sync.write(png));
}

// 2. Generate apple-touch-icon.png (180x180)
const iconHtmlPath = path.join(rootDir, 'scratch', 'icon_template.html');
const iconPngPath = path.join(publicDir, 'apple-touch-icon.png');

const iconHtmlContent = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 180px;
    height: 180px;
    background-color: #212F45;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .mark {
    width: 100px;
    height: 100px;
    border-radius: 20px;
    background: #1C2620;
    border: 3px solid #C57A2E;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FDFDFB;
    font-family: system-ui, -apple-system, sans-serif;
    font-weight: 800;
    font-size: 52px;
  }
</style>
</head>
<body>
  <div class="mark">S</div>
</body>
</html>`;

fs.writeFileSync(iconHtmlPath, iconHtmlContent);

console.log('Generating apple-touch-icon.png (180x180)...');
try {
  const fileUrl = 'file:///' + iconHtmlPath.replace(/\\/g, '/');
  execSync(`"${chromePath}" --headless --hide-scrollbars --window-size=180,180 --screenshot="${iconPngPath}" "${fileUrl}"`, { stdio: 'inherit' });
  console.log('apple-touch-icon.png created successfully via Chrome.');
} catch (err) {
  const png = new PNG({ width: 180, height: 180 });
  for (let y = 0; y < 180; y++) {
    for (let x = 0; x < 180; x++) {
      const idx = (180 * y + x) << 2;
      png.data[idx] = 0x21;
      png.data[idx + 1] = 0x2F;
      png.data[idx + 2] = 0x45;
      png.data[idx + 3] = 0xFF;
    }
  }
  fs.writeFileSync(iconPngPath, PNG.sync.write(png));
}

// 3. Create favicon.ico
const faviconIcoPath = path.join(publicDir, 'favicon.ico');
const icoPng = new PNG({ width: 32, height: 32 });
for (let y = 0; y < 32; y++) {
  for (let x = 0; x < 32; x++) {
    const idx = (32 * y + x) << 2;
    icoPng.data[idx] = 0x21;
    icoPng.data[idx + 1] = 0x2F;
    icoPng.data[idx + 2] = 0x45;
    icoPng.data[idx + 3] = 0xFF;
    if (x >= 4 && x <= 27 && y >= 4 && y <= 6) {
      icoPng.data[idx] = 0xC5;
      icoPng.data[idx + 1] = 0x7A;
      icoPng.data[idx + 2] = 0x2E;
    }
  }
}
const pngBuffer = PNG.sync.write(icoPng);

const icoHeader = Buffer.alloc(6);
icoHeader.writeUInt16LE(0, 0);
icoHeader.writeUInt16LE(1, 2);
icoHeader.writeUInt16LE(1, 4);

const icoDirEntry = Buffer.alloc(16);
icoDirEntry.writeUInt8(32, 0);
icoDirEntry.writeUInt8(32, 1);
icoDirEntry.writeUInt8(0, 2);
icoDirEntry.writeUInt8(0, 3);
icoDirEntry.writeUInt16LE(1, 4);
icoDirEntry.writeUInt16LE(32, 6);
icoDirEntry.writeUInt32LE(pngBuffer.length, 8);
icoDirEntry.writeUInt32LE(22, 12);

fs.writeFileSync(faviconIcoPath, Buffer.concat([icoHeader, icoDirEntry, pngBuffer]));
console.log('favicon.ico created successfully.');

// 4. Create robots.txt
const robotsPath = path.join(publicDir, 'robots.txt');
const robotsContent = `User-agent: *
Allow: /

Sitemap: https://sauriktrack.com/sitemap.xml
`;
fs.writeFileSync(robotsPath, robotsContent);
console.log('robots.txt created successfully.');

// 5. Create sitemap.xml
const sitemapPath = path.join(publicDir, 'sitemap.xml');
const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://sauriktrack.com/</loc>
    <lastmod>2026-09-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://wwwsaurikit.com/</loc>
    <lastmod>2026-09-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://wwwsaurikit.com/track</loc>
    <lastmod>2026-09-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>
`;
fs.writeFileSync(sitemapPath, sitemapContent);
console.log('sitemap.xml created successfully.');
