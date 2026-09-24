import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
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

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const ChatWidget = () => {
  const location = useLocation();
  const isTrack = location.pathname.startsWith('/track');
  const isArthos = location.pathname.startsWith('/arthos');

  const pageMode = isTrack ? 'track' : isArthos ? 'arthos' : undefined;

  const currentQuestions = useMemo(() => {
    if (isArthos) {
      return [
        "What is the difference between Desktop and Cloud?",
        "Does Arthos Desktop work 100% offline without internet?",
        "Does Arthos file GST returns directly?",
        "How do I request early access for the 60-day trial?",
        "Where are local backups and records stored?",
        "Can Desktop data be automatically synced to Cloud?",
      ];
    }
    if (isTrack) {
      return [
        "How does fake GPS detection work?",
        "Tally & Excel data export?",
        "Battery drain on cheap phones?",
        "Zero-signal mountain routes in Tripura?",
        "Can reps see their own hours?",
        "₹699 billing & license flexibility?",
      ];
    }
    return [
      "Can Saurik Track work without internet?",
      "What is Arthos Invoice Studio?",
      "What custom software & AI agents do you build?",
      "Tell me about on-premise IT infrastructure",
    ];
  }, [isTrack, isArthos]);

  const [isOpen, setIsOpen] = useState(false);
  const [activeMobileTab, setActiveMobileTab] = useState('chat'); // 'chat' | 'voice'
  const [messages, setMessages] = useState([{ role: 'assistant', content: WELCOME_MESSAGE }]);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'error'
  const [isMuted, setIsMuted] = useState(false);

  const toggleButtonRef = useRef(null);
  const inputRef = useRef(null);
  const logRef = useRef(null);
  const selectedLangRef = useRef('en-IN');

  // Send message to LLM Brain
  const sendToAssistant = useCallback(
    async (userInput, currentMessages, shouldSpeak = false, source = 'text', customLang = null) => {
      const nextMessages = [...currentMessages, { role: 'user', content: userInput }];
      setMessages(nextMessages);
      setStatus('sending');

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: nextMessages.slice(-10),
            source,
            lang: customLang || selectedLangRef.current || 'en-IN',
            mode: pageMode,
          }),
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
      sendToAssistant(spokenText, messages, true, 'voice', selectedLangRef.current);
    },
    [messages, sendToAssistant]
  );

  // Initialize Voice Agent Engine
  const voiceAgent = useVoiceAgent({
    onSpeechRecognized: handleSpeechRecognized,
    isMuted,
  });

  // Keep selectedLangRef in sync with voiceAgent.selectedLanguage
  useEffect(() => {
    if (voiceAgent?.selectedLanguage) {
      selectedLangRef.current = voiceAgent.selectedLanguage;
    }
  }, [voiceAgent?.selectedLanguage]);

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
    sendToAssistant(trimmed, messages, shouldSpeak, 'text', selectedLangRef.current);
  };

  const handleQuickQuestion = (question) => {
    if (status === 'sending') return;
    sendToAssistant(question, messages, !isMuted, 'text', selectedLangRef.current);
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
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/35 backdrop-blur-sm print:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Saurik AI Advisor"
        >
          <div
            className={`w-full max-w-4xl h-[90vh] max-h-[660px] bg-white/65 backdrop-blur-3xl border border-white/90 shadow-[0_30px_70px_-12px_rgba(16,42,67,0.26),0_0_0_1px_rgba(255,255,255,0.7)] ring-1 ring-white/60 rounded-3xl flex flex-col overflow-hidden transition-all duration-300 ${panelAnimationClass}`}
          >
            {/* Top Shared Header */}
            <div className="flex items-center justify-between px-4 sm:px-5 py-3.5 bg-white/50 backdrop-blur-2xl border-b border-white/60 text-ink-primary shrink-0 gap-2">
              <div className="flex items-center gap-2.5 shrink-0">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-teal opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-teal" />
                </span>
                <span className="text-xs sm:text-sm font-bold font-heading text-ink-primary whitespace-nowrap">
                  Saurik AI Advisor
                </span>
                <span className="hidden sm:inline-flex text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-accent-teal-light text-accent-teal border border-accent-teal/20 font-semibold items-center gap-1.5">
                  <Radio className="w-3 h-3 text-accent-teal animate-pulse" />
                  Voice + Chat
                </span>
              </div>

              {/* Mobile Tab Switcher (Visible on small screens only) */}
              <div className="flex md:hidden items-center bg-slate-100/80 p-0.5 rounded-xl border border-slate-200/60">
                <button
                  type="button"
                  onClick={() => setActiveMobileTab('chat')}
                  className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg font-medium transition-all ${
                    activeMobileTab === 'chat'
                      ? 'bg-accent-teal text-white font-bold shadow-sm'
                      : 'text-ink-secondary hover:text-ink-primary'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Chat</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMobileTab('voice')}
                  className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg font-medium transition-all ${
                    activeMobileTab === 'voice'
                      ? 'bg-accent-teal text-white font-bold shadow-sm'
                      : 'text-ink-secondary hover:text-ink-primary'
                  }`}
                >
                  <Mic className="w-3.5 h-3.5" />
                  <span>Voice</span>
                  {voiceAgent.isSpeaking && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  )}
                </button>
              </div>

              {/* Action Controls */}
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (!isMuted) voiceAgent.cancelSpeech();
                    setIsMuted((prev) => !prev);
                  }}
                  className={`p-1.5 rounded-xl border text-xs transition-all hidden sm:flex items-center gap-1 ${
                    isMuted
                      ? 'bg-rose-50 border-rose-200 text-rose-600'
                      : 'bg-white/80 hover:bg-white border-slate-200/80 text-ink-secondary hover:text-ink-primary shadow-subtle'
                  }`}
                  aria-label={isMuted ? 'Unmute voice' : 'Mute voice'}
                  title={isMuted ? 'Unmute voice output' : 'Mute voice output'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <button
                  type="button"
                  onClick={handleClose}
                  className="text-ink-muted hover:text-ink-primary p-1.5 rounded-xl hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-teal"
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
                className={`w-full md:w-1/2 flex flex-col h-full bg-white/25 backdrop-blur-xl border-r border-white/50 transition-all duration-300 ${
                  activeMobileTab === 'chat' ? 'flex' : 'hidden md:flex'
                }`}
              >
                {/* Scrollable Chat Log */}
                <div
                  ref={logRef}
                  aria-live="polite"
                  aria-atomic="false"
                  className="flex-1 overflow-y-auto p-4 space-y-3.5"
                >
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`text-sm rounded-2xl px-4 py-3 max-w-[88%] leading-relaxed ${
                        message.role === 'user'
                          ? 'ml-auto bg-accent-teal text-white shadow-md shadow-accent-teal/20'
                          : 'bg-white/95 backdrop-blur-md text-ink-primary border border-slate-200/80 shadow-subtle'
                      }`}
                    >
                      <div className="text-[10px] font-mono uppercase tracking-wider mb-1 font-semibold opacity-90">
                        {message.role === 'user' ? 'You' : 'SAURIK IT AI'}
                      </div>
                      <div className="whitespace-pre-wrap">{message.content}</div>
                    </div>
                  ))}

                  {/* Initial Quick Ask Topics (Displayed directly inside chat without horizontal scroll) */}
                  {messages.length <= 1 && (
                    <div className="pt-2 space-y-2.5 animate-in fade-in duration-300">
                      <div className="flex items-center gap-1.5 px-1 text-[11px] font-mono uppercase tracking-wider font-semibold text-ink-muted">
                        <Sparkles className="w-3 h-3 text-accent-teal" />
                        <span>Quick Topics to Explore</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {currentQuestions.map((question, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleQuickQuestion(question)}
                            disabled={status === 'sending'}
                            className="text-left text-xs p-3 rounded-2xl bg-white/90 hover:bg-white text-ink-secondary hover:text-ink-primary border border-slate-200/80 hover:border-accent-teal/60 shadow-subtle hover:shadow-md transition-all group disabled:opacity-50 flex items-start justify-between gap-2"
                          >
                            <span className="leading-snug font-medium">{question}</span>
                            <span className="text-accent-teal font-bold group-hover:translate-x-1 transition-transform shrink-0 mt-0.5">
                              →
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {status === 'sending' && (
                    <div className="text-xs rounded-xl px-4 py-3 max-w-[85%] bg-white/80 text-accent-teal flex items-center gap-2 border border-slate-200/60 shadow-subtle">
                      <span className="w-2 h-2 rounded-full bg-accent-teal animate-pulse" />
                      <span className="font-mono">Processing consultation response…</span>
                    </div>
                  )}
                </div>

                {/* Help Note */}
                <div className="px-4 py-2 text-[11px] text-ink-muted bg-white/30 border-t border-slate-200/50 flex items-center justify-between">
                  <span>
                    Formal RFQ or urgent support?{' '}
                    <Link
                      to="/contact"
                      className="text-accent-teal hover:underline font-semibold"
                      onClick={handleClose}
                    >
                      Contact page
                    </Link>{' '}
                    or{' '}
                    <a
                      href={COMPANY_INFO.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-teal hover:underline font-semibold"
                    >
                      WhatsApp
                    </a>
                  </span>
                </div>

                {/* Text Input Form */}
                <form
                  onSubmit={handleTextSubmit}
                  className="flex items-center gap-2 p-3 border-t border-slate-200/70 bg-white/50"
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
                    className="flex-1 min-w-0 text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white/95 text-ink-primary placeholder-ink-muted focus:outline-none focus:ring-2 focus:ring-accent-teal focus:border-accent-teal shadow-subtle disabled:opacity-60 transition-all"
                  />
                  <button
                    type="submit"
                    disabled={status === 'sending' || !input.trim()}
                    aria-label="Send message"
                    className="shrink-0 w-11 h-11 flex items-center justify-center rounded-xl bg-accent-teal hover:bg-accent-teal-dark text-white font-bold hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-accent-teal disabled:opacity-50 shadow-md shadow-accent-teal/25"
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
                  selectedLanguage={voiceAgent.selectedLanguage}
                  onSelectLanguage={voiceAgent.setSelectedLanguage}
                  isContinuousMode={voiceAgent.isContinuousMode}
                  onToggleContinuousMode={() => voiceAgent.setIsContinuousMode((prev) => !prev)}
                  onStartListening={voiceAgent.startListening}
                  onStopListening={voiceAgent.stopListening}
                  onCancelSpeech={voiceAgent.cancelSpeech}
                  isMuted={isMuted}
                  onToggleMute={() => {
                    if (!isMuted) voiceAgent.cancelSpeech();
                    setIsMuted((prev) => !prev);
                  }}
                  bgClass="bg-white/15 backdrop-blur-2xl"
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
