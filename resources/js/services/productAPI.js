import axiosServices from "./axiosServices";

const productAPI = {
    getProductDetails: (query) => {
        const rs = `api${query}`;
        return axiosServices.get(rs);
    },

    getReviewDetails: (a, b) => {
        const rs = `api${a}?${b}`;
        return axiosServices.get(rs);
    }
}

export default productAPI;