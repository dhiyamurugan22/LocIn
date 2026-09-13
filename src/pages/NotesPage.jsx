import React, { useState, useEffect } from 'react';
import { dbService } from '../services/dbService';
import { AIService } from '../services/api';
import {
  Feather,
  BookMarked,
  Plus,
  Search,
  Pin,
  Trash2,
  Edit3,
  Check,
  Tag,
  Sparkles,
  Terminal,
  FileText,
  Hourglass,
  Layers
} from 'lucide-react';

const INITIAL_NOTES = [
  {
    id: 'n1',
    title: 'QuickSort vs MergeSort Asymptotic Analysis',
    folder: 'Algorithms',
    tags: ['sorting', 'big-o', 'divide-and-conquer'],
    pinned: true,
    era: 'sepia',
    content: `## QuickSort vs MergeSort Intuition\n\n- **QuickSort**:\n  - Average Time: O(N log N)\n  - Worst Case: O(N^2) (when pivot is unbalanced)\n  - Space: O(log N) auxiliary stack space\n\n- **MergeSort**:\n  - Guaranteed O(N log N) in all cases\n  - Space: O(N) auxiliary array allocation\n  - Preserves relative ordering of equal keys (Stable).`,
    updatedAt: '2026-09-11',
  },
  {
    id: 'n2',
    title: 'Binary Search Tree In-Order Traversal Template',
    folder: 'Data Structures',
    tags: ['trees', 'java', 'dfs'],
    pinned: false,
    era: 'terminal',
    content: `\`\`\`java\n// In-Order BST Traversal yields sorted values\nvoid inOrder(TreeNode root) {\n    if (root == null) return;\n    inOrder(root.left);\n    System.out.print(root.val + " ");\n    inOrder(root.right);\n}\n\`\`\``,
    updatedAt: '2026-09-10',
  },
  {
    id: 'n3',
    title: 'Behavioral Study & System Architecture Notes',
    folder: 'Interview Prep',
    tags: ['system-design', 'behavioral'],
    pinned: true,
    era: 'merged',
    content: `### System Architecture Takeaways\n\n1. **Horizontal vs Vertical Scaling**: Prefer stateless application servers behind a round-robin load balancer.\n2. **Database Caching**: Use Redis for high-frequency reads to decrease DB pressure.\n3. **Eventual Consistency**: Accept brief replication lag across read-replicas for maximum availability.`,
    updatedAt: '2026-09-08',
  },
];

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNote, setSelectedNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Form Edit State
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editTags, setEditTags] = useState('');
  const [aiSummary, setAiSummary] = useState('');
  const [isSummarizing, setIsSummarizing] = useState(false);

  // Load Notes from Cloud DB
  useEffect(() => {
    async function loadNotes() {
      setLoading(true);
      const user = await dbService.getProfile();
      const fetched = await dbService.getNotes(user?.id);
      if (fetched && fetched.length > 0) {
        setNotes(fetched);
        setSelectedNote(fetched[0]);
      } else {
        setNotes(INITIAL_NOTES);
        setSelectedNote(INITIAL_NOTES[0]);
        await dbService.saveNotes(INITIAL_NOTES, user?.id);
      }
      setLoading(false);
    }
    loadNotes();
  }, []);

  const saveAllNotes = async (updatedNotes) => {
    setNotes(updatedNotes);
    const user = await dbService.getProfile();
    await dbService.saveNotes(updatedNotes, user?.id);
  };

  const handleCreateNew = async () => {
    const newNote = {
      id: `n-${Date.now()}`,
      title: 'Untitled Sepia Study Note',
      folder: 'Personal Notes',
      tags: ['study'],
      pinned: false,
      era: 'sepia',
      content: '# New Study Exploration\n\nWrite your concepts, mathematical proofs, or pseudocode here...',
      updatedAt: new Date().toISOString().split('T')[0],
    };
    const updated = [newNote, ...notes];
    await saveAllNotes(updated);
    setSelectedNote(newNote);
    startEditing(newNote);
  };

  const startEditing = (note) => {
    setEditTitle(note.title);
    setEditContent(note.content);
    setEditTags(note.tags ? note.tags.join(', ') : '');
    setIsEditing(true);
    setAiSummary('');
  };

  const saveEditedNote = async () => {
    if (!selectedNote) return;
    const updated = notes.map((n) => {
      if (n.id === selectedNote.id) {
        return {
          ...n,
          title: editTitle || 'Untitled Note',
          content: editContent,
          tags: editTags.split(',').map((t) => t.trim()).filter(Boolean),
          updatedAt: new Date().toISOString().split('T')[0],
        };
      }
      return n;
    });

    await saveAllNotes(updated);
    const curr = updated.find((n) => n.id === selectedNote.id);
    setSelectedNote(curr);
    setIsEditing(false);
  };

  const handleSummarizeWithAI = async () => {
    if (!selectedNote) return;
    setIsSummarizing(true);
    try {
      const summary = await AIService.summarizeNote(selectedNote.content);
      setAiSummary(summary);
    } catch (err) {
      setAiSummary('Failed to summarize note with AI.');
    } finally {
      setIsSummarizing(false);
    }
  };

  const filteredNotes = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header Banner */}
      <div className="sepia-notebook" style={{ padding: '1.5rem 2rem', borderRadius: 'var(--radius-lg)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.78rem', color: 'var(--sepia-gold)', fontFamily: 'var(--font-serif)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
              <Feather size={15} /> Parchment Notebook & Reflection Space
            </div>
            <h2 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-serif)', color: 'var(--sepia-text)' }}>
              Sepia Study Notes
            </h2>
          </div>

          <button onClick={handleCreateNew} className="btn-patient btn-patient-sepia">
            <Plus size={18} /> New Handwritten Note
          </button>
        </div>
      </div>

      {/* Main Split Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '1.5rem', minHeight: '650px' }}>
        
        {/* Left Sidebar: Notes Explorer */}
        <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          {/* Search Box */}
          <div style={{ position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search parchment notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem 0.5rem 2.2rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(0,0,0,0.3)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                fontSize: '0.85rem',
                outline: 'none',
              }}
            />
          </div>

          {/* Notes List */}
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {filteredNotes.map((note) => {
              const isSelected = selectedNote?.id === note.id;
              return (
                <div
                  key={note.id}
                  onClick={() => { setSelectedNote(note); setIsEditing(false); setAiSummary(''); }}
                  style={{
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: isSelected ? 'rgba(212, 163, 89, 0.18)' : 'rgba(255,255,255,0.02)',
                    border: isSelected ? '1px solid var(--sepia-gold)' : '1px solid var(--border-color)',
                    cursor: 'pointer',
                    transition: 'var(--transition-patient)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--sepia-gold)', fontFamily: 'var(--font-serif)' }}>
                      {note.folder || 'Parchment'}
                    </span>
                    {note.pinned && <Pin size={12} style={{ color: 'var(--sepia-gold)' }} />}
                  </div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: '700', fontFamily: 'var(--font-serif)', color: isSelected ? '#f4ebd9' : 'var(--text-primary)', lineHeight: 1.3 }}>
                    {note.title}
                  </h4>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.4rem', fontFamily: 'var(--font-mono)' }}>
                    {note.updatedAt}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Main Editor / Viewer */}
        {selectedNote ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            {/* Note Header Action Bar */}
            <div className="glass-panel" style={{ padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Feather size={20} style={{ color: 'var(--sepia-gold)' }} />
                <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)', color: 'var(--sepia-text)' }}>
                  {isEditing ? 'Editing Note...' : selectedNote.title}
                </h3>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button onClick={handleSummarizeWithAI} disabled={isSummarizing} className="btn-patient" style={{ backgroundColor: 'rgba(56, 189, 248, 0.15)', color: 'var(--terminal-cyan)', border: '1px solid var(--terminal-border)', fontSize: '0.82rem' }}>
                  <Sparkles size={16} /> {isSummarizing ? 'Summarizing...' : 'Summarize with Gemini AI'}
                </button>

                {isEditing ? (
                  <button onClick={saveEditedNote} className="btn-patient btn-patient-sepia" style={{ fontSize: '0.82rem' }}>
                    <Check size={16} /> Save Changes
                  </button>
                ) : (
                  <button onClick={() => startEditing(selectedNote)} className="btn-patient" style={{ backgroundColor: 'rgba(255,255,255,0.06)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', fontSize: '0.82rem' }}>
                    <Edit3 size={16} /> Edit Note
                  </button>
                )}
              </div>
            </div>

            {/* AI Summary Banner if active */}
            {aiSummary && (
              <div className="terminal-card" style={{ padding: '1.2rem 1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--terminal-cyan)', fontWeight: '700', fontSize: '0.9rem', marginBottom: '0.5rem', fontFamily: 'var(--font-mono)' }}>
                  <Sparkles size={16} /> Gemini AI Note Takeaways
                </div>
                <div style={{ fontSize: '0.88rem', whiteSpace: 'pre-wrap', color: 'var(--terminal-text)' }}>
                  {aiSummary}
                </div>
              </div>
            )}

            {/* Note Editor or Reader Surface */}
            {isEditing ? (
              <div className="sepia-notebook" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Note Title..."
                  style={{
                    fontSize: '1.3rem',
                    fontFamily: 'var(--font-serif)',
                    fontWeight: '700',
                    color: 'var(--sepia-text)',
                    backgroundColor: 'rgba(0,0,0,0.2)',
                    border: '1px solid var(--sepia-border)',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    outline: 'none',
                  }}
                />

                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  placeholder="Write your study notes using Markdown..."
                  style={{
                    flex: 1,
                    minHeight: '400px',
                    fontSize: '0.95rem',
                    fontFamily: 'var(--font-serif)',
                    color: 'var(--sepia-text)',
                    backgroundColor: 'rgba(0,0,0,0.2)',
                    border: '1px solid var(--sepia-border)',
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    outline: 'none',
                    lineHeight: 1.7,
                    resize: 'vertical',
                  }}
                />
              </div>
            ) : (
              <div className="sepia-notebook" style={{ padding: '2rem', flex: 1 }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--sepia-gold)', fontFamily: 'var(--font-mono)', marginBottom: '0.75rem' }}>
                  UPDATED: {selectedNote.updatedAt}
                </div>
                <div style={{ fontSize: '1rem', fontFamily: 'var(--font-serif)', color: 'var(--sepia-text)', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
                  {selectedNote.content}
                </div>
              </div>
            )}

          </div>
        ) : (
          <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontFamily: 'var(--font-serif)' }}>
            Select a note from the left parchment panel or create a new note.
          </div>
        )}
      </div>
    </div>
  );
}
