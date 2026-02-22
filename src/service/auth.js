// src/services/auth.js

// Save token to localStorage
export const saveToken = (token) => localStorage.setItem("token", token);

// Get token from localStorage
export const getToken = () => localStorage.getItem("token");

// Remove token from localStorage
export const removeToken = () => localStorage.removeItem("token");

// Check if user is logged in
export const isLoggedIn = () => !!getToken();
