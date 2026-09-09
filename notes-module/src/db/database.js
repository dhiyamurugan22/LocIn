const path = require("path");
const Database = require("better-sqlite3");

const DB_PATH = path.join(__dirname, "notes.sqlite3");
const db = new Database(DB_PATH);

db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

// Notes belong to a single student (studentId). Notes are never shared
// across students -- every query in the routes layer filters by studentId
// so one student can never see, edit or delete another student's notes.
db.exec(`
  CREATE TABLE IF NOT EXISTS notes (
    id            TEXT PRIMARY KEY,
    student_id    TEXT NOT NULL,
    title         TEXT NOT NULL,
    content       TEXT NOT NULL DEFAULT '',
    course        TEXT DEFAULT '',
    module        TEXT DEFAULT '',
    topic         TEXT DEFAULT '',
    category      TEXT DEFAULT 'General',
    tags          TEXT DEFAULT '',
    is_favorite   INTEGER NOT NULL DEFAULT 0,
    created_at    TEXT NOT NULL,
    updated_at    TEXT NOT NULL
  );

  CREATE INDEX IF NOT EXISTS idx_notes_student ON notes (student_id);
  CREATE INDEX IF NOT EXISTS idx_notes_student_fav ON notes (student_id, is_favorite);
  CREATE INDEX IF NOT EXISTS idx_notes_student_category ON notes (student_id, category);
`);

module.exports = db;
