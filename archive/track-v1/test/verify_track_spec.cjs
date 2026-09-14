const fs = require('fs');
const path = require('path');
const assert = require('assert');
const { PNG } = require('pngjs');

console.log('--- RUNNING SAURIK TRACK SPEC VERIFICATION ---');

const rootDir = path.resolve(__dirname, '..');
const trackHtmlPath = path.join(rootDir, 'public', 'track', 'index.html');
const trackCssPath = path.join(rootDir, 'public', 'track', 'styles.css');
const ogImagePath = path.join(rootDir, 'public', 'og-image.png');
const robotsPath = path.join(rootDir, 'public', 'robots.txt');
const sitemapPath = path.join(rootDir, 'public', 'sitemap.xml');
const appleTouchIconPath = path.join(rootDir, 'public', 'apple-touch-icon.png');
const faviconPath = path.join(rootDir, 'public', 'favicon.ico');

// 1. Verify existence of static files
console.log('1. Checking file existence...');
assert(fs.existsSync(trackHtmlPath), 'public/track/index.html must exist');
assert(fs.existsSync(trackCssPath), 'public/track/styles.css must exist');
assert(fs.existsSync(ogImagePath), 'public/og-image.png must exist');
assert(fs.existsSync(robotsPath), 'public/robots.txt must exist');
assert(fs.existsSync(sitemapPath), 'public/sitemap.xml must exist');
assert(fs.existsSync(appleTouchIconPath), 'public/apple-touch-icon.png must exist');
assert(fs.existsSync(faviconPath), 'public/favicon.ico must exist');
console.log('  ✔ All required static files exist.');

// 2. Read track HTML content
const html = fs.readFileSync(trackHtmlPath, 'utf8');

// 3. Check Primary Acceptance Test: H1 match
console.log('2. Primary Acceptance Test: H1 verbatim match...');
const expectedH1 = "Know where your field team is. Know what's left in the van.";
assert(html.includes(expectedH1), `HTML must contain H1: "${expectedH1}"`);
console.log('  ✔ Primary acceptance test passed: H1 matches verbatim.');

// 4. Check Title and Meta Description
console.log('3. Metadata checks...');
const expectedTitle = "<title>Saurik Track — GPS attendance and van-stock tracking for field teams</title>";
assert(html.includes(expectedTitle), `HTML must contain exact title: ${expectedTitle}`);

const expectedDesc = '<meta name="description" content="Know who\'s on shift, where visits happened, and what\'s left in the van. Saurik Track pairs GPS attendance with live inventory for field sales and service teams. Free 30-day trial.">';
assert(html.includes(expectedDesc), 'HTML must contain verbatim meta description');

assert(html.includes('<link rel="canonical" href="https://sauriktrack.com/">'), 'Canonical link present');
assert(html.includes('<meta property="og:title" content="Saurik Track — GPS attendance and van-stock tracking for field teams">'), 'OG title present');
assert(html.includes('<meta property="og:image" content="https://sauriktrack.com/og-image.png">'), 'OG image present');
assert(html.includes('<meta property="og:image:width" content="1200">'), 'OG width present');
assert(html.includes('<meta property="og:image:height" content="630">'), 'OG height present');
assert(html.includes('<meta name="twitter:card" content="summary_large_image">'), 'Twitter card present');
console.log('  ✔ Title, meta description, and OG/Twitter tags match spec.');

// 5. Check JSON-LD SoftwareApplication
console.log('4. JSON-LD structured data check...');
const jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
assert(jsonLdMatch, 'JSON-LD script block must be present');
const parsedJsonLd = JSON.parse(jsonLdMatch[1].trim());
assert.strictEqual(parsedJsonLd['@type'], 'SoftwareApplication', '@type must be SoftwareApplication');
assert.strictEqual(parsedJsonLd.name, 'Saurik Track', 'name must be Saurik Track');
assert.strictEqual(parsedJsonLd.offers.price, '0', 'offer price must be 0');
console.log('  ✔ JSON-LD valid and parses successfully.');

// 6. Check OG image dimensions
console.log('5. Image dimensions check...');
const ogBuf = fs.readFileSync(ogImagePath);
const ogPng = PNG.sync.read(ogBuf);
assert.strictEqual(ogPng.width, 1200, 'OG image width must be 1200');
assert.strictEqual(ogPng.height, 630, 'OG image height must be 630');

const iconBuf = fs.readFileSync(appleTouchIconPath);
const iconPng = PNG.sync.read(iconBuf);
assert.strictEqual(iconPng.width, 180, 'Apple touch icon width must be 180');
assert.strictEqual(iconPng.height, 180, 'Apple touch icon height must be 180');
console.log('  ✔ OG image is 1200x630 and apple-touch-icon is 180x180.');

// 7. Check 10 sections in exact order with exact IDs
console.log('6. Information Architecture: 10 sections check...');
const sectionIds = [
  'site-nav',
  'hero',
  'problem',
  'features',
  'how-it-works',
  'industries',
  'privacy',
  'faq',
  'cta',
  'site-footer'
];

let lastIndex = 0;
for (const id of sectionIds) {
  const pattern = new RegExp(`id=["']${id}["']`);
  const match = html.search(pattern);
  assert(match !== -1, `Section with id="${id}" must exist`);
  assert(match >= lastIndex, `Section "${id}" is out of order`);
  lastIndex = match;
}
console.log('  ✔ All 10 sections present in exact order with exact IDs.');

