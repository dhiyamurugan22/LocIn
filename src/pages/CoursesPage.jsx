import React from 'react';
import { Feather, Terminal, Sparkles, BookOpen, Layers, CheckCircle2, ArrowRight } from 'lucide-react';

const SKILL_TREES = [
  {
    id: 'tree-1',
    title: 'Data Structures & Algorithmic Thinking',
    description: 'From fundamental array pointers and recursion up to advanced graph trees and dynamic programming.',
    era: 'merged',
    progress: 85,
    modules: [
      { name: 'Arrays, Two Pointers & Hashing', era: 'terminal', status: 'Mastered' },
      { name: 'Linked Lists & Binary Search', era: 'terminal', status: 'Mastered' },
      { name: 'Trees, Graphs & Traversal (BFS/DFS)', era: 'sepia', status: 'In Progress' },
      { name: 'Dynamic Programming & Memoization', era: 'sepia', status: 'In Progress' },
    ]
  },
  {
    id: 'tree-2',
    title: 'Modern Web Architecture & Microservices',
    description: 'Building high-concurrency backend services, API gateways, and cloud database persistence.',
    era: 'terminal',
    progress: 60,
    modules: [
      { name: 'HTTP/2 REST APIs & Middleware', era: 'terminal', status: 'Mastered' },
      { name: 'Database Indexing & PostgreSQL', era: 'terminal', status: 'Mastered' },
      { name: 'Distributed Caching (Redis)', era: 'sepia', status: 'In Progress' },
      { name: 'Message Queues (Kafka)', era: 'sepia', status: 'Planned' },
    ]
  }
];

export default function CoursesPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header Banner */}
      <div className="merged-mastery-card" style={{ padding: '1.5rem 2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.78rem', color: 'var(--sepia-gold)', fontFamily: 'var(--font-serif)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
              <Layers size={15} /> Long-Arc Skill Trees
            </div>
            <h2 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-serif)', color: 'var(--sepia-text)' }}>
              Course Syllabus & Concept Trees
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0.9rem', borderRadius: 'var(--radius-full)', backgroundColor: 'rgba(212, 163, 89, 0.15)', border: '1px solid var(--sepia-border)', color: '#f4ebd9', fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}>
            <Sparkles size={14} /> Dual-Palette Progression
          </div>
        </div>
      </div>

      {/* Skill Trees List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {SKILL_TREES.map((tree) => (
          <div key={tree.id} className={tree.era === 'merged' ? 'merged-mastery-card' : 'terminal-card'} style={{ padding: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--sepia-gold)', fontFamily: 'var(--font-serif)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  SKILL TREE • {tree.progress}% MASTERED
                </span>
                <h3 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-serif)', color: '#f4ebd9', marginTop: '0.2rem' }}>
                  {tree.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--terminal-text-muted)', marginTop: '0.3rem', maxWidth: '750px' }}>
                  {tree.description}
                </p>
              </div>

              <div style={{ width: '140px' }}>
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--sepia-gold)', marginBottom: '0.3rem', textAlign: 'right' }}>
                  {tree.progress}% Mastery
                </div>
                <div style={{ height: '8px', backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                  <div style={{ width: `${tree.progress}%`, height: '100%', background: 'var(--merged-gold-cyan)' }} />
                </div>
              </div>
            </div>

            {/* Modules Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
              {tree.modules.map((mod, idx) => {
                const isSepia = mod.era === 'sepia';
                return (
                  <div
                    key={idx}
                    className={isSepia ? 'sepia-notebook' : 'terminal-card'}
                    style={{ padding: '1rem 1.2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                  >
                    <div style={{ fontSize: '0.7rem', color: isSepia ? 'var(--sepia-gold)' : 'var(--terminal-cyan)', fontFamily: isSepia ? 'var(--font-serif)' : 'var(--font-mono)', marginBottom: '0.4rem' }}>
                      MODULE {idx + 1} • {isSepia ? 'SEPIA NOTEBOOK' : 'TERMINAL IDE'}
                    </div>
                    <div style={{ fontSize: '0.92rem', fontWeight: '700', fontFamily: isSepia ? 'var(--font-serif)' : 'var(--font-heading)', color: isSepia ? 'var(--sepia-text)' : 'var(--terminal-text)' }}>
                      {mod.name}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.8rem', fontFamily: 'var(--font-mono)' }}>
                      {isSepia ? <Feather size={13} style={{ color: 'var(--sepia-gold)' }} /> : <Terminal size={13} style={{ color: 'var(--terminal-cyan)' }} />}
                      {mod.status}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
