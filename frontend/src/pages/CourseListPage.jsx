import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client";

export default function CourseListPage() {
  const [courses, setCourses] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.listCourses().then(setCourses).catch((e) => setError(e.message));
  }, []);

  if (error) return <div className="error-banner">Couldn't load courses: {error}</div>;
  if (!courses) return <div className="loading">Loading courses…</div>;

  return (
    <div className="course-list">
      {courses.map((course) => (
        <button
          key={course.id}
          className="course-row"
          onClick={() => navigate(`/courses/${course.id}`)}
        >
          <div>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
          </div>
        </button>
      ))}
    </div>
  );
}
