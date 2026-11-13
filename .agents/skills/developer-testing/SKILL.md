---
name: developer-testing
description: Authors automated test scripts in test/verify_*.cjs, verifies npm test, and validates static SSG production builds to prevent regressions for SAURIK IT.
---

# Skill: Developer Testing & Build Verification (`developer-testing`)

The `developer-testing` skill provides the standards and procedures for verifying code changes prior to handing them over to independent QA.

---

## 1. Developer Testing vs. QA Testing

In the SAURIK IT development lifecycle, Developer Testing and QA Review serve distinct, complementary roles:
- **Developer Testing:** Verifies that newly built code compiles, runs without syntax errors, satisfies explicit acceptance criteria, and causes zero regressions in existing tests.
- **QA Review:** Independently tests edge cases, adversarial inputs, negative marketing constraints, and user journeys to find defects.

---

## 2. The Verification Pyramid

Every code change must satisfy the appropriate layers of the verification pyramid:

### 1. Build Verification Gate (`npm run build`)
- Compiles production assets via Vite 6.
- Executes `scripts/prerender.js` (SSG) to verify that all 17 public routes pre-render valid, zero-JS HTML files in `dist/`.
- Verifies that no client-side bundles exceed size limits or leak secrets.

### 2. Automated Regression Suites (`npm test`)
- Executes all 10 automated test suites:
  - `verify_track_spec_v3.cjs` & `verify_track_e2e.cjs` (Track landing page)
  - `verify_arthos_spec.cjs` (Arthos landing page)
  - `verify_voice_assistant.cjs` (Zero-cost native voice engine)
  - `verify_chatbot.cjs` (Global chat knowledge grounding)
  - `verify_use_case_analytics.cjs` (Analytics demo)
  - `verify_seo_prerender.cjs` (SEO & SSG metadata)
  - `verify_backend_engine.cjs` (Serverless APIs & fallback)
  - `verify_onboard_cli.cjs` (CLI tools & AST contracts)
  - `verify_recursive_learning.cjs` (Agent memory & skills)

### 3. Dedicated Verification Scripts (`test/verify_[feature].cjs`)
When creating a substantial new feature or fixing a recurring defect:
- Author a dedicated test file in `test/verify_[feature].cjs` using Node.js assertions.
- Test both Happy Paths and Failure/Recovery Paths.
- Add the test to `package.json` test script when appropriate.

---

## 3. Standard Verification Script Template

```javascript
/**
 * SAURIK IT — Automated Verification Suite: [Feature Name]
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('=== RUNNING [FEATURE NAME] VERIFICATION SUITE ===\n');

let failed = false;
function check(condition, message) {
  if (condition) {
    console.log(`  ✔ [PASS] ${message}`);
  } else {
    console.error(`  ✖ [FAIL] ${message}`);
    failed = true;
  }
}

// 1. File Existence Check
const componentPath = path.resolve(__dirname, '../src/components/MyComponent.jsx');
check(fs.existsSync(componentPath), 'Component file exists');

// 2. Export / Contract Check
if (fs.existsSync(componentPath)) {
  const content = fs.readFileSync(componentPath, 'utf8');
  check(content.includes('export default'), 'Component exports default function');
  check(content.includes('aria-label'), 'Component provides accessible labels');
}

console.log('\n======================================================');
if (failed) {
  console.error('❌ VERIFICATION CHECKS FAILED!');
  process.exit(1);
} else {
  console.log('✅ ALL VERIFICATION CHECKS PASSED!');
  console.log('======================================================\n');
}
```

