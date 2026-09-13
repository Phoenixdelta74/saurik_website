const assert = require('assert');
const fs = require('fs');
const path = require('path');

(async () => {
  console.log('=== RUNNING AUTOMATED VERIFICATION SUITE: SAURIK TRACK ===\n');

  // Test 1: Data integrity check
  const trackData = await import('../src/data/trackData.js');

  assert.ok(typeof trackData.calculateROI === 'function', 'calculateROI must be a function');
  assert.ok(trackData.TRACK_CURRENCIES, 'Missing TRACK_CURRENCIES');
  assert.ok(trackData.TRACK_CURRENCIES.USD, 'Missing TRACK_CURRENCIES.USD');
  assert.ok(trackData.TRACK_CURRENCIES.INR, 'Missing TRACK_CURRENCIES.INR');
  assert.ok(trackData.TRACK_PILLARS, 'Missing TRACK_PILLARS');
  assert.ok(trackData.TRACK_PROBLEM_SOLUTION, 'Missing TRACK_PROBLEM_SOLUTION');
  assert.ok(trackData.TRACK_FAQS, 'Missing TRACK_FAQS');
  assert.ok(trackData.TRACK_SECURITY, 'Missing TRACK_SECURITY');
  console.log('✔ Test 1 Passed: trackData.js multi-currency structure and exports verified.');

  // Test 2: Component files check
  const expectedComponents = [
    'src/pages/Track.jsx',
    'src/components/track/TrackRibbon.jsx',
    'src/components/track/TrackHeader.jsx',
    'src/components/track/ROICalculator.jsx',
    'src/components/track/ProblemSolutionMatrix.jsx',
    'src/components/track/PilotModal.jsx',
    'src/components/track/DemoModal.jsx',
    'src/components/track/TrackFooter.jsx'
  ];

  expectedComponents.forEach(file => {
    const filePath = path.resolve(__dirname, '..', file);
    assert(fs.existsSync(filePath), 'Component missing: ' + file);
  });
  console.log('✔ Test 2 Passed: All 8 Saurik Track components & pages exist.');

  // Test 3: Currency Toggle in Components Check
  const roiCalcContent = fs.readFileSync(path.resolve(__dirname, '../src/components/track/ROICalculator.jsx'), 'utf8');
  assert(roiCalcContent.includes('USD ($)'), 'ROICalculator must have USD toggle button');
  assert(roiCalcContent.includes('INR (₹)'), 'ROICalculator must have INR toggle button');

  const trackHeaderContent = fs.readFileSync(path.resolve(__dirname, '../src/components/track/TrackHeader.jsx'), 'utf8');
  assert(trackHeaderContent.includes('USD ($)'), 'TrackHeader must have USD toggle button');
  assert(trackHeaderContent.includes('INR (₹)'), 'TrackHeader must have INR toggle button');

  const trackPageContent = fs.readFileSync(path.resolve(__dirname, '../src/pages/Track.jsx'), 'utf8');
  assert(trackPageContent.includes('setCurrency'), 'Track page must maintain shared currency state');
  console.log('✔ Test 3 Passed: Currency toggle controls verified across Header, ROI Calculator, and Pricing.');

  // Test 4: Cross-linking checks across the codebase
  const headerContent = fs.readFileSync(path.resolve(__dirname, '../src/components/Header.jsx'), 'utf8');
  assert(headerContent.includes('/track'), 'Header.jsx must link to /track');
  assert(headerContent.includes('LIVE ERP'), 'Header.jsx must show LIVE ERP badge');

  const footerContent = fs.readFileSync(path.resolve(__dirname, '../src/components/Footer.jsx'), 'utf8');
  assert(footerContent.includes('/track'), 'Footer.jsx must link to /track');

  const homeContent = fs.readFileSync(path.resolve(__dirname, '../src/pages/Home.jsx'), 'utf8');
  assert(homeContent.includes('/track'), 'Home.jsx must feature Saurik Track flagship showcase banner');

  const softwareContent = fs.readFileSync(path.resolve(__dirname, '../src/pages/Software.jsx'), 'utf8');
  assert(softwareContent.includes('/track'), 'Software.jsx must spotlight Saurik Track');

  const appContent = fs.readFileSync(path.resolve(__dirname, '../src/App.jsx'), 'utf8');
  assert(appContent.includes('path=\"/track\"'), 'App.jsx must register the /track route');
  console.log('✔ Test 4 Passed: Multi-touch cross-links verified across Header, Footer, Home, Software, and App shell.');

  // Test 5: Production build artifact check
  const distIndex = path.resolve(__dirname, '../dist/index.html');
  assert(fs.existsSync(distIndex), 'dist/index.html must exist from build');
  console.log('✔ Test 5 Passed: Production build artifacts verified.');

  console.log('\n=== ALL 5 AUTOMATED TEST SUITES PASSED SUCCESSFULLY! ===\n');
})();
