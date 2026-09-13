import React, { useState, useEffect } from 'react';
import { dbService } from '../services/dbService';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Hourglass, Feather, Terminal, Sparkles, CheckCircle2, ArrowRight, Code2, BookOpen, Brain, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

const MASTERY_TREE = [
  { id: 1, title: 'Pointer Arithmetic & Memory Management', category: 'C++ Systems', status: 'mastered', era: 'merged', progress: 100, hours: 24 },
  { id: 2, title: 'Dynamic Programming & Memoization', category: 'Algorithms', status: 'solidified', era: 'terminal', progress: 85, hours: 38 },
  { id: 3, title: 'Graph Traversal (BFS & DFS Trees)', category: 'Data Structures', status: 'learning', era: 'sepia', progress: 45, hours: 16 },
  { id: 4, title: 'Asynchronous Event Loop & Promises', category: 'Web Architecture', status: 'learning', era: 'sepia', progress: 30, hours: 12 }
];

const WEEKLY_INVESTMENT = [
  { day: 'Mon', hours: 2.5, era: 'Sepia Study' },
  { day: 'Tue', hours: 4.0, era: 'Terminal Code' },
  { day: 'Wed', hours: 3.2, era: 'Sepia Study' },
  { day: 'Thu', hours: 5.1, era: 'Terminal Code' },
  { day: 'Fri', hours: 4.5, era: 'Merged Mastery' },
  { day: 'Sat', hours: 6.0, era: 'Merged Mastery' },
  { day: 'Sun', hours: 3.8, era: 'Sepia Study' },
];

