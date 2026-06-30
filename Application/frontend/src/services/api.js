import axios from "axios";

const api = axios.create({
    baseURL: "/api"
});

// Attach the JWT (if we have one) to every outgoing request instead of
// requiring every call site to remember to do it.
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// If the token is missing/expired, bounce back to the login page instead
// of silently failing.
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;
