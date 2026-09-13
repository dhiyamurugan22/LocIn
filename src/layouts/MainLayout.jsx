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
  Database,
  Moon,
  Sun
} from 'lucide-react';
import SettingsModal from '../components/SettingsModal';

export default function MainLayout({ user, activeTheme, onToggleTheme, onLogout }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const location = useLocation();

  const isSepia = activeTheme === 'sepia';

  const navItems = [
    { path: '/dashboard', label: 'Overview', icon: LayoutDashboard, subtitle: 'Mastery Hub' },
    { path: '/notes', label: isSepia ? 'Parchment Notes' : 'Terminal Notes', icon: isSepia ? Feather : BookMarked, subtitle: isSepia ? 'Handwritten Notebook' : 'Code Markdown' },
    { path: '/courses', label: 'Course Trees', icon: BookOpen, subtitle: 'Syllabus & Modules' },
    { path: '/practice', label: 'Practice Lab', icon: isSepia ? BookMarked : Code2, subtitle: isSepia ? 'Reflection Set' : 'IDE Terminal' },
    { path: '/algorithms', label: 'Algorithms', icon: Cpu, subtitle: 'Visual Mechanics' },
    { path: '/ai-assistant', label: 'Academic AI', icon: Bot, subtitle: 'Gemini 2.5 Flash' },
  ];

  const getPageTitle = () => {
    const current = navItems.find((item) => item.path === location.pathname);
    return current ? current.label : 'LockIn Platform';
  };

  return (
    <div className={`theme-${activeTheme}`} style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
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
              background: 'var(--accent-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#000000',
              boxShadow: 'var(--shadow-glow)',
            }}
          >
            {isSepia ? <Feather size={22} /> : <Terminal size={22} />}
          </div>
          <div>
            <h1
              style={{
                fontSize: '1.3rem',
                fontWeight: '800',
                lineHeight: 1.1,
              }}
              className="gradient-text-active"
            >
              LockIn
            </h1>
            <span style={{ fontSize: '0.68rem', color: 'var(--accent-primary)', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: isSepia ? 'var(--font-serif)' : 'var(--font-mono)' }}>
              {isSepia ? 'PARCHMENT ERA' : 'TERMINAL IDE ERA'}
            </span>
          </div>
        </div>

        {/* Dedicated Theme Mode Switcher */}
        <div style={{ padding: '1rem 1rem 0.5rem 1rem' }}>
          <div
            style={{
              display: 'flex',
              backgroundColor: 'rgba(0,0,0,0.3)',
              borderRadius: 'var(--radius-md)',
              padding: '0.25rem',
              border: '1px solid var(--border-color)'
            }}
          >
            <button
              onClick={() => onToggleTheme('sepia')}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                padding: '0.5rem',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                backgroundColor: isSepia ? 'var(--accent-primary)' : 'transparent',
                color: isSepia ? '#171310' : 'var(--text-muted)',
                fontWeight: '700',
                fontSize: '0.78rem',
                cursor: 'pointer',
                fontFamily: 'var(--font-serif)',
                transition: 'var(--transition-patient)'
              }}
            >
              <Feather size={14} /> Sepia
            </button>

            <button
              onClick={() => onToggleTheme('terminal')}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                padding: '0.5rem',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                backgroundColor: !isSepia ? 'var(--accent-primary)' : 'transparent',
                color: !isSepia ? '#0b0f17' : 'var(--text-muted)',
                fontWeight: '700',
                fontSize: '0.78rem',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
                transition: 'var(--transition-patient)'
              }}
            >
              <Terminal size={14} /> Terminal
            </button>
          </div>
        </div>

        {/* Quiet Mastery Indicator */}
        <div
          style={{
            margin: '0.5rem 1rem 0.5rem 1rem',
            padding: '0.85rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'rgba(255,255,255,0.03)',
            border: '1px solid var(--border-color)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Hourglass size={14} /> Time Invested
            </span>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-primary)' }}>
              {user?.xp || 1450} hrs
            </span>
          </div>

          <div style={{ width: '100%', height: '6px', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
            <div
              style={{
                width: '68%',
                height: '100%',
                background: 'var(--accent-gradient)',
                borderRadius: 'var(--radius-full)',
              }}
            />
          </div>
        </div>

        {/* Navigation Section */}
        <nav style={{ padding: '0.8rem 1rem', flex: 1, overflowY: 'auto' }}>
          <div style={{ fontSize: '0.68rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.6rem', paddingLeft: '0.5rem' }}>
            Navigation
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;

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
                  color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  backgroundColor: isActive ? 'rgba(255, 255, 255, 0.07)' : 'transparent',
                  border: isActive ? '1px solid var(--border-color)' : '1px solid transparent',
                  textDecoration: 'none',
                  fontSize: '0.88rem',
                  fontWeight: isActive ? '700' : '500',
                  transition: 'var(--transition-patient)',
                })}
              >
                <Icon size={19} />
                <div style={{ flex: 1 }}>
                  <div style={{ lineHeight: 1.2 }}>{item.label}</div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                    {item.subtitle}
                  </div>
                </div>
              </NavLink>
            );
          })}
        </nav>

        {/* User Card */}
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
                background: 'var(--accent-gradient)',
                color: '#000000',
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
              <div style={{ fontSize: '0.72rem', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Database size={11} /> Cloud DB Synced
              </div>
            </div>

            <button
              onClick={() => setIsSettingsOpen(true)}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.3rem' }}
              title="Settings"
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

            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-primary)' }}>
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

            {/* Theme Indicator Pill */}
            <button
              onClick={() => onToggleTheme()}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.4rem 0.9rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-color)',
                color: 'var(--accent-primary)',
                fontSize: '0.78rem',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              {isSepia ? <Feather size={14} /> : <Terminal size={14} />}
              <span>{isSepia ? 'Parchment Mode' : 'Terminal Mode'}</span>
            </button>
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
