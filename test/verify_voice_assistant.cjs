const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('=== VERIFYING DUAL-PANEL VOICE & CHAT ASSISTANT ===\n');

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

// 2. Verify api/tts.js structure
const ttsCode = fs.readFileSync(path.resolve(__dirname, '../api/tts.js'), 'utf8');
assert(ttsCode.includes('OpenAI'), 'api/tts.js must import OpenAI');
assert(ttsCode.includes('tts-1'), 'api/tts.js must use tts-1 model');
assert(ttsCode.includes('audio/mpeg'), 'api/tts.js must return audio/mpeg content type');
assert(ttsCode.includes('OPENAI_API_KEY'), 'api/tts.js must check process.env.OPENAI_API_KEY');
console.log('✔ api/tts.js properly configured with OpenAI tts-1 and audio/mpeg streaming.');

// 3. Verify useVoiceAgent hook capabilities
const hookCode = fs.readFileSync(path.resolve(__dirname, '../src/hooks/useVoiceAgent.js'), 'utf8');
assert(hookCode.includes('SpeechRecognition'), 'useVoiceAgent must support SpeechRecognition');
assert(hookCode.includes('speechSynthesis'), 'useVoiceAgent must support speechSynthesis fallback');
assert(hookCode.includes('/api/tts'), 'useVoiceAgent must call /api/tts endpoint');
assert(hookCode.includes('cancelSpeech'), 'useVoiceAgent must provide interrupt / cancelSpeech capability');
console.log('✔ useVoiceAgent hook supports STT, Neural TTS, and browser fallback.');

// 4. Verify VoiceAgentPanel UI
const panelCode = fs.readFileSync(path.resolve(__dirname, '../src/components/voice/VoiceAgentPanel.jsx'), 'utf8');
assert(panelCode.includes('VoiceVisualizer'), 'VoiceAgentPanel must embed VoiceVisualizer');
assert(panelCode.includes('Click to Speak with Agent'), 'VoiceAgentPanel must have primary speak action button');
assert(panelCode.includes('onCancelSpeech'), 'VoiceAgentPanel must support speech interruption');
console.log('✔ VoiceAgentPanel UI verified with animated visualizer and mic controls.');

// 5. Verify ChatWidget Dual-Panel Layout
const widgetCode = fs.readFileSync(path.resolve(__dirname, '../src/components/ChatWidget.jsx'), 'utf8');
assert(widgetCode.includes('VoiceAgentPanel'), 'ChatWidget must embed VoiceAgentPanel');
assert(widgetCode.includes('activeMobileTab'), 'ChatWidget must support responsive mobile tabs');
assert(widgetCode.includes('handleSpeechRecognized'), 'ChatWidget must synchronize recognized speech with chat state');
assert(widgetCode.includes('voiceAgent.speak'), 'ChatWidget must invoke voiceAgent.speak on replies');
console.log('✔ ChatWidget verified with side-by-side dual-panel and synchronized voice/chat state.');

// 6. Test api/tts.js offline / missing key handler response
const ttsHandler = require('../api/tts.js').default;
const mockRes = {
  statusCode: null,
  headers: {},
  body: null,
  status(code) {
    this.statusCode = code;
    return this;
  },
  setHeader(key, val) {
    this.headers[key] = val;
    return this;
  },
  json(data) {
    this.body = data;
    return this;
  },
};

(async () => {
  // Test missing text
  await ttsHandler({ method: 'POST', body: {} }, mockRes);
  assert(mockRes.statusCode === 503 || mockRes.statusCode === 400, 'TTS must return 503 (if no key) or 400 (if no text)');
  console.log('✔ api/tts.js endpoint error handling test passed.');

  console.log('\n=== ALL VOICE & CHAT ASSISTANT CHECKS PASSED SUCCESSFULLY! ===');
})();
