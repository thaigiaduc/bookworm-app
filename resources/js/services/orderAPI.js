import axiosServices from "./axiosServices";

const orderAPI = {
    createOrder: (object) => {
        const rs = 'api/shop/product/createOrder';
        return axiosServices.post(rs, object);
    }

}

export default orderAPI;