import axios from 'axios'

const axiosServices = axios.create({
    baseURL: "http://localhost:8000/",
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptors
axiosServices.interceptors.request.use(async (config) => {
    return config;
});

axiosServices.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    (error) => {
        throw error;
    }
);

export default axiosServices;