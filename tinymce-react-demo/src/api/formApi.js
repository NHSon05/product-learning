import axios from 'axios';

const BACKEND_URL = 'http://localhost:8000/api';

export const formApi = {
  // Lấy danh sách tất cả các form
  getAllForms: async () => {
    const response = await axios.get(`${BACKEND_URL}/forms`);
    return response.data;
  },

  // Lấy chi tiết nội dung 1 form
  getFormById: async (formId) => {
    const response = await axios.get(`${BACKEND_URL}/forms/${formId}`);
    return response.data;
  },

  // Cập nhật nội dung form mới
  updateForm: async (formId, htmlContent) => {
    const response = await axios.put(`${BACKEND_URL}/forms/${formId}`, { htmlContent });
    return response.data;
  }
};
