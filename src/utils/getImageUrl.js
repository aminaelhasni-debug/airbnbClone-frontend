// src/utils/getImageUrl.js
export const getImageUrl = (image) => {
  if (!image) return "https://via.placeholder.com/400x250"; // fallback
  if (image.startsWith("http://") || image.startsWith("https://")) return image; // full URLs
  // relative upload from backend
  return `${import.meta.env.VITE_API_URL}${image}`;
};