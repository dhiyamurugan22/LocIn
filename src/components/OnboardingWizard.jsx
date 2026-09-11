import React, { useState } from 'react';
import {
  Lock,
  UserCheck,
  Brain,
  GraduationCap,
  Sparkles,
  CheckCircle,
  XCircle,
  ArrowRight,
  BookOpen,
  Cpu,
  Award,
  RefreshCw
} from 'lucide-react';
import { UserService } from '../services/api';

const ALGORITHM_TEST_QUESTIONS = [
  {
    id: 1,
    question: "What is the worst-case time complexity of QuickSort?",
    options: ["O(N log N)", "O(N^2)", "O(N)", "O(1)"],
    correct: 1,
    topic: "Sorting Algorithms"
  },
  {
    id: 2,
    question: "Which data structure operates on a Last-In, First-Out (LIFO) basis?",
    options: ["Queue", "Binary Tree", "Stack", "Linked List"],
    correct: 2,
    topic: "Data Structures"
  },
  {
    id: 3,
    question: "What is the average time complexity to search an element in a balanced Binary Search Tree (BST)?",
    options: ["O(1)", "O(N)", "O(log N)", "O(N^2)"],
    correct: 2,
    topic: "Tree Data Structures"
  },
  {
    id: 4,
    question: "Which algorithm traversal uses a Queue data structure under the hood?",
    options: ["Depth-First Search (DFS)", "Breadth-First Search (BFS)", "In-Order Traversal", "Pre-Order Traversal"],
    correct: 1,
    topic: "Graph Algorithms"
  },
  {
    id: 5,
    question: "What is the time complexity of Binary Search on a sorted array of size N?",
    options: ["O(log N)", "O(N)", "O(N log N)", "O(1)"],
    correct: 0,
    topic: "Searching Algorithms"
  },
  {
    id: 6,
    question: "In Dijkstra's algorithm for shortest path, which data structure is most efficient to extract the minimum distance node?",
    options: ["Unsorted Array", "Min-Heap / Priority Queue", "Stack", "Doubly Linked List"],
    correct: 1,
    topic: "Graph Algorithms"
  },
  {
    id: 7,
    question: "What property must a binary tree satisfy to be considered a Max-Heap?",
    options: [
      "Every node's value must be less than its children",
      "Every parent node's value must be greater than or equal to its children",
      "All leaf nodes must be at the exact same depth",
      "The root node must always equal 0"
    ],
    correct: 1,
    topic: "Heap & Tree Structures"
  },
  {
    id: 8,
    question: "Which sorting algorithm is guaranteed to be stable and run in O(N log N) time worst-case?",
    options: ["MergeSort", "QuickSort", "SelectionSort", "BubbleSort"],
    correct: 0,
    topic: "Sorting Algorithms"
  },
  {
    id: 9,
    question: "What is the space complexity of a recursive Depth-First Search on a tree of height H?",
    options: ["O(1)", "O(H)", "O(2^H)", "O(N^2)"],
    correct: 1,
    topic: "Recursion & Trees"
  },
  {
    id: 10,
    question: "Dynamic Programming optimization requires which two primary properties?",
    options: [
      "Optimal Substructure & Overlapping Subproblems",
      "Greedy Choice & Sorting",
      "Randomization & Divide-and-Conquer",
      "Linear Search & Hash Maps"
    ],
    correct: 0,
    topic: "Dynamic Programming"
  }
];

