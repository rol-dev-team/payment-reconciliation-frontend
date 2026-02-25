// src/features/auth/api/authApi.js
import api from '../../../api/axios';

/**
 * Log in the user.
 * @param {Object} credentials { username, password }
 * @returns {Promise} Axios response with token and user data
 */
export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    // Save token and user data in localStorage
    localStorage.setItem('authToken', response.data.token);
    localStorage.setItem('authUser', JSON.stringify(response.data.user));
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Login failed' };
  }
};

/**
 * Log out the current user.
 * @returns {Promise} Axios response
 */
export const logoutUser = async () => {
  try {
    const response = await api.post('/logout');
    // Remove token and user from localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Logout failed' };
  }
};

/**
 * Get the currently logged-in user from localStorage
 */
export const getCurrentUser = () => {
  const user = localStorage.getItem('authUser');
  return user ? JSON.parse(user) : null;
};
