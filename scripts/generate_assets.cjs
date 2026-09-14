const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const trackPublicDir = path.join(publicDir, 'track');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
if (!fs.existsSync(trackPublicDir)) fs.mkdirSync(trackPublicDir, { recursive: true });

// 1. Generate public/track/og-image.png (1200x630) per v3 spec
const ogHtmlPath = path.join(rootDir, 'scratch', 'og_v3_template.html');
const ogPngPath = path.join(trackPublicDir, 'og-image.png');
const rootOgPngPath = path.join(publicDir, 'og-image.png');

const ogHtmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1200px;
    height: 630px;
    background-color: #212F45;
    color: #FDFDFB;
    font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
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
    margin-bottom: 36px;
  }
  .brand-title {
    font-size: 76px;
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1.05;
    color: #FDFDFB;
    margin-bottom: 24px;
  }
  .tagline {
    font-size: 34px;
    line-height: 1.35;
    color: #EEF0E7;
    font-weight: 400;
    max-width: 900px;
  }
  .footer-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid rgba(197, 201, 186, 0.3);
    padding-top: 28px;
  }
  .footer-meta span {
    font-size: 20px;
    color: #C5C9BA;
    letter-spacing: 0.02em;
  }
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: rgba(253, 253, 251, 0.08);
    border: 1px solid rgba(197, 201, 186, 0.35);
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
    <div class="tagline">GPS attendance + van-stock, transparently</div>
  </div>
  <div class="footer-meta">
    <div class="badge">
      <div class="dot"></div>
      <span>Privacy-Transparent Field Platform</span>
    </div>
    <span>www.wwwsaurikit.com/track/</span>
  </div>
</body>
</html>`;

fs.writeFileSync(ogHtmlPath, ogHtmlContent);

console.log('Generating public/track/og-image.png (1200x630)...');
try {
  const fileUrl = 'file:///' + ogHtmlPath.replace(/\\/g, '/');
  execSync(`"${chromePath}" --headless --hide-scrollbars --window-size=1200,630 --screenshot="${ogPngPath}" "${fileUrl}"`, { stdio: 'inherit' });
  fs.copyFileSync(ogPngPath, rootOgPngPath);
  console.log('OG image created successfully at public/track/og-image.png and public/og-image.png.');
} catch (err) {
  console.error('Headless Chrome failed, fallback to pure PNG generation:', err.message);
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
  const buf = PNG.sync.write(png);
  fs.writeFileSync(ogPngPath, buf);
  fs.writeFileSync(rootOgPngPath, buf);
}

// 2. Update robots.txt
const robotsPath = path.join(publicDir, 'robots.txt');
const robotsContent = `User-agent: *
Allow: /
Allow: /track/

Sitemap: https://www.wwwsaurikit.com/sitemap.xml
`;
fs.writeFileSync(robotsPath, robotsContent);
console.log('robots.txt updated.');

// 3. Update sitemap.xml
const sitemapPath = path.join(publicDir, 'sitemap.xml');
const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.wwwsaurikit.com/</loc>
    <lastmod>2026-09-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.wwwsaurikit.com/track/</loc>
    <lastmod>2026-09-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.wwwsaurikit.com/software</loc>
    <lastmod>2026-09-14</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.wwwsaurikit.com/hardware</loc>
    <lastmod>2026-09-14</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.wwwsaurikit.com/about</loc>
    <lastmod>2026-09-14</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.wwwsaurikit.com/contact</loc>
    <lastmod>2026-09-14</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.wwwsaurikit.com/privacy</loc>
    <lastmod>2026-09-14</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>
`;
fs.writeFileSync(sitemapPath, sitemapContent);
console.log('sitemap.xml updated.');

console.log('Static assets generation completed.');