// 8. Verbatim Copy checks
console.log('7. Verbatim copy checks...');
const verbatimSnippets = [
  // Nav
  'Product', 'How it works', 'Industries', 'Privacy', 'Start free trial',
  // Hero
  'Saurik Track pairs GPS attendance with live van-stock, so managers stop chasing updates on WhatsApp and start seeing the day as it happens.',
  'Start free 30-day trial',
  'No credit card required',
  'Rahul Sharma — North Zone',
  'Checked in', '9:04 AM', 'Location verified, accuracy 8m',
  'Visit logged — Apex Healthcare', '10:22 AM', 'Order taken · ₹1,250.00', 'Van stock auto-adjusted',
  'Session paused — Lunch break', '1:00 PM', 'Tracking suspended until resume',
  'Checked out', '6:02 PM', '7h 58m logged · 4 visits · 1 order',
  // Problem
  'Right now, the field runs on group chats and guesswork.',
  'Nobody knows who\'s active or stuck',
  'Reps report in when it\'s convenient, not when a manager needs to know.',
  'Attendance disputes have no evidence',
  'Van stock and warehouse counts drift apart',
  'Orders get booked in the field faster than stock gets reconciled on paper.',
  'Weekly reports mean someone\'s evening is gone',
  'Pulling attendance, visits, and orders into one sheet shouldn\'t be manual work.',
  // Features
  'Two systems, one live picture of the field',
  'Attendance tells you who\'s working and where. Inventory tells you what they\'re carrying and selling. Saurik Track keeps both in sync, automatically.',
  'GPS Attendance & Field Visibility',
  'See the field, not just a spreadsheet of it',
  'Live map of every on-duty rep, with pause and travel status',
  'Structured visit outcomes — order taken, follow-up, no sale',
  'Inventory & Van-Stock Tracking',
  'Stock that updates itself when an order closes',
  'One-click industry templates — FMCG, pharma, electronics, apparel',
  'Warehouse-to-van transfer manifests, tracked by vehicle',
  'Spreadsheet-speed entry — arrow keys, bulk paste, single-key shortcuts',
  // How it works
  'How a shift actually moves through the system',
  'STEP 1 — Check in',
  'A rep opens the app at their first stop and checks in. Location is verified on the spot.',
  'STEP 2 — Log the visit',
  'Client name, outcome, and order value are recorded — stock adjusts automatically if an order closes.',
  'STEP 3 — Pause when needed',
  'Lunch or a long transit break pauses tracking cleanly, with the reason recorded.',
  'STEP 4 — Check out',
  'The shift closes with a summary — hours worked, visits made, orders booked.',
  // Industries
  'Built for teams that sell and deliver in person:',
  'FMCG & Beverages', 'Pharma & Healthcare', 'Electronics & Hardware', 'Fashion & Apparel', 'Logistics & Distribution',
  // Privacy
  'Transparent tracking, by design',
  'Tracking has a start and an end',
  'Location is only ever recorded between check-in and check-out. It stops the moment a shift pauses or ends.',
  'Every company is walled off',
  'Workspaces are strictly separated — no company can see another\'s employees, visits, or stock.',
  'Employees control their own data',
  'Reps can request an export or deletion of their personal data from inside the app, reviewed by their admin.',
  // FAQ
  'Common questions',
  'Do you track employees when they\'re off the clock?',
  'No. GPS is only active between check-in and check-out, and it fully stops when a shift is paused. There is no background tracking outside a work session.',
  'What platforms do you support?',
  'Android for field employees, and a web dashboard for admins and managers. iOS support is on the roadmap.',
  'How is my company\'s data kept separate from other companies using Saurik Track?',
  'What happens if a rep loses signal or their phone dies?',
  'How does pricing work after the trial?',
  // Repeat CTA
  'Set up your workspace in a few minutes',
  'Invite your first field rep the same day. No credit card, no setup calls required.',
  // Footer
  'support@sauriktrack.com',
  '© 2026 Saurik IT Private Limited. All rights reserved.'
];

for (const snippet of verbatimSnippets) {
  assert(html.includes(snippet), `HTML must contain verbatim snippet: "${snippet}"`);
}
console.log('  ✔ All verbatim copy snippets verified.');

// 9. Negative Constraints Check ("What NOT to do")
console.log('8. Hard constraints ("What NOT to do") check...');
const prohibitedPhrases = [
  '10,000 teams',
  'GDPR-compliant',
  'SOC 2',
  'ISO 27001',
  'enterprise-grade security',
  'fraud-proof',
  'tamper-proof',
  '100% accurate',
  'monitor your employees',
  'catch time theft',
  'prove they were slacking'
];

for (const phrase of prohibitedPhrases) {
  assert(!html.toLowerCase().includes(phrase.toLowerCase()), `Prohibited phrase found: "${phrase}"`);
}
console.log('  ✔ No prohibited compliance, metric, or surveillance phrasing found.');

// 10. Page weight check (<= 250 KB excluding fonts)
console.log('9. Page weight check...');
const htmlSize = Buffer.byteLength(html, 'utf8');
const cssSize = fs.statSync(trackCssPath).size;
const totalSizeKb = (htmlSize + cssSize) / 1024;
console.log(`  HTML: ${(htmlSize / 1024).toFixed(1)} KB, CSS: ${(cssSize / 1024).toFixed(1)} KB, Total: ${totalSizeKb.toFixed(1)} KB`);
assert(totalSizeKb <= 250, 'Total page size (excluding fonts) must be <= 250 KB');
console.log('  ✔ Performance budget satisfied (well within 250 KB limit).');

console.log('\n--- ALL VERIFICATIONS PASSED SUCCESSFULLY! ---');
