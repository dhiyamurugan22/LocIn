import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import DashboardPage from './pages/DashboardPage';
import CoursesPage from './pages/CoursesPage';
import NotesPage from './pages/NotesPage';
import PracticePage from './pages/PracticePage';
import AIAssistantPage from './pages/AIAssistantPage';
import AlgorithmsPage from './pages/AlgorithmsPage';
import OnboardingWizard from './components/OnboardingWizard';
import { dbService } from './services/dbService';

export default function App() {
  const [user, setUser] = useState(null);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTheme, setActiveTheme] = useState(() => {
    return localStorage.getItem('locin_active_theme') || 'sepia';
  });

  // Apply Theme Class to <body>
  useEffect(() => {
    document.body.classList.remove('theme-sepia', 'theme-terminal');
    document.body.classList.add(`theme-${activeTheme}`);
    localStorage.setItem('locin_active_theme', activeTheme);
  }, [activeTheme]);

  // Load User Profile
  useEffect(() => {
    async function loadUser() {
      const storedUser = await dbService.getProfile();
      const status = localStorage.getItem('locin_onboarding_status');

      if (storedUser && (status === 'passed' || storedUser.onboarding_status === 'passed')) {
        setUser(storedUser);
        setIsOnboarded(true);
        if (storedUser.app_template === 'terminal') {
          setActiveTheme('terminal');
        }
      }
      setLoading(false);
    }
    loadUser();
  }, []);

  const toggleTheme = (themeName) => {
    const nextTheme = themeName || (activeTheme === 'sepia' ? 'terminal' : 'sepia');
    setActiveTheme(nextTheme);
    if (user) {
      dbService.updateProfile({ ...user, app_template: nextTheme });
    }
  };

  const handleOnboardingComplete = (userData) => {
    setUser(userData);
    setIsOnboarded(true);
  };

  const handleLogout = async () => {
    await dbService.logout();
    setUser(null);
    setIsOnboarded(false);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-primary)' }}>
        <div style={{ color: 'var(--accent-primary)', fontWeight: '700', fontSize: '1.2rem', fontFamily: 'var(--font-serif)' }}>
          Loading LockIn Dual-Theme Platform...
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      {!isOnboarded ? (
        <OnboardingWizard onComplete={handleOnboardingComplete} />
      ) : (
        <Routes>
          <Route element={<MainLayout user={user} activeTheme={activeTheme} onToggleTheme={toggleTheme} onLogout={handleLogout} />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage activeTheme={activeTheme} />} />
            <Route path="/notes" element={<NotesPage activeTheme={activeTheme} />} />
            <Route path="/courses" element={<CoursesPage activeTheme={activeTheme} />} />
            <Route path="/practice" element={<PracticePage activeTheme={activeTheme} />} />
            <Route path="/algorithms" element={<AlgorithmsPage activeTheme={activeTheme} />} />
            <Route path="/ai-assistant" element={<AIAssistantPage activeTheme={activeTheme} />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      )}
    </BrowserRouter>
  );
}
