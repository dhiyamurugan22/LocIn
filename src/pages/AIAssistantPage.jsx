import React, { useState, useRef, useEffect } from 'react';
import { AIService } from '../services/api';
import { aiService } from '../services/aiService';
import { Bot, Send, Sparkles, Feather, Terminal, Code2, Brain, Check, RefreshCw } from 'lucide-react';

const SUGGESTED_PROMPTS = [
  "Explain Dijkstra's Algorithm with intuition and O((V+E) log V) proof.",
  "Write a Java ConcurrentHashMap implementation with thread safety breakdown.",
  "How does QuickSort pivot selection prevent O(N^2) worst case performance?",
  "What is the difference between monolithic and microservice architecture?"
];

export default function AIAssistantPage() {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: `Hello! I am your **LockIn Academic AI Mentor** (powered by Google Gemini API).\n\nI am here to help you bridge the gap between *fuzzy understanding* and *permanent code mastery*. Ask me any question on algorithms, computer science concepts, or system architecture!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (questionText) => {
    const query = questionText || input;
    if (!query.trim() || loading) return;

    const userMsg = {
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!questionText) setInput('');
    setLoading(true);

    try {
      const res = await AIService.askDoubt(query);
      const aiMsg = {
        sender: 'ai',
        text: res.answer,
        source: res.source,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: `An error occurred while reaching the AI Mentor: ${err.message}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: 'calc(100vh - 140px)' }}>
      
      {/* Top Banner */}
      <div className="merged-mastery-card" style={{ padding: '1.25rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', background: 'var(--merged-gold-cyan)', color: '#0b0f17', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Brain size={22} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-serif)', color: 'var(--sepia-text)' }}>
              LockIn Academic AI Mentor
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--terminal-text-muted)' }}>
              Conversational CS & Coding Engine • {aiService.isLive() ? 'Gemini 2.5 Flash Live' : 'Offline Knowledge Gateway Active'}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0.9rem', borderRadius: 'var(--radius-full)', backgroundColor: 'rgba(56, 189, 248, 0.15)', border: '1px solid var(--terminal-border)', color: 'var(--terminal-cyan)', fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}>
          <Sparkles size={14} /> Dual-Palette AI Explanation
        </div>
      </div>

      {/* Main Chat Body */}
      <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: '1.5rem' }}>
        
        {/* Messages Scroll Area */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.2rem', paddingRight: '0.5rem' }}>
          {messages.map((msg, index) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={index}
                style={{
                  alignSelf: isUser ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.3rem'
                }}
              >
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', alignSelf: isUser ? 'flex-end' : 'flex-start', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  {isUser ? 'YOU' : msg.source || 'AI MENTOR'} • {msg.timestamp}
                </div>

                <div
                  className={isUser ? 'btn-patient btn-patient-terminal' : 'sepia-notebook'}
                  style={{
                    padding: '1.2rem 1.5rem',
                    borderRadius: isUser ? '1rem 1rem 0 1rem' : '1rem 1rem 1rem 0',
                    fontSize: '0.92rem',
                    lineHeight: 1.7,
                    whiteSpace: 'pre-wrap',
                    fontFamily: isUser ? 'var(--font-sans)' : 'var(--font-serif)',
                    color: isUser ? '#0b0f17' : 'var(--sepia-text)',
                  }}
                >
                  {msg.text}
                </div>
              </div>
            );
          })}

          {loading && (
            <div style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '1rem 1.5rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--sepia-surface)', border: '1px solid var(--sepia-border)', color: 'var(--sepia-gold)', fontFamily: 'var(--font-serif)' }}>
              <RefreshCw size={16} className="spin" style={{ animation: 'spin 1.5s linear infinite' }} />
              Gemini AI is crafting your explanation...
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Suggested Prompt Chips */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', margin: '1rem 0 0.8rem 0' }}>
          {SUGGESTED_PROMPTS.map((promptText, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(promptText)}
              style={{
                fontSize: '0.74rem',
                fontFamily: 'var(--font-sans)',
                padding: '0.4rem 0.82rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'rgba(212, 163, 89, 0.12)',
                border: '1px solid rgba(212, 163, 89, 0.25)',
                color: 'var(--sepia-gold)',
                cursor: 'pointer',
                transition: 'var(--transition-patient)',
                textAlign: 'left'
              }}
            >
              💡 {promptText}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} style={{ display: 'flex', gap: '0.75rem' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a computer science doubt, algorithm proof, or debugging request..."
            style={{
              flex: 1,
              padding: '0.85rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(0,0,0,0.3)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              fontSize: '0.92rem',
              outline: 'none',
              fontFamily: 'var(--font-sans)'
            }}
          />
          <button
            type="submit"
            disabled={loading}
            className="btn-patient btn-patient-terminal"
            style={{ padding: '0.85rem 1.6rem' }}
          >
            <Send size={18} /> Ask AI
          </button>
        </form>

      </div>
    </div>
  );
}
