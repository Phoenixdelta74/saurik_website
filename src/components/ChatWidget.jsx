import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Send, X, Sparkles, Zap } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

const FALLBACK_MESSAGE =
  "This assistant is temporarily unavailable. Please reach us directly on WhatsApp or the contact page.";

const WELCOME_MESSAGE =
  "Hi! I'm your SAURIK IT AI advisor. Looking to eliminate field time-theft with Saurik Track, explore custom software, or upgrade IT infrastructure? Tell me your challenge!";

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'assistant', content: WELCOME_MESSAGE }]);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | error
  const toggleButtonRef = useRef(null);
  const inputRef = useRef(null);
  const logRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [messages, status]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        toggleButtonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    toggleButtonRef.current?.focus();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || status === 'sending') return;

    const nextMessages = [...messages, { role: 'user', content: trimmed }];
    setMessages(nextMessages);
    setInput('');
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
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'assistant', content: FALLBACK_MESSAGE }]);
      setStatus('error');
    }
  };

  const panelAnimationClass = prefersReducedMotion() ? '' : 'animate-in fade-in slide-in-from-bottom-2 duration-200';

  return (
    <aside aria-label="SAURIK IT chat assistant" className="fixed bottom-6 left-6 z-40 flex flex-col items-start print:hidden">
      {isOpen && (
        <div
          className={`mb-3 w-84 max-w-[calc(100vw-3rem)] bg-surface rounded-panel shadow-2xl border border-cyan-500/40 flex flex-col overflow-hidden ${panelAnimationClass}`}
          role="dialog"
          aria-label="Chat with SAURIK IT assistant"
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-2 px-4 py-3 bg-slate-900 text-white border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
              </span>
              <span className="text-xs font-bold font-heading">SAURIK IT AI Advisor</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/60 font-semibold">
                ⚡ Flash
              </span>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
              aria-label="Close chat assistant"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div
            ref={logRef}
            aria-live="polite"
            aria-atomic="false"
            className="flex-1 max-h-80 overflow-y-auto px-4 py-3 space-y-3"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`text-sm rounded-control px-3.5 py-2.5 max-w-[90%] leading-relaxed ${
                  message.role === 'user'
                    ? 'ml-auto bg-cyan-600 text-white shadow-sm'
                    : 'bg-canvas text-ink-primary border border-border-subtle shadow-subtle'
                }`}
              >
                {message.content}
              </div>
            ))}
            {status === 'sending' && (
              <div className="text-xs rounded-control px-3.5 py-2.5 max-w-[90%] bg-canvas text-cyan-700 flex items-center gap-2 border border-cyan-200">
                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
                <span className="font-mono">Generating response at warp speed…</span>
              </div>
            )}
          </div>

          <p className="px-4 text-[11px] text-ink-muted">
            Instant AI consultation. For formal quotes or urgent orders, use{' '}
            <Link to="/contact" className="underline hover:text-accent-teal font-semibold" onClick={handleClose}>
              Contact
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
            .
          </p>

          <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 py-3">
            <label htmlFor="chat-widget-input" className="sr-only">
              Type your question
            </label>
            <input
              id="chat-widget-input"
              ref={inputRef}
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              disabled={status === 'sending'}
              placeholder="Ask anything about software or hardware..."
              className="flex-1 min-w-0 text-sm px-3 py-2.5 rounded-control border border-border-subtle focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={status === 'sending' || !input.trim()}
              aria-label="Send message"
              className="shrink-0 w-11 h-11 flex items-center justify-center rounded-control bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:opacity-50 shadow"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Blazing Fast High-Energy Interactive Button */}
      <div className="relative flex items-center group">
        
        {/* Floating Attention Hook Pill (when closed) */}
        {!isOpen && (
          <div 
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex items-center gap-1.5 ml-16 absolute left-0 py-1.5 px-3 rounded-full bg-slate-900 text-white border border-cyan-400/50 shadow-xl text-xs font-semibold whitespace-nowrap cursor-pointer hover:border-cyan-300 transition-all hover:scale-105"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
            <span>AI Advisor • <strong className="text-cyan-300 font-mono">Ask Instant Question</strong></span>
          </div>
        )}

        {/* Rapid Pulsing Outer Rings */}
        {!isOpen && (
          <>
            <span className="animate-ping absolute -inset-1 rounded-full bg-cyan-400 opacity-60 duration-700 pointer-events-none"></span>
            <span className="animate-pulse absolute -inset-2 rounded-full bg-teal-400/30 blur-sm pointer-events-none"></span>
          </>
        )}

        {/* Trigger Button */}
        <button
          type="button"
          ref={toggleButtonRef}
          onClick={() => setIsOpen((open) => !open)}
          className={`relative z-10 w-14 h-14 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-cyan-300 active:scale-95 ${
            isOpen
              ? 'bg-slate-800 text-white rotate-90'
              : 'bg-gradient-to-tr from-cyan-500 via-teal-500 to-emerald-400 text-slate-950 hover:scale-110 shadow-cyan-500/50 hover:shadow-cyan-400/80 ring-2 ring-cyan-300/80 ring-offset-2 ring-offset-slate-900'
          }`}
          aria-label={isOpen ? 'Close chat assistant' : 'Open AI chat assistant'}
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <div className="relative">
              <MessageCircle className="w-7 h-7 text-slate-950 fill-slate-950/10" />
              <Sparkles className="w-3.5 h-3.5 text-amber-300 absolute -top-1.5 -right-1.5 animate-spin duration-1000" />
            </div>
          )}
        </button>

      </div>
    </aside>
  );
};

export default ChatWidget;
