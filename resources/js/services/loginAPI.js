import axiosServices from "./axiosServices";

const loginAPI = {
    Login: (value) => {
        const a = "api/authenticate/login";
        return axiosServices.post(a, value);
    },
    Logout: () => {
        const a = "api/authenticate/logout";
        return axiosServices.post(a);
    }

}

export default loginAPI;