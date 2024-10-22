import axios from "axios";

const api = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:3000/api",
});
api.interceptors.request.use((config) => {
  config.headers!.Authorization = `Bearer ${localStorage.getItem(
    "accessToken"
  )}`;
  return config;
});

export default api;
