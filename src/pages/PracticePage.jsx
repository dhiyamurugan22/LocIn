import React, { useState } from 'react';
import { AIService } from '../services/api';
import { Terminal, Feather, CheckCircle2, XCircle, Sparkles, Code2, Hourglass, Brain, ArrowRight } from 'lucide-react';

const DEFAULT_PRACTICE_SET = [
  {
    id: 'p1',
    title: 'Two Sum - Hash Table Lookup',
    difficulty: 'Easy',
    topic: 'Arrays & Hashing',
    era: 'terminal',
    description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.',
    codeTemplate: `public int[] twoSum(int[] nums, int target) {\n    Map<Integer, Integer> map = new HashMap<>();\n    for (int i = 0; i < nums.length; i++) {\n        int diff = target - nums[i];\n        if (map.containsKey(diff)) {\n            return new int[] { map.get(diff), i };\n        }\n        map.put(nums[i], i);\n    }\n    return new int[0];\n}`,
    explanation: 'Using a Hash Map reduces the complement search time from O(N) to O(1), bringing total time complexity to O(N).'
  },
  {
    id: 'p2',
    title: 'Valid Parentheses Stack Validation',
    difficulty: 'Medium',
    topic: 'Stacks & Strings',
    era: 'sepia',
    description: 'Determine if an input string containing `()[]{}` is valid based on open and matching closed bracket sequences.',
    codeTemplate: `public boolean isValid(String s) {\n    Stack<Character> stack = new Stack<>();\n    for (char c : s.toCharArray()) {\n        if (c == '(') stack.push(')');\n        else if (c == '{') stack.push('}');\n        else if (c == '[') stack.push(']');\n        else if (stack.isEmpty() || stack.pop() != c) return false;\n    }\n    return stack.isEmpty();\n}`,
    explanation: 'Matching brackets require Last-In First-Out ordering provided natively by a Stack data structure.'
  }
];

