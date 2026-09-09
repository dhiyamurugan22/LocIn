import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api/client";
import LevelSelector from "../components/LevelSelector";
import AssessmentForm from "../components/AssessmentForm";

// "content" = reading the module at a chosen level
// "assessment" = answering the fill-in questions
// "result" = the graded outcome + mastery status
export default function ModulePage() {
  const { courseId, moduleId } = useParams();
  const navigate = useNavigate();

  const [view, setView] = useState("content");
  const [level, setLevel] = useState("EASY");
  const [content, setContent] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Pick up the student's last-used level for this module (if any) as the default,
  // since revisiting a module should still let them re-choose, not force a level.
  useEffect(() => {
    api
      .listModules(courseId)
      .then((mods) => {
        const thisModule = mods.find((m) => m.moduleId === moduleId);
        if (thisModule?.lastSelectedLevel) {
          setLevel(thisModule.lastSelectedLevel);
        }
      })
      .catch(() => {});
  }, [courseId, moduleId]);

  const loadContent = useCallback(
    (lvl) => {
      setContent(null);
      setError(null);
      api
        .getContent(moduleId, lvl)
        .then(setContent)
        .catch((e) => setError(e.response?.data?.error || e.message));
    },
    [moduleId]
  );

  useEffect(() => {
    loadContent(level);
  }, [level, loadContent]);

  function startAssessment() {
    setError(null);
    api
      .getQuestions(moduleId)
      .then((qs) => {
        setQuestions(qs);
        setView("assessment");
      })
      .catch((e) => setError(e.response?.data?.error || e.message));
  }

  function submitAssessment(answers) {
    setSubmitting(true);
    api
      .submitAssessment(moduleId, answers)
      .then((res) => {
        setResult(res);
        setView("result");
      })
      .catch((e) => setError(e.response?.data?.error || e.message))
      .finally(() => setSubmitting(false));
  }

  if (error) return <div className="error-banner">{error}</div>;

  return (
    <>
      <div className="breadcrumb">
        <button onClick={() => navigate(`/courses/${courseId}`)}>Back to modules</button>
      </div>

      {view === "content" && (
        <>
          <LevelSelector level={level} onChange={setLevel} />
          {!content ? (
            <div className="loading">Loading content…</div>
          ) : (
            <div className="module-content">
              <h2>{content.title}</h2>
              <p className="content-summary">{content.summary}</p>
              <p className="content-body">{content.body}</p>
              <button className="primary-btn" onClick={startAssessment}>
                Take module assessment ({content.questionCount} questions)
              </button>
            </div>
          )}
        </>
      )}

      {view === "assessment" && questions && (
        <div>
          <h2 style={{ marginBottom: 24 }}>Module assessment</h2>
          <AssessmentForm questions={questions} onSubmit={submitAssessment} submitting={submitting} />
        </div>
      )}

      {view === "result" && result && (
        <div className={`result-panel ${result.masteryAchieved ? "pass" : "fail"}`}>
          <div className="score">{Math.round(result.scorePercent)}%</div>
          {result.masteryAchieved ? (
            <p>
              That clears the {Math.round(result.masteryThresholdPercent)}% mastery bar — the next module is
              unlocked.
            </p>
          ) : (
            <p>
              That's below the {Math.round(result.masteryThresholdPercent)}% mastery bar needed to move on.
              Review the module — maybe try a different level — and attempt the assessment again.
            </p>
          )}
          <button
            className="secondary-btn"
            onClick={() => {
              setView("content");
              setResult(null);
              loadContent(level);
            }}
          >
            {result.masteryAchieved ? "Review this module" : "Review and retry"}
          </button>{" "}
          <button className="secondary-btn" onClick={() => navigate(`/courses/${courseId}`)}>
            Back to module list
          </button>
        </div>
      )}
    </>
  );
}
