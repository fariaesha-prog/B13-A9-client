import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const api = axios.create({
  baseURL: apiUrl ? `${apiUrl}/api` : undefined,
});

function getAuthToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = getAuthToken();
    console.log("TOKEN SENT:", token); // 👈 DEBUG

    config.headers = config.headers || {};
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default api;