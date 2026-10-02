/**
 * SAURIK IT — Automated Verification Suite: Client Onboarding CLI
 * Tests the Done-For-You client onboarding CLI runner and preview generator.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('=== RUNNING CLIENT ONBOARDING CLI VERIFICATION SUITE ===\n');

let failed = false;
function assert(condition, message) {
  if (condition) {
    console.log(`  ✔ ${message}`);
  } else {
    console.error(`  ✖ FAIL: ${message}`);
    failed = true;
  }
}

// 1. Verify file existence
const onboardPath = path.resolve(__dirname, '../services/chatbot_engine/ingestion/onboard.py');
assert(fs.existsSync(onboardPath), 'onboard.py script exists.');

// 2. Execute Onboard CLI in dry-run mode
console.log('\n2. Executing onboard.py in dry-run mode...');
try {
  const output = execSync(
    'python -m services.chatbot_engine.ingestion.onboard --name "Agartala Health Diagnostic" --whatsapp "919862087157" --plan "starter" --dry-run',
    { cwd: path.resolve(__dirname, '..'), encoding: 'utf8' }
  );

  assert(output.includes('ONBOARDING COMPLETE! DELIVERABLE PACKAGE READY FOR CLIENT'), 'Onboarding completed and printed client package.');
  assert(output.includes('pk_live_'), 'Generated valid pk_live_ public key.');
  assert(output.includes('data-bot-key='), 'Output included embed script tag with data-bot-key.');
  assert(output.includes('https://www.saurikit.in/widget/widget.js'), 'Embed script references https://www.saurikit.in/widget/widget.js.');

  // Clean up any generated preview file
  const rootDir = path.resolve(__dirname, '..');
  fs.readdirSync(rootDir).forEach(file => {
    if (file.startsWith('preview_pk_live_') && file.endsWith('.html')) {
      fs.unlinkSync(path.join(rootDir, file));
    }
  });
} catch (err) {
  assert(false, `Execution failed with error: ${err.message}`);
}

if (failed) {
  console.error('\n=== ONBOARDING CLI VERIFICATION FAILED ===');
  process.exit(1);
} else {
  console.log('\n=== ALL ONBOARDING CLI CHECKS PASSED SUCCESSFULLY! ===');
}
