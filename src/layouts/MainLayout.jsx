import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Code2,
  BookOpen,
  BookMarked,
  Bot,
  Cpu,
  Settings,
  Search,
  GraduationCap,
  Menu,
  X,
  Hourglass,
  Feather,
  Terminal,
  Sparkles,
  Database
} from 'lucide-react';
import SettingsModal from '../components/SettingsModal';
import { dbService } from '../services/dbService';

export default function MainLayout({ user, onLogout }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeEra, setActiveEra] = useState('merged'); // 'sepia' | 'terminal' | 'merged'
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Overview', era: 'merged', icon: LayoutDashboard, subtitle: 'Mastery Journey' },
    { path: '/notes', label: 'Sepia Notebook', era: 'sepia', icon: BookMarked, subtitle: 'Handwritten Study Notes' },
    { path: '/courses', label: 'Skill Trees', era: 'sepia', icon: BookOpen, subtitle: 'Parchment to Terminal' },
    { path: '/practice', label: 'Code Lab', era: 'terminal', icon: Code2, subtitle: 'IDE & Spaced Practice' },
    { path: '/algorithms', label: 'Algorithm Console', era: 'terminal', icon: Cpu, subtitle: 'Visual Mechanics' },
    { path: '/ai-assistant', label: 'Academic AI', era: 'merged', icon: Bot, subtitle: 'Gemini 2.5 Flash' },
  ];

  const getPageTitle = () => {
    const current = navItems.find((item) => item.path === location.pathname);
    return current ? current.label : 'LockIn Platform';
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: '270px',
          backgroundColor: 'var(--bg-secondary)',
          borderRight: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 40,
          transition: 'var(--transition-patient)',
        }}
        className={`sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}
      >
        {/* Brand Header */}
        <div
          style={{
            padding: '1.4rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            borderBottom: '1px solid var(--border-color)',
          }}
        >
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--merged-gold-cyan)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0b0f17',
              boxShadow: 'var(--merged-glow)',
            }}
          >
            <GraduationCap size={24} />
          </div>
          <div>
            <h1
              style={{
                fontSize: '1.3rem',
                fontWeight: '800',
                fontFamily: 'var(--font-heading)',
                lineHeight: 1.1,
              }}
              className="gradient-text-merged"
            >
              LockIn
            </h1>
            <span style={{ fontSize: '0.68rem', color: 'var(--sepia-gold)', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
              Dual-Palette Engine
            </span>
          </div>
        </div>

        {/* Quiet Mastery & Time Invested Indicator */}
        <div
          style={{
            margin: '1.1rem 1rem 0.5rem 1rem',
            padding: '0.9rem',
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, rgba(212, 163, 89, 0.1) 0%, rgba(56, 189, 248, 0.1) 100%)',
            border: '1px solid rgba(212, 163, 89, 0.25)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--sepia-gold)', display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-serif)' }}>
              <Hourglass size={14} /> Time Invested
            </span>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--terminal-cyan)', fontFamily: 'var(--font-mono)' }}>
              {user?.xp || 1450} Hours Logged
            </span>
          </div>

          <div style={{ width: '100%', height: '6px', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
            <div
              style={{
                width: '68%',
                height: '100%',
                background: 'var(--merged-gold-cyan)',
                borderRadius: 'var(--radius-full)',
              }}
            />
          </div>
          <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '0.4rem', fontStyle: 'italic', fontFamily: 'var(--font-serif)' }}>
            "Patience transforms fuzzy logic into permanent code."
          </div>
        </div>

        {/* Navigation Section */}
        <nav style={{ padding: '1rem', flex: 1, overflowY: 'auto' }}>
          <div style={{ fontSize: '0.68rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.6rem', paddingLeft: '0.5rem' }}>
            Learning Eras
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isSepia = item.era === 'sepia';
            const isTerminal = item.era === 'terminal';

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  padding: '0.75rem 0.9rem',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '0.4rem',
                  color: isActive
                    ? (isSepia ? 'var(--sepia-gold)' : isTerminal ? 'var(--terminal-cyan)' : '#f8fafc')
                    : 'var(--text-secondary)',
                  backgroundColor: isActive
                    ? (isSepia ? 'rgba(212, 163, 89, 0.15)' : isTerminal ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255, 255, 255, 0.08)')
                    : 'transparent',
                  border: isActive
                    ? (isSepia ? '1px solid var(--sepia-border)' : isTerminal ? '1px solid var(--terminal-border)' : '1px solid var(--merged-border)')
                    : '1px solid transparent',
                  textDecoration: 'none',
                  fontSize: '0.88rem',
                  fontWeight: isActive ? '700' : '500',
                  transition: 'var(--transition-patient)',
                })}
              >
                <Icon size={19} />
                <div style={{ flex: 1 }}>
                  <div style={{ lineHeight: 1.2 }}>{item.label}</div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: isSepia ? 'var(--font-serif)' : isTerminal ? 'var(--font-mono)' : 'var(--font-sans)' }}>
                    {item.subtitle}
                  </div>
                </div>
                {isSepia && <Feather size={13} style={{ color: 'var(--sepia-gold)', opacity: 0.7 }} />}
                {isTerminal && <Terminal size={13} style={{ color: 'var(--terminal-cyan)', opacity: 0.7 }} />}
              </NavLink>
            );
          })}
        </nav>

        {/* User Card & Settings */}
        <div style={{ padding: '1rem', borderTop: '1px solid var(--border-color)', backgroundColor: 'rgba(0,0,0,0.2)' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.6rem 0.75rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'var(--sepia-gold)',
                color: '#191512',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '800',
                fontSize: '1rem',
              }}
            >
              {user?.name ? user.name[0].toUpperCase() : 'S'}
            </div>

            <div style={{ flex: 1, overflow: 'hidden' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: '700', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user?.name || 'Student Scholar'}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--sepia-gold)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Database size={11} /> Cloud DB Synced
              </div>
            </div>

            <button
              onClick={() => setIsSettingsOpen(true)}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.3rem' }}
              title="Settings & Palette"
            >
              <Settings size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, marginLeft: '270px', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top Header */}
        <header
          style={{
            height: '70px',
            backgroundColor: 'var(--bg-glass)',
            backdropFilter: 'blur(16px)',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 2rem',
            position: 'sticky',
            top: 0,
            zIndex: 30,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', display: 'none' }}
              className="mobile-toggle"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <h2 style={{ fontSize: '1.2rem', fontWeight: '700', fontFamily: 'var(--font-serif)', color: 'var(--sepia-text)' }}>
              {getPageTitle()}
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            {/* Search Bar */}
            <div style={{ position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search notes, algorithms, code..."
                style={{
                  padding: '0.5rem 1rem 0.5rem 2.4rem',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  fontSize: '0.82rem',
                  width: '240px',
                  outline: 'none',
                }}
              />
            </div>

            {/* Era Status Pill */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.4rem 0.9rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'rgba(212, 163, 89, 0.12)',
                border: '1px solid rgba(212, 163, 89, 0.3)',
                color: 'var(--sepia-gold)',
                fontSize: '0.78rem',
                fontFamily: 'var(--font-serif)',
              }}
            >
              <Sparkles size={14} />
              <span>Sepia → Terminal Mastery</span>
            </div>
          </div>
        </header>

        {/* Page Content Viewport */}
        <main style={{ flex: 1, padding: '2rem', maxWidth: '1400px', width: '100%', margin: '0 auto' }}>
          <Outlet />
        </main>
      </div>

      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
}
