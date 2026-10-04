import axios from "axios";

export const TOKEN_KEY = "unio_token";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      if (window.location.pathname !== "/login") {
        window.location.assign("/login");
      }
    }
    return Promise.reject(error);
  },
);

export function getApiErrorMessage(error: unknown, fallback: string) {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;
    if (typeof data === "string" && data.trim()) return data;
    if (data && typeof data.message === "string") return data.message;
    if (data && typeof data.detail === "string") return data.detail;
    if (Array.isArray(data.errors)) {
      return data.errors
        .map((item: unknown) => {
          if (item && typeof item === "object" && "defaultMessage" in item) {
            return String(item.defaultMessage);
          }
          return "";
        })
        .filter(Boolean)
        .join(" ");
    }
    if (data && typeof data.errors === "object" && data.errors !== null) {
      return Object.values(data.errors as Record<string, unknown>)
        .filter((value): value is string => typeof value === "string")
        .join(" ");
    }
  }
  return fallback;
}

export default api;
