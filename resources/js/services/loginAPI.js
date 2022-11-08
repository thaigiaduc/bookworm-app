import axiosServices from "./axiosServices";

const loginAPI = {
    // get route api login
    Login: (value) => {
        const a = "api/authenticate/login";
        return axiosServices.post(a, value);
    },
    // get route api logout
    Logout: () => {
        const a = "api/authenticate/logout";
        return axiosServices.post(a);
    }

}

export default loginAPI;