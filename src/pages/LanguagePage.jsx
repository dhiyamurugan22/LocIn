import React, { useState } from 'react';
import TranslationModule from '../../TranslationModule';
import { Globe, Award, Sparkles, Volume2, CheckCircle, RefreshCw } from 'lucide-react';

const VOCAB_CARDS = [
  { word: 'Algorithm', translation: 'நெறிமுறை (Tamil) / एल्गोरिदम (Hindi)', definition: 'A step-by-step procedure to solve a problem.' },
  { word: 'Variable', translation: 'மாறி (Tamil) / चर (Hindi)', definition: 'A named container that holds a data value in memory.' },
  { word: 'Function', translation: 'செயல்பாடு (Tamil) / फ़ंक्शन (Hindi)', definition: 'A reusable block of code that performs a specific task.' },
  { word: 'Database', translation: 'தரவுத்தளம் (Tamil) / डेटाबेस (Hindi)', definition: 'An organized collection of structured information or data.' },
];

export default function LanguagePage() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const card = VOCAB_CARDS[currentCardIndex];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Banner */}
      <div
        style={{
          padding: '1.5rem 2rem',
          borderRadius: 'var(--radius-lg)',
          background: 'linear-gradient(135deg, rgba(6,182,212,0.2) 0%, rgba(16,185,129,0.15) 100%)',
          border: '1px solid rgba(6,182,212,0.3)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.25rem' }}>
            Duolingo-Inspired Language & Translation Hub 🌎
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Master regional Indian & technical languages while reading lessons seamlessly.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--bg-tertiary)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)' }}>
          <Award color="var(--accent-amber)" size={20} />
          <span style={{ fontWeight: '700', fontSize: '0.9rem' }}>+50 XP Today</span>
        </div>
      </div>

      {/* Main Grid: Translation Module + Vocab Flashcards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
        {/* Module 1: Translation Settings & Reader */}
        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Globe size={20} color="var(--accent-cyan)" /> Live Translation Module
          </h3>
          <TranslationModule />
        </div>

        {/* Module 2: Interactive Flashcards & Daily Quiz */}
        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sparkles size={20} color="var(--accent-amber)" /> Daily Vocabulary Flashcard
              </h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Card {currentCardIndex + 1} of {VOCAB_CARDS.length}
              </span>
            </div>

            {/* Card Content */}
            <div
              onClick={() => setShowAnswer(!showAnswer)}
              style={{
                minHeight: '200px',
                backgroundColor: 'var(--bg-tertiary)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'transform 0.2s ease',
              }}
            >
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--accent-cyan)', marginBottom: '0.5rem' }}>
                {card.word}
              </div>

              {showAnswer ? (
                <div className="animate-fade-in" style={{ marginTop: '0.5rem' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--accent-amber)', marginBottom: '0.4rem' }}>
                    {card.translation}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {card.definition}
                  </div>
                </div>
              ) : (
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                  Tap card to reveal translation & definition
                </span>
              )}
            </div>
          </div>

          {/* Flashcard Next/Prev Controls */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <button
              onClick={() => {
                setShowAnswer(false);
                setCurrentCardIndex((prev) => (prev + 1) % VOCAB_CARDS.length);
              }}
              style={{
                flex: 1,
                padding: '0.65rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--accent-primary)',
                color: '#fff',
                border: 'none',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
              }}
            >
              <RefreshCw size={16} /> Next Flashcard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
