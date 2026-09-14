const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'public/arthos/index.html'), 'utf8');
const config = fs.readFileSync(path.join(root, 'public/arthos/launch-config.js'), 'utf8');
const ogImage = fs.readFileSync(path.join(root, 'public/arthos/og-image.svg'), 'utf8');

const sectionIds = [...html.matchAll(/<section id="([^"]+)"/g)].map((match) => match[1]);
assert.deepEqual(sectionIds, ['hero', 'editions', 'problems', 'features', 'workflow', 'data-and-backups', 'trial-and-pricing', 'faq', 'final-cta']);
assert.equal((html.match(/aria-labelledby=/g) || []).length >= 9, true, 'sections should be labelled');
assert.equal(html.includes('twitter:card" content="summary_large_image"'), true);
assert.equal(html.includes('og-image.svg'), true);
assert.equal(html.includes('og:image:width" content="1200"'), true);
assert.equal(html.includes('og:image:height" content="630"'), true);
assert.equal(config.includes("state: 'prelaunch'"), true);
assert.equal(config.includes('Request early access'), true);
assert.equal(html.includes('href="/contact?topic=arthos_early_access"'), true);
assert.equal((html.match(/60-day/g) || []).length >= 5, true, 'trial duration must remain 60 days');
assert.equal(html.includes('does not directly file GSTR-1, GSTR-3B'), true);
assert.equal(html.includes('Automatic migration or synchronisation is not currently offered'), true);
assert.equal(html.includes('complete P&L'), false);
assert.equal(html.includes('<PRODUCTION_URL>'), false);
assert.match(ogImage, /<svg[^>]*width="1200"[^>]*height="630"/);

const jsxPath = path.join(root, 'src/pages/Arthos.jsx');
assert.equal(fs.existsSync(jsxPath), true, 'src/pages/Arthos.jsx must exist');
const jsx = fs.readFileSync(jsxPath, 'utf8');
const jsxSectionIds = [...jsx.matchAll(/<section id="([^"]+)"/g)].map((match) => match[1]);
assert.deepEqual(jsxSectionIds, ['hero', 'editions', 'problems', 'features', 'workflow', 'data-and-backups', 'trial-and-pricing', 'faq', 'final-cta'], 'Arthos.jsx must contain all 9 sections in exact order');

const appPath = path.join(root, 'src/App.jsx');
const appContent = fs.readFileSync(appPath, 'utf8');
assert.equal(appContent.includes("import Arthos from './pages/Arthos'"), true, 'App.jsx must import Arthos');
assert.equal(appContent.includes('Route path="/arthos" element={<Arthos />}'), true, 'App.jsx must mount /arthos');

const headerPath = path.join(root, 'src/components/Header.jsx');
const headerContent = fs.readFileSync(headerPath, 'utf8');
assert.equal(headerContent.includes('to="/arthos"'), true, 'Header.jsx must link to /arthos');

const footerPath = path.join(root, 'src/components/Footer.jsx');
const footerContent = fs.readFileSync(footerPath, 'utf8');
assert.equal(footerContent.includes('to="/arthos"'), true, 'Footer.jsx must link to /arthos');

console.log('Arthos v2 structure, launch state, metadata, asset, React SPA parity, and claim checks passed.');
