const assert = require('assert');
const fs = require('fs');
const path = require('path');

(async () => {
  console.log('=== RUNNING AUTOMATED VERIFICATION SUITE: SAURIK TRACK ===\n');

  // Test 1: Static SSR/SSG page check
  const trackHtmlPath = path.resolve(__dirname, '../public/track/index.html');
  assert(fs.existsSync(trackHtmlPath), 'public/track/index.html must exist');
  const trackHtml = fs.readFileSync(trackHtmlPath, 'utf8');

  // Primary Acceptance Test
  assert(
    trackHtml.includes("Know where your field team is. Know what's left in the van."),
    'public/track/index.html must contain verbatim H1'
  );
  console.log('✔ Test 1 Passed: Primary SSR crawlability and H1 match verified.');

  // Test 2: Component files and metadata check
  const expectedFiles = [
    'public/track/index.html',
    'public/track/styles.css',
    'public/og-image.png',
    'public/apple-touch-icon.png',
    'public/favicon.ico',
    'public/robots.txt',
    'public/sitemap.xml',
    'src/pages/Track.jsx',
    'src/pages/Track.css'
  ];

  expectedFiles.forEach(file => {
    const filePath = path.resolve(__dirname, '..', file);
    assert(fs.existsSync(filePath), 'Required file missing: ' + file);
  });
  console.log('✔ Test 2 Passed: All required landing page assets and components exist.');

  // Test 3: 10 sections in exact order with exact IDs
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
    const match = trackHtml.search(pattern);
    assert(match !== -1, `Section with id="${id}" must exist`);
    assert(match >= lastIndex, `Section "${id}" is out of order`);
    lastIndex = match;
  }
  console.log('✔ Test 3 Passed: 10 sections verified in exact order with exact IDs.');

  // Test 4: Cross-linking checks across the codebase
  const headerContent = fs.readFileSync(path.resolve(__dirname, '../src/components/Header.jsx'), 'utf8');
  assert(headerContent.includes('/track'), 'Header.jsx must link to /track');

  const footerContent = fs.readFileSync(path.resolve(__dirname, '../src/components/Footer.jsx'), 'utf8');
  assert(footerContent.includes('/track'), 'Footer.jsx must link to /track');

  const appContent = fs.readFileSync(path.resolve(__dirname, '../src/App.jsx'), 'utf8');
  assert(appContent.includes('path="/track"'), 'App.jsx must register the /track route');
  console.log('✔ Test 4 Passed: Cross-links verified across Header, Footer, and App shell.');

  // Test 5: Production build artifact check
  const distTrackIndex = path.resolve(__dirname, '../dist/track/index.html');
  assert(fs.existsSync(distTrackIndex), 'dist/track/index.html must exist from build');
  const distContent = fs.readFileSync(distTrackIndex, 'utf8');
  assert(
    distContent.includes("Know where your field team is. Know what's left in the van."),
    'dist/track/index.html must contain H1 for zero-JS crawlers'
  );
  console.log('✔ Test 5 Passed: Production build SSR artifacts verified in dist/track/index.html.');

  console.log('\n=== ALL 5 AUTOMATED TEST SUITES PASSED SUCCESSFULLY! ===\n');
})();
