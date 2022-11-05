import axiosServices from "./axiosServices";

const shopAPI = {
    getCategory: () => {
        const rs = "api/shop/category";
        return axiosServices.get(rs);
    },

    getAuthor: () => {
        const rs = "api/shop/author";
        return axiosServices.get(rs);
    },

    getBookFilter: (query) => {
        const rs = `api/shop?${query}`;
        return axiosServices.get(rs);
    }
}

export default shopAPI;