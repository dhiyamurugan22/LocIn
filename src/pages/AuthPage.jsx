import React, { useState, useEffect } from 'react';
import { UserService } from '../services/api';
import { User, Lock, Mail, ShieldCheck, LogOut, CheckCircle } from 'lucide-react';

export default function AuthPage() {
  const [user, setUser] = useState(null);
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [msg, setMsg] = useState('');

  useEffect(() => {
    UserService.getProfile().then((res) => {
      if (res && res.email) setUser(res);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('Authenticating...');
    const result = await UserService.login(formData);
    setUser(result);
    setMsg('Successfully signed in!');
  };

  const handleLogout = () => {
    localStorage.removeItem('locin_user');
    localStorage.removeItem('locin_auth_token');
    setUser(null);
    setMsg('Logged out.');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {user ? (
        <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--accent-gradient)',
              margin: '0 auto 1rem auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '1.5rem',
              fontWeight: '800',
            }}
          >
            {user.name ? user.name[0].toUpperCase() : 'S'}
          </div>

          <h2 style={{ fontSize: '1.5rem', fontWeight: '800' }}>{user.name}</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{user.email}</p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              marginBottom: '1.5rem',
              textAlign: 'left',
            }}
          >
            <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Learning Streak</div>
              <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--accent-amber)' }}>{user.streak || 7} Days 🔥</div>
            </div>

            <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Student XP</div>
              <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--accent-cyan)' }}>{user.xp || 1450} XP</div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            style={{
              padding: '0.65rem 1.5rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(244, 63, 94, 0.2)',
              color: 'var(--accent-rose)',
              border: '1px solid var(--accent-rose)',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <LogOut size={18} /> Sign Out of LockIn
          </button>
        </div>
      ) : (
        <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', textAlign: 'center', marginBottom: '0.5rem' }}>
            {isRegister ? 'Create Student Account' : 'Sign In to LockIn'}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textAlign: 'center', marginBottom: '1.5rem' }}>
            Centralized authentication to save progress across coding, algorithms, and languages.
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {isRegister && (
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.3rem', display: 'block' }}>Username</label>
                <input
                  type="text"
                  required
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                  }}
                />
              </div>
            )}

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.3rem', display: 'block' }}>Student Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  outline: 'none',
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.3rem', display: 'block' }}>Password</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  outline: 'none',
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                padding: '0.75rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--accent-primary)',
                color: '#fff',
                border: 'none',
                fontWeight: '600',
                cursor: 'pointer',
                marginTop: '0.5rem',
              }}
            >
              {isRegister ? 'Sign Up' : 'Sign In'}
            </button>
          </form>

          {msg && (
            <div style={{ marginTop: '1rem', fontSize: '0.85rem', textAlign: 'center', color: 'var(--accent-emerald)' }}>
              {msg}
            </div>
          )}

          <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
            <span
              onClick={() => setIsRegister(!isRegister)}
              style={{ color: 'var(--accent-primary)', cursor: 'pointer', fontWeight: '600' }}
            >
              {isRegister ? 'Sign In' : 'Create one now'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
