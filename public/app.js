const API_BASE = "/api/notes";

const el = (id) => document.getElementById(id);

const studentIdInput = el("studentId");
const searchInput = el("searchInput");
const categoryFilter = el("categoryFilter");
const courseFilter = el("courseFilter");
const favOnly = el("favOnly");
const sortSelect = el("sortSelect");
const notesList = el("notesList");
const newNoteBtn = el("newNoteBtn");

const editorPanel = el("editorPanel");
const editorTitleLabel = el("editorTitleLabel");
const noteTitle = el("noteTitle");
const noteCourse = el("noteCourse");
const noteModule = el("noteModule");
const noteTopic = el("noteTopic");
const noteCategory = el("noteCategory");
const noteTags = el("noteTags");
const noteContent = el("noteContent");
const noteFavorite = el("noteFavorite");
const saveNoteBtn = el("saveNoteBtn");
const cancelEditBtn = el("cancelEditBtn");
const deleteNoteBtn = el("deleteNoteBtn");

let editingNoteId = null;

function headers() {
  return {
    "Content-Type": "application/json",
    "X-Student-Id": studentIdInput.value.trim() || "anonymous",
  };
}

async function fetchNotes() {
  const params = new URLSearchParams();
  if (searchInput.value.trim()) params.set("search", searchInput.value.trim());
  if (categoryFilter.value) params.set("category", categoryFilter.value);
  if (courseFilter.value) params.set("course", courseFilter.value);
  if (favOnly.checked) params.set("favorite", "true");
  if (sortSelect.value) params.set("sort", sortSelect.value);

  const res = await fetch(`${API_BASE}?${params.toString()}`, { headers: headers() });
  const data = await res.json();
  renderNotes(data.notes || []);
}

async function fetchFilterOptions() {
  const [catRes, courseRes] = await Promise.all([
    fetch(`${API_BASE}/filters/category`, { headers: headers() }),
    fetch(`${API_BASE}/filters/course`, { headers: headers() }),
  ]);
  const cats = await catRes.json();
  const courses = await courseRes.json();

  fillSelect(categoryFilter, cats.values, "All categories");
  fillSelect(courseFilter, courses.values, "All courses");
}

function fillSelect(selectEl, values, placeholder) {
  const current = selectEl.value;
  selectEl.innerHTML = `<option value="">${placeholder}</option>`;
  values.forEach((v) => {
    const opt = document.createElement("option");
    opt.value = v;
    opt.textContent = v;
    selectEl.appendChild(opt);
  });
  selectEl.value = current;
}

function renderNotes(notes) {
  notesList.innerHTML = "";
  if (!notes.length) {
    notesList.innerHTML = `<div class="empty-state">No notes yet. Click "+ New Note" to start your study repository.</div>`;
    return;
  }

  notes.forEach((note) => {
    const card = document.createElement("div");
    card.className = "note-card" + (note.isFavorite ? " favorite" : "");
    card.innerHTML = `
      <div class="note-card-header">
        <h3>${escapeHtml(note.title)}</h3>
        <button class="star-btn" title="Toggle important">${note.isFavorite ? "⭐" : "☆"}</button>
      </div>
      <div class="note-meta">
        ${[note.course, note.module, note.topic].filter(Boolean).join(" • ") || "Uncategorized"}
        &nbsp;|&nbsp; ${note.category}
      </div>
      <div class="note-preview">${escapeHtml(truncate(note.content, 140))}</div>
      <div class="note-tags">
        ${note.tags.map((t) => `<span class="tag-pill">#${escapeHtml(t)}</span>`).join("")}
      </div>
    `;

    card.querySelector(".star-btn").addEventListener("click", async (e) => {
      e.stopPropagation();
      await fetch(`${API_BASE}/${note.id}/favorite`, { method: "PATCH", headers: headers() });
      fetchNotes();
    });

    card.addEventListener("click", () => openEditor(note));
    notesList.appendChild(card);
  });
}

function truncate(str, n) {
  if (!str) return "";
  return str.length > n ? str.slice(0, n) + "…" : str;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str || "";
  return div.innerHTML;
}

function openEditor(note) {
  editingNoteId = note ? note.id : null;
  editorTitleLabel.textContent = note ? "Edit Note" : "New Note";
  noteTitle.value = note?.title || "";
  noteCourse.value = note?.course || "";
  noteModule.value = note?.module || "";
  noteTopic.value = note?.topic || "";
  noteCategory.value = note?.category || "";
  noteTags.value = note?.tags?.join(", ") || "";
  noteContent.value = note?.content || "";
  noteFavorite.checked = !!note?.isFavorite;
  deleteNoteBtn.hidden = !note;
  editorPanel.hidden = false;
  noteTitle.focus();
}

function closeEditor() {
  editingNoteId = null;
  editorPanel.hidden = true;
}

newNoteBtn.addEventListener("click", () => openEditor(null));
cancelEditBtn.addEventListener("click", closeEditor);

saveNoteBtn.addEventListener("click", async () => {
  if (!noteTitle.value.trim()) {
    alert("Title is required.");
    return;
  }
  const payload = {
    title: noteTitle.value.trim(),
    content: noteContent.value,
    course: noteCourse.value.trim(),
    module: noteModule.value.trim(),
    topic: noteTopic.value.trim(),
    category: noteCategory.value.trim() || "General",
    tags: noteTags.value.split(",").map((t) => t.trim()).filter(Boolean),
    isFavorite: noteFavorite.checked,
  };

  if (editingNoteId) {
    await fetch(`${API_BASE}/${editingNoteId}`, {
      method: "PUT",
      headers: headers(),
      body: JSON.stringify(payload),
    });
  } else {
    await fetch(API_BASE, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(payload),
    });
  }

  closeEditor();
  await fetchFilterOptions();
  await fetchNotes();
});

deleteNoteBtn.addEventListener("click", async () => {
  if (!editingNoteId) return;
  if (!confirm("Delete this note? This cannot be undone.")) return;
  await fetch(`${API_BASE}/${editingNoteId}`, { method: "DELETE", headers: headers() });
  closeEditor();
  await fetchFilterOptions();
  await fetchNotes();
});

[searchInput, categoryFilter, courseFilter, favOnly, sortSelect].forEach((elm) => {
  elm.addEventListener("input", fetchNotes);
  elm.addEventListener("change", fetchNotes);
});

studentIdInput.addEventListener("change", async () => {
  closeEditor();
  await fetchFilterOptions();
  await fetchNotes();
});

(async function init() {
  await fetchFilterOptions();
  await fetchNotes();
})();