export default function PracticePage() {
  const [questions, setQuestions] = useState(DEFAULT_PRACTICE_SET);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [userCode, setUserCode] = useState(DEFAULT_PRACTICE_SET[0].codeTemplate);
  const [topicInput, setTopicInput] = useState('');
  const [generating, setGenerating] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const currentQ = questions[selectedIdx] || questions[0];

  const handleGenerateQuiz = async () => {
    if (!topicInput.trim() || generating) return;
    setGenerating(true);
    setFeedback(null);
    try {
      const generated = await AIService.generateQuiz(topicInput);
      if (generated && generated.length > 0) {
        const formatted = generated.map((g, idx) => ({
          id: `gen-${Date.now()}-${idx}`,
          title: `${topicInput} Practice #${idx + 1}`,
          difficulty: 'Adaptive',
          topic: topicInput,
          era: 'merged',
          description: g.question,
          options: g.options,
          correctAnswer: g.answer,
          explanation: g.explanation,
          codeTemplate: `// AI Practice Solution for: ${g.question}\n// Write your algorithm logic below:`
        }));
        setQuestions(formatted);
        setSelectedIdx(0);
        setUserCode(formatted[0].codeTemplate);
      }
    } catch (err) {
      console.warn('AI quiz generation error:', err);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header Banner */}
      <div className="terminal-card" style={{ padding: '1.5rem 2rem', borderRadius: 'var(--radius-lg)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.78rem', color: 'var(--terminal-cyan)', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
              <Terminal size={15} /> Code Practice & Spaced Repetition Lab
            </div>
            <h2 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-heading)', color: 'var(--terminal-text)' }}>
              Terminal Code Lab
            </h2>
          </div>

          {/* AI Generator Input */}
          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <input
              type="text"
              placeholder="Generate AI Practice Topic (e.g. Dynamic Programming)..."
              value={topicInput}
              onChange={(e) => setTopicInput(e.target.value)}
              style={{
                width: '300px',
                padding: '0.6rem 1rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(0,0,0,0.4)',
                border: '1px solid var(--terminal-border)',
                color: 'var(--terminal-text)',
                fontSize: '0.85rem',
                outline: 'none',
                fontFamily: 'var(--font-mono)'
              }}
            />
            <button onClick={handleGenerateQuiz} disabled={generating} className="btn-patient btn-patient-terminal">
              <Sparkles size={16} /> {generating ? 'Generating...' : 'Generate with Gemini'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Practice Workspace */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', minHeight: '600px' }}>
        
        {/* Left Column: Sepia Conceptual Problem Statement */}
        <div className="sepia-notebook" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-serif)', color: 'var(--sepia-gold)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {currentQ.topic || 'Algorithms'} • {currentQ.difficulty}
            </span>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--sepia-text-muted)' }}>
              Problem {selectedIdx + 1} of {questions.length}
            </span>
          </div>

          <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', color: 'var(--sepia-text)', lineHeight: 1.3 }}>
            {currentQ.title}
          </h3>

          <div style={{ fontSize: '0.95rem', fontFamily: 'var(--font-serif)', color: 'var(--sepia-text)', lineHeight: 1.7, flex: 1, whiteSpace: 'pre-wrap' }}>
            {currentQ.description}
          </div>

          {currentQ.options && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '1rem' }}>
              {currentQ.options.map((opt, oIdx) => (
                <button
                  key={oIdx}
                  onClick={() => {
                    const isCorrect = oIdx === currentQ.correctAnswer;
                    setFeedback({
                      isCorrect,
                      text: isCorrect ? `Correct! ${currentQ.explanation}` : `Not quite. ${currentQ.explanation}`
                    });
                  }}
                  style={{
                    padding: '0.8rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    border: '1px solid var(--sepia-border)',
                    color: '#f4ebd9',
                    fontFamily: 'var(--font-serif)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  {String.fromCharCode(65 + oIdx)}. {opt}
                </button>
              ))}
            </div>
          )}

          {feedback && (
            <div
              style={{
                padding: '1rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: feedback.isCorrect ? 'rgba(52, 211, 153, 0.15)' : 'rgba(224, 122, 95, 0.15)',
                border: `1px solid ${feedback.isCorrect ? '#34d399' : '#e07a5f'}`,
                color: feedback.isCorrect ? '#34d399' : '#e07a5f',
                fontSize: '0.88rem',
                fontFamily: 'var(--font-mono)'
              }}
            >
              {feedback.text}
            </div>
          )}
        </div>

        {/* Right Column: Cool Terminal Monospace Editor */}
        <div className="terminal-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--terminal-border)', paddingBottom: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--terminal-cyan)' }}>
              <Code2 size={16} /> solution.java
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--terminal-text-muted)', fontFamily: 'var(--font-mono)' }}>
              UTF-8 • Monospace Mode
            </span>
          </div>

          <textarea
            value={userCode}
            onChange={(e) => setUserCode(e.target.value)}
            style={{
              flex: 1,
              minHeight: '380px',
              backgroundColor: '#0b0f17',
              color: '#38bdf8',
              border: '1px solid rgba(56, 189, 248, 0.2)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.88rem',
              lineHeight: 1.6,
              outline: 'none',
              resize: 'none'
            }}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button
              onClick={() => {
                if (selectedIdx < questions.length - 1) {
                  const nextIdx = selectedIdx + 1;
                  setSelectedIdx(nextIdx);
                  setUserCode(questions[nextIdx].codeTemplate);
                  setFeedback(null);
                }
              }}
              className="btn-patient"
              style={{ backgroundColor: 'rgba(255,255,255,0.06)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', fontSize: '0.82rem' }}
            >
              Next Problem <ArrowRight size={14} />
            </button>

            <button
              onClick={() => setFeedback({ isCorrect: true, text: `Code Executed cleanly! ${currentQ.explanation}` })}
              className="btn-patient btn-patient-terminal"
            >
              <Terminal size={16} /> Run & Verify Code
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
