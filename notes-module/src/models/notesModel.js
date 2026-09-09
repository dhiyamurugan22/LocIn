const { v4: uuidv4 } = require("uuid");
const db = require("../db/database");

function nowISO() {
  return new Date().toISOString();
}

function rowToNote(row) {
  if (!row) return null;
  return {
    id: row.id,
    studentId: row.student_id,
    title: row.title,
    content: row.content,
    course: row.course,
    module: row.module,
    topic: row.topic,
    category: row.category,
    tags: row.tags ? row.tags.split(",").filter(Boolean) : [],
    isFavorite: !!row.is_favorite,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

const NotesModel = {
  create(studentId, data) {
    const id = uuidv4();
    const timestamp = nowISO();
    const stmt = db.prepare(`
      INSERT INTO notes (id, student_id, title, content, course, module, topic, category, tags, is_favorite, created_at, updated_at)
      VALUES (@id, @studentId, @title, @content, @course, @module, @topic, @category, @tags, @isFavorite, @createdAt, @updatedAt)
    `);
    stmt.run({
      id,
      studentId,
      title: data.title,
      content: data.content || "",
      course: data.course || "",
      module: data.module || "",
      topic: data.topic || "",
      category: data.category || "General",
      tags: Array.isArray(data.tags) ? data.tags.join(",") : "",
      isFavorite: data.isFavorite ? 1 : 0,
      createdAt: timestamp,
      updatedAt: timestamp,
    });
    return this.getById(studentId, id);
  },

  getById(studentId, id) {
    const row = db
      .prepare(`SELECT * FROM notes WHERE id = ? AND student_id = ?`)
      .get(id, studentId);
    return rowToNote(row);
  },

  // List notes for a student with optional filters:
  // category, course, module, topic, favoriteOnly, search (title/content/tags), sort
  list(studentId, filters = {}) {
    const clauses = ["student_id = @studentId"];
    const params = { studentId };

    if (filters.category) {
      clauses.push("category = @category");
      params.category = filters.category;
    }
    if (filters.course) {
      clauses.push("course = @course");
      params.course = filters.course;
    }
    if (filters.module) {
      clauses.push("module = @module");
      params.module = filters.module;
    }
    if (filters.topic) {
      clauses.push("topic = @topic");
      params.topic = filters.topic;
    }
    if (filters.favoriteOnly) {
      clauses.push("is_favorite = 1");
    }
    if (filters.search) {
      clauses.push("(title LIKE @search OR content LIKE @search OR tags LIKE @search)");
      params.search = `%${filters.search}%`;
    }

    let orderBy = "updated_at DESC";
    if (filters.sort === "title_asc") orderBy = "title ASC";
    else if (filters.sort === "title_desc") orderBy = "title DESC";
    else if (filters.sort === "created_asc") orderBy = "created_at ASC";
    else if (filters.sort === "created_desc") orderBy = "created_at DESC";

    const sql = `SELECT * FROM notes WHERE ${clauses.join(" AND ")} ORDER BY is_favorite DESC, ${orderBy}`;
    const rows = db.prepare(sql).all(params);
    return rows.map(rowToNote);
  },

  update(studentId, id, data) {
    const existing = this.getById(studentId, id);
    if (!existing) return null;

    const updated = {
      title: data.title !== undefined ? data.title : existing.title,
      content: data.content !== undefined ? data.content : existing.content,
      course: data.course !== undefined ? data.course : existing.course,
      module: data.module !== undefined ? data.module : existing.module,
      topic: data.topic !== undefined ? data.topic : existing.topic,
      category: data.category !== undefined ? data.category : existing.category,
      tags:
        data.tags !== undefined
          ? Array.isArray(data.tags)
            ? data.tags.join(",")
            : ""
          : existing.tags.join(","),
      isFavorite:
        data.isFavorite !== undefined ? (data.isFavorite ? 1 : 0) : existing.isFavorite ? 1 : 0,
      updatedAt: nowISO(),
    };

    db.prepare(`
      UPDATE notes SET
        title = @title,
        content = @content,
        course = @course,
        module = @module,
        topic = @topic,
        category = @category,
        tags = @tags,
        is_favorite = @isFavorite,
        updated_at = @updatedAt
      WHERE id = @id AND student_id = @studentId
    `).run({ ...updated, id, studentId });

    return this.getById(studentId, id);
  },

  toggleFavorite(studentId, id) {
    const existing = this.getById(studentId, id);
    if (!existing) return null;
    const newValue = existing.isFavorite ? 0 : 1;
    db.prepare(
      `UPDATE notes SET is_favorite = ?, updated_at = ? WHERE id = ? AND student_id = ?`
    ).run(newValue, nowISO(), id, studentId);
    return this.getById(studentId, id);
  },

  remove(studentId, id) {
    const result = db
      .prepare(`DELETE FROM notes WHERE id = ? AND student_id = ?`)
      .run(id, studentId);
    return result.changes > 0;
  },

  // Distinct categories/courses/modules/topics for a student, useful for
  // building filter dropdowns in the UI.
  distinctValues(studentId, field) {
    const allowed = ["category", "course", "module", "topic"];
    if (!allowed.includes(field)) return [];
    const rows = db
      .prepare(
        `SELECT DISTINCT ${field} AS value FROM notes WHERE student_id = ? AND ${field} != '' ORDER BY ${field} ASC`
      )
      .all(studentId);
    return rows.map((r) => r.value);
  },
};

module.exports = NotesModel;
