import React, { useState } from 'react';
import { BookOpen, Code, Layers, FileCode, CheckCircle2, PlayCircle, Star, Sparkles } from 'lucide-react';

const COURSES_DATA = [
  {
    id: 'dsa-mastery',
    title: 'Data Structures & Algorithms Mastery',
    category: 'Computer Science Core',
    level: 'Intermediate',
    lessons: 24,
    rating: 4.9,
    description: 'Master Big-O notation, Dynamic Programming, Graph Theory, and Advanced Tree Data Structures.',
    modules: ['Arrays & Hashing', 'Two Pointers & Sliding Window', 'Trees & BST', 'Graph Traversals (BFS/DFS)', 'Dynamic Programming'],
  },
  {
    id: 'system-design',
    title: 'Low Level & High Level System Design',
    category: 'Architecture & Scalability',
    level: 'Advanced',
    lessons: 18,
    rating: 4.8,
    description: 'Learn Object-Oriented Design Patterns, Microservices, Caching, Load Balancing, and Database Sharding.',
    modules: ['SOLID Principles', 'Design Patterns (Factory, Singleton, Observer)', 'System Architecture', 'Database Sharding'],
  },
  {
    id: 'fullstack-templates',
    title: 'Full-Stack Web Development & Project Templates',
    category: 'Application Development',
    level: 'Beginner to Advanced',
    lessons: 30,
    rating: 4.9,
    description: 'Starter boilerplates and project templates for React, Vite, Spring Boot, REST APIs, and Authentication.',
    modules: ['Vite + React Starter Boilerplate', 'Spring Boot REST Microservice Template', 'JWT Auth Architecture', 'Docker Compose Full-Stack Setup'],
  },
];

export default function CoursesPage() {
  const [selectedCourse, setSelectedCourse] = useState(COURSES_DATA[0]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Banner */}
      <div
        style={{
          padding: '1.5rem 2rem',
          borderRadius: 'var(--radius-lg)',
          background: 'linear-gradient(135deg, rgba(99,102,241,0.2) 0%, rgba(6,182,212,0.15) 100%)',
          border: '1px solid rgba(99,102,241,0.3)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--accent-emerald)', color: '#000', fontWeight: '800' }}>
              ✓ ALGORITHM GATE PASSED
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Full Access Unlocked</span>
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '800' }}>
            Computer Science Courses & Starter Templates
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Interactive structured courses, architectural templates, and starter projects.
          </p>
        </div>
      </div>

      {/* Grid of Courses & Templates */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {COURSES_DATA.map((course) => {
          const isSelected = selectedCourse.id === course.id;
          return (
            <div
              key={course.id}
              onClick={() => setSelectedCourse(course)}
              className="glass-panel"
              style={{
                padding: '1.5rem',
                borderRadius: 'var(--radius-lg)',
                border: isSelected ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--accent-primary)' }}>
                  {course.category}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.8rem', color: 'var(--accent-amber)' }}>
                  <Star size={14} fill="var(--accent-amber)" /> {course.rating}
                </div>
              </div>

              <h3 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '0.5rem' }}>
                {course.title}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: '1.5' }}>
                {course.description}
              </p>

              <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.75rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
                <span>📚 {course.lessons} Lessons</span>
                <span>•</span>
                <span>🎯 Level: {course.level}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Course / Template Detail View */}
      {selectedCourse && (
        <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', marginTop: '0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: '800' }}>
              Course Syllabus & Project Templates: <span className="gradient-text">{selectedCourse.title}</span>
            </h2>
            <button
              style={{
                padding: '0.6rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--accent-primary)',
                color: '#fff',
                border: 'none',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <PlayCircle size={18} /> Resume Learning Module
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            {selectedCourse.modules.map((mod, i) => (
              <div
                key={i}
                style={{
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}
              >
                <div style={{ width: '28px', height: '28px', borderRadius: 'var(--radius-full)', backgroundColor: 'rgba(99,102,241,0.2)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.8rem' }}>
                  {i + 1}
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>{mod}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
