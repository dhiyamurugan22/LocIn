import React, { useState, useEffect } from 'react';
import { X, Languages, Palette, User, Check, Sparkles, Monitor, Terminal, Zap } from 'lucide-react';

const APP_TEMPLATES = [
  {
    id: 'midnight',
    name: 'Midnight Studio',
    desc: 'Deep indigo gradient with violet accents & frosted cards.',
    previewBg: '#0f172a',
    accentColor: '#6366f1',
    className: '',
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk Neon',
    desc: 'Obsidian dark background with cyan & neon magenta glow.',
    previewBg: '#05050b',
    accentColor: '#06b6d4',
    className: 'template-cyberpunk',
  },
  {
    id: 'nordic',
    name: 'Nordic Clean Light',
    desc: 'Warm alabaster background with crisp teal & slate accents.',
    previewBg: '#f8fafc',
    accentColor: '#0d9488',
    className: 'template-nordic',
  },
  {
    id: 'hacker',
    name: 'Emerald Hacker Terminal',
    desc: 'Matrix carbon dark mode with glowing emerald highlights.',
    previewBg: '#030712',
    accentColor: '#10b981',
    className: 'template-hacker',
  },
];

export default function SettingsModal({ isOpen, onClose, user }) {
  const [activeTab, setActiveTab] = useState('template'); // 'template' | 'translation' | 'profile'
  const [selectedTemplate, setSelectedTemplate] = useState(() => {
    return localStorage.getItem('locin_app_template') || 'midnight';
  });
  const [targetLang, setTargetLang] = useState(() => {
    return localStorage.getItem('locin_target_lang') || 'es';
  });

  useEffect(() => {
    applyTemplate(selectedTemplate);
  }, [selectedTemplate]);

  const applyTemplate = (templateId) => {
    document.body.classList.remove('template-cyberpunk', 'template-nordic', 'template-hacker');
    const tmpl = APP_TEMPLATES.find((t) => t.id === templateId);
    if (tmpl && tmpl.className) {
      document.body.classList.add(tmpl.className);
    }
    localStorage.setItem('locin_app_template', templateId);
  };

  const handleLangChange = (lang) => {
    setTargetLang(lang);
    localStorage.setItem('locin_target_lang', lang);
  };

  if (!isOpen) return null;

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
          maxWidth: '640px',
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
          <h3 style={{ fontSize: '1.2rem', fontWeight: '800' }}>Platform Customization & Settings</h3>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)' }}>
          <button
            onClick={() => setActiveTab('template')}
            style={{
              flex: 1,
              padding: '0.85rem',
              border: 'none',
              background: activeTab === 'template' ? 'var(--bg-primary)' : 'transparent',
              color: activeTab === 'template' ? 'var(--accent-primary)' : 'var(--text-secondary)',
              fontWeight: '700',
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              borderBottom: activeTab === 'template' ? '2px solid var(--accent-primary)' : 'none',
            }}
          >
            <Palette size={18} /> App Layout Templates
          </button>
          <button
            onClick={() => setActiveTab('translation')}
            style={{
              flex: 1,
              padding: '0.85rem',
              border: 'none',
              background: activeTab === 'translation' ? 'var(--bg-primary)' : 'transparent',
              color: activeTab === 'translation' ? 'var(--accent-primary)' : 'var(--text-secondary)',
              fontWeight: '700',
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              borderBottom: activeTab === 'translation' ? '2px solid var(--accent-primary)' : 'none',
            }}
          >
            <Languages size={18} /> Inline Translation
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            style={{
              flex: 1,
              padding: '0.85rem',
              border: 'none',
              background: activeTab === 'profile' ? 'var(--bg-primary)' : 'transparent',
              color: activeTab === 'profile' ? 'var(--accent-primary)' : 'var(--text-secondary)',
              fontWeight: '700',
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              borderBottom: activeTab === 'profile' ? '2px solid var(--accent-primary)' : 'none',
            }}
          >
            <User size={18} /> Student Profile
          </button>
        </div>

        {/* Modal Content */}
        <div style={{ padding: '1.5rem', maxHeight: '70vh', overflowY: 'auto' }}>
          {activeTab === 'template' && (
            <div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                Customize the entire visual layout & theme template of the LockIn application to match your style.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {APP_TEMPLATES.map((tmpl) => {
                  const isSelected = selectedTemplate === tmpl.id;
                  return (
                    <div
                      key={tmpl.id}
                      onClick={() => {
                        setSelectedTemplate(tmpl.id);
                        applyTemplate(tmpl.id);
                      }}
                      style={{
                        padding: '1rem',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--bg-tertiary)',
                        border: isSelected ? `2px solid ${tmpl.accentColor}` : '1px solid var(--border-color)',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: '700', fontSize: '0.95rem' }}>{tmpl.name}</span>
                        {isSelected && <Check size={16} color={tmpl.accentColor} />}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{tmpl.desc}</div>
                      <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.25rem' }}>
                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: tmpl.previewBg, border: '1px solid var(--border-color)' }} />
                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: tmpl.accentColor }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'translation' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Choose your default target language for <strong>Inline In-Place Translation</strong>. Any text with the translation icon can be translated instantly right where it appears.
              </p>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.4rem', display: 'block' }}>
                  Target Translation Language
                </label>
                <select
                  value={targetLang}
                  onChange={(e) => handleLangChange(e.target.value)}
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

              <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--accent-primary)', marginBottom: '0.3rem' }}>
                  Preview Inline Translation:
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                  Click the translate icon next to any problem statement or note to convert text into <strong>{targetLang.toUpperCase()}</strong>.
                </div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '1rem', fontWeight: '800' }}>{user?.name || 'Student Learner'}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{user?.email || 'student@locin.edu'}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                  Field of Study: <strong>{user?.analysis?.fieldOfStudy || 'Computer Science & Engineering'}</strong>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Comfortable Language: <strong>{user?.analysis?.comfortableLanguage || 'Java'}</strong>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Target Role: <strong>{user?.analysis?.targetRole || 'Software Engineer'}</strong>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
