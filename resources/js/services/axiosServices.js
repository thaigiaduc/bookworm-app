import axios from 'axios'

// khai báo biến token
var token = '';
// check nếu trong localstorage của use tồn tại thì gán token bằng localstorage token 
if(JSON.parse(localStorage.getItem('user'))){
    token = JSON.parse(localStorage.getItem('token'));
}
// create axios với bareURL là subdomain và headers bao gồm content là dạng json và authorize token là bearer token
const axiosServices = axios.create({
    baseURL: "http://localhost:8000/",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    },
});

// Interceptors.request đón chặn request trước khi được gửi đi 
axiosServices.interceptors.request.use(async (config) => {
    return config;
});
// interceptors.response đón chặn response.
axiosServices.interceptors.response.use(function (response) {
    // trong tầm 2xx
    if(response && response.data) {
        return response.data;
    }
    return response;
    // ngoài tầm 2xx
  }, function (error) {
    throw error;
  });

export default axiosServices;