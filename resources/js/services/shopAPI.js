import axiosServices from "./axiosServices";

const shopAPI = {
    // get route api lấy danh sách danh mục
    getCategory: () => {
        const rs = "api/shop/category";
        return axiosServices.get(rs);
    },
    // get route api lấy danh sách tác giả 
    getAuthor: () => {
        const rs = "api/shop/author";
        return axiosServices.get(rs);
    },
    // get route api lấy toàn bộ sách kèm filter 
    getBookFilter: (query) => {
        const rs = `api/shop?${query}`;
        return axiosServices.get(rs);
    }
}

export default shopAPI;