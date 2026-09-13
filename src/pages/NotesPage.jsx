import React, { useState, useEffect } from 'react';
import { dbService } from '../services/dbService';
import {
  BookMarked,
  FolderPlus,
  Plus,
  Search,
  Pin,
  Trash2,
  Edit3,
  Check,
  Tag,
  Code,
  FileText,
  Sparkles
} from 'lucide-react';

const INITIAL_FOLDERS = [
  'Data Structures & Algorithms',
  'Interview Preparation',
  'Java & C++ Cheat Sheets',
  'Web Development & APIs',
  'Personal Notes',
];

const INITIAL_NOTES = [
  {
    id: 'n1',
    title: 'QuickSort vs MergeSort Complexity Notes',
    folder: 'Data Structures & Algorithms',
    tags: ['sorting', 'big-o', 'interview'],
    pinned: true,
    content: `## QuickSort vs MergeSort Summary\n\n- **QuickSort**:\n  - Average Time: O(N log N)\n  - Worst Case: O(N^2) (when pivot is poor)\n  - Space: O(log N) in-place\n\n- **MergeSort**:\n  - Always O(N log N) worst-case\n  - Space: O(N) auxiliary memory\n  - Stable sorting guarantee.`,
    updatedAt: '2026-09-11',
  },
  {
    id: 'n2',
    title: 'Binary Search Tree Traversal Templates',
    folder: 'Data Structures & Algorithms',
    tags: ['trees', 'bfs', 'dfs'],
    pinned: false,
    content: `\`\`\`java\n// In-Order BST Traversal\nvoid inOrder(TreeNode root) {\n    if (root == null) return;\n    inOrder(root.left);\n    System.out.print(root.val + " ");\n    inOrder(root.right);\n}\n\`\`\``,
    updatedAt: '2026-09-10',
  },
  {
    id: 'n3',
    title: 'Top 10 Behavioral Interview Questions',
    folder: 'Interview Preparation',
    tags: ['behavioral', 'hr'],
    pinned: true,
    content: `1. Tell me about a time you solved a hard algorithmic bug under time constraints.\n2. How do you handle conflict in team projects?\n3. What is your favorite project and why?`,
    updatedAt: '2026-09-08',
  },
];

