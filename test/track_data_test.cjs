const assert = require('assert');

(async () => {
  console.log('--- Running Saurik Track Data Verification Test ---');

  // Import ESM module dynamically
  const trackData = await import('../src/data/trackData.js');

  // 1. Ribbon Verification
  assert.ok(trackData.TRACK_RIBBON, 'TRACK_RIBBON must exist');
  assert.strictEqual(trackData.TRACK_RIBBON.badge, 'FOUNDING PARTNER PROGRAM');
  console.log('[PASS] Ribbon configuration verified.');

  // 2. Hero Verification
  assert.ok(trackData.TRACK_HERO, 'TRACK_HERO must exist');
  assert.strictEqual(trackData.TRACK_HERO.microTrust.length, 4, 'Must have 4 micro-trust items');
  console.log('[PASS] Hero headline and 4 micro-trust badges verified.');

  // 3. Problem vs Solution Matrix
  assert.strictEqual(trackData.TRACK_PROBLEM_SOLUTION.length, 5, 'Must contain 5 problem/solution comparison rows');
  console.log('[PASS] Problem vs Solution matrix (5 rows) verified.');

  // 4. Four Core Pillars
  assert.strictEqual(trackData.TRACK_PILLARS.length, 4, 'Must contain exactly 4 pillars');
  const pillarIds = trackData.TRACK_PILLARS.map(p => p.id);
  assert.deepStrictEqual(pillarIds, ['anti-tamper', 'van-inventory', 'command-center', 'offline-resilience']);
  console.log('[PASS] 4 Core Pillars (Anti-Tamper, Van Inventory, Command Center, Offline Resilience) verified.');

  // 5. Mathematical ROI Calculation Verification - USD
  assert.ok(typeof trackData.calculateROI === 'function', 'calculateROI must be a function');
  const usdResult = trackData.calculateROI(10, 18, 45, 'USD');
  assert.strictEqual(usdResult.monthlyWastedPayroll, 2970, 'Default USD wasted payroll must be exactly 2970');
  assert.strictEqual(usdResult.trackCost, 90, 'Default USD Saurik Track cost must be 90 (10 users * )');
  assert.strictEqual(usdResult.netMonthlySavings, 2880, 'Default USD net savings must be 2880 (2970 - 90)');
  assert.strictEqual(usdResult.annualSavings, 2880 * 12, 'Annual USD savings must be 34560');
  assert.strictEqual(usdResult.symbol, '$');
  console.log('[PASS] ROI Calculator USD formula verified (10 reps @ /hr, 45 min waste -> ,970 leakage, ,880 net savings).');

  // 6. Mathematical ROI Calculation Verification - INR
  assert.ok(trackData.TRACK_CURRENCIES.INR, 'TRACK_CURRENCIES.INR must exist');
  const inrResult = trackData.calculateROI(10, 180, 45, 'INR');
  // 10 * ((45/60) * 180) * 22 = 10 * 135 * 22 = 29,700
  assert.strictEqual(inrResult.monthlyWastedPayroll, 29700, 'INR wasted payroll must be exactly 29700');
  // 10 users * 699 = 6990
  assert.strictEqual(inrResult.trackCost, 6990, 'INR Saurik Track cost must be 6990 (10 users * ₹699)');
  // 29700 - 6990 = 22710
  assert.strictEqual(inrResult.netMonthlySavings, 22710, 'INR net savings must be 22710 (29700 - 6990)');
  assert.strictEqual(inrResult.annualSavings, 22710 * 12, 'Annual INR savings must be 272520');
  assert.strictEqual(inrResult.symbol, '₹');
  console.log('[PASS] ROI Calculator INR formula verified (10 reps @ ₹180/hr, 45 min waste -> ₹29,700 leakage, ₹22,710 net savings).');

  // 7. Security & FAQs
  assert.strictEqual(trackData.TRACK_SECURITY.length, 4, 'Must have 4 security badges');
  assert.strictEqual(trackData.TRACK_FAQS.length, 5, 'Must have 5 FAQ items');
  console.log('[PASS] Security specs and 5 FAQs verified.');

  console.log('--- ALL TRACK DATA TESTS PASSED SUCCESSFULLY ---\n');
})();
