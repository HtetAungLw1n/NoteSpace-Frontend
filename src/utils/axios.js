import axios from "axios";

const API_URL = "http://localhost:8000/api";

// Public axios instance for unauthenticated routes
export const publicAxios = axios.create({
  baseURL: API_URL,
});

// Private axios instance for authenticated routes
export const privateAxios = axios.create({
  baseURL: API_URL,
});

// Add token to private instance requests
privateAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `JWT ${token}`;
  }
  return config;
});
