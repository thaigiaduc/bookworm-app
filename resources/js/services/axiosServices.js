import axios from 'axios'

var token = '';
if(JSON.parse(localStorage.getItem('user'))){
    token = JSON.parse(localStorage.getItem('token'));
}
const axiosServices = axios.create({
    baseURL: "http://localhost:8000/",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    },
});

// Interceptors
axiosServices.interceptors.request.use(async (config) => {
    return config;
});

axiosServices.interceptors.response.use(function (response) {
    if(response && response.data) {
        return response.data;
    }
    return response;
  }, function (error) {
    throw error;
  });

export default axiosServices;