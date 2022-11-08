import axiosServices from "./axiosServices";

const orderAPI = {
    // get route api order sản phẩm
    createOrder: (object) => {
        const rs = 'api/shop/product/createOrder';
        return axiosServices.post(rs, object);
    }

}

export default orderAPI;