import { NavLink } from "react-router-dom";
import "./Sidebar.css";

/**
 * Groups algorithms by category for browsing only. Every student sees
 * every entry here regardless of their chosen depth - grouping is a
 * navigation aid, not a gate.
 */
export default function Sidebar({ algorithms, loading, error }) {
  const grouped = groupByCategory(algorithms);

  return (
    <nav className="sidebar" aria-label="Algorithms">
      <div className="sidebar__masthead">
        <span className="sidebar__mark">§</span>
        <div>
          <div className="sidebar__title">Algorithm Notebook</div>
          <div className="sidebar__subtitle">Every algorithm. Your depth.</div>
        </div>
      </div>

      {loading && <p className="sidebar__status">Loading index…</p>}
      {error && <p className="sidebar__status sidebar__status--error">{error}</p>}

      {Object.entries(grouped).map(([category, items]) => (
        <div className="sidebar__group" key={category}>
          <div className="sidebar__group-label">{category}</div>
          <ul className="sidebar__list">
            {items.map((algo) => (
              <li key={algo.slug}>
                <NavLink
                  to={`/algorithms/${algo.slug}`}
                  className={({ isActive }) =>
                    `sidebar__link ${isActive ? "is-active" : ""}`
                  }
                >
                  {algo.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}

function groupByCategory(algorithms) {
  return algorithms.reduce((acc, algo) => {
    (acc[algo.category] ||= []).push(algo);
    return acc;
  }, {});
}
