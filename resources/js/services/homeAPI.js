import axiosServices from "./axiosServices";

const homeAPI = {
    // call route api get onsale book
    getBookOnSale: () => {
        const rs = "api/home/sale";
        return axiosServices.get(rs);        
    },
    // call route api get recommended book
    getBookRecommended: () => {
        const rs = "api/home/recommended";
        return axiosServices.get(rs);
    },
    // call route api get popular book
    getBookPopular: () => {
        const rs = "api/home/popular";
        return axiosServices.get(rs);
    }
}

export default homeAPI;