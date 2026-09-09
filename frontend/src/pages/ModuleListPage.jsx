import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api/client";

export default function ModuleListPage() {
  const { courseId } = useParams();
  const [modules, setModules] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.listModules(courseId).then(setModules).catch((e) => setError(e.message));
  }, [courseId]);

  if (error) return <div className="error-banner">Couldn't load modules: {error}</div>;
  if (!modules) return <div className="loading">Loading modules…</div>;

  return (
    <>
      <div className="breadcrumb">
        <button onClick={() => navigate("/")}>All courses</button>
      </div>
      <div className="module-list">
        {modules.map((mod) => (
          <button
            key={mod.moduleId}
            className={`module-row ${mod.unlocked ? "unlocked" : "locked"}`}
            disabled={!mod.unlocked}
            onClick={() => navigate(`/courses/${courseId}/modules/${mod.moduleId}`)}
          >
            <span className="module-index">{String(mod.order).padStart(2, "0")}</span>
            <div>
              <div className="module-title">{mod.title}</div>
              <div className="module-meta">
                {mod.lastSelectedLevel
                  ? `Last studied at ${cap(mod.lastSelectedLevel)} level`
                  : mod.unlocked
                  ? "Not started yet"
                  : "Locked"}
                {mod.bestScorePercent != null && ` · best score ${Math.round(mod.bestScorePercent)}%`}
              </div>
            </div>
            {mod.masteryAchieved ? (
              <span className="status-pill mastered">Mastered</span>
            ) : mod.unlocked ? (
              <span className="status-pill">In progress</span>
            ) : (
              <span className="status-pill locked">Locked</span>
            )}
          </button>
        ))}
      </div>
    </>
  );
}

function cap(s) {
  return s.charAt(0) + s.slice(1).toLowerCase();
}
