import axios from "axios";
const API = axios.create({ baseURL: 'https://stack-overflow-81w9.onrender.com' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem("Profile")) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem("Profile")).token}`;
    }
    return req;
});

export default API;
