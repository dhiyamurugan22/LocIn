const path = require("path");
const express = require("express");
const cors = require("cors");
const notesRouter = require("./routes/notes");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", module: "notes-module" });
});

app.use("/api/notes", notesRouter);

// Fallback to the demo UI for any other GET route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Notes Module server running at http://localhost:${PORT}`);
});
