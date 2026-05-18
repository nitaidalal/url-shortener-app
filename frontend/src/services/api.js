import axios from 'axios';

 export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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

// Handle token expiration and 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const requestPath = error.config?.url || ''; // Get the request path from the error config
    const isLoginOrRegisterAttempt = requestPath.includes('/auth/login') || requestPath.includes('/auth/register');

    if (error.response?.status === 401 && !isLoginOrRegisterAttempt) {
      // Token is expired or invalid
      localStorage.removeItem('user');
      
      // Redirect to login page
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  // Register a new user
  register: async (payload) => {
    const { data } = await api.post('/auth/register', payload);
    console.log(data);
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

  // Change password
  changePassword: async (payload) => {
    const { data } = await api.put('/auth/change-password', payload);
    return data;
  },

  // Update profile
  updateProfile: async (payload) => {
    const { data } = await api.put('/auth/profile', payload);
    // Update user in localStorage
    if (data.user) {
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  },

  // Upload profile picture
  uploadProfilePic: async (file) => {
    const formData = new FormData();
    formData.append('profilePic', file);
    
    const { data } = await api.post('/auth/upload-profile-pic', formData);
    
    // Update user in localStorage
    if (data.user) {
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  },

  // Delete account
  deleteAccount: async () => {
    const { data } = await api.delete('/auth/delete-account');
    localStorage.removeItem('user');
    return data;
  },
};

export const urlService = {
  // Shorten a URL
  shorten: async (payload) => {
    const { data } = await api.post("/urls", payload);
    return data;
  },

  // Get all URLs
  getAll: async () => {
    const { data } = await api.get("/urls");
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

export { api };
