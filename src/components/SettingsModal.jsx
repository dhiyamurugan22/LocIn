import React, { useState } from 'react';
import { X, Languages, Sun, Moon, User, Check, Sparkles } from 'lucide-react';

const TRANSLATION_DICTIONARY = {
  es: {
    "Hello! Welcome to LockIn Student Hub.": "¡Hola! Bienvenido a LockIn Student Hub.",
    "Solve 5 practice questions to maintain your streak.": "Resuelve 5 preguntas de práctica para mantener tu racha.",
    "Data Structures and Algorithms course unlocked.": "Curso de Estructuras de Datos y Algoritmos desbloqueado.",
    "Time complexity of QuickSort is O(N log N).": "La complejidad temporal de QuickSort es O(N log N).",
  },
  fr: {
    "Hello! Welcome to LockIn Student Hub.": "Bonjour! Bienvenue sur LockIn Student Hub.",
    "Solve 5 practice questions to maintain your streak.": "Résolvez 5 questions d'entraînement pour maintenir votre série.",
    "Data Structures and Algorithms course unlocked.": "Cours de structures de données et d'algorithmes débloqué.",
    "Time complexity of QuickSort is O(N log N).": "La complexité temporelle de QuickSort est O(N log N).",
  },
  de: {
    "Hello! Welcome to LockIn Student Hub.": "Hallo! Willkommen beim LockIn Student Hub.",
    "Solve 5 practice questions to maintain your streak.": "Lösen Sie 5 Übungsaufgaben, um Ihre Serie aufrechtzuerhalten.",
    "Data Structures and Algorithms course unlocked.": "Kurs für Datenstrukturen und Algorithmen freigeschaltet.",
    "Time complexity of QuickSort is O(N log N).": "Zeitkomplexität von QuickSort ist O(N log N).",
  },
  hi: {
    "Hello! Welcome to LockIn Student Hub.": "नमस्ते! LockIn स्टूडेंट हब में आपका स्वागत है।",
    "Solve 5 practice questions to maintain your streak.": "अपनी स्ट्रिक बनाए रखने के लिए 5 अभ्यास प्रश्नों को हल करें।",
    "Data Structures and Algorithms course unlocked.": "डेटा स्ट्रक्चर्स और एल्गोरिदम कोर्स अनलॉक हो गया।",
    "Time complexity of QuickSort is O(N log N).": "QuickSort की समय जटिलता O(N log N) है।",
  },
  ta: {
    "Hello! Welcome to LockIn Student Hub.": "வணக்கம்! LockIn மாணவர் மையத்திற்கு நல்வரவு.",
    "Solve 5 practice questions to maintain your streak.": "உங்கள் தொடர்ச்சியைத் தக்கவைக்க 5 பயிற்சி கேள்விகளைத் தீர்க்கவும்.",
    "Data Structures and Algorithms course unlocked.": "தரவு கட்டமைப்புகள் மற்றும் அல்காரிதம் பாடம் திறக்கப்பட்டது.",
    "Time complexity of QuickSort is O(N log N).": "QuickSort இன் நேர சிக்கலானது O(N log N) ஆகும்.",
  }
};

