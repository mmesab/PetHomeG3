import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api', // Ajusta según la URL base del backend
});

// Interceptor para adjuntar el token JWT en las peticiones
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;