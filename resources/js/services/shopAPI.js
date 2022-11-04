import axiosServices from "./axiosServices";

const shopAPI = {
    getCategory: () => {
        const a = "api/shop/category";
        return axiosServices.get(a);
    },

    getAuthor: () => {
        const a= "api/shop/author";
        return axiosServices.get(a);
    },

    getBookFilter: (query) => {
        const a = `api/shop?${query}`;
        return axiosServices.get(a);
    }
}

export default shopAPI;