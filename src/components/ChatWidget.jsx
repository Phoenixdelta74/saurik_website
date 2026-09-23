import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  MessageCircle,
  Mic,
  Send,
  X,
  Sparkles,
  Zap,
  Volume2,
  VolumeX,
  MessageSquare,
  Radio,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { useVoiceAgent } from '../hooks/useVoiceAgent';
import VoiceAgentPanel from './voice/VoiceAgentPanel';

const FALLBACK_MESSAGE =
  "I'm temporarily unable to connect to the knowledge base. Please reach us directly on WhatsApp or our contact page.";

const WELCOME_MESSAGE =
  "Hi! I'm your SAURIK IT AI advisor. You can chat with me here or click the microphone to talk with our voice agent. How can I help you today?";

const SUGGESTED_QUESTIONS = [
  "Can Saurik Track work without internet?",
  "What custom software do you build?",
  "Tell me about on-premise IT infrastructure",
  "How can I book a 30-day pilot?",
];

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMobileTab, setActiveMobileTab] = useState('chat'); // 'chat' | 'voice'
  const [messages, setMessages] = useState([{ role: 'assistant', content: WELCOME_MESSAGE }]);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'error'
  const [isMuted, setIsMuted] = useState(false);

  const toggleButtonRef = useRef(null);
  const inputRef = useRef(null);
  const logRef = useRef(null);

  // Send message to LLM Brain
  const sendToAssistant = useCallback(
    async (userInput, currentMessages, shouldSpeak = false) => {
      const nextMessages = [...currentMessages, { role: 'user', content: userInput }];
      setMessages(nextMessages);
      setStatus('sending');

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: nextMessages.slice(-10) }),
        });

        if (!response.ok) {
          throw new Error('Request failed');
        }

        const data = await response.json();
        if (!data.reply) {
          throw new Error('Empty response');
        }

        setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
        setStatus('idle');

        if (shouldSpeak && !isMuted) {
          voiceAgent.speak(data.reply);
        }
      } catch (error) {
        console.error('Chat error:', error);
        setMessages((prev) => [...prev, { role: 'assistant', content: FALLBACK_MESSAGE }]);
        setStatus('error');
        if (shouldSpeak && !isMuted) {
          voiceAgent.speak(FALLBACK_MESSAGE);
        }
      }
    },
    [isMuted]
  );

  // Speech Recognition Callback
  const handleSpeechRecognized = useCallback(
    (spokenText) => {
      if (!spokenText.trim()) return;
      sendToAssistant(spokenText, messages, true);
    },
    [messages, sendToAssistant]
  );

  // Initialize Voice Agent Engine
  const voiceAgent = useVoiceAgent({
    onSpeechRecognized: handleSpeechRecognized,
    isMuted,
  });

  // Focus management
  useEffect(() => {
    if (isOpen && activeMobileTab === 'chat') {
      inputRef.current?.focus();
    }
  }, [isOpen, activeMobileTab]);

  // Auto-scroll chat log
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [messages, status]);

  // Handle ESC key to close modal
  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    voiceAgent.cancelSpeech();
    voiceAgent.stopListening();
    setIsOpen(false);
    toggleButtonRef.current?.focus();
  };

  const handleTextSubmit = async (event) => {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || status === 'sending') return;

    setInput('');
    // Speak response if user is on mobile voice tab or sound is unmuted
    const shouldSpeak = activeMobileTab === 'voice' || !isMuted;
    sendToAssistant(trimmed, messages, shouldSpeak);
  };

  const handleQuickQuestion = (question) => {
    if (status === 'sending') return;
    sendToAssistant(question, messages, !isMuted);
  };

  const panelAnimationClass = prefersReducedMotion()
    ? ''
    : 'animate-in fade-in zoom-in-95 duration-200';

  return (
    <>
      {/* Floating Trigger Button (Always visible on bottom-left) */}
      <aside
        aria-label="SAURIK IT Voice and Chat Advisor"
        className="fixed bottom-6 left-6 z-40 flex flex-col items-start print:hidden"
      >
        <div className="relative flex items-center group">
          {/* Floating Attention Hook Pill (when closed) */}
          {!isOpen && (
            <div
              onClick={() => setIsOpen(true)}
              className="hidden sm:flex items-center gap-2 ml-16 absolute left-0 py-2 px-3.5 rounded-full bg-slate-950 text-white border border-cyan-400/60 shadow-2xl text-xs font-semibold whitespace-nowrap cursor-pointer hover:border-cyan-300 transition-all hover:scale-105"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
              <span>
                AI Voice & Chat • <strong className="text-cyan-300 font-mono">Talk or Ask</strong>
              </span>
            </div>
          )}

          {/* Pulsing Outer Rings */}
          {!isOpen && (
            <>
              <span className="animate-ping absolute -inset-1 rounded-full bg-cyan-400 opacity-60 duration-700 pointer-events-none" />
              <span className="animate-pulse absolute -inset-2 rounded-full bg-teal-400/30 blur-sm pointer-events-none" />
            </>
          )}

          {/* Trigger Button */}
          <button
            type="button"
            ref={toggleButtonRef}
            onClick={() => setIsOpen((prev) => !prev)}
            className={`relative z-10 w-14 h-14 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-cyan-300 active:scale-95 ${
              isOpen
                ? 'bg-slate-900 text-white rotate-90 border border-slate-700'
                : 'bg-gradient-to-tr from-cyan-500 via-teal-500 to-emerald-400 text-slate-950 hover:scale-110 shadow-cyan-500/50 hover:shadow-cyan-400/80 ring-2 ring-cyan-300/80 ring-offset-2 ring-offset-slate-900'
            }`}
            aria-label={isOpen ? 'Close assistant' : 'Open AI Voice and Chat Assistant'}
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <div className="relative flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-slate-950 fill-slate-950/20" />
                <div className="absolute -bottom-1 -right-1.5 p-0.5 rounded-full bg-slate-950 text-cyan-300 border border-cyan-400 shadow">
                  <Mic className="w-2.5 h-2.5" />
                </div>
                <Sparkles className="w-3 h-3 text-amber-300 absolute -top-1.5 -right-1.5 animate-spin duration-1000" />
              </div>
            )}
          </button>
        </div>
      </aside>

      {/* Dual-Panel Studio Modal Popup Window */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm print:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="SAURIK IT Voice & Chat Advisor"
        >
          <div
            className={`w-full max-w-4xl h-[90vh] max-h-[660px] bg-surface rounded-2xl shadow-2xl border border-slate-800 flex flex-col overflow-hidden ${panelAnimationClass}`}
          >
            {/* Top Shared Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-950 text-white border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500" />
                </span>
                <span className="text-xs sm:text-sm font-bold font-heading text-slate-100">
                  SAURIK IT AI Advisor
                </span>
                <span className="hidden sm:inline-flex text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/60 font-semibold items-center gap-1">
                  <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
                  Voice + Chat
                </span>
              </div>

              {/* Mobile Tab Switcher (Visible on small screens only) */}
              <div className="flex md:hidden items-center bg-slate-900 p-0.5 rounded-lg border border-slate-800">
                <button
                  type="button"
                  onClick={() => setActiveMobileTab('chat')}
                  className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded-md font-medium transition-all ${
                    activeMobileTab === 'chat'
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Chat</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMobileTab('voice')}
                  className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded-md font-medium transition-all ${
                    activeMobileTab === 'voice'
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Mic className="w-3.5 h-3.5" />
                  <span>Voice</span>
                  {voiceAgent.isSpeaking && (
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping" />
                  )}
                </button>
              </div>

              {/* Action Controls */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (!isMuted) voiceAgent.cancelSpeech();
                    setIsMuted((prev) => !prev);
                  }}
                  className={`p-1.5 rounded-lg border text-xs transition-colors hidden sm:flex items-center gap-1 ${
                    isMuted
                      ? 'bg-rose-950/60 border-rose-800 text-rose-300'
                      : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
                  }`}
                  aria-label={isMuted ? 'Unmute voice' : 'Mute voice'}
                  title={isMuted ? 'Unmute voice output' : 'Mute voice output'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <button
                  type="button"
                  onClick={handleClose}
                  className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  aria-label="Close assistant modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Studio Body: Side-by-Side on Desktop, Tabbed on Mobile */}
            <div className="flex-1 flex overflow-hidden">
              {/* LEFT SIDE: Text Chat Studio */}
              <div
                className={`w-full md:w-1/2 flex flex-col h-full bg-surface border-r border-border-subtle ${
                  activeMobileTab === 'chat' ? 'flex' : 'hidden md:flex'
                }`}
              >
                {/* Scrollable Chat Log */}
                <div
                  ref={logRef}
                  aria-live="polite"
                  aria-atomic="false"
                  className="flex-1 overflow-y-auto p-4 space-y-3"
                >
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`text-sm rounded-2xl px-4 py-3 max-w-[88%] leading-relaxed ${
                        message.role === 'user'
                          ? 'ml-auto bg-cyan-600 text-white shadow-sm'
                          : 'bg-canvas text-ink-primary border border-border-subtle shadow-subtle'
                      }`}
                    >
                      <div className="text-[11px] font-mono uppercase tracking-wider mb-1 opacity-70">
                        {message.role === 'user' ? 'You' : 'SAURIK IT AI'}
                      </div>
                      <div className="whitespace-pre-wrap">{message.content}</div>
                    </div>
                  ))}

                  {status === 'sending' && (
                    <div className="text-xs rounded-xl px-4 py-3 max-w-[85%] bg-canvas text-cyan-700 flex items-center gap-2 border border-cyan-200">
                      <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                      <span className="font-mono">Processing consultation response…</span>
                    </div>
                  )}
                </div>

                {/* Quick Prompts Carousel */}
                <div className="px-4 py-2 border-t border-border-subtle bg-canvas/50 overflow-x-auto flex items-center gap-2 no-scrollbar">
                  <span className="text-[10px] uppercase font-mono text-ink-muted shrink-0">
                    Quick Ask:
                  </span>
                  {SUGGESTED_QUESTIONS.map((q, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleQuickQuestion(q)}
                      disabled={status === 'sending'}
                      className="text-[11px] whitespace-nowrap px-2.5 py-1 rounded-full bg-surface border border-border-subtle text-ink-secondary hover:text-accent-teal hover:border-accent-teal transition-all shrink-0 disabled:opacity-50"
                    >
                      {q}
                    </button>
                  ))}
                </div>

                {/* Help Note */}
                <div className="px-4 py-1 text-[11px] text-ink-muted bg-surface flex items-center justify-between">
                  <span>
                    Formal RFQ or urgent support?{' '}
                    <Link
                      to="/contact"
                      className="underline hover:text-accent-teal font-semibold"
                      onClick={handleClose}
                    >
                      Contact page
                    </Link>{' '}
                    or{' '}
                    <a
                      href={COMPANY_INFO.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-accent-teal font-semibold"
                    >
                      WhatsApp
                    </a>
                  </span>
                </div>

                {/* Text Input Form */}
                <form
                  onSubmit={handleTextSubmit}
                  className="flex items-center gap-2 p-3 border-t border-border-subtle bg-surface"
                >
                  <label htmlFor="chat-studio-input" className="sr-only">
                    Type your question
                  </label>
                  <input
                    id="chat-studio-input"
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    disabled={status === 'sending'}
                    placeholder="Type a message or use Voice on the right…"
                    className="flex-1 min-w-0 text-sm px-3.5 py-2.5 rounded-xl border border-border-subtle focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-60 bg-canvas"
                  />
                  <button
                    type="submit"
                    disabled={status === 'sending' || !input.trim()}
                    aria-label="Send message"
                    className="shrink-0 w-11 h-11 flex items-center justify-center rounded-xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:opacity-50 shadow"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>

              {/* RIGHT SIDE: Voice Agent Studio */}
              <div
                className={`w-full md:w-1/2 flex flex-col h-full ${
                  activeMobileTab === 'voice' ? 'flex' : 'hidden md:flex'
                }`}
              >
                <VoiceAgentPanel
                  isSupported={voiceAgent.isSupported}
                  isListening={voiceAgent.isListening}
                  isSpeaking={voiceAgent.isSpeaking}
                  interimTranscript={voiceAgent.interimTranscript}
                  permissionError={voiceAgent.permissionError}
                  status={status}
                  onStartListening={voiceAgent.startListening}
                  onStopListening={voiceAgent.stopListening}
                  onCancelSpeech={voiceAgent.cancelSpeech}
                  isMuted={isMuted}
                  onToggleMute={() => {
                    if (!isMuted) voiceAgent.cancelSpeech();
                    setIsMuted((prev) => !prev);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