export default function OnboardingWizard({ onComplete }) {
  const [step, setStep] = useState('auth');

  // Auth Form State
  const [isRegister, setIsRegister] = useState(false);
  const [authData, setAuthData] = useState({ username: '', email: '', password: '' });
  const [authUser, setAuthUser] = useState(null);

  // Expanded Background Analysis State with "None" and "Other" options for all questions
  const [analysisData, setAnalysisData] = useState({
    fieldOfStudy: 'Computer Science & Engineering',
    customFieldOfStudy: '',
    spokenLanguage: 'English',
    customSpokenLanguage: '',
    programmingLanguage: 'Java',
    customProgrammingLanguage: '',
    academicYear: '3rd Year Undergraduate',
    customAcademicYear: '',
    targetRole: 'Software Engineer / Backend Developer',
    customTargetRole: '',
    experienceLevel: 'beginner', // 'beginner' | 'non-beginner'
  });

  // Algorithm Test State
  const [userAnswers, setUserAnswers] = useState({});
  const [testResult, setTestResult] = useState(null);

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    const user = await UserService.login({
      username: authData.username || 'Student Learner',
      email: authData.email || 'student@locin.edu',
    });
    setAuthUser(user);
    setStep('analysis');
  };

  const handleAnalysisSubmit = (e) => {
    e.preventDefault();

    // Store chosen target spoken language into localStorage for Inline Translation
    const targetSpokenLang =
      analysisData.spokenLanguage === 'Other'
        ? 'es'
        : analysisData.spokenLanguage.toLowerCase().slice(0, 2);
    localStorage.setItem('locin_target_lang', targetSpokenLang || 'es');

    if (analysisData.experienceLevel === 'beginner') {
      setStep('learn');
    } else {
      setStep('test');
    }
  };

  const handleTestSubmit = () => {
    let correctCount = 0;
    ALGORITHM_TEST_QUESTIONS.forEach((q) => {
      if (userAnswers[q.id] === q.correct) {
        correctCount += 1;
      }
    });

    const percentage = Math.round((correctCount / ALGORITHM_TEST_QUESTIONS.length) * 100);
    const passed = percentage >= 80;

    const result = {
      score: correctCount,
      total: ALGORITHM_TEST_QUESTIONS.length,
      percentage,
      passed,
    };

    setTestResult(result);
    setStep('result');
  };

  const handleFinalUnlock = () => {
    const completeUserData = {
      ...authUser,
      analysis: analysisData,
      testResult,
      algorithmGatePassed: true,
    };
    localStorage.setItem('locin_user', JSON.stringify(completeUserData));
    localStorage.setItem('locin_onboarding_status', 'passed');
    onComplete(completeUserData);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem',
      }}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '820px',
          borderRadius: 'var(--radius-lg)',
          padding: '2.5rem',
          boxShadow: 'var(--shadow-glow)',
          border: '1px solid var(--border-color)',
        }}
      >
        {/* Step Indicator Header */}
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <GraduationCap size={32} color="var(--accent-primary)" />
            <h1 style={{ fontSize: '1.75rem', fontWeight: '800' }} className="gradient-text">
              LockIn Onboarding & Background Profiler
            </h1>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Tailoring your student profile and algorithm qualification path.
          </p>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '1.5rem',
              position: 'relative',
            }}
          >
            {[
              { key: 'auth', label: '1. Sign In' },
              { key: 'analysis', label: '2. Background' },
              { key: 'learn', label: '3. Learn Algo' },
              { key: 'test', label: '4. Algo Test' },
              { key: 'result', label: '5. Unlock Gate' },
            ].map((st, i) => {
              const isCurrent = step === st.key;
              const isDone =
                (st.key === 'auth' && step !== 'auth') ||
                (st.key === 'analysis' && (step === 'learn' || step === 'test' || step === 'result')) ||
                (st.key === 'learn' && (step === 'test' || step === 'result')) ||
                (st.key === 'test' && step === 'result');

              return (
                <div key={st.key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2 }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: isDone ? 'var(--accent-emerald)' : isCurrent ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                      color: isDone || isCurrent ? '#fff' : 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '700',
                      fontSize: '0.85rem',
                      border: '1px solid var(--border-color)',
                      marginBottom: '0.4rem',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {isDone ? '✓' : i + 1}
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: isCurrent ? '700' : '400', color: isCurrent ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                    {st.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* STEP 1: AUTHENTICATION */}
        {step === 'auth' && (
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: '800', marginBottom: '0.5rem', textAlign: 'center' }}>
              {isRegister ? 'Step 1: Create Student Account' : 'Step 1: Sign In to LockIn'}
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '1.5rem' }}>
              Sign in or create your student account to start background analysis.
            </p>

            <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '480px', margin: '0 auto' }}>
              {isRegister && (
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.3rem', display: 'block' }}>Full Name</label>
                  <input
                    type="text"
                    required
                    value={authData.username}
                    onChange={(e) => setAuthData({ ...authData, username: e.target.value })}
                    placeholder="John Doe"
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
                  value={authData.email}
                  onChange={(e) => setAuthData({ ...authData, email: e.target.value })}
                  placeholder="student@locin.edu"
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
                  value={authData.password}
                  onChange={(e) => setAuthData({ ...authData, password: e.target.value })}
                  placeholder="••••••••"
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
                  padding: '0.85rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--accent-primary)',
                  color: '#fff',
                  border: 'none',
                  fontWeight: '700',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  marginTop: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                }}
              >
                Continue to Background Analysis <ArrowRight size={18} />
              </button>

              <div style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '1rem' }}>
                {isRegister ? 'Already registered?' : "Don't have an account?"}{' '}
                <span
                  onClick={() => setIsRegister(!isRegister)}
                  style={{ color: 'var(--accent-primary)', fontWeight: '700', cursor: 'pointer' }}
                >
                  {isRegister ? 'Sign In' : 'Create Account'}
                </span>
              </div>
            </form>
          </div>
        )}

        {/* STEP 2: EXPANDED BACKGROUND ANALYSIS (WITH NONE & OTHER OPTIONS) */}
        {step === 'analysis' && (
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: '800', marginBottom: '0.5rem', textAlign: 'center' }}>
              Step 2: Background Analysis & Profiler
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '1.5rem' }}>
              Answer these background questions. Every question includes <strong>None</strong> and <strong>Other</strong> options.
            </p>

            <form onSubmit={handleAnalysisSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '640px', margin: '0 auto' }}>
              {/* Question 1: Field of Study */}
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.3rem', display: 'block' }}>
                  1. What field are you studying?
                </label>
                <select
                  value={analysisData.fieldOfStudy}
                  onChange={(e) => setAnalysisData({ ...analysisData, fieldOfStudy: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                  }}
                >
                  <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="AI & Data Science">AI & Data Science</option>
                  <option value="Electronics & Communication">Electronics & Communication</option>
                  <option value="High School / Pre-College">High School / Pre-College</option>
                  <option value="None">None (Not currently studying a formal degree)</option>
                  <option value="Other">Other (Specify below)</option>
                </select>
                {analysisData.fieldOfStudy === 'Other' && (
                  <input
                    type="text"
                    placeholder="Specify your field of study..."
                    value={analysisData.customFieldOfStudy}
                    onChange={(e) => setAnalysisData({ ...analysisData, customFieldOfStudy: e.target.value })}
                    style={{
                      width: '100%',
                      marginTop: '0.5rem',
                      padding: '0.6rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-tertiary)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
                      fontSize: '0.85rem',
                    }}
                  />
                )}
              </div>

              {/* Question 2: Spoken / Native Language */}
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.3rem', display: 'block' }}>
                  2. What primary Spoken / Native Language do you communicate in?
                </label>
                <select
                  value={analysisData.spokenLanguage}
                  onChange={(e) => setAnalysisData({ ...analysisData, spokenLanguage: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                  }}
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi (हिन्दी)</option>
                  <option value="Tamil">Tamil (தமிழ்)</option>
                  <option value="Telugu">Telugu (తెలుగు)</option>
                  <option value="Malayalam">Malayalam (മലയാളം)</option>
                  <option value="Kannada">Kannada (கன்னடம்)</option>
                  <option value="Spanish">Spanish (Español)</option>
                  <option value="French">French (Français)</option>
                  <option value="German">German (Deutsch)</option>
                  <option value="Mandarin">Mandarin (中文)</option>
                  <option value="None">None</option>
                  <option value="Other">Other (Specify below)</option>
                </select>
                {analysisData.spokenLanguage === 'Other' && (
                  <input
                    type="text"
                    placeholder="Specify your primary spoken language..."
                    value={analysisData.customSpokenLanguage}
                    onChange={(e) => setAnalysisData({ ...analysisData, customSpokenLanguage: e.target.value })}
                    style={{
                      width: '100%',
                      marginTop: '0.5rem',
                      padding: '0.6rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-tertiary)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
                      fontSize: '0.85rem',
                    }}
                  />
                )}
              </div>

              {/* Question 3: Programming Language Preference */}
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.3rem', display: 'block' }}>
                  3. Which Programming Language are you comfortable with?
                </label>
                <select
                  value={analysisData.programmingLanguage}
                  onChange={(e) => setAnalysisData({ ...analysisData, programmingLanguage: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                  }}
                >
                  <option value="Java">Java</option>
                  <option value="C++">C++</option>
                  <option value="Python">Python</option>
                  <option value="JavaScript/TypeScript">JavaScript / TypeScript</option>
                  <option value="Go">Go</option>
                  <option value="Rust">Rust</option>
                  <option value="None">None (I don't know any programming language yet)</option>
                  <option value="Other">Other (Specify below)</option>
                </select>
                {analysisData.programmingLanguage === 'Other' && (
                  <input
                    type="text"
                    placeholder="Specify programming language..."
                    value={analysisData.customProgrammingLanguage}
                    onChange={(e) => setAnalysisData({ ...analysisData, customProgrammingLanguage: e.target.value })}
                    style={{
                      width: '100%',
                      marginTop: '0.5rem',
                      padding: '0.6rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-tertiary)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
                      fontSize: '0.85rem',
                    }}
                  />
                )}
              </div>

              {/* Question 4: Academic Level / Year */}
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.3rem', display: 'block' }}>
                  4. Academic Level / Year
                </label>
                <select
                  value={analysisData.academicYear}
                  onChange={(e) => setAnalysisData({ ...analysisData, academicYear: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                  }}
                >
                  <option value="1st Year Undergraduate">1st Year Undergraduate</option>
                  <option value="2nd Year Undergraduate">2nd Year Undergraduate</option>
                  <option value="3rd Year Undergraduate">3rd Year Undergraduate</option>
                  <option value="4th Year / Final Year">4th Year / Final Year</option>
                  <option value="Postgraduate / Master's">Postgraduate / Master's</option>
                  <option value="None">None (Not enrolled in an academic program)</option>
                  <option value="Other">Other (Specify below)</option>
                </select>
                {analysisData.academicYear === 'Other' && (
                  <input
                    type="text"
                    placeholder="Specify academic year..."
                    value={analysisData.customAcademicYear}
                    onChange={(e) => setAnalysisData({ ...analysisData, customAcademicYear: e.target.value })}
                    style={{
                      width: '100%',
                      marginTop: '0.5rem',
                      padding: '0.6rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-tertiary)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
                      fontSize: '0.85rem',
                    }}
                  />
                )}
              </div>

              {/* Question 5: Target Career Role */}
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.3rem', display: 'block' }}>
                  5. Target Career Goal
                </label>
                <select
                  value={analysisData.targetRole}
                  onChange={(e) => setAnalysisData({ ...analysisData, targetRole: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                  }}
                >
                  <option value="Software Engineer / Backend Developer">Software Engineer / Backend Developer</option>
                  <option value="Full Stack Web Developer">Full Stack Web Developer</option>
                  <option value="AI / Data Engineer">AI / Data Engineer</option>
                  <option value="Competitive Programmer">Competitive Programmer</option>
                  <option value="None">None (Exploring general knowledge)</option>
                  <option value="Other">Other (Specify below)</option>
                </select>
                {analysisData.targetRole === 'Other' && (
                  <input
                    type="text"
                    placeholder="Specify target career goal..."
                    value={analysisData.customTargetRole}
                    onChange={(e) => setAnalysisData({ ...analysisData, customTargetRole: e.target.value })}
                    style={{
                      width: '100%',
                      marginTop: '0.5rem',
                      padding: '0.6rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-tertiary)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
                      fontSize: '0.85rem',
                    }}
                  />
                )}
              </div>

              {/* Question 6: DSA Experience Level */}
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.5rem', display: 'block' }}>
                  6. Self-Assessed Experience Level with Data Structures & Algorithms
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div
                    onClick={() => setAnalysisData({ ...analysisData, experienceLevel: 'beginner' })}
                    style={{
                      padding: '1.25rem',
                      borderRadius: 'var(--radius-md)',
                      border: analysisData.experienceLevel === 'beginner' ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)',
                      backgroundColor: analysisData.experienceLevel === 'beginner' ? 'rgba(99,102,241,0.1)' : 'var(--bg-tertiary)',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ fontWeight: '700', fontSize: '0.95rem', marginBottom: '0.25rem' }}>🌱 Beginner</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      New to algorithms. Teach me concepts before the qualification test.
                    </div>
                  </div>

                  <div
                    onClick={() => setAnalysisData({ ...analysisData, experienceLevel: 'non-beginner' })}
                    style={{
                      padding: '1.25rem',
                      borderRadius: 'var(--radius-md)',
                      border: analysisData.experienceLevel === 'non-beginner' ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)',
                      backgroundColor: analysisData.experienceLevel === 'non-beginner' ? 'rgba(99,102,241,0.1)' : 'var(--bg-tertiary)',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ fontWeight: '700', fontSize: '0.95rem', marginBottom: '0.25rem' }}>⚡ Experienced / Non-Beginner</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      I know algorithms. Take me straight to the Algorithm Diagnostic Test.
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                style={{
                  padding: '0.85rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--accent-primary)',
                  color: '#fff',
                  border: 'none',
                  fontWeight: '700',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  marginTop: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                }}
              >
                {analysisData.experienceLevel === 'beginner' ? 'Start Algorithm Learning Path' : 'Proceed to Algorithm Diagnostic Test'} <ArrowRight size={18} />
              </button>
            </form>
          </div>
        )}

        {/* STEP 3: ALGORITHM LEARNING FOR BEGINNERS */}
        {step === 'learn' && (
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: '800', marginBottom: '0.5rem', textAlign: 'center' }}>
              Step 3: Algorithm Learning Essentials
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '1.5rem' }}>
              Review these core algorithm concepts tailored for <strong>{analysisData.programmingLanguage}</strong>.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <h4 style={{ color: 'var(--accent-cyan)', fontWeight: '700', marginBottom: '0.4rem' }}>1. Time & Space Complexity (Big-O)</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  Measures algorithm efficiency. O(1) &lt; O(log N) &lt; O(N) &lt; O(N log N) &lt; O(N^2).
                </p>
              </div>

              <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <h4 style={{ color: 'var(--accent-emerald)', fontWeight: '700', marginBottom: '0.4rem' }}>2. Sorting & Binary Search</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  Binary search requires a sorted array and runs in O(log N) time. QuickSort & MergeSort run in O(N log N).
                </p>
              </div>

              <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <h4 style={{ color: 'var(--accent-amber)', fontWeight: '700', marginBottom: '0.4rem' }}>3. Stacks & Queues</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  Stack is LIFO (Last-In-First-Out). Queue is FIFO (First-In-First-Out, used in BFS).
                </p>
              </div>

              <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <h4 style={{ color: 'var(--accent-rose)', fontWeight: '700', marginBottom: '0.4rem' }}>4. Trees & Graphs</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  BFS uses Queue for level-by-level traversal. DFS uses Stack or recursion for deep paths.
                </p>
              </div>
            </div>

            <button
              onClick={() => setStep('test')}
              style={{
                width: '100%',
                padding: '0.85rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--accent-primary)',
                color: '#fff',
                border: 'none',
                fontWeight: '700',
                cursor: 'pointer',
                fontSize: '0.95rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
              }}
            >
              Take the Algorithm Test <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* STEP 4: ALGORITHM TEST */}
        {step === 'test' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '800' }}>
                Step 4: Algorithm Qualification Test (Pass Bar: &gt;= 80%)
              </h2>
              <span style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--accent-amber)', color: '#000', fontWeight: '700' }}>
                10 Questions
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxHeight: '55vh', overflowY: 'auto', paddingRight: '0.5rem', marginBottom: '1.5rem' }}>
              {ALGORITHM_TEST_QUESTIONS.map((q, idx) => (
                <div key={q.id} style={{ padding: '1.25rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', fontWeight: '700', marginBottom: '0.25rem' }}>
                    Question {idx + 1} of 10 • {q.topic}
                  </div>
                  <div style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '0.85rem' }}>
                    {q.question}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {q.options.map((opt, optIdx) => (
                      <label
                        key={optIdx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          padding: '0.65rem 0.85rem',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: userAnswers[q.id] === optIdx ? 'rgba(99,102,241,0.2)' : 'var(--bg-secondary)',
                          border: userAnswers[q.id] === optIdx ? '1px solid var(--accent-primary)' : '1px solid transparent',
                          cursor: 'pointer',
                          fontSize: '0.85rem',
                        }}
                      >
                        <input
                          type="radio"
                          name={`q-${q.id}`}
                          checked={userAnswers[q.id] === optIdx}
                          onChange={() => setUserAnswers({ ...userAnswers, [q.id]: optIdx })}
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleTestSubmit}
              disabled={Object.keys(userAnswers).length < ALGORITHM_TEST_QUESTIONS.length}
              style={{
                width: '100%',
                padding: '0.85rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: Object.keys(userAnswers).length === ALGORITHM_TEST_QUESTIONS.length ? 'var(--accent-emerald)' : 'var(--bg-tertiary)',
                color: '#fff',
                border: 'none',
                fontWeight: '700',
                cursor: Object.keys(userAnswers).length === ALGORITHM_TEST_QUESTIONS.length ? 'pointer' : 'not-allowed',
                fontSize: '0.95rem',
              }}
            >
              {Object.keys(userAnswers).length === ALGORITHM_TEST_QUESTIONS.length
                ? 'Submit Test & Calculate Score'
                : `Answer All Questions to Submit (${Object.keys(userAnswers).length}/10 Answered)`}
            </button>
          </div>
        )}

        {/* STEP 5: RESULT */}
        {step === 'result' && testResult && (
          <div style={{ textAlign: 'center' }}>
            {testResult.passed ? (
              <div>
                <div
                  style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'rgba(16, 185, 129, 0.2)',
                    color: 'var(--accent-emerald)',
                    margin: '0 auto 1rem auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Award size={40} />
                </div>
                <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--accent-emerald)', marginBottom: '0.5rem' }}>
                  🎉 Qualification Passed! ({testResult.percentage}%)
                </h2>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  You scored <strong>{testResult.score} out of 10</strong> (Required: &gt;= 80%). You have officially passed the algorithm gate and unlocked full platform access!
                </p>

                <button
                  onClick={handleFinalUnlock}
                  style={{
                    width: '100%',
                    padding: '0.9rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--accent-primary)',
                    color: '#fff',
                    border: 'none',
                    fontWeight: '800',
                    cursor: 'pointer',
                    fontSize: '1rem',
                  }}
                >
                  Enter LockIn Platform <ArrowRight size={20} style={{ verticalAlign: 'middle' }} />
                </button>
              </div>
            ) : (
              <div>
                <div
                  style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'rgba(244, 63, 94, 0.2)',
                    color: 'var(--accent-rose)',
                    margin: '0 auto 1rem auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <XCircle size={40} />
                </div>
                <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--accent-rose)', marginBottom: '0.5rem' }}>
                  Requirement Not Met ({testResult.percentage}%)
                </h2>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  You scored <strong>{testResult.score} out of 10</strong>. You need at least <strong>80% (8/10)</strong> to unlock courses and practice questions.
                </p>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button
                    onClick={() => setStep('learn')}
                    style={{
                      flex: 1,
                      padding: '0.8rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-tertiary)',
                      color: 'var(--text-primary)',
                      border: '1px solid var(--border-color)',
                      fontWeight: '700',
                      cursor: 'pointer',
                    }}
                  >
                    Review Algorithm Lessons
                  </button>

                  <button
                    onClick={() => {
                      setUserAnswers({});
                      setStep('test');
                    }}
                    style={{
                      flex: 1,
                      padding: '0.8rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--accent-primary)',
                      color: '#fff',
                      border: 'none',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <RefreshCw size={18} /> Retake Test
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
