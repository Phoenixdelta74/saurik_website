const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');

console.log('=== RUNNING SEO & STATIC PRERENDER VERIFICATION SUITE ===\n');

// 1. Check all prerendered static HTML files exist
console.log('1. Checking static prerendered files existence in dist/...');
const expectedHtmlFiles = [
  'index.html',
  'software/index.html',
  'hardware/index.html',
  'about/index.html',
  'contact/index.html',
  'privacy/index.html',
  'use-cases/index.html',
  'use-cases/fmcg-demand-planning/index.html',
  'use-cases/manufacturing-demand-planning/index.html',
  'use-cases/apparel-demand-planning/index.html',
  'services/website-development/index.html',
  'services/cctv-installation/index.html',
  'services/custom-software/index.html',
  'track/index.html',
  'arthos/index.html',
  '404.html'
];

for (const relPath of expectedHtmlFiles) {
  const fullPath = path.join(dist, relPath);
  assert.equal(fs.existsSync(fullPath), true, `dist/${relPath} must exist`);
  const content = fs.readFileSync(fullPath, 'utf8');
  assert.equal(content.length > 5000, true, `dist/${relPath} must contain substantive content`);
  assert.equal(content.includes('<div id="root"></div>'), false, `dist/${relPath} root div must not be empty`);
  assert.equal(content.includes('wwwsaurikit.com'), false, `dist/${relPath} must not contain stale wwwsaurikit.com domain`);
}
console.log('  ✔ All 16 static HTML artifacts exist and contain pre-rendered markup.');

// 2. Check canonical domains and metadata on key pages
console.log('2. Checking canonical URLs and metadata...');
const canonicalChecks = [
  ['index.html', 'https://www.saurikit.in/'],
  ['software/index.html', 'https://www.saurikit.in/software'],
  ['hardware/index.html', 'https://www.saurikit.in/hardware'],
  ['about/index.html', 'https://www.saurikit.in/about'],
  ['contact/index.html', 'https://www.saurikit.in/contact'],
  ['privacy/index.html', 'https://www.saurikit.in/privacy'],
  ['use-cases/index.html', 'https://www.saurikit.in/use-cases'],
  ['services/website-development/index.html', 'https://www.saurikit.in/services/website-development'],
  ['services/cctv-installation/index.html', 'https://www.saurikit.in/services/cctv-installation'],
  ['services/custom-software/index.html', 'https://www.saurikit.in/services/custom-software'],
  ['track/index.html', 'https://www.saurikit.in/track/'],
  ['arthos/index.html', 'https://www.saurikit.in/arthos/'],
  ['404.html', 'https://www.saurikit.in/404']
];

for (const [file, canonical] of canonicalChecks) {
  const content = fs.readFileSync(path.join(dist, file), 'utf8');
  assert.equal(
    content.includes(`<link rel="canonical" href="${canonical}"`) ||
    content.includes(`<link rel="canonical" href="${canonical}">`),
    true,
    `${file} must have canonical ${canonical}`
  );
}
console.log('  ✔ Canonical URLs strictly aligned to https://www.saurikit.in across all pages.');

// 3. Check robots.txt and sitemap.xml
console.log('3. Checking robots.txt and sitemap.xml...');
const robots = fs.readFileSync(path.join(dist, 'robots.txt'), 'utf8');
assert.equal(robots.includes('Sitemap: https://www.saurikit.in/sitemap.xml'), true, 'robots.txt must point to https://www.saurikit.in/sitemap.xml');

const sitemap = fs.readFileSync(path.join(dist, 'sitemap.xml'), 'utf8');
assert.equal(sitemap.includes('wwwsaurikit.com'), false, 'sitemap.xml must not contain stale wwwsaurikit.com');
assert.equal(sitemap.includes('https://www.saurikit.in/services/website-development'), true);
assert.equal(sitemap.includes('https://www.saurikit.in/services/cctv-installation'), true);
assert.equal(sitemap.includes('https://www.saurikit.in/services/custom-software'), true);
assert.equal(sitemap.includes('https://www.saurikit.in/track/'), true);
assert.equal(sitemap.includes('https://www.saurikit.in/arthos/'), true);
console.log('  ✔ robots.txt and sitemap.xml verified.');

// 4. Check Contact page topic flow
console.log('4. Checking contact page topic handling...');
const contactSrc = fs.readFileSync(path.join(root, 'src/pages/Contact.jsx'), 'utf8');
assert.equal(contactSrc.includes('saurik_track'), true, 'Contact.jsx must handle saurik_track topic');
assert.equal(contactSrc.includes('Saurik Track — Field & Fleet ERP'), true, 'Contact.jsx must display Track in dropdown');
assert.equal(contactSrc.includes('30-Day Trial'), true, 'Contact.jsx must describe 30-day trial for Track');
console.log('  ✔ Contact page topic flow and trial notice verified.');

// 5. Check Home page copy
console.log('5. Checking Homepage positioning...');
const homeSrc = fs.readFileSync(path.join(root, 'src/pages/Home.jsx'), 'utf8');
assert.equal(homeSrc.includes('PRIMARY WEDGE'), false, 'Home.jsx must not contain PRIMARY WEDGE strategy jargon');
assert.equal(homeSrc.includes('Software, Field-Team Tools and IT Services in Tripura'), true, 'Home.jsx must lead with Tripura positioning');
assert.equal(homeSrc.includes('/services/website-development'), true, 'Home.jsx must link to website service page');
assert.equal(homeSrc.includes('/services/cctv-installation'), true, 'Home.jsx must link to CCTV service page');
assert.equal(homeSrc.includes('/services/custom-software'), true, 'Home.jsx must link to custom software page');
console.log('  ✔ Homepage positioning and service links verified.');

// 6. Check vercel.json configuration
console.log('6. Checking vercel.json routing...');
const vercel = JSON.parse(fs.readFileSync(path.join(root, 'vercel.json'), 'utf8'));
assert.equal(vercel.cleanUrls, true, 'vercel.json must have cleanUrls enabled');
assert.equal(vercel.outputDirectory, 'dist', 'vercel.json outputDirectory must be dist');
console.log('  ✔ vercel.json routing verified.');

console.log('\n=== ALL SEO & STATIC PRERENDER VERIFICATIONS PASSED SUCCESSFULLY! ===\n');
