import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('isAdmin');

            const isAdmin = window.location.href.includes("admin")
            console.log("url",window.location.href)
            console.log("isAdmin",isAdmin)

            if (isAdmin) {
                window.location.href = '/admin/login';
                return;
            }
            window.location.href = '/login';
            return;
        }
        return Promise.reject(error);
    }
);

export default api;
