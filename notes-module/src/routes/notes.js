const express = require("express");
const NotesModel = require("../models/notesModel");
const identifyStudent = require("../middleware/identifyStudent");

const router = express.Router();

// Every route in this module is scoped to req.studentId, so a student can
// only ever create, read, update or delete their own notes.
router.use(identifyStudent);

function validateTitle(title, res) {
  if (!title || !String(title).trim()) {
    res.status(400).json({ error: "Note 'title' is required." });
    return false;
  }
  return true;
}

// GET /api/notes
// Query params: category, course, module, topic, favorite=true, search, sort
router.get("/", (req, res) => {
  const { category, course, module, topic, favorite, search, sort } = req.query;
  const notes = NotesModel.list(req.studentId, {
    category,
    course,
    module,
    topic,
    favoriteOnly: favorite === "true",
    search,
    sort,
  });
  res.json({ count: notes.length, notes });
});

// GET /api/notes/filters/:field  -> distinct categories/courses/modules/topics
router.get("/filters/:field", (req, res) => {
  const values = NotesModel.distinctValues(req.studentId, req.params.field);
  res.json({ field: req.params.field, values });
});

// GET /api/notes/:id
router.get("/:id", (req, res) => {
  const note = NotesModel.getById(req.studentId, req.params.id);
  if (!note) return res.status(404).json({ error: "Note not found." });
  res.json(note);
});

// POST /api/notes
router.post("/", (req, res) => {
  const { title, content, course, module, topic, category, tags, isFavorite } = req.body;
  if (!validateTitle(title, res)) return;

  const note = NotesModel.create(req.studentId, {
    title,
    content,
    course,
    module,
    topic,
    category,
    tags,
    isFavorite,
  });
  res.status(201).json(note);
});

// PUT /api/notes/:id  (full/partial update)
router.put("/:id", (req, res) => {
  const { title } = req.body;
  if (title !== undefined && !validateTitle(title, res)) return;

  const note = NotesModel.update(req.studentId, req.params.id, req.body);
  if (!note) return res.status(404).json({ error: "Note not found." });
  res.json(note);
});

// PATCH /api/notes/:id/favorite  -> toggle star / mark important
router.patch("/:id/favorite", (req, res) => {
  const note = NotesModel.toggleFavorite(req.studentId, req.params.id);
  if (!note) return res.status(404).json({ error: "Note not found." });
  res.json(note);
});

// DELETE /api/notes/:id
router.delete("/:id", (req, res) => {
  const deleted = NotesModel.remove(req.studentId, req.params.id);
  if (!deleted) return res.status(404).json({ error: "Note not found." });
  res.status(204).send();
});

module.exports = router;
