import React, { useState, useEffect } from 'react';
import { Cpu, Play, RotateCcw, FastForward, Info, Layers, BarChart2 } from 'lucide-react';

const ALGORITHMS = [
  { id: 'bubble', name: 'Bubble Sort', category: 'Sorting', timeComp: 'O(N^2)', spaceComp: 'O(1)' },
  { id: 'quick', name: 'Quick Sort', category: 'Sorting', timeComp: 'O(N log N)', spaceComp: 'O(log N)' },
  { id: 'binary-search', name: 'Binary Search', category: 'Searching', timeComp: 'O(log N)', spaceComp: 'O(1)' },
  { id: 'bfs', name: 'Breadth First Search', category: 'Graphs', timeComp: 'O(V + E)', spaceComp: 'O(V)' },
];

export default function AlgorithmsPage() {
  const [selectedAlgo, setSelectedAlgo] = useState(ALGORITHMS[0]);
  const [arrayData, setArrayData] = useState([45, 12, 89, 34, 67, 23, 91, 56]);
  const [activeStep, setActiveStep] = useState(0);
  const [isSorting, setIsSorting] = useState(false);

  const generateRandomArray = () => {
    const arr = Array.from({ length: 8 }, () => Math.floor(Math.random() * 85) + 10);
    setArrayData(arr);
    setActiveStep(0);
  };

  const handleStepForward = () => {
    // Basic step animation simulator
    setArrayData((prev) => {
      const copy = [...prev];
      const idx = Math.floor(Math.random() * (copy.length - 1));
      if (copy[idx] > copy[idx + 1]) {
        [copy[idx], copy[idx + 1]] = [copy[idx + 1], copy[idx]];
      }
      return copy;
    });
    setActiveStep((prev) => prev + 1);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Header */}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ padding: '0.6rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--accent-primary)', color: '#fff' }}>
            <Cpu size={24} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.35rem', fontWeight: '800' }}>Algorithm Visualizer & Simulator</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              Interactive step-by-step algorithm animation and complexity breakdown.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {ALGORITHMS.map((algo) => (
            <button
              key={algo.id}
              onClick={() => {
                setSelectedAlgo(algo);
                generateRandomArray();
              }}
              style={{
                padding: '0.4rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-color)',
                fontSize: '0.8rem',
                fontWeight: '600',
                cursor: 'pointer',
                backgroundColor: selectedAlgo.id === algo.id ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                color: '#fff',
              }}
            >
              {algo.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Visualizer Area */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {/* Visualizer Canvas */}
        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '380px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>
              {selectedAlgo.name} Animation Canvas
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Step Counter: #{activeStep}
            </span>
          </div>

          {/* Bar chart representation of array */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              gap: '1rem',
              height: '200px',
              padding: '1rem',
              backgroundColor: 'var(--bg-tertiary)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
            }}
          >
            {arrayData.map((val, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', flex: 1, height: '100%', justifyContent: 'flex-end' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)' }}>{val}</span>
                <div
                  style={{
                    width: '100%',
                    height: `${val}%`,
                    backgroundColor: idx % 2 === 0 ? 'var(--accent-primary)' : 'var(--accent-cyan)',
                    borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0',
                    transition: 'all 0.3s ease',
                  }}
                />
              </div>
            ))}
          </div>

          {/* Animation Controls */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <button
              onClick={handleStepForward}
              style={{
                flex: 1,
                padding: '0.65rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--accent-primary)',
                color: '#fff',
                border: 'none',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
              }}
            >
              <FastForward size={16} /> Step Next Iteration
            </button>

            <button
              onClick={generateRandomArray}
              style={{
                padding: '0.65rem 1rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              <RotateCcw size={16} /> Reset
            </button>
          </div>
        </div>

        {/* Algorithm Complexity Info Card */}
        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Info size={20} color="var(--accent-amber)" /> Complexity & Walkthrough
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ padding: '0.85rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Time Complexity</div>
              <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--accent-cyan)' }}>
                {selectedAlgo.timeComp}
              </div>
            </div>

            <div style={{ padding: '0.85rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Space Complexity</div>
              <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--accent-emerald)' }}>
                {selectedAlgo.spaceComp}
              </div>
            </div>

            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginTop: '0.5rem' }}>
              <strong>Description:</strong> {selectedAlgo.name} repeatedly compares adjacent elements and swaps them if they are in the wrong order until the array is fully sorted.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
