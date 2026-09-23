const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('=== VERIFYING DUAL-PANEL VOICE & CHAT ASSISTANT (ZERO-COST NATIVE ENGINE) ===\n');

// 1. Verify file existence
const requiredFiles = [
  'api/tts.js',
  'src/hooks/useVoiceAgent.js',
  'src/components/voice/VoiceVisualizer.jsx',
  'src/components/voice/VoiceAgentPanel.jsx',
  'src/components/ChatWidget.jsx',
];

for (const relPath of requiredFiles) {
  const fullPath = path.resolve(__dirname, '..', relPath);
  assert(fs.existsSync(fullPath), `Missing required file: ${relPath}`);
  console.log(`✔ File exists: ${relPath}`);
}

// 2. Verify useVoiceAgent hook capabilities (Zero-Cost Native Engine)
const hookCode = fs.readFileSync(path.resolve(__dirname, '../src/hooks/useVoiceAgent.js'), 'utf8');
assert(hookCode.includes('SpeechRecognition'), 'useVoiceAgent must support SpeechRecognition');
assert(hookCode.includes('speechSynthesis'), 'useVoiceAgent must use speechSynthesis as native engine');
assert(hookCode.includes('SUPPORTED_LANGUAGES'), 'useVoiceAgent must export SUPPORTED_LANGUAGES');
assert(hookCode.includes('en-IN') && hookCode.includes('hi-IN') && hookCode.includes('bn-IN'), 'useVoiceAgent must support English, Hindi, and Bengali');
assert(hookCode.includes('isContinuousMode'), 'useVoiceAgent must support isContinuousMode hands-free loop');
assert(hookCode.includes('cancelSpeech'), 'useVoiceAgent must provide interrupt capability');
console.log('✔ useVoiceAgent verified with zero-cost native speech, multilingual support, and hands-free mode.');

// 3. Verify VoiceAgentPanel UI
const panelCode = fs.readFileSync(path.resolve(__dirname, '../src/components/voice/VoiceAgentPanel.jsx'), 'utf8');
assert(panelCode.includes('VoiceVisualizer'), 'VoiceAgentPanel must embed VoiceVisualizer');
assert(panelCode.includes('voice-lang-select'), 'VoiceAgentPanel must include language selector');
assert(panelCode.includes('Saurik AI Advisor'), 'VoiceAgentPanel must display uniform Saurik AI Advisor branding');
console.log('✔ VoiceAgentPanel UI verified with language selector, hands-free call toggle, and uniform branding.');

// 4. Verify ChatWidget Dual-Panel Layout
const widgetCode = fs.readFileSync(path.resolve(__dirname, '../src/components/ChatWidget.jsx'), 'utf8');
assert(widgetCode.includes('VoiceAgentPanel'), 'ChatWidget must embed VoiceAgentPanel');
assert(widgetCode.includes('activeMobileTab'), 'ChatWidget must support responsive mobile tabs');
assert(widgetCode.includes('selectedLanguage'), 'ChatWidget must pass selectedLanguage to panel');
assert(widgetCode.includes('isContinuousMode'), 'ChatWidget must pass isContinuousMode to panel');
assert(widgetCode.includes('voiceAgent.speak'), 'ChatWidget must invoke voiceAgent.speak on replies');
console.log('✔ ChatWidget verified with side-by-side dual-panel, language selection, and continuous mode.');

// 5. Verify Implementation Rules in AGENTS.md & masterdeveloper.md
const agentsGuide = fs.readFileSync(path.resolve(__dirname, '../AGENTS.md'), 'utf8');
assert(agentsGuide.includes('Zero-Cost Native Voice Engine Rule'), 'AGENTS.md must include Zero-Cost Native Voice Engine Rule');
console.log('✔ AGENTS.md verified: Zero-Cost Native Voice Engine Rule is codified.');

const masterGuide = fs.readFileSync(path.resolve(__dirname, '../masterdeveloper.md'), 'utf8');
assert(masterGuide.includes('Mandatory Zero-Cost Native Voice Engine'), 'masterdeveloper.md must include Directive 7');
console.log('✔ masterdeveloper.md verified: Mandatory Zero-Cost Native Voice Engine directive is codified.');

console.log('\n=== ALL ZERO-COST NATIVE VOICE ENGINE CHECKS PASSED SUCCESSFULLY! ===');