export default function SettingsModal({ isOpen, onClose, theme, toggleTheme, user }) {
  const [activeTab, setActiveTab] = useState('translator'); // 'translator' | 'preferences'
  const [inputText, setInputText] = useState('Time complexity of QuickSort is O(N log N).');
  const [targetLang, setTargetLang] = useState('es');
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);

  if (!isOpen) return null;

  const handleTranslate = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    setIsTranslating(true);
    setTimeout(() => {
      const dict = TRANSLATION_DICTIONARY[targetLang] || {};
      const result = dict[inputText.trim()] || `[${targetLang.toUpperCase()} Translation]: "${inputText.trim()}" (Translated into target language context)`;
      setTranslatedText(result);
      setIsTranslating(false);
    }, 400);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '620px',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-glow)',
          border: '1px solid var(--border-color)',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'var(--bg-secondary)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800' }}>Student Settings & Tools</h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-tertiary)',
          }}
        >
          <button
            onClick={() => setActiveTab('translator')}
            style={{
              flex: 1,
              padding: '0.85rem',
              border: 'none',
              background: activeTab === 'translator' ? 'var(--bg-primary)' : 'transparent',
              color: activeTab === 'translator' ? 'var(--accent-primary)' : 'var(--text-secondary)',
              fontWeight: '700',
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              borderBottom: activeTab === 'translator' ? '2px solid var(--accent-primary)' : 'none',
            }}
          >
            <Languages size={18} /> Sentence Translator
          </button>
          <button
            onClick={() => setActiveTab('preferences')}
            style={{
              flex: 1,
              padding: '0.85rem',
              border: 'none',
              background: activeTab === 'preferences' ? 'var(--bg-primary)' : 'transparent',
              color: activeTab === 'preferences' ? 'var(--accent-primary)' : 'var(--text-secondary)',
              fontWeight: '700',
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              borderBottom: activeTab === 'preferences' ? '2px solid var(--accent-primary)' : 'none',
            }}
          >
            <User size={18} /> Preferences & Theme
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.5rem', maxHeight: '70vh', overflowY: 'auto' }}>
          {activeTab === 'translator' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                  Translate problem descriptions, code explanations, or custom sentences into your preferred language.
                </p>

                <form onSubmit={handleTranslate} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.4rem', display: 'block' }}>
                      Target Language
                    </label>
                    <select
                      value={targetLang}
                      onChange={(e) => setTargetLang(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--bg-tertiary)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-primary)',
                        outline: 'none',
                        fontSize: '0.9rem',
                      }}
                    >
                      <option value="es">Spanish (Español)</option>
                      <option value="fr">French (Français)</option>
                      <option value="de">German (Deutsch)</option>
                      <option value="hi">Hindi (हिन्दी)</option>
                      <option value="ta">Tamil (தமிழ்)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.4rem', display: 'block' }}>
                      Enter Sentence to Translate
                    </label>
                    <textarea
                      rows={3}
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Type or paste sentence..."
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--bg-tertiary)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-primary)',
                        outline: 'none',
                        fontSize: '0.9rem',
                        resize: 'vertical',
                      }}
                    />
                  </div>

                  {/* Sample Suggestions */}
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Quick Samples:</span>
                    {[
                      "Hello! Welcome to LockIn Student Hub.",
                      "Solve 5 practice questions to maintain your streak.",
                      "Time complexity of QuickSort is O(N log N)."
                    ].map((sample, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setInputText(sample)}
                        style={{
                          fontSize: '0.7rem',
                          padding: '0.2rem 0.5rem',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: 'var(--bg-tertiary)',
                          border: '1px solid var(--border-color)',
                          color: 'var(--text-secondary)',
                          cursor: 'pointer',
                        }}
                      >
                        Sample {i + 1}
                      </button>
                    ))}
                  </div>

                  <button
                    type="submit"
                    disabled={isTranslating}
                    style={{
                      padding: '0.75rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--accent-primary)',
                      color: '#fff',
                      border: 'none',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <Sparkles size={18} /> {isTranslating ? 'Translating...' : 'Translate Sentence'}
                  </button>
                </form>
              </div>

              {translatedText && (
                <div
                  style={{
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    border: '1px solid rgba(99, 102, 241, 0.3)',
                  }}
                >
                  <div style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', fontWeight: '700', marginBottom: '0.4rem' }}>
                    Translation Result ({targetLang.toUpperCase()}):
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                    {translatedText}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '0.75rem' }}>Appearance Theme</h4>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button
                    onClick={toggleTheme}
                    style={{
                      flex: 1,
                      padding: '1rem',
                      borderRadius: 'var(--radius-md)',
                      border: theme === 'dark' ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-tertiary)',
                      color: 'var(--text-primary)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                    }}
                  >
                    <Moon size={20} />
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>Dark Mode</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Sleek high-contrast theme</div>
                    </div>
                  </button>

                  <button
                    onClick={toggleTheme}
                    style={{
                      flex: 1,
                      padding: '1rem',
                      borderRadius: 'var(--radius-md)',
                      border: theme === 'light' ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-tertiary)',
                      color: 'var(--text-primary)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                    }}
                  >
                    <Sun size={20} color="var(--accent-amber)" />
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>Light Mode</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Clean bright theme</div>
                    </div>
                  </button>
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '0.5rem' }}>Student Profile</h4>
                <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: '700' }}>{user?.name || 'Student Learner'}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{user?.email || 'student@locin.edu'}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', marginTop: '0.5rem' }}>
                    ✓ Algorithm Assessment Passed (Gate Cleared)
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
