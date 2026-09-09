# Notes Module

A personal, per-student **Notes Module** for a learning application. It lets each student create, organize, search, and review their own study notes — completely independent of other students' data.

## Features

- **Create / Read / Update / Delete** notes
- **Organize** notes by course, module, and topic, plus a free-form category (e.g. "Concept", "Doubt", "Example")
- **Tags** for flexible cross-cutting labeling
- **Search** across title, content, and tags
- **Filter** by category, course, module, topic, or favorites-only
- **Sort** by last updated, created date, or title
- **Mark important / favorite** notes for quick access (favorites always float to the top of the list)
- **Strict per-student data isolation** — every query is scoped to a `studentId`, so students can never see or modify each other's notes
- Includes a small demo web UI (plain HTML/CSS/JS) so you can try the module end-to-end without wiring it into a bigger app first

## Tech stack

- **Backend:** Node.js + Express
- **Database:** SQLite via `better-sqlite3` (single file, zero external setup)
- **Frontend (demo only):** static HTML/CSS/JS served by Express

## Project structure

```
notes-module/
├── src/
│   ├── server.js              # Express app entry point
│   ├── db/
│   │   └── database.js        # SQLite connection + schema
│   ├── models/
│   │   └── notesModel.js      # All data-access logic for notes
│   ├── middleware/
│   │   └── identifyStudent.js # Resolves the current student from a header
│   └── routes/
│       └── notes.js           # REST API routes
├── public/                    # Demo frontend (HTML/CSS/JS)
├── package.json
└── README.md
```

## Getting started

```bash
npm install
npm start
```

The server starts at `http://localhost:4000`. Open that URL in a browser to try the demo UI (there's a "Student ID" field at the top so you can switch identities and see that notes don't leak across students).

## Authentication note

This module assumes your main application already authenticates students elsewhere. To keep this module self-contained and easy to test, the current student is identified via an `X-Student-Id` header (or a `?studentId=` query param for convenience), handled in `src/middleware/identifyStudent.js`.

**To integrate into a real app:** replace `identifyStudent.js` with middleware that reads the verified student ID from your session/JWT, and set `req.studentId` before the notes routes run. No other code needs to change.

## API Reference

All endpoints require the `X-Student-Id` header.

| Method | Endpoint                         | Description                                   |
|--------|-----------------------------------|------------------------------------------------|
| GET    | `/api/notes`                     | List notes (supports query filters below)       |
| GET    | `/api/notes/:id`                 | Get a single note                               |
| POST   | `/api/notes`                     | Create a note                                   |
| PUT    | `/api/notes/:id`                 | Update a note (partial updates supported)       |
| PATCH  | `/api/notes/:id/favorite`        | Toggle a note's favorite/important flag         |
| DELETE | `/api/notes/:id`                 | Delete a note                                   |
| GET    | `/api/notes/filters/:field`      | Distinct values for `category`\|`course`\|`module`\|`topic`, for building filter dropdowns |

### Query params for `GET /api/notes`

| Param      | Example              | Description                                  |
|------------|----------------------|-----------------------------------------------|
| `search`   | `search=newton`      | Matches title, content, or tags               |
| `category` | `category=Doubt`     | Exact match                                   |
| `course`   | `course=Physics`     | Exact match                                   |
| `module`   | `module=Mechanics`   | Exact match                                   |
| `topic`    | `topic=Laws`         | Exact match                                   |
| `favorite` | `favorite=true`      | Only favorited/starred notes                  |
| `sort`     | `sort=title_asc`     | `title_asc`, `title_desc`, `created_asc`, `created_desc` (default: recently updated) |

### Note object shape

```json
{
  "id": "uuid",
  "studentId": "student-101",
  "title": "Newton's Laws",
  "content": "F = ma ...",
  "course": "Physics",
  "module": "Mechanics",
  "topic": "Laws of Motion",
  "category": "Concept",
  "tags": ["physics", "mechanics"],
  "isFavorite": false,
  "createdAt": "2026-09-09T04:59:29.638Z",
  "updatedAt": "2026-09-09T04:59:29.638Z"
}
```

### Example requests

```bash
# Create a note
curl -X POST http://localhost:4000/api/notes \
  -H "Content-Type: application/json" \
  -H "X-Student-Id: student-101" \
  -d '{"title":"Newtons Laws","content":"F=ma","course":"Physics","category":"Concept","tags":["physics"]}'

# Search notes
curl "http://localhost:4000/api/notes?search=newton" -H "X-Student-Id: student-101"

# Mark a note as favorite
curl -X PATCH http://localhost:4000/api/notes/<id>/favorite -H "X-Student-Id: student-101"
```

## Notes / design decisions

- Favorited notes always sort first, regardless of the chosen sort order, so "quick access" truly stays quick.
- All note fields except `title` are optional, so students can jot a quick note without filling in course/module/topic right away, then organize it later.
- SQLite was chosen so this module can be dropped into a project and run immediately with no external database server. Swapping in Postgres/MySQL later only requires changing `src/db/database.js` and the SQL in `src/models/notesModel.js` — the routes and frontend are unaffected.
