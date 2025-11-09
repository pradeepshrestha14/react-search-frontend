import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 8000, // 8 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Handle timeout or network errors
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.code === "ECONNABORTED") {
      console.warn("Request timed out — server might be waking up.");
    }
    throw error;
  }
);

export default axiosInstance;
