import axiosServices from "./axiosServices";

const homeAPI = {
    getBookOnSale: () => {
        const rs = "api/home/sale";
        return axiosServices.get(rs);        
    },

    getBookRecommended: () => {
        const rs = "api/home/recommended";
        return axiosServices.get(rs);
    },

    getBookPopular: () => {
        const rs = "api/home/popular";
        return axiosServices.get(rs);
    }
}

export default homeAPI;