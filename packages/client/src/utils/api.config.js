import axios from "axios"

const api = axios.create ({
    baseURL: "http://localhost:3001/api"
});

export function setAuthHeaders (token) {
    if (!token){
        api.defaults.headers.common["Authorization"] = "";
        return;
    }
    api.defaults.headers.common ["Authorization"] = `Bearer ${token}`;
 }
export default api;