import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const submitInquiry = async (inquiryData) => {
  try {
    const response = await axios.post(`${API_URL}/inquiries`, inquiryData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProjects = async (status = null) => {
  try {
    const url = status ? `${API_URL}/projects?status=${status}` : `${API_URL}/projects`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProjectDetail = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/projects/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendContactMessage = async (contactData) => {
  try {
    const response = await axios.post(`${API_URL}/contact`, contactData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
