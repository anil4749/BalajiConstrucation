import axios from 'axios';

// Get API URL from environment variables or use production default
const getApiUrl = () => {
  if (process.env.REACT_APP_API_URL) {
    return `${process.env.REACT_APP_API_URL}/api`;
  }
  // Production fallback
  if (process.env.NODE_ENV === 'production') {
    return 'https://balaji-api-guru.onrender.com/api';
  }
  // Development fallback
  return 'http://localhost:5000/api';
};

const API_URL = getApiUrl();

console.log('API Configuration:', { 
  API_URL, 
  ENV: process.env.REACT_APP_ENV || 'development',
  NODE_ENV: process.env.NODE_ENV
});

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
