import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  withCredentials: true, // Enable sending cookies with requests
});

// Add token to requests from Authorization header (fallback)
api.interceptors.request.use(
  (config) => {
    // Cookies are automatically sent with requests due to withCredentials: true
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authService = {
  // Register a new user
  register: async (payload) => {
    const { data } = await api.post('/auth/register', payload);
    // Token is automatically stored in HTTP cookie by server
    if (data.user) {
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  },

  // Login user
  login: async (payload) => {
    const { data } = await api.post('/auth/login', payload);
    // Token is automatically stored in HTTP cookie by server
    if (data.user) {
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  },

  // Logout
  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('user');
    }
  },

  // Get current user from localStorage
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    // Check if user data exists (token is in secure cookie)
    return !!localStorage.getItem('user');
  },
};

export const urlService = {
  // Shorten a URL
  shorten: async (payload) => {
    const { data } = await api.post('/urls', payload);
    return data;
  },

  // Get all URLs
  getAll: async () => {
    const { data } = await api.get('/urls');
    return data;
  },

  // Delete a URL
  delete: async (id) => {
    const { data } = await api.delete(`/urls/${id}`);
    return data;
  },

  // Get stats
  getStats: async (code) => {
    const { data } = await api.get(`/urls/${code}/stats`);
    return data;
  },
};

export const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';
