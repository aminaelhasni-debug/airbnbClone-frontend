/**
 * Centralized API client for all HTTP requests
 * Handles base URL configuration, authentication, and error handling
 */

import axios from 'axios';

// Get API base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - adds auth token to headers
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handles errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - clear auth
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ============ AUTH ENDPOINTS ============
export const authAPI = {
  register: (data) => apiClient.post('/register', data),
  login: (data) => apiClient.post('/login', data),
};

// ============ LISTINGS ENDPOINTS ============
export const listingsAPI = {
  // Get all listings
  getAllListings: () => apiClient.get('/listings'),
  
  // Get single listing by ID
  getListingById: (id) => apiClient.get(`/listing/${id}`),
  
  // Get current user's listings
  getMyListings: () => apiClient.get('/my/listings'),
  
  // Create new listing
  createListing: (formData) => apiClient.post('/create/listing', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  
  // Update listing
  updateListing: (id, formData) => apiClient.put(`/update/listing/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  
  // Delete listing
  deleteListing: (id) => apiClient.delete(`/delete/listing/${id}`),
};

// ============ BOOKINGS ENDPOINTS ============
export const bookingsAPI = {
  // Get current user's bookings
  getMyBookings: () => apiClient.get('/my/bookings'),
  
  // Create booking
  createBooking: (data) => apiClient.post('/create/booking', data),
  
  // Delete booking
  deleteBooking: (id) => apiClient.delete(`/booking/${id}`),
};

// ============ UTILITY FUNCTIONS ============

/**
 * Handle API errors in a consistent way
 * @param {Error} error - The error object from axios
 * @returns {string} - User-friendly error message
 */
export const getErrorMessage = (error) => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  
  if (error.response?.status === 500) {
    return 'Server error. Please try again later.';
  }
  
  if (error.response?.status === 404) {
    return 'Resource not found.';
  }
  
  if (error.response?.status === 403) {
    return 'You are not authorized to perform this action.';
  }
  
  if (error.request && !error.response) {
    return 'Network error. Please check your internet connection.';
  }
  
  return error.message || 'An error occurred. Please try again.';
};

/**
 * Build full URL for static resources (images, uploads)
 * @param {string} path - Relative path to resource
 * @returns {string} - Full URL
 */
export const getImageUrl = (path) => {
  if (!path) return '/placeholder-image.png'; // fallback
  if (path.startsWith('http')) return path; // already full URL
  return `${API_BASE_URL}${path}`;
};

export default apiClient;
