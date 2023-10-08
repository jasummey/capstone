import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: import.meta.env.VITE_NODE_ENV === "production"
  ? import.meta.env.VITE_API_URL
  : "http://localhost:3001/api",
});
export function getAuthToken() {
  return Cookies.get("token");
}

export function setAuthHeaders(token) {
  if (!token) {
    api.defaults.headers.common["Authorization"] = "";
    return;
  }
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
export default api;
