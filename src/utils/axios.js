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
privateAxios.interceptors.request.use(
  (config) => {
    const tokens = localStorage.getItem("tokens");
    const { access } = JSON.parse(tokens);
    if (access) {
      config.headers.Authorization = `JWT ${access}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

privateAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const tokens = localStorage.getItem("tokens");
      const { refresh } = JSON.parse(tokens);

      try {
        const response = await publicAxios.post("/auth/jwt/create/", {
          refresh: refresh,
        });
        const { access } = response.data;

        localStorage.setItem(
          "tokens",
          JSON.stringify({ access: access, refresh: refresh })
        );
      } catch (error) {
        localStorage.removeItem("tokens");
        alert("Session expired, please login again");
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);
