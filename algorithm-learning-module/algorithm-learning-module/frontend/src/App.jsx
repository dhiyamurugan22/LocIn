import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import AlgorithmDetailPage from "./pages/AlgorithmDetailPage";
import EmptyState from "./pages/EmptyState";
import { fetchAllAlgorithms } from "./services/api";
import { usePreferredLevel } from "./hooks/usePreferredLevel";
import "./App.css";

export default function App() {
  const [algorithms, setAlgorithms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [level, setLevel] = usePreferredLevel();

  useEffect(() => {
    fetchAllAlgorithms()
      .then(setAlgorithms)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="app-shell">
      <Sidebar algorithms={algorithms} loading={loading} error={error} />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<EmptyState />} />
          <Route
            path="/algorithms/:slug"
            element={<AlgorithmDetailPage level={level} onLevelChange={setLevel} />}
          />
        </Routes>
      </main>
    </div>
  );
}
