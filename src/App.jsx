import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import DashboardPage from './pages/DashboardPage';
import CoursesPage from './pages/CoursesPage';
import PracticePage from './pages/PracticePage';
import AIAssistantPage from './pages/AIAssistantPage';
import AlgorithmsPage from './pages/AlgorithmsPage';
import OnboardingWizard from './components/OnboardingWizard';

export default function App() {
  const [user, setUser] = useState(null);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('locin_user');
    const status = localStorage.getItem('locin_onboarding_status');

    if (storedUser && status === 'passed') {
      try {
        setUser(JSON.parse(storedUser));
        setIsOnboarded(true);
      } catch (e) {
        console.error('Failed to parse user data:', e);
      }
    }
    setLoading(false);
  }, []);

  const handleOnboardingComplete = (userData) => {
    setUser(userData);
    setIsOnboarded(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('locin_user');
    localStorage.removeItem('locin_onboarding_status');
    localStorage.removeItem('locin_auth_token');
    setUser(null);
    setIsOnboarded(false);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-primary)' }}>
        <div style={{ color: 'var(--accent-primary)', fontWeight: '700', fontSize: '1.2rem' }}>
          Loading LockIn Student Hub...
        </div>
      </div>
    );
  }

  // Gated Onboarding Flow (Sign In -> Background Analysis -> Algorithm Test >=80%)
  if (!user || !isOnboarded) {
    return <OnboardingWizard onComplete={handleOnboardingComplete} />;
  }

  // Unlocked Platform Access
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout user={user} onLogout={handleLogout} />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="practice" element={<PracticePage />} />
          <Route path="algorithms" element={<AlgorithmsPage />} />
          <Route path="ai-assistant" element={<AIAssistantPage />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
