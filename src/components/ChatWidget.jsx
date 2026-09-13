import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Send, X } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

const FALLBACK_MESSAGE =
  "This assistant is temporarily unavailable. Please reach us directly on WhatsApp or the contact page.";

const WELCOME_MESSAGE =
  "Hi, I'm the SAURIK IT website assistant. Ask me about our software or hardware services, and I'll answer from what's published on this site.";

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
          className={`mb-3 w-80 max-w-[calc(100vw-3rem)] bg-surface rounded-panel shadow-card-hover border border-border-subtle flex flex-col overflow-hidden ${panelAnimationClass}`}
          role="dialog"
          aria-label="Chat with SAURIK IT assistant"
        >
          <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-border-subtle">
            <span className="text-xs font-bold text-ink-primary">SAURIK IT Assistant</span>
            <button
              type="button"
              onClick={handleClose}
              className="text-ink-muted hover:text-ink-primary p-1.5 rounded focus:outline-none focus:ring-4 focus:ring-teal-200"
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
                className={`text-sm rounded-control px-3 py-2 max-w-[90%] ${
                  message.role === 'user'
                    ? 'ml-auto bg-accent-teal-light text-ink-primary'
                    : 'bg-canvas text-ink-secondary'
                }`}
              >
                {message.content}
              </div>
            ))}
            {status === 'sending' && (
              <div className="text-sm rounded-control px-3 py-2 max-w-[90%] bg-canvas text-ink-muted italic">
                Thinking…
              </div>
            )}
          </div>

          <p className="px-4 text-[11px] text-ink-muted">
            Automated assistant. For quotes or urgent enquiries, use{' '}
            <Link to="/contact" className="underline hover:text-accent-teal" onClick={handleClose}>
              Contact
            </Link>{' '}
            or{' '}
            <a
              href={COMPANY_INFO.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-accent-teal"
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
              placeholder="Ask about our services..."
              className="flex-1 min-w-0 text-sm px-3 py-2.5 rounded-control border border-border-subtle focus:outline-none focus:ring-4 focus:ring-teal-200 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={status === 'sending' || !input.trim()}
              aria-label="Send message"
              className="shrink-0 w-11 h-11 flex items-center justify-center rounded-control bg-accent-teal text-white hover:bg-accent-teal-dark transition-colors focus:outline-none focus:ring-4 focus:ring-teal-200 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        ref={toggleButtonRef}
        onClick={() => setIsOpen((open) => !open)}
        className="w-13 h-13 p-3 rounded-full bg-accent-teal text-white shadow-card-hover hover:scale-105 active:scale-95 transition-all flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-teal-200"
        aria-label={isOpen ? 'Close chat assistant' : 'Open chat assistant'}
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </aside>
  );
};

export default ChatWidget;
