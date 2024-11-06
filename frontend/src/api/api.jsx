// api.jsx
import axios from "axios";

const API_URL = "http://localhost:8000/auth"; // Update with your backend URL
const Protected_URl = "http://localhost:8000/protected";

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

export const getDashboardData = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token found");
    }

    const response = await axios.get(`${Protected_URl}/dashboard`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || "Error fetching dashboard data.";
  }
};

export const logout = () => {
  // Clear the token from localStorage
  localStorage.removeItem("token");

  // Redirect to login page (using React Router)
  window.location.href = "/login"; // Or use navigate() if you prefer React Router's way
};

// utils/validation.js
export const validateEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const validatePassword = (password) => password.length >= 8;
