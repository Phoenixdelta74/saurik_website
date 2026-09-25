const fs = require('fs');
const path = require('path');
const assert = require('assert');
const { PNG } = require('pngjs');

console.log('--- RUNNING SAURIK TRACK SPEC v3 VERIFICATION ---');

const rootDir = path.resolve(__dirname, '..');
const trackHtmlPath = path.join(rootDir, 'public', 'track', 'index.html');
const trackCssPath = path.join(rootDir, 'public', 'track', 'styles.css');
const ogImagePath = path.join(rootDir, 'public', 'track', 'og-image.png');
const robotsPath = path.join(rootDir, 'public', 'robots.txt');
const sitemapPath = path.join(rootDir, 'public', 'sitemap.xml');
const reactPagePath = path.join(rootDir, 'src', 'pages', 'Track.jsx');
const reactCssPath = path.join(rootDir, 'src', 'pages', 'Track.css');

// 1. Verify existence of static files
console.log('1. Checking file existence...');
assert(fs.existsSync(trackHtmlPath), 'public/track/index.html must exist');
assert(fs.existsSync(trackCssPath), 'public/track/styles.css must exist');
assert(fs.existsSync(ogImagePath), 'public/track/og-image.png must exist');
assert(fs.existsSync(robotsPath), 'public/robots.txt must exist');
assert(fs.existsSync(sitemapPath), 'public/sitemap.xml must exist');
assert(fs.existsSync(reactPagePath), 'src/pages/Track.jsx must exist');
assert(fs.existsSync(reactCssPath), 'src/pages/Track.css must exist');
console.log('  ✔ All required v3 static & component files exist.');

// 2. Read track HTML content
const html = fs.readFileSync(trackHtmlPath, 'utf8');

// 3. Check Primary Acceptance Test: H1 match
console.log('2. Primary Acceptance Test: H1 verbatim match...');
const expectedH1 = "Know where your field team is. Know what's left in the van.";
assert(html.includes(expectedH1), `HTML must contain H1: "${expectedH1}"`);
console.log('  ✔ Primary acceptance test passed: H1 matches verbatim.');

// 4. Check Title and Meta Description per v3
console.log('3. Metadata checks (v3)...');
const expectedTitle = "<title>Saurik Track | GPS attendance and van-stock for field teams</title>";
assert(html.includes(expectedTitle), `HTML must contain exact title: ${expectedTitle}`);

const expectedDesc = '<meta name="description" content="Privacy-transparent GPS attendance, field visits, reports, and van-stock management for sales, distribution, and service teams. Free 30-day trial.">';
assert(html.includes(expectedDesc), 'HTML must contain verbatim v3 meta description');

assert(html.includes('<link rel="canonical" href="https://www.saurikit.in/track/">'), 'Canonical link present');
assert(html.includes('<meta property="og:title" content="Saurik Track | GPS attendance and van-stock for field teams">'), 'OG title present');
assert(html.includes('<meta property="og:description" content="GPS attendance, field visits, reports, and van-stock management—with transparent tracking states and an audit trail.">'), 'OG description present');
assert(html.includes('<meta property="og:image" content="https://www.saurikit.in/track/og-image.png">'), 'OG image present');
assert(html.includes('<meta property="og:image:width" content="1200">'), 'OG width present');
assert(html.includes('<meta property="og:image:height" content="630">'), 'OG height present');
assert(html.includes('<meta property="og:image:alt" content="Saurik Track — GPS attendance and van-stock for field teams">'), 'OG alt present');
assert(html.includes('<meta name="twitter:card" content="summary_large_image">'), 'Twitter card present');
console.log('  ✔ Title, meta description, and OG/Twitter tags match v3 spec.');

// 5. Check JSON-LD SoftwareApplication per v3
console.log('4. JSON-LD structured data check (v3)...');
const jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
assert(jsonLdMatch, 'JSON-LD script block must be present');
const parsedJsonLd = JSON.parse(jsonLdMatch[1].trim());
assert.strictEqual(parsedJsonLd['@type'], 'SoftwareApplication', '@type must be SoftwareApplication');
assert.strictEqual(parsedJsonLd.name, 'Saurik Track', 'name must be Saurik Track');
assert.strictEqual(parsedJsonLd.url, 'https://www.saurikit.in/track/', 'url must be canonical');
assert.strictEqual(parsedJsonLd.publisher.name, 'SAURIK IT Private Limited', 'publisher name must match');
assert(Array.isArray(parsedJsonLd.featureList) && parsedJsonLd.featureList.length === 5, 'featureList must have 5 items');
console.log('  ✔ JSON-LD valid and parsed successfully.');

// 6. Check OG image dimensions
console.log('5. Image dimensions check...');
const ogBuf = fs.readFileSync(ogImagePath);
const ogPng = PNG.sync.read(ogBuf);
assert.strictEqual(ogPng.width, 1200, 'OG image width must be 1200');
assert.strictEqual(ogPng.height, 630, 'OG image height must be 630');
console.log('  ✔ OG image is exactly 1200x630.');

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

