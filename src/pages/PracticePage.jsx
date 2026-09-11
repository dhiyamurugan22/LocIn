import React, { useState } from 'react';
import { COURSES, QUESTIONS } from '../../PracticeQuestionsModule';
import { Code2, Play, CheckCircle2, XCircle, ChevronRight, Award, Filter, Search, Sparkles } from 'lucide-react';

export default function PracticePage() {
  const [selectedCourse, setSelectedCourse] = useState('java');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [userCode, setUserCode] = useState('// Write your solution code here...\nfunction solution() {\n  return "Hello LockIn";\n}');
  const [consoleOutput, setConsoleOutput] = useState('');

  // Filter questions based on course, difficulty, and search
  const filteredQuestions = QUESTIONS.filter((q) => {
    const matchesCourse = q.courseId === selectedCourse;
    const matchesDiff = selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;
    const matchesSearch = q.title.toLowerCase().includes(searchQuery.toLowerCase()) || q.prompt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCourse && matchesDiff && matchesSearch;
  });

  const handleSelectQuestion = (q) => {
    setActiveQuestion(q);
    setSelectedOption(null);
    setSubmitted(false);
    setUserCode(`// Problem: ${q.title}\n// Language: ${COURSES.find(c => c.id === q.courseId)?.name}\n\npublic class Solution {\n    public static void main(String[] args) {\n        // Type code solution...\n    }\n}`);
    setConsoleOutput('');
  };

  const handleSubmitOption = () => {
    if (selectedOption !== null) {
      setSubmitted(true);
    }
  };

  const handleRunCode = () => {
    setConsoleOutput('Executing code against test cases...\nTest Case 1: PASSED (Execution time: 14ms)\nTest Case 2: PASSED (Memory: 38.4 MB)\n\nResult: ALL TEST CASES PASSED! 🎉');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Banner */}
      <div
        style={{
          padding: '1.25rem 1.5rem',
          borderRadius: 'var(--radius-lg)',
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '800' }}>
            Coding Practice & Problem Hub
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            LeetCode & GeeksforGeeks styled questions categorized by core courses and difficulty.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {['All', 'Easy', 'Medium', 'Hard'].map((diff) => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              style={{
                padding: '0.4rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-color)',
                fontSize: '0.8rem',
                fontWeight: '600',
                cursor: 'pointer',
                backgroundColor: selectedDifficulty === diff ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                color: '#fff',
              }}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Main Split Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: activeQuestion ? '320px 1fr' : '1fr',
          gap: '1.5rem',
          transition: 'all 0.3s ease',
        }}
      >
        {/* Course & Question Sidebar List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Courses Tabs */}
          <div className="glass-panel" style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
              Select Technical Course
            </div>
            <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
              {COURSES.map((course) => (
                <button
                  key={course.id}
                  onClick={() => {
                    setSelectedCourse(course.id);
                    setActiveQuestion(null);
                  }}
                  style={{
                    padding: '0.4rem 0.75rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    fontSize: '0.8rem',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    backgroundColor: selectedCourse === course.id ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                    color: selectedCourse === course.id ? '#fff' : 'var(--text-secondary)',
                  }}
                >
                  {course.name}
                </button>
              ))}
            </div>
          </div>

          {/* Question Filter & Search */}
          <div className="glass-panel" style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <Search size={16} color="var(--text-muted)" />
            <input
              type="text"
              placeholder="Filter questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                background: 'none',
                border: 'none',
                outline: 'none',
                color: 'var(--text-primary)',
                fontSize: '0.85rem',
                width: '100%',
              }}
            />
          </div>

          {/* Question List Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', maxHeight: '600px', overflowY: 'auto' }}>
            {filteredQuestions.map((q) => {
              const isSelected = activeQuestion?.id === q.id;
              const diffColor =
                q.difficulty === 'Easy' ? 'var(--accent-emerald)' : q.difficulty === 'Medium' ? 'var(--accent-amber)' : 'var(--accent-rose)';

              return (
                <div
                  key={q.id}
                  onClick={() => handleSelectQuestion(q)}
                  className="glass-panel"
                  style={{
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    borderLeft: `4px solid ${diffColor}`,
                    backgroundColor: isSelected ? 'rgba(99, 102, 241, 0.15)' : 'var(--bg-card)',
                    borderColor: isSelected ? 'var(--accent-primary)' : 'var(--border-color)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>{q.title}</span>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: '700',
                        color: diffColor,
                        padding: '0.1rem 0.4rem',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'rgba(255,255,255,0.05)',
                      }}
                    >
                      {q.difficulty}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {q.prompt}
                  </p>
                </div>
              );
            })}

            {filteredQuestions.length === 0 && (
              <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                No practice questions match your filter.
              </div>
            )}
          </div>
        </div>

        {/* Question Solver & Code Runner Panel */}
        {activeQuestion ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Question Card */}
            <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>{activeQuestion.title}</h2>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    padding: '0.2rem 0.6rem',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'var(--bg-tertiary)',
                    color: activeQuestion.difficulty === 'Easy' ? 'var(--accent-emerald)' : 'var(--accent-amber)',
                  }}
                >
                  {activeQuestion.difficulty}
                </span>
              </div>

              <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '1.25rem', lineHeight: '1.6' }}>
                {activeQuestion.prompt}
              </p>

              {/* Multiple Choice Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1rem' }}>
                {activeQuestion.options.map((opt, idx) => {
                  const isChoice = selectedOption === idx;
                  const isCorrect = idx === activeQuestion.correctIndex;
                  let bg = 'var(--bg-tertiary)';
                  let border = 'var(--border-color)';

                  if (submitted) {
                    if (isCorrect) {
                      bg = 'rgba(16, 185, 129, 0.2)';
                      border = 'var(--accent-emerald)';
                    } else if (isChoice) {
                      bg = 'rgba(244, 63, 94, 0.2)';
                      border = 'var(--accent-rose)';
                    }
                  } else if (isChoice) {
                    bg = 'rgba(99, 102, 241, 0.2)';
                    border = 'var(--accent-primary)';
                  }

                  return (
                    <div
                      key={idx}
                      onClick={() => !submitted && setSelectedOption(idx)}
                      style={{
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: bg,
                        border: `1px solid ${border}`,
                        cursor: submitted ? 'default' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '0.9rem',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <span>{opt}</span>
                      {submitted && isCorrect && <CheckCircle2 size={18} color="var(--accent-emerald)" />}
                      {submitted && isChoice && !isCorrect && <XCircle size={18} color="var(--accent-rose)" />}
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons & Explanation */}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                {!submitted ? (
                  <button
                    onClick={handleSubmitOption}
                    disabled={selectedOption === null}
                    style={{
                      padding: '0.5rem 1.25rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: selectedOption !== null ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                      color: '#fff',
                      border: 'none',
                      fontWeight: '600',
                      cursor: selectedOption !== null ? 'pointer' : 'not-allowed',
                    }}
                  >
                    Submit Answer
                  </button>
                ) : (
                  <div
                    style={{
                      padding: '0.85rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'rgba(99, 102, 241, 0.1)',
                      border: '1px solid var(--accent-primary)',
                      width: '100%',
                      fontSize: '0.85rem',
                    }}
                  >
                    <strong>Explanation:</strong> {activeQuestion.explanation}
                  </div>
                )}
              </div>
            </div>

            {/* Interactive Code Editor Simulator */}
            <div className="glass-panel" style={{ padding: '1.25rem', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Code2 size={18} color="var(--accent-cyan)" /> Code Runner Environment
                </span>
                <button
                  onClick={handleRunCode}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.4rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--accent-emerald)',
                    color: '#fff',
                    border: 'none',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                  }}
                >
                  <Play size={16} /> Run Code
                </button>
              </div>

              <textarea
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                style={{
                  width: '100%',
                  height: '140px',
                  backgroundColor: '#090d16',
                  color: '#a7f3d0',
                  fontFamily: 'monospace',
                  fontSize: '0.85rem',
                  padding: '0.85rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  outline: 'none',
                  resize: 'vertical',
                }}
              />

              {consoleOutput && (
                <div
                  style={{
                    marginTop: '0.75rem',
                    padding: '0.85rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: '#0f172a',
                    border: '1px solid var(--accent-emerald)',
                    fontFamily: 'monospace',
                    fontSize: '0.8rem',
                    color: '#34d399',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {consoleOutput}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div
            className="glass-panel"
            style={{
              padding: '3rem',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              color: 'var(--text-secondary)',
            }}
          >
            <Sparkles size={48} color="var(--accent-primary)" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-primary)' }}>
              Select a Question to Begin Practice
            </h3>
            <p style={{ maxWidth: '400px', fontSize: '0.875rem', marginTop: '0.5rem' }}>
              Choose a technical course on the left and select any problem to attempt the quiz and execute code solutions.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
