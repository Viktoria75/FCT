import axios from 'axios';
import { IUser } from '../types';


// Base URL for the API
const BASE_URL = 'http://localhost:5000/api'; // Adjust this to match your backend URL

// Fetch all users (only accessible by admin)
// export const getUsers = async (): Promise<IUser[]> => {
//   try {
//     const token = localStorage.getItem('token');
//     const headers = {
//       Authorization: `Bearer ${token}`,
//     };
//     const response = await axios.get<IUser[]>(`${BASE_URL}/users`, { headers });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     throw error;
//   }
// };

export const getUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users`); // Adjust API endpoint as per your backend setup
    return response.data; // Assuming API response is an array of users
  } catch (error) {
    console.error('Error fetching users:', error);
    // Handle error fetching users
  }
};

export const getUserById = async (userId: string, token: string | null) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    console.log('Headers:', headers); // Log the headers to verify the token is being set correctly
    const response = await axios.get(`${BASE_URL}/users/${userId}`, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID ${userId}:`, error);
    throw error;
  }
};
// Create a new user (only accessible by admin)
export const createUser = async (userData: Partial<IUser>): Promise<IUser> => {
  try {
    const response = await axios.post<IUser>(`${BASE_URL}/users`, userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const updateUser = async (userId: string, userData: Partial<IUser>, token: string | null): Promise<IUser> => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.put<IUser>(`${BASE_URL}/users/${userId}`, userData, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error updating user with ID ${userId}:`, error);
    throw error;
  }
};

// Delete a user (only accessible by admin)
export const deleteUser = async (userId: string, token: string | null): Promise<void> => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    await axios.delete(`${BASE_URL}/users/${userId}`, { headers });
  } catch (error) {
    console.error(`Error deleting user with ID ${userId}:`, error);
    throw error;
  }
};

// Register a new user
export const registerUser = async (userData: Partial<IUser>): Promise<IUser> => {
  try {
    const response = await axios.post<IUser>(`${BASE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

// Login a user and get a token
export const loginUser = async (email: string, password: string): Promise<{ token: string }> => {
  try {
    const response = await axios.post<{ token: string }>(`${BASE_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};

// Logout the current user
export const logoutUser = async (): Promise<void> => {
  try {
    await axios.post(`${BASE_URL}/logout`);
  } catch (error) {
    console.error('Error logging out user:', error);
    throw error;
  }
};

export const getUserProgress = async (challengeId: string, token: string | null): Promise<number> => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(`${BASE_URL}/challenges/${challengeId}/progress`, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error fetching user progress for challenge ${challengeId}:`, error);
    throw error;
  }
};
