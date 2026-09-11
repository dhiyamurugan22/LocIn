import React, { useState } from 'react';
import { AIService } from '../services/api';
import { Bot, Send, User, Sparkles, Code2, HelpCircle, Terminal } from 'lucide-react';

const SUGGESTED_PROMPTS = [
  "Explain the difference between HashMap and ConcurrentHashMap in Java",
  "How does Dijkstra's algorithm work with priority queues?",
  "Explain memory management & garbage collection in Python",
  "Write an optimized binary search tree traversal in C++",
];

export default function AIAssistantPage() {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello! I am your **LockIn AI Academic & Coding Assistant**. Ask me any doubt about programming, data structures, algorithm complexities, or concepts!',
      time: 'Just now',
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (textToSend) => {
    const query = textToSend || inputQuery;
    if (!query.trim() || loading) return;

    const userMsg = {
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setLoading(true);

    try {
      const response = await AIService.askDoubt(query);
      const botMsg = {
        sender: 'bot',
        text: response.answer,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: 'I am currently unable to reach the AI backend endpoint, but here is a quick solution guide:\n\nReview your logic and check edge cases like empty arrays or null pointers.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', height: 'calc(100vh - 120px)' }}>
      {/* Page Header */}
      <div
        style={{
          padding: '1.25rem 1.5rem',
          borderRadius: 'var(--radius-lg)',
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              padding: '0.6rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--accent-gradient)',
              color: '#fff',
            }}
          >
            <Bot size={24} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.35rem', fontWeight: '800' }}>AI Doubt-Solving Assistant</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              Instant answers, code debugging, and concept explanations powered by AI.
            </p>
          </div>
        </div>
      </div>

      {/* Suggested Quick Prompts */}
      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
        {SUGGESTED_PROMPTS.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(prompt)}
            style={{
              padding: '0.4rem 0.85rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-secondary)',
              fontSize: '0.78rem',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            💡 {prompt}
          </button>
        ))}
      </div>

      {/* Chat Messages Window */}
      <div
        className="glass-panel"
        style={{
          flex: 1,
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflow: 'hidden',
        }}
      >
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', paddingRight: '0.5rem' }}>
          {messages.map((msg, index) => {
            const isBot = msg.sender === 'bot';
            return (
              <div
                key={index}
                style={{
                  display: 'flex',
                  gap: '0.75rem',
                  alignSelf: isBot ? 'flex-start' : 'flex-end',
                  maxWidth: '80%',
                }}
              >
                {isBot && (
                  <div
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: 'var(--radius-full)',
                      background: 'var(--accent-gradient)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      flexShrink: 0,
                    }}
                  >
                    <Bot size={18} />
                  </div>
                )}

                <div
                  style={{
                    backgroundColor: isBot ? 'var(--bg-tertiary)' : 'var(--accent-primary)',
                    color: isBot ? 'var(--text-primary)' : '#ffffff',
                    padding: '0.85rem 1.1rem',
                    borderRadius: 'var(--radius-lg)',
                    borderBottomLeftRadius: isBot ? '0.2rem' : 'var(--radius-lg)',
                    borderBottomRightRadius: !isBot ? '0.2rem' : 'var(--radius-lg)',
                    fontSize: '0.9rem',
                    lineHeight: '1.6',
                    whiteSpace: 'pre-wrap',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  {msg.text}
                  <div
                    style={{
                      fontSize: '0.65rem',
                      opacity: 0.7,
                      textAlign: 'right',
                      marginTop: '0.4rem',
                    }}
                  >
                    {msg.time}
                  </div>
                </div>

                {!isBot && (
                  <div
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'var(--bg-tertiary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--text-primary)',
                      flexShrink: 0,
                    }}
                  >
                    <User size={18} />
                  </div>
                )}
              </div>
            );
          })}

          {loading && (
            <div style={{ display: 'flex', gap: '0.75rem', alignSelf: 'flex-start' }}>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--accent-gradient)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                }}
              >
                <Bot size={18} />
              </div>
              <div
                style={{
                  backgroundColor: 'var(--bg-tertiary)',
                  padding: '0.85rem 1.1rem',
                  borderRadius: 'var(--radius-lg)',
                  color: 'var(--text-secondary)',
                  fontSize: '0.85rem',
                }}
                className="animate-pulse-glow"
              >
                AI is analyzing your query...
              </div>
            </div>
          )}
        </div>

        {/* Input Box */}
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
          <input
            type="text"
            placeholder="Type your question or paste code here..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            style={{
              flex: 1,
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '0.75rem 1rem',
              color: 'var(--text-primary)',
              outline: 'none',
              fontSize: '0.9rem',
            }}
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputQuery.trim() || loading}
            style={{
              padding: '0.75rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: inputQuery.trim() ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
              color: '#fff',
              border: 'none',
              fontWeight: '600',
              cursor: inputQuery.trim() ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <Send size={18} /> Send
          </button>
        </div>
      </div>
    </div>
  );
}
