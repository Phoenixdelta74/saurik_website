import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Send, Sparkles, RefreshCw, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';

const SUGGESTED_QUESTIONS = [
  'How does fake GPS detection work?',
  'Tally & Excel data export?',
  'Battery drain on cheap phones?',
  'Zero-signal mountain routes in Tripura?',
  'Can reps see their own hours?',
  '₹699 billing & license flexibility?',
];

const INITIAL_MESSAGE = {
  role: 'assistant',
  content: "Hello! I am the Saurik Track Operations & Technical Specialist. I can answer specific questions about our Android foreground engine, mock location exception queues, van stock reconciliations, offline sync, or regional deployment in Tripura and Northeast India. What would you like to know?",
};

export default function TrackInlineChat() {
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
          mode: 'track',
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
      console.error('Track inline chat error:', err);
      setError('The specialist assistant is currently offline or unreachable. You can review our confirmed specifications above or speak directly with our team.');
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
    <div className="track-inline-chat-container">
      {/* Header */}
      <div className="track-chat-header">
        <div className="track-chat-badge">
          <span className="track-chat-pulse" />
          <span>OPERATIONS &amp; TECHNICAL SPECIALIST</span>
        </div>
        <h3 className="track-chat-title">Have a specific route, device, or accounting question?</h3>
        <p className="track-chat-subtitle">
          Ask our AI specialist. Grounded 100% in confirmed Android hardware behavior, van stock rules, and regional field conditions.
        </p>
      </div>

      {/* Suggested Quick Question Chips */}
      <div className="track-chat-chips" aria-label="Suggested questions">
        {SUGGESTED_QUESTIONS.map((q) => (
          <button
            key={q}
            type="button"
            className="track-chip-btn"
            onClick={() => sendMessage(q)}
            disabled={isLoading}
          >
            <HelpCircle className="w-3.5 h-3.5 opacity-70" aria-hidden="true" />
            <span>{q}</span>
          </button>
        ))}
      </div>

      {/* Message History */}
      <div className="track-chat-messages" role="log" aria-live="polite">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`track-chat-msg ${m.role === 'user' ? 'track-msg-user' : 'track-msg-assistant'}`}
          >
            {m.role === 'assistant' && (
              <div className="track-msg-author">
                <ShieldCheck className="w-3.5 h-3.5 text-[#E4AE70]" aria-hidden="true" />
                <span>Track Specialist</span>
              </div>
            )}
            <div className="track-msg-content">{m.content}</div>
          </div>
        ))}

        {isLoading && (
          <div className="track-chat-msg track-msg-assistant">
            <div className="track-msg-author">
              <Sparkles className="w-3.5 h-3.5 text-[#E4AE70] animate-spin" aria-hidden="true" />
              <span>Analyzing operational specs...</span>
            </div>
            <div className="track-msg-loading">
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
            </div>
          </div>
        )}

        {error && (
          <div className="track-chat-error" role="alert">
            <p>{error}</p>
            <div className="track-chat-error-actions">
              <Link to="/contact?topic=saurik_track" className="track-error-link">
                Discuss with engineering lead →
              </Link>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="track-chat-input-bar">
        <label htmlFor="track-chat-input" className="sr-only">
          Ask a technical or operational question about Saurik Track
        </label>
        <input
          id="track-chat-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about mock GPS, Tally mapping, offline sync, battery impact..."
          className="track-chat-input"
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={() => sendMessage()}
          disabled={!input.trim() || isLoading}
          className="track-chat-send-btn"
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
      <div className="track-chat-footer">
        <span className="text-xs text-[#8C9389]">Ready to see how it handles your routes?</span>
        <Link
          to="/contact?topic=saurik_track"
          data-conversion="trial-start"
          data-placement="inline-chat"
          className="track-chat-trial-link"
        >
          <span>Start Free 30-Day Trial (1–2 Vans Pilot)</span>
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
