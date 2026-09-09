import React from "react";
import ChatAssistant from "./ChatAssistant";

// Drop <ChatAssistant /> anywhere in your app, e.g. on a course page:
export default function ExampleCoursePage() {
  const loggedInStudentId = "student_123"; // from your auth/session
  const currentCourseId = "course_dsa_101";

  return (
    <div style={{ padding: 20 }}>
      <h2>Data Structures & Algorithms</h2>
      {/* ...course content... */}

      <ChatAssistant studentId={loggedInStudentId} courseId={currentCourseId} />
    </div>
  );
}
