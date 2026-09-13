const assert = require('assert');
const fs = require('fs');
const path = require('path');

console.log('=== RUNNING CHATBOT SYSTEM VERIFICATION ===\n');

// 1. Check API endpoint file
const apiChatPath = path.resolve(__dirname, '../api/chat.js');
assert(fs.existsSync(apiChatPath), 'api/chat.js must exist');
const apiChat = fs.readFileSync(apiChatPath, 'utf8');
assert(apiChat.includes('CHAT_SYSTEM_PROMPT'), 'api/chat.js must import CHAT_SYSTEM_PROMPT');
assert(apiChat.includes('getChatReply'), 'api/chat.js must call getChatReply');
console.log('✔ Test 1: api/chat.js endpoint verified.');

// 2. Check LLM providers abstraction
const providersPath = path.resolve(__dirname, '../api/_lib/llmProviders.js');
assert(fs.existsSync(providersPath), 'api/_lib/llmProviders.js must exist');
const providersContent = fs.readFileSync(providersPath, 'utf8');
assert(providersContent.includes('anthropic'), 'llmProviders must support anthropic');
assert(providersContent.includes('openai'), 'llmProviders must support openai');
assert(providersContent.includes('openrouter'), 'llmProviders must support openrouter');
assert(providersContent.includes('ollama'), 'llmProviders must support ollama');
console.log('✔ Test 2: Multi-provider engine (Anthropic, OpenAI, OpenRouter, Ollama) verified.');

// 3. Check ChatContext grounding
const contextPath = path.resolve(__dirname, '../src/data/chatContext.js');
assert(fs.existsSync(contextPath), 'src/data/chatContext.js must exist');
const contextContent = fs.readFileSync(contextPath, 'utf8');
assert(contextContent.includes('CHAT_SYSTEM_PROMPT'), 'chatContext must export CHAT_SYSTEM_PROMPT');
assert(contextContent.includes('renderSoftwareSection'), 'chatContext must include software section');
assert(contextContent.includes('renderHardwareSection'), 'chatContext must include hardware section');
assert(contextContent.includes('renderTrackSection'), 'chatContext must include track section');
assert(contextContent.includes('CURIOSITY HOOK DIRECTIVES'), 'chatContext must have curiosity hook directives');
console.log('✔ Test 3: Grounded context prompt with empathy and curiosity hooks verified.');

// 4. Check ChatWidget UI component
const widgetPath = path.resolve(__dirname, '../src/components/ChatWidget.jsx');
assert(fs.existsSync(widgetPath), 'src/components/ChatWidget.jsx must exist');
const widgetContent = fs.readFileSync(widgetPath, 'utf8');
assert(widgetContent.includes('/api/chat'), 'ChatWidget must send POST to /api/chat');
assert(widgetContent.includes('SAURIK IT AI Advisor'), 'ChatWidget must display header');
assert(widgetContent.includes('animate-ping'), 'ChatWidget must feature high-speed pulsing aura');
console.log('✔ Test 4: ChatWidget UI, pulsing animations, and /api/chat integration verified.');

// 5. Check App.jsx mounting
const appPath = path.resolve(__dirname, '../src/App.jsx');
const appContent = fs.readFileSync(appPath, 'utf8');
assert(appContent.includes('<ChatWidget />'), 'App.jsx must mount <ChatWidget />');
console.log('✔ Test 5: Global mounting in App.jsx verified.');

console.log('\n=== ALL CHATBOT TESTS PASSED SUCCESSFULLY! ===\n');
