import axiosServices from "./axiosServices";

const productAPI = {
    getProductDetails: (query) => {
        const rs = `api${query}`;
        return axiosServices.get(rs);
    },

    getReviewDetails: (a, b) => {
        const rs = `api${a}?${b}`;
        return axiosServices.get(rs);
    },

    getCountRating: (a) => {
        const rs = `api${a}`;
        return axiosServices.get(rs);
    },

    createReview: (object) => {
        const rs = 'api/shop/product/createReview';
        return axiosServices.post(rs, object);
    }
}

export default productAPI;
