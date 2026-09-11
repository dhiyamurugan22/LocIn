import React, { useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Code2,
  BookOpen,
  BookMarked,
  Bot,
  Cpu,
  Flame,
  Zap,
  Settings,
  Search,
  GraduationCap,
  Menu,
  X,
  Award,
  LogOut,
  Palette
} from 'lucide-react';
import SettingsModal from '../components/SettingsModal';

export default function MainLayout({ user, onLogout }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: 'Overview' },
    { path: '/notes', label: 'Student Notes', icon: BookMarked, badge: 'Organized Notebook' },
    { path: '/courses', label: 'Courses & Templates', icon: BookOpen, badge: 'Syllabus & Code' },
    { path: '/practice', label: 'Coding Practice', icon: Code2, badge: 'LeetCode / GFG' },
    { path: '/algorithms', label: 'Algorithm Visualizer', icon: Cpu, badge: 'Interactive' },
    { path: '/ai-assistant', label: 'AI Doubt Solver', icon: Bot, badge: 'Assistant' },
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
          width: '260px',
          backgroundColor: 'var(--bg-secondary)',
          borderRight: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 40,
          transition: 'transform 0.3s ease',
        }}
        className={`sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}
      >
        {/* Brand Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            borderBottom: '1px solid var(--border-color)',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--accent-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              boxShadow: 'var(--shadow-glow)',
            }}
          >
            <GraduationCap size={24} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: '800', lineHeight: 1 }} className="gradient-text">
              LockIn
            </h1>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>
              STUDENT HUB
            </span>
          </div>
        </div>

        {/* Algorithm Gate Status & Streak Badge */}
        <div
          style={{
            margin: '1rem 1rem 0.5rem 1rem',
            padding: '0.85rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-tertiary)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.6rem',
            border: '1px solid var(--border-color)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: '700' }}>
            <Award size={16} /> Algorithm Gate Passed (&gt;=80%)
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.4rem', borderTop: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Flame size={18} color="var(--accent-amber)" />
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: '700' }}>7 Days</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Streak</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Zap size={18} color="var(--accent-cyan)" />
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: '700' }}>1,450 XP</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Level 4</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav style={{ padding: '0.75rem', flex: 1, overflowY: 'auto' }}>
          <div
            style={{
              fontSize: '0.7rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              padding: '0.5rem 0.75rem',
              letterSpacing: '0.05em',
            }}
          >
            Learning Platform
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
                  gap: '0.75rem',
                  padding: '0.75rem 0.85rem',
                  margin: '0.2rem 0',
                  borderRadius: 'var(--radius-md)',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: isActive ? '600' : '400',
                  color: isActive ? '#ffffff' : 'var(--text-secondary)',
                  backgroundColor: isActive ? 'var(--accent-primary)' : 'transparent',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? 'var(--shadow-glow)' : 'none',
                })}
              >
                <Icon size={19} />
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.badge && (
                  <span
                    style={{
                      fontSize: '0.65rem',
                      padding: '0.15rem 0.4rem',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Logout Footer */}
        <div style={{ padding: '1rem', borderTop: '1px solid var(--border-color)' }}>
          <button
            onClick={onLogout}
            style={{
              width: '100%',
              padding: '0.6rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(244,63,94,0.1)',
              color: 'var(--accent-rose)',
              border: '1px solid rgba(244,63,94,0.3)',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
            }}
          >
            <LogOut size={16} /> Reset & Restart Onboarding
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, marginLeft: '260px', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top Header */}
        <header
          style={{
            height: '64px',
            backgroundColor: 'var(--bg-glass)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 1.5rem',
            position: 'sticky',
            top: 0,
            zIndex: 30,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                color: 'var(--text-primary)',
                cursor: 'pointer',
              }}
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h2 style={{ fontSize: '1.15rem', fontWeight: '700' }}>{getPageTitle()}</h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Quick Search */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                padding: '0.4rem 0.8rem',
                borderRadius: 'var(--radius-full)',
                color: 'var(--text-secondary)',
                fontSize: '0.85rem',
                width: '220px',
              }}
            >
              <Search size={16} />
              <input
                type="text"
                placeholder="Search topics, notes..."
                style={{
                  background: 'none',
                  border: 'none',
                  outline: 'none',
                  color: 'var(--text-primary)',
                  width: '100%',
                  fontSize: '0.85rem',
                }}
              />
            </div>

            {/* Student Profile Avatar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--accent-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  fontSize: '0.9rem',
                  color: '#fff',
                }}
                title={user?.name || 'Student Profile'}
              >
                {user?.name ? user.name[0].toUpperCase() : 'S'}
              </div>

              {/* Settings & Template Customizer Icon */}
              <button
                onClick={() => setIsSettingsOpen(true)}
                style={{
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  padding: '0.5rem',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                title="Settings & App Layout Customizer"
              >
                <Settings size={18} />
              </button>
            </div>
          </div>
        </header>

        {/* Page View Body */}
        <main style={{ flex: 1, padding: '1.5rem', overflowY: 'auto' }}>
          <Outlet />
        </main>
      </div>

      {/* Settings Modal (App Layout Customizer & Inline Translation Config) */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        user={user}
      />
    </div>
  );
}
