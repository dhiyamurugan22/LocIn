import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CourseListPage from "./pages/CourseListPage";
import ModuleListPage from "./pages/ModuleListPage";
import ModulePage from "./pages/ModulePage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <header className="masthead">
          <h1>Coursework</h1>
          <span className="tagline">learn at your own depth</span>
        </header>
        <Routes>
          <Route path="/" element={<CourseListPage />} />
          <Route path="/courses/:courseId" element={<ModuleListPage />} />
          <Route path="/courses/:courseId/modules/:moduleId" element={<ModulePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
