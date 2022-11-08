import axiosServices from "./axiosServices";

const productAPI = {
    // get route api lấy thông tin sản phẩm theo id
    getProductDetails: (query) => {
        const rs = `api${query}`;
        return axiosServices.get(rs);
    },
    // get route api lấy danh sách review theo id
    getReviewDetails: (a, b) => {
        const rs = `api${a}?${b}`;
        return axiosServices.get(rs);
    },
    // get route api đếm tổng review mà số sao đó có
    getCountRating: (a) => {
        const rs = `api${a}`;
        return axiosServices.get(rs);
    },
    // get route api tạo review mới
    createReview: (object) => {
        const rs = 'api/shop/product/createReview';
        return axiosServices.post(rs, object);
    }
}

export default productAPI;