export default function DashboardPage() {
  const [user, setUser] = useState({ name: 'Student Learner', streak: 7, xp: 1450 });

  useEffect(() => {
    async function loadProfile() {
      const profile = await dbService.getProfile();
      if (profile) setUser(profile);
    }
    loadProfile();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Top Welcome Banner - Merged Era Aesthetic */}
      <div className="merged-mastery-card" style={{ padding: '2rem 2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 0.8rem', borderRadius: 'var(--radius-full)', backgroundColor: 'rgba(212, 163, 89, 0.15)', color: 'var(--sepia-gold)', fontSize: '0.78rem', fontFamily: 'var(--font-serif)', marginBottom: '0.75rem', border: '1px solid rgba(212, 163, 89, 0.3)' }}>
              <Feather size={14} /> Era Transformation: Parchment → Terminal
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: '800', fontFamily: 'var(--font-serif)', color: 'var(--sepia-text)', marginBottom: '0.4rem' }}>
              Welcome back, <span className="gradient-text-merged">{user.name || 'Scholar'}</span>
            </h1>
            <p style={{ color: 'var(--terminal-text-muted)', fontSize: '0.98rem', maxWidth: '650px' }}>
              "Learning begins in the warm, fuzzy pages of a sepia notebook, and solidifies into clean, permanent code."
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            {/* Hourglass Time Invested Metric */}
            <div style={{ padding: '1rem 1.4rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'rgba(25, 21, 18, 0.8)', border: '1px solid var(--sepia-border)', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--sepia-gold)', fontFamily: 'var(--font-serif)', display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'center' }}>
                <Hourglass size={14} /> Time Invested
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--sepia-text)', fontFamily: 'var(--font-mono)' }}>
                {user.xp || 1450} hrs
              </div>
            </div>

            {/* Solidified Concepts Metric */}
            <div style={{ padding: '1rem 1.4rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'rgba(19, 25, 38, 0.8)', border: '1px solid var(--terminal-border)', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--terminal-cyan)', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'center' }}>
                <Terminal size={14} /> Solidified
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--terminal-cyan)', fontFamily: 'var(--font-mono)' }}>
                14 / 20 Topics
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        
        {/* Left Column: Long-Arc Mastery Skill Tree */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', color: 'var(--sepia-text)' }}>
                Long-Arc Mastery Tree
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Concepts shifting from warm sepia notebook notes to cool terminal mastery
              </p>
            </div>
            <Link to="/courses" style={{ color: 'var(--terminal-cyan)', fontSize: '0.85rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: '600' }}>
              View All Trees <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {MASTERY_TREE.map((item) => {
              const isSepia = item.era === 'sepia';
              const isTerminal = item.era === 'terminal';
              const isMerged = item.era === 'merged';

              return (
                <div
                  key={item.id}
                  className={isMerged ? 'merged-mastery-card' : isSepia ? 'sepia-notebook' : 'terminal-card'}
                  style={{ padding: '1.2rem 1.5rem' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <div>
                      <span
                        style={{
                          fontSize: '0.7rem',
                          fontFamily: isSepia ? 'var(--font-serif)' : 'var(--font-mono)',
                          color: isSepia ? 'var(--sepia-gold)' : isTerminal ? 'var(--terminal-cyan)' : 'var(--sepia-text)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em'
                        }}
                      >
                        {item.category} • {item.era.toUpperCase()} ERA
                      </span>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: '700', fontFamily: isSepia ? 'var(--font-serif)' : 'var(--font-heading)', marginTop: '0.15rem' }}>
                        {item.title}
                      </h4>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          padding: '0.3rem 0.75rem',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.75rem',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: '700',
                          backgroundColor: isMerged ? 'rgba(212, 163, 89, 0.2)' : isSepia ? 'rgba(212, 163, 89, 0.15)' : 'rgba(56, 189, 248, 0.15)',
                          color: isMerged ? '#f4ebd9' : isSepia ? 'var(--sepia-gold)' : 'var(--terminal-cyan)',
                          border: `1px solid ${isMerged ? 'var(--merged-border)' : isSepia ? 'var(--sepia-border)' : 'var(--terminal-border)'}`
                        }}
                      >
                        {isMerged ? <Sparkles size={13} /> : isSepia ? <Feather size={13} /> : <Terminal size={13} />}
                        {item.status.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Progress Light Bar */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ flex: 1, height: '8px', backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                      <div
                        style={{
                          width: `${item.progress}%`,
                          height: '100%',
                          background: isMerged ? 'var(--merged-gold-cyan)' : isSepia ? 'var(--sepia-gold)' : 'var(--terminal-cyan)',
                          transition: 'var(--transition-patient)'
                        }}
                      />
                    </div>
                    <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', fontWeight: '700', color: 'var(--text-muted)' }}>
                      {item.hours}h invested
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Time Investment Area Chart */}
          <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
            <h4 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-serif)', color: 'var(--sepia-text)', marginBottom: '0.5rem' }}>
              Weekly Study Investment (Hours Logged)
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Steady, patient hours building long-term intuition.
            </p>
            <div style={{ width: '100%', height: '220px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={WEEKLY_INVESTMENT}>
                  <defs>
                    <linearGradient id="timeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#d4a359" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="day" stroke="var(--text-muted)" fontSize={12} />
                  <YAxis stroke="var(--text-muted)" fontSize={12} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#191512', border: '1px solid #d4a359', borderRadius: '8px', color: '#f4ebd9' }}
                  />
                  <Area type="monotone" dataKey="hours" stroke="#d4a359" strokeWidth={3} fillOpacity={1} fill="url(#timeGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column: Quiet Study Tools & Merged Showcase */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Concept Era Legend */}
          <div className="glass-panel" style={{ padding: '1.4rem' }}>
            <h4 style={{ fontSize: '1rem', fontFamily: 'var(--font-serif)', color: 'var(--sepia-gold)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Layers size={18} /> The Two Learning Eras
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              <div style={{ padding: '0.8rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--sepia-surface)', borderLeft: '3px solid var(--sepia-gold)' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--sepia-text)', fontFamily: 'var(--font-serif)' }}>
                  1. Parchment & Sepia Era
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--sepia-text-muted)' }}>
                  Slow, handwritten exploration of new concepts still fuzzy in your head.
                </div>
              </div>

              <div style={{ padding: '0.8rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--terminal-surface)', borderLeft: '3px solid var(--terminal-cyan)' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--terminal-text)', fontFamily: 'var(--font-mono)' }}>
                  2. Cool Terminal Era
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--terminal-text-muted)' }}>
                  Clean IDE execution where logic turns into runnable, solid code.
                </div>
              </div>

              <div style={{ padding: '0.8rem', borderRadius: 'var(--radius-md)', background: 'linear-gradient(135deg, rgba(212,163,89,0.15) 0%, rgba(56,189,248,0.15) 100%)', borderLeft: '3px solid var(--sepia-gold)' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: '700', color: '#f4ebd9', fontFamily: 'var(--font-serif)' }}>
                  3. Merged Mastery State
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Concepts permanently woven into your thinking. Ready for real production projects.
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="glass-panel" style={{ padding: '1.4rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <h4 style={{ fontSize: '1rem', fontFamily: 'var(--font-serif)', color: 'var(--sepia-text)', marginBottom: '0.4rem' }}>
              Study Actions
            </h4>

            <Link to="/notes" className="btn-patient btn-patient-sepia" style={{ textDecoration: 'none', justifyContent: 'center' }}>
              <Feather size={18} /> Open Sepia Notebook
            </Link>

            <Link to="/practice" className="btn-patient btn-patient-terminal" style={{ textDecoration: 'none', justifyContent: 'center' }}>
              <Terminal size={18} /> Open Code Practice Lab
            </Link>

            <Link to="/ai-assistant" className="btn-patient" style={{ textDecoration: 'none', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.06)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}>
              <Brain size={18} /> Ask Gemini AI Mentor
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
