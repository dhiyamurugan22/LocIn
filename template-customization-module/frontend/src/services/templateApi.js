import axios from "axios";

const BASE_URL = process.env.REACT_APP_TEMPLATE_API_URL || "http://localhost:8083/api/templates";

const client = axios.create({ baseURL: BASE_URL });

const templateApi = {
  getDefaultTemplate: () => client.get("/default").then((res) => res.data),

  getSuggestedTemplates: () => client.get("/suggested").then((res) => res.data),

  getTemplatesForStudent: (studentId) =>
    client.get(`/student/${studentId}`).then((res) => res.data),

  getActiveTemplate: (studentId) =>
    client.get(`/student/${studentId}/active`).then((res) => res.data),

  selectTemplate: (studentId, templateId) =>
    client
      .post(`/student/${studentId}/select`, { templateId })
      .then((res) => res.data),

  customizeTemplate: (studentId, { name, basedOnTemplateId, settings }) =>
    client
      .put(`/student/${studentId}/customize`, { name, basedOnTemplateId, settings })
      .then((res) => res.data),

  restoreDefault: (studentId) =>
    client.post(`/student/${studentId}/restore-default`).then((res) => res.data),
};

export default templateApi;