// 8. Verbatim Copy checks per v3
console.log('7. Verbatim copy checks (v3)...');
const verbatimSnippets = [
  // Nav
  'Saurik Track', 'by SAURIK IT', 'Product', 'How it works', 'Industries', 'Privacy', 'FAQ', 'Start free trial',
  // Hero
  'A privacy-transparent field-work platform for sales, distribution, and service teams. GPS attendance, structured visits, and live van-stock—with an audit trail your reps can see and corrections they can request.',
  'Start free 30-day trial',
  'No credit card required',
  'Illustrative shift example',
  'Rahul Sharma — North Zone',
  'Checked in', '9:04 AM', 'Location captured · reported accuracy 8 m',
  'Visit logged — Apex Healthcare', '10:22 AM', 'Order taken · ₹1,250.00', 'Van stock auto-adjusted',
  'Session paused — Lunch break', '1:00 PM', 'Tracking suspended until resume',
  'Checked out', '6:02 PM', '7h 58m logged · 4 visits · 1 order',
  // Problem
  'Field work should not depend on group chats and guesswork.',
  '01', 'Nobody knows who\'s active or stuck', 'Reps report in when it\'s convenient, not when a manager needs an update.',
  '02', 'Attendance disputes have no shared evidence', 'leave both sides without a fair way to settle the record.',
  '03', 'Van stock and warehouse counts drift apart', 'Orders get booked in the field faster than paper records can be reconciled.',
  '04', 'Weekly reports consume someone\'s evening', 'Attendance, visits, and orders should not require hours of manual spreadsheet work.',
  '05', 'Opaque tracking damages trust', 'When employees cannot see when tracking starts, stops, or how records are corrected, adoption suffers.',
  // Features
  'Four things a field team actually needs',
  'Attendance shows who\'s working. Inventory shows what is moving. The audit trail helps settle what happened. Reports show where the week went. Saurik Track brings all four into one platform.',
  'GPS attendance and field visibility',
  'See the field, not just a spreadsheet of it',
  'Inventory and van-stock tracking',
  'Stock that updates when an order closes',
  'Audit trail and corrections',
  'Attendance your team can dispute—and settle',
  'Reports and exports',
  'The Monday report writes itself',
  // How it works
  'How a shift moves through the system',
  'STEP 1 — Check in',
  'A representative opens the app at their first stop and checks in. The location and its reported accuracy are recorded.',
  'STEP 2 — Log the visit',
  'The client, outcome, and order value are recorded. Stock adjusts automatically when an order closes.',
  'STEP 3 — Pause when needed',
  'A lunch or approved break pauses tracking, with the reason and tracking state clearly shown.',
  'STEP 4 — Check out',
  'The shift closes with a summary of hours worked, visits made, and orders booked.',
  // Industries
  'Built for teams that sell, deliver, install, and service in person:',
  'FMCG and beverages', 'Pharma and healthcare', 'Electronics and hardware', 'Fashion and apparel', 'Logistics and distribution', 'Installation, field service, and repair',
  // Privacy
  'Transparent tracking, by design',
  'Tracking has a visible start and end',
  'Company workspaces are isolated',
  'Employees can request access, correction, or deletion',
  'Read our Privacy Policy', 'Contact support',
  // FAQ
  'Common questions',
  'Do you track employees when they\'re off the clock?',
  'What platforms do you support?',
  'How is my company\'s data separated from other companies?',
  'What happens if a representative loses signal or their phone dies?',
  'How does pricing work after the trial?',
  // Repeat CTA
  'Set up your workspace in a few minutes',
  'Invite your first field representative the same day. No credit card or setup call is required.',
  // Footer
  'A product of SAURIK IT Private Limited',
  'Visit SAURIK IT',
  'contact@saurikit.in',
  '© 2026 SAURIK IT Private Limited. All rights reserved.'
];

for (const snippet of verbatimSnippets) {
  assert(html.includes(snippet), `HTML must contain verbatim snippet: "${snippet}"`);
}
console.log('  ✔ All v3 verbatim copy snippets verified.');

// 9. Check Conversion Tracking Attributes & Real TRIAL_URL
console.log('8. Conversion tracking attributes & TRIAL_URL check...');
assert(html.includes('data-conversion="trial-start"'), 'data-conversion="trial-start" attribute must be present');
assert(html.includes('data-placement="hero"'), 'data-placement="hero" attribute must be present');
assert(html.includes('data-placement="final-cta"'), 'data-placement="final-cta" attribute must be present');
assert(html.includes('href="/contact?topic=saurik_track"'), 'CTA must link to verified trial destination');
console.log('  ✔ Conversion attributes and verified TRIAL_URL destination confirmed.');

// 10. Negative Constraints Check ("What NOT to do") per v3
console.log('9. Hard constraints ("What NOT to do") check...');
const prohibitedPhrases = [
  '10,000 teams',
  'GDPR-compliant',
  'SOC 2',
  'ISO 27001',
  'tamper-proof',
  'fraud-proof',
  'proof-grade',
  'foolproof',
  'guaranteed accurate',
  '100% accurate',
  'catch time theft',
  'prove they were slacking',
  'monitor employees without them knowing'
];

for (const phrase of prohibitedPhrases) {
  assert(!html.toLowerCase().includes(phrase.toLowerCase()), `Prohibited phrase found: "${phrase}"`);
}
console.log('  ✔ No prohibited compliance, metric, or surveillance phrasing found.');

// 11. Page weight check (<= 300 KB per v3 spec)
console.log('10. Page weight check...');
const htmlSize = Buffer.byteLength(html, 'utf8');
const cssSize = fs.statSync(trackCssPath).size;
const totalSizeKb = (htmlSize + cssSize) / 1024;
console.log(`  HTML: ${(htmlSize / 1024).toFixed(1)} KB, CSS: ${(cssSize / 1024).toFixed(1)} KB, Total: ${totalSizeKb.toFixed(1)} KB`);
assert(totalSizeKb <= 300, 'Total page size (excluding fonts) must be <= 300 KB');
console.log('  ✔ Performance budget satisfied (well within 300 KB limit).');

console.log('\n--- ALL v3 SPEC VERIFICATIONS PASSED SUCCESSFULLY! ---');
