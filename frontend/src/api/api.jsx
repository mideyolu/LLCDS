// api.jsx
import axios from "axios";

const API_URL = "http://localhost:8000/auth"; // Update with your backend URL

export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data; // This will return the success message
  } catch (error) {
    throw error.response.data.detail; // Return the error message
  }
};

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data; // This will return the access token and token type
  } catch (error) {
    throw error.response.data.detail; // Return the error message
  }
};
