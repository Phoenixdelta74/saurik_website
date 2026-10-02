/**
 * SAURIK IT — Embeddable AI Chatbot Widget (Shadow DOM Encapsulated)
 * Zero-dependency, lightweight (<15KB), immune to host-site CSS conflicts.
 * Includes instant WhatsApp handoff and client-native Web Speech voice toggle.
 */
(function () {
  'use strict';

  // Prevent multiple instantiations
  if (window.__SAURIK_CHATBOT_INITIALIZED__) return;
  window.__SAURIK_CHATBOT_INITIALIZED__ = true;

  // Find the loader script tag
  const scriptTag = document.currentScript || document.querySelector('script[data-bot-key]');
  if (!scriptTag) {
    console.error('[Saurik AI Chatbot] Could not find initialization script with data-bot-key.');
    return;
  }

  const botKey = scriptTag.getAttribute('data-bot-key');
  const apiBase = scriptTag.getAttribute('data-api-base') || 'https://api.saurikit.in';

  // Generate or retrieve persistent visitor ID
  let visitorId = localStorage.getItem('saurik_visitor_id');
  if (!visitorId) {
    visitorId = 'vis_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
    localStorage.setItem('saurik_visitor_id', visitorId);
  }

  // Create Host Container with Shadow Root
  const host = document.createElement('div');
  host.id = 'saurik-chatbot-root';
  document.body.appendChild(host);
  const shadow = host.attachShadow({ mode: 'open' });

  // Widget State
  let isOpen = false;
  let sessionToken = null;
  let botConfig = {
    bot_name: 'AI Assistant',
    greeting_message: 'Hello! How can I assist your business today?',
    brand_color: '#0d9488',
    handoff_whatsapp: '919862087157',
    suggested_questions: []
  };
  let messages = [];
  let isListening = false;
  let speechRecognition = null;

  // Initialize Speech Recognition (Client-native, zero API cost)
  if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    speechRecognition = new SpeechRec();
    speechRecognition.continuous = false;
    speechRecognition.interimResults = false;
    speechRecognition.lang = 'en-IN';

    speechRecognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      sendMessage(transcript);
      toggleVoice(false);
    };

    speechRecognition.onerror = () => {
      toggleVoice(false);
    };

    speechRecognition.onend = () => {
      toggleVoice(false);
    };
  }

  // Inject Styles inside Shadow DOM
  const style = document.createElement('style');
  style.textContent = `
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
    
    .saurik-launcher {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: var(--brand-color, #0d9488);
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.18);
      z-index: 999999;
      transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.2s;
      border: none;
      outline: none;
    }
    .saurik-launcher:hover { transform: scale(1.05); }
    .saurik-launcher:active { transform: scale(0.95); }
    .saurik-launcher svg { width: 28px; height: 28px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }

    .saurik-window {
      position: fixed;
      bottom: 96px;
      right: 24px;
      width: 380px;
      max-width: calc(100vw - 32px);
      height: 580px;
      max-height: calc(100vh - 120px);
      background: #ffffff;
      border-radius: 16px;
      box-shadow: 0 12px 36px rgba(0, 0, 0, 0.16);
      display: flex;
      flex-direction: column;
      z-index: 999999;
      overflow: hidden;
      border: 1px solid #e2e8f0;
      opacity: 0;
      pointer-events: none;
      transform: translateY(16px) scale(0.98);
      transition: opacity 0.2s ease, transform 0.2s ease;
    }
    .saurik-window.open {
      opacity: 1;
      pointer-events: auto;
      transform: translateY(0) scale(1);
    }

    .saurik-header {
      background: var(--brand-color, #0d9488);
      color: #ffffff;
      padding: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .saurik-header-title { font-size: 15px; font-weight: 600; display: flex; align-items: center; gap: 8px; }
    .saurik-header-status { width: 8px; height: 8px; border-radius: 50%; background: #4ade80; display: inline-block; }
    .saurik-close-btn { background: transparent; border: none; color: #ffffff; cursor: pointer; padding: 4px; border-radius: 4px; display: flex; }
    .saurik-close-btn:hover { background: rgba(255, 255, 255, 0.15); }

    .saurik-messages {
      flex: 1;
      padding: 16px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 12px;
      background: #f8fafc;
    }
    .saurik-msg {
      max-width: 82%;
      padding: 10px 14px;
      font-size: 13.5px;
      line-height: 1.45;
      border-radius: 14px;
      word-break: break-word;
    }
    .saurik-msg.bot {
      align-self: flex-start;
      background: #ffffff;
      color: #1e293b;
      border: 1px solid #e2e8f0;
      border-top-left-radius: 2px;
    }
    .saurik-msg.user {
      align-self: flex-end;
      background: var(--brand-color, #0d9488);
      color: #ffffff;
      border-top-right-radius: 2px;
    }
    .saurik-citations {
      margin-top: 8px;
      padding-top: 6px;
      border-top: 1px solid #e2e8f0;
      font-size: 11px;
      color: #64748b;
    }
    .saurik-citations a {
      color: var(--brand-color, #0d9488);
      text-decoration: underline;
      display: inline-block;
      margin-right: 6px;
    }

    .saurik-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 4px;
    }
    .saurik-pill {
      font-size: 12px;
      background: #ffffff;
      border: 1px solid #cbd5e1;
      color: #334155;
      padding: 5px 10px;
      border-radius: 12px;
      cursor: pointer;
      transition: background 0.15s, border-color 0.15s;
    }
    .saurik-pill:hover {
      background: #f1f5f9;
      border-color: var(--brand-color, #0d9488);
    }

    .saurik-actions-bar {
      padding: 8px 12px;
      background: #ffffff;
      border-top: 1px solid #e2e8f0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 11.5px;
    }
    .saurik-wa-handoff {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      color: #15803d;
      font-weight: 500;
      text-decoration: none;
      cursor: pointer;
    }

    .saurik-input-area {
      padding: 12px;
      background: #ffffff;
      border-top: 1px solid #e2e8f0;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .saurik-input {
      flex: 1;
      padding: 9px 12px;
      font-size: 13.5px;
      border: 1px solid #cbd5e1;
      border-radius: 20px;
      outline: none;
      transition: border-color 0.15s;
    }
    .saurik-input:focus { border-color: var(--brand-color, #0d9488); }

    .saurik-btn-icon {
      background: transparent;
      border: none;
      color: #64748b;
      cursor: pointer;
      padding: 6px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .saurik-btn-icon:hover { color: var(--brand-color, #0d9488); background: #f1f5f9; }
    .saurik-btn-icon.active { color: #dc2626; background: #fee2e2; }
    .saurik-btn-send {
      background: var(--brand-color, #0d9488);
      color: #ffffff;
      border: none;
      width: 34px;
      height: 34px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .saurik-btn-send:hover { opacity: 0.9; }

    .saurik-footer-tag {
      font-size: 10px;
      color: #94a3b8;
      text-align: center;
      padding: 4px;
      background: #f8fafc;
      border-top: 1px solid #f1f5f9;
    }
    .saurik-footer-tag a { color: inherit; text-decoration: none; font-weight: 500; }
  `;
  shadow.appendChild(style);

  // Build DOM Structure
  const launcher = document.createElement('button');
  launcher.className = 'saurik-launcher';
  launcher.setAttribute('aria-label', 'Open AI Assistant');
  launcher.innerHTML = `
    <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
  `;

  const windowEl = document.createElement('div');
  windowEl.className = 'saurik-window';
  windowEl.innerHTML = `
    <div class="saurik-header">
      <div class="saurik-header-title">
        <span class="saurik-header-status"></span>
        <span id="saurik-bot-title">AI Assistant</span>
      </div>
      <button class="saurik-close-btn" aria-label="Close Assistant">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    </div>
    <div class="saurik-messages" id="saurik-msg-container"></div>
    <div class="saurik-actions-bar">
      <a class="saurik-wa-handoff" id="saurik-wa-btn" target="_blank" rel="noopener noreferrer">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
        Chat on WhatsApp
      </a>
      <span style="color:#94a3b8">Grounded Answers</span>
    </div>
    <div class="saurik-input-area">
      <input type="text" class="saurik-input" id="saurik-input-box" placeholder="Ask a question..." />
      ${speechRecognition ? `
      <button class="saurik-btn-icon" id="saurik-mic-btn" aria-label="Voice input">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
      </button>` : ''}
      <button class="saurik-btn-send" id="saurik-send-btn" aria-label="Send message">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
      </button>
    </div>
    <div class="saurik-footer-tag">
      Powered by <a href="https://www.saurikit.in/ai-chatbot" target="_blank" rel="noopener noreferrer">Saurik AI Chatbot</a>
    </div>
  `;

  shadow.appendChild(launcher);
  shadow.appendChild(windowEl);

  const msgContainer = shadow.getElementById('saurik-msg-container');
  const inputBox = shadow.getElementById('saurik-input-box');
  const sendBtn = shadow.getElementById('saurik-send-btn');
  const micBtn = shadow.getElementById('saurik-mic-btn');
  const closeBtn = windowEl.querySelector('.saurik-close-btn');
  const botTitle = shadow.getElementById('saurik-bot-title');
  const waBtn = shadow.getElementById('saurik-wa-btn');

  // Event Listeners
  launcher.addEventListener('click', toggleWindow);
  closeBtn.addEventListener('click', toggleWindow);
  sendBtn.addEventListener('click', () => sendMessage());
  inputBox.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
  if (micBtn) {
    micBtn.addEventListener('click', () => toggleVoice(!isListening));
  }

  function toggleWindow() {
    isOpen = !isOpen;
    if (isOpen) {
      windowEl.classList.add('open');
      if (!sessionToken) initSession();
      setTimeout(() => inputBox.focus(), 150);
    } else {
      windowEl.classList.remove('open');
      toggleVoice(false);
    }
  }

  function toggleVoice(start) {
    if (!speechRecognition) return;
    if (start) {
      isListening = true;
      if (micBtn) micBtn.classList.add('active');
      speechRecognition.start();
    } else {
      isListening = false;
      if (micBtn) micBtn.classList.remove('active');
      try { speechRecognition.stop(); } catch (e) {}
    }
  }

  // Session Initialization
  async function initSession() {
    try {
      const resp = await fetch(`${apiBase}/v1/widget/session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ public_key: botKey, visitor_id: visitorId })
      });
      if (!resp.ok) throw new Error('Session initialization failed');
      const data = await resp.json();
      sessionToken = data.session_token;
      botConfig = data;

      // Update appearance
      host.style.setProperty('--brand-color', data.brand_color || '#0d9488');
      botTitle.textContent = data.bot_name;
      if (data.handoff_whatsapp) {
        waBtn.href = `https://wa.me/${data.handoff_whatsapp}?text=${encodeURIComponent('Hello, I was chatting with your AI assistant and would like to speak to your team.')}`;
      } else {
        waBtn.style.display = 'none';
      }

      // Add greeting
      renderBotMessage(data.greeting_message, [], data.suggested_questions);
    } catch (err) {
      renderBotMessage('Hello! How can I help you today?');
    }
  }

  // Render Bot Message
  function renderBotMessage(text, citations = [], pills = []) {
    const el = document.createElement('div');
    el.className = 'saurik-msg bot';
    el.textContent = text;

    if (citations && citations.length > 0) {
      const citEl = document.createElement('div');
      citEl.className = 'saurik-citations';
      citEl.innerHTML = '<strong>Sources:</strong> ' + citations.map(c => `<a href="${c.url || '#'}" target="_blank" rel="noopener noreferrer">${c.title}</a>`).join('');
      el.appendChild(citEl);
    }

    if (pills && pills.length > 0) {
      const pillsEl = document.createElement('div');
      pillsEl.className = 'saurik-pills';
      pills.forEach(pillText => {
        const pBtn = document.createElement('button');
        pBtn.className = 'saurik-pill';
        pBtn.textContent = pillText;
        pBtn.addEventListener('click', () => sendMessage(pillText));
        pillsEl.appendChild(pBtn);
      });
      el.appendChild(pillsEl);
    }

    msgContainer.appendChild(el);
    msgContainer.scrollTop = msgContainer.scrollHeight;
  }

  // Send Message
  async function sendMessage(overrideText) {
    const textToSend = (overrideText || inputBox.value).trim();
    if (!textToSend) return;

    inputBox.value = '';

    // Render user message
    const userEl = document.createElement('div');
    userEl.className = 'saurik-msg user';
    userEl.textContent = textToSend;
    msgContainer.appendChild(userEl);
    msgContainer.scrollTop = msgContainer.scrollHeight;

    messages.push({ role: 'user', content: textToSend });

    // Show typing placeholder
    const typingEl = document.createElement('div');
    typingEl.className = 'saurik-msg bot';
    typingEl.textContent = 'Thinking...';
    msgContainer.appendChild(typingEl);
    msgContainer.scrollTop = msgContainer.scrollHeight;

    try {
      const resp = await fetch(`${apiBase}/v1/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_token: sessionToken,
          messages: messages
        })
      });

      typingEl.remove();

      if (!resp.ok) throw new Error('Query failed');
      const data = await resp.json();

      messages.push({ role: 'assistant', content: data.answer });
      renderBotMessage(data.answer, data.citations);

      // Optional TTS Readout if user asked via voice
      if (isListening && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(data.answer);
        utterance.lang = 'en-IN';
        window.speechSynthesis.speak(utterance);
      }
    } catch (err) {
      typingEl.textContent = 'I am currently unable to reach the server. Please feel free to message us on WhatsApp.';
    }
  }
})();
