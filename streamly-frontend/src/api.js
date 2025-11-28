import axios from "axios";

// Read base URL from .env → VITE_API_URL
// Example in .env: VITE_API_URL=http://localhost:8090
const raw = import.meta.env.VITE_API_URL || "http://localhost:8090";

// Ensure it always ends with /api
// Ex: http://localhost:8090 → http://localhost:8090/api
// Ex: http://localhost:8090/api → kept same
const API_BASE = raw.endsWith("/api")
  ? raw
  : raw.replace(/\/$/, "") + "/api";

console.log("✔ API_BASE =", API_BASE);

const api = axios.create({
  baseURL: API_BASE,
});

// Attach JWT token from localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // CHANGE IF NEEDED (jwt/token)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
