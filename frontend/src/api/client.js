import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE || "http://localhost:8080/api";

const client = axios.create({ baseURL: BASE_URL });

// The module spec doesn't call for a login system, so for this MVP each browser
// gets a stable, locally-generated student id. Swap this out for real auth later
// without touching any of the calls below.
function getStudentId() {
  let id = localStorage.getItem("clm_student_id");
  if (!id) {
    id = "student-" + Math.random().toString(36).slice(2, 10);
    localStorage.setItem("clm_student_id", id);
  }
  return id;
}

export const studentId = getStudentId();

export const api = {
  listCourses: () => client.get("/courses").then((r) => r.data),
  getCourse: (courseId) => client.get(`/courses/${courseId}`).then((r) => r.data),
  listModules: (courseId) =>
    client.get(`/courses/${courseId}/modules`, { params: { studentId } }).then((r) => r.data),
  getContent: (moduleId, level) =>
    client
      .get(`/modules/${moduleId}/content`, { params: { studentId, level } })
      .then((r) => r.data),
  getQuestions: (moduleId) =>
    client.get(`/modules/${moduleId}/assessment/questions`, { params: { studentId } }).then((r) => r.data),
  submitAssessment: (moduleId, answers) =>
    client
      .post(`/modules/${moduleId}/assessment/submit`, { studentId, answers })
      .then((r) => r.data),
};
