// auth.ts
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users'; // Make sure this matches your backend URL
console.log('API_URL:', API_URL); // Add this line for checking

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

export const register = async (user: { firstName: string; lastName: string; email: string; password: string }) => {
  const response = await axios.post(`${API_URL}/register`, user); // Ensure the route matches your backend
  return response.data;
};
