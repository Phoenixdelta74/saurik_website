import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Send, Sparkles, RefreshCw, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';

const SUGGESTED_QUESTIONS = [
  'Does Desktop work 100% offline without internet?',
  'What is the difference between Desktop and Cloud?',
  'Does Arthos file GST returns directly?',
  'How do I request early access for the 60-day trial?',
  'Where are local backups and records stored?',
  'Can Desktop data be automatically synced to Cloud?',
];

const INITIAL_MESSAGE = {
  role: 'assistant',
  content: "Hello! I am the Arthos Invoice Studio Specialist. I can answer specific questions about our 100% offline Desktop edition, Cloud edition, GST-aware document generation, Business Health analytics, or early access for the 60-day free trial. What would you like to know?",
};

export default function ArthosInlineChat() {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const sendMessage = async (textToSend) => {
    const userText = textToSend || input.trim();
    if (!userText || isLoading) return;

    const newMessages = [...messages, { role: 'user', content: userText }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'arthos',
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      if (data.reply) {
        setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
      } else {
        throw new Error('No reply in response');
      }
    } catch (err) {
      console.error('Arthos inline chat error:', err);
      setError('The specialist assistant is currently unreachable. You can review our confirmed specifications above or speak directly with our team.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="arthos-inline-chat-container">
      {/* Header */}
      <div className="arthos-chat-header">
        <div className="arthos-chat-badge">
          <span className="arthos-chat-pulse" />
          <span>ARTHOS INVOICE STUDIO SPECIALIST</span>
        </div>
        <h3 className="arthos-chat-title">Have questions about offline vs cloud, GST, or the 60-day trial?</h3>
        <p className="arthos-chat-subtitle">
          Ask our AI specialist. Grounded in confirmed offline Windows desktop capabilities, cloud access, GST document generation, and early access trial rules.
        </p>
      </div>

      {/* Suggested Quick Question Chips */}
      <div className="arthos-chat-chips" aria-label="Suggested questions">
        {SUGGESTED_QUESTIONS.map((q) => (
          <button
            key={q}
            type="button"
            className="arthos-chip-btn"
            onClick={() => sendMessage(q)}
            disabled={isLoading}
          >
            <HelpCircle className="w-3.5 h-3.5 opacity-70" aria-hidden="true" />
            <span>{q}</span>
          </button>
        ))}
      </div>

      {/* Message History */}
      <div className="arthos-chat-messages" role="log" aria-live="polite">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`arthos-chat-msg ${m.role === 'user' ? 'arthos-msg-user' : 'arthos-msg-assistant'}`}
          >
            {m.role === 'assistant' && (
              <div className="arthos-msg-author">
                <ShieldCheck className="w-3.5 h-3.5 text-[#076E63]" aria-hidden="true" />
                <span>Arthos Specialist</span>
              </div>
            )}
            <div className="arthos-msg-content">{m.content}</div>
          </div>
        ))}

        {isLoading && (
          <div className="arthos-chat-msg arthos-msg-assistant">
            <div className="arthos-msg-author">
              <Sparkles className="w-3.5 h-3.5 text-[#076E63] animate-spin" aria-hidden="true" />
              <span>Checking verified Arthos specifications...</span>
            </div>
            <div className="arthos-msg-loading">
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
            </div>
          </div>
        )}

        {error && (
          <div className="arthos-chat-error" role="alert">
            <p>{error}</p>
            <div className="arthos-chat-error-actions">
              <Link to="/contact?topic=arthos_early_access" className="arthos-error-link">
                Discuss with product team →
              </Link>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="arthos-chat-input-bar">
        <label htmlFor="arthos-chat-input" className="sr-only">
          Ask a question about Arthos Invoice Studio
        </label>
        <input
          id="arthos-chat-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about offline desktop mode, cloud access, GST documents, backups, or trial..."
          className="arthos-chat-input"
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={() => sendMessage()}
          disabled={!input.trim() || isLoading}
          className="arthos-chat-send-btn"
          aria-label="Send question"
        >
          {isLoading ? (
            <RefreshCw className="w-4 h-4 animate-spin" aria-hidden="true" />
          ) : (
            <Send className="w-4 h-4" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Conversion Handoff Footer */}
      <div className="arthos-chat-footer">
        <span className="text-xs text-[#526B7E]">Ready to test Arthos for your business billing?</span>
        <Link
          to="/contact?topic=arthos_early_access"
          data-conversion="early-access"
          data-placement="inline-chat"
          className="arthos-chat-trial-link"
        >
          <span>Request 60-Day Free Early Access Trial</span>
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