export default function NotesPage() {
  const [folders, setFolders] = useState(INITIAL_FOLDERS);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeFolder, setActiveFolder] = useState('All');
  const [selectedNote, setSelectedNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Note Edit Form State
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editFolder, setEditFolder] = useState(INITIAL_FOLDERS[0]);
  const [editContent, setEditContent] = useState('');
  const [editTags, setEditTags] = useState('');
  const [newFolderName, setNewFolderName] = useState('');

  // Initial Load from Cloud DB / Local Fallback
  useEffect(() => {
    async function loadNotes() {
      setLoading(true);
      const user = await dbService.getProfile();
      const fetchedNotes = await dbService.getNotes(user?.id);
      if (fetchedNotes && fetchedNotes.length > 0) {
        setNotes(fetchedNotes);
      } else {
        setNotes(INITIAL_NOTES);
        await dbService.saveNotes(INITIAL_NOTES, user?.id);
      }
      setLoading(false);
    }
    loadNotes();
  }, []);

  // Sync to Cloud DB / Local Fallback on changes
  const saveAllNotes = async (updatedNotes) => {
    setNotes(updatedNotes);
    const user = await dbService.getProfile();
    await dbService.saveNotes(updatedNotes, user?.id);
  };

  const filteredNotes = notes.filter((n) => {
    const matchesFolder = activeFolder === 'All' || n.folder === activeFolder;
    const matchesSearch =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFolder && matchesSearch;
  });

  const handleCreateNewNote = async () => {
    const newNote = {
      id: `n-${Date.now()}`,
      title: 'Untitled Study Note',
      folder: activeFolder === 'All' ? folders[0] : activeFolder,
      tags: ['study'],
      pinned: false,
      content: '# New Study Note\n\nWrite your concepts, code snippets, or notes here...',
      updatedAt: new Date().toISOString().split('T')[0],
    };
    const updated = [newNote, ...notes];
    await saveAllNotes(updated);
    setSelectedNote(newNote);
    startEditing(newNote);
  };

  const startEditing = (note) => {
    setEditTitle(note.title);
    setEditFolder(note.folder);
    setEditContent(note.content);
    setEditTags(note.tags.join(', '));
    setIsEditing(true);
  };

  const saveEditedNote = async () => {
    if (!selectedNote) return;
    const updated = notes.map((n) => {
      if (n.id === selectedNote.id) {
        return {
          ...n,
          title: editTitle || 'Untitled Note',
          folder: editFolder,
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

  const togglePin = async (id, e) => {
    e.stopPropagation();
    const updated = notes.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n));
    await saveAllNotes(updated);
  };

  const deleteNote = async (id, e) => {
    e.stopPropagation();
    const remaining = notes.filter((n) => n.id !== id);
    await saveAllNotes(remaining);
    if (selectedNote?.id === id) {
      setSelectedNote(null);
    }
  };

  const addFolder = () => {
    if (!newFolderName.trim() || folders.includes(newFolderName.trim())) return;
    setFolders([...folders, newFolderName.trim()]);
    setNewFolderName('');
  };

  return (
    <div style={{ display: 'flex', gap: '1.5rem', minHeight: 'calc(100vh - 120px)' }}>
      {/* Sidebar: Folders & Categories */}
      <div
        className="glass-panel"
        style={{
          width: '260px',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BookMarked size={20} color="var(--accent-primary)" /> Folders
          </h3>
          <button
            onClick={handleCreateNewNote}
            style={{
              padding: '0.35rem 0.65rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--accent-primary)',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.75rem',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '0.2rem',
            }}
          >
            <Plus size={14} /> New
          </button>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
          <button
            onClick={() => setActiveFolder('All')}
            style={{
              padding: '0.6rem 0.8rem',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              backgroundColor: activeFolder === 'All' ? 'var(--accent-primary)' : 'transparent',
              color: activeFolder === 'All' ? '#fff' : 'var(--text-secondary)',
              fontWeight: activeFolder === 'All' ? '700' : '400',
              textAlign: 'left',
              cursor: 'pointer',
              fontSize: '0.85rem',
            }}
          >
            📂 All Notes ({notes.length})
          </button>

          {folders.map((f) => {
            const count = notes.filter((n) => n.folder === f).length;
            const isActive = activeFolder === f;
            return (
              <button
                key={f}
                onClick={() => setActiveFolder(f)}
                style={{
                  padding: '0.6rem 0.8rem',
                  borderRadius: 'var(--radius-md)',
                  border: 'none',
                  backgroundColor: isActive ? 'var(--accent-primary)' : 'transparent',
                  color: isActive ? '#fff' : 'var(--text-secondary)',
                  fontWeight: isActive ? '700' : '400',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>📁 {f}</span>
                <span style={{ fontSize: '0.7rem', opacity: 0.7 }}>{count}</span>
              </button>
            );
          })}
        </nav>

        {/* Add New Folder Input */}
        <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <input
              type="text"
              placeholder="New folder..."
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              style={{
                width: '100%',
                padding: '0.4rem 0.6rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                fontSize: '0.8rem',
                outline: 'none',
              }}
            />
            <button
              onClick={addFolder}
              style={{
                padding: '0.4rem 0.6rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
              }}
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Middle Column: Notes List */}
      <div
        className="glass-panel"
        style={{
          width: '320px',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        {/* Search */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: 'var(--bg-tertiary)',
            padding: '0.5rem 0.75rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
          }}
        >
          <Search size={16} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Search notes, tags..."
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

        {/* Note Items */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {filteredNotes.length === 0 ? (
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '2rem' }}>
              No notes found in this folder.
            </div>
          ) : (
            filteredNotes.map((note) => {
              const isSelected = selectedNote?.id === note.id;
              return (
                <div
                  key={note.id}
                  onClick={() => {
                    setSelectedNote(note);
                    setIsEditing(false);
                  }}
                  style={{
                    padding: '0.85rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: isSelected ? 'rgba(99, 102, 241, 0.15)' : 'var(--bg-tertiary)',
                    border: isSelected ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                    cursor: 'pointer',
                    position: 'relative',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.3rem' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: '700', flex: 1, paddingRight: '0.5rem' }}>
                      {note.title}
                    </div>
                    <div style={{ display: 'flex', gap: '0.3rem' }}>
                      <button
                        onClick={(e) => togglePin(note.id, e)}
                        style={{ background: 'none', border: 'none', color: note.pinned ? 'var(--accent-amber)' : 'var(--text-muted)', cursor: 'pointer' }}
                      >
                        <Pin size={14} />
                      </button>
                      <button
                        onClick={(e) => deleteNote(note.id, e)}
                        style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', height: '2.4em', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {note.content.replace(/[#*`]/g, '')}
                  </div>

                  <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
                    {note.tags.map((t, idx) => (
                      <span key={idx} style={{ fontSize: '0.65rem', padding: '0.1rem 0.35rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(255,255,255,0.08)', color: 'var(--accent-cyan)' }}>
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Right Column: Note Viewer / Editor */}
      <div
        className="glass-panel"
        style={{
          flex: 1,
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {selectedNote ? (
          isEditing ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Note Title"
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    fontWeight: '700',
                    fontSize: '1.1rem',
                    outline: 'none',
                  }}
                />
                <select
                  value={editFolder}
                  onChange={(e) => setEditFolder(e.target.value)}
                  style={{
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                  }}
                >
                  {folders.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <input
                  type="text"
                  value={editTags}
                  onChange={(e) => setEditTags(e.target.value)}
                  placeholder="Tags (comma separated: sorting, java, trees)"
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    fontSize: '0.85rem',
                    outline: 'none',
                  }}
                />
              </div>

              <textarea
                rows={16}
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                placeholder="Write your study notes using markdown or plain text..."
                style={{
                  flex: 1,
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.9rem',
                  outline: 'none',
                  resize: 'none',
                  lineHeight: '1.6',
                }}
              />

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button
                  onClick={() => setIsEditing(false)}
                  style={{
                    padding: '0.6rem 1.25rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border-color)',
                    cursor: 'pointer',
                    fontWeight: '600',
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={saveEditedNote}
                  style={{
                    padding: '0.6rem 1.25rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--accent-primary)',
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}
                >
                  <Check size={16} /> Save Changes
                </button>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', pb: '1rem' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', fontWeight: '700' }}>
                    📁 {selectedNote.folder}
                  </span>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: '800', marginTop: '0.2rem' }}>
                    {selectedNote.title}
                  </h2>
                </div>
                <button
                  onClick={() => startEditing(selectedNote)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--accent-primary)',
                    color: '#fff',
                    border: 'none',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.85rem',
                  }}
                >
                  <Edit3 size={16} /> Edit Note
                </button>
              </div>

              {/* Body */}
              <div style={{ flex: 1, overflowY: 'auto', fontSize: '0.95rem', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>
                {selectedNote.content}
              </div>
            </div>
          )
        ) : (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
            <FileText size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
            Select a note or create a new one to start organizing your study notes.
          </div>
        )}
      </div>
    </div>
  );
}
