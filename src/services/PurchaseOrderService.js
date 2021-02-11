import axios from "axios";
import store from './../store/index'
import { getBackendPath } from './backendPath'

class PurchaseOrderService {
    constructor() {
        this.apiClient = axios.create({
            baseURL: getBackendPath() + "/api/orders"
        });
    }

    setupHeaders() {
        const jwt = store.getters.getJwt;
        let headers = {
            Accept: "application/json",
            Authorization: "Bearer " + jwt,
        };
        return headers;
    }

}

const purchaseOrderService = new PurchaseOrderService();

export default purchaseOrderService;