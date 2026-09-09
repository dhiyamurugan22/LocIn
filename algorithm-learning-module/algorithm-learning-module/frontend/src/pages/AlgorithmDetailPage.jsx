import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchAlgorithm } from "../services/api";
import DepthGauge from "../components/DepthGauge";
import "./AlgorithmDetailPage.css";

export default function AlgorithmDetailPage({ level, onLevelChange }) {
  const { slug } = useParams();
  const [algorithm, setAlgorithm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchAlgorithm(slug, level)
      .then((data) => {
        if (!cancelled) setAlgorithm(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug, level]);

  if (loading) return <p className="detail__status">Loading…</p>;
  if (error) return <p className="detail__status detail__status--error">{error}</p>;
  if (!algorithm) return null;

  const c = algorithm.content;

  return (
    <article className="detail">
      <header className="detail__header">
        <div>
          <div className="detail__category">{algorithm.category}</div>
          <h1 className="detail__title">{algorithm.name}</h1>
          <p className="detail__summary">{algorithm.summary}</p>
        </div>
        <DepthGauge value={level} onChange={onLevelChange} />
      </header>

      <Section title="Explanation">
        <p>{c.explanation}</p>
      </Section>

      {c.example && (
        <Section title="Worked example">
          <p className="detail__example">{c.example}</p>
        </Section>
      )}

      {c.steps?.length > 0 && (
        <Section title="Steps">
          <ol className="detail__steps">
            {c.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </Section>
      )}

      {c.workingPrinciple && (
        <Section title="How it works">
          <p>{c.workingPrinciple}</p>
        </Section>
      )}

      {c.pseudocode && (
        <Section title="Pseudocode">
          <pre className="detail__code">{c.pseudocode}</pre>
        </Section>
      )}

      {c.complexity && (
        <Section title="Complexity">
          <p className="detail__complexity">{c.complexity}</p>
        </Section>
      )}

      {c.implementationNotes && (
        <Section title="Implementation notes">
          <p>{c.implementationNotes}</p>
        </Section>
      )}

      {c.edgeCases?.length > 0 && (
        <Section title="Edge cases">
          <ul className="detail__list">
            {c.edgeCases.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </Section>
      )}

      {c.optimizations?.length > 0 && (
        <Section title="Optimizations">
          <ul className="detail__list">
            {c.optimizations.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </Section>
      )}

      {algorithm.levelShown !== level && (
        <p className="detail__fallback-note">
          Note: a {algorithm.levelShown.toLowerCase()}-depth explanation is shown because this
          algorithm doesn't have {level.toLowerCase()}-depth content authored yet.
        </p>
      )}
    </article>
  );
}

function Section({ title, children }) {
  return (
    <section className="detail__section">
      <h2 className="detail__section-title">{title}</h2>
      {children}
    </section>
  );
}
