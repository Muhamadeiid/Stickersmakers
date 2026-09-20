import axios from "axios";

const trimTrailingSlash = (value) => value.replace(/\/$/, "");

export const API_BASE_URL = trimTrailingSlash(
  import.meta.env.VITE_API_BASE_URL ||
    "http://127.0.0.1:8000/api",
);

export const ASSET_BASE_URL = trimTrailingSlash(
  import.meta.env.VITE_ASSET_BASE_URL ||
    (API_BASE_URL.startsWith("http")
      ? new URL(API_BASE_URL).origin
      : window.location.origin),
);

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15_000,
  headers: { Accept: "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
