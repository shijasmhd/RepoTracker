import { LocalStorageKey } from "@/config";
import axios from "axios";

const axiosInstance = axios.create();

// Attach token with request
axiosInstance.interceptors.request.use(
  (request) => {
    const logInData = JSON.parse(localStorage.getItem(LocalStorageKey));
    const accessToken = logInData?.token;

    if (accessToken) {
      request.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle token expiration
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error?.response?.status === 401 &&
      error?.response?.data?.message === "Please authenticate"
    ) {
      // Can check with retry with refresh token if available
      localStorage.removeItem(LocalStorageKey);
      window.location.href = "/login";
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
