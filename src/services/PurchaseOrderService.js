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

    async addNewPurchaseOrder(data) {
        let headers = this.setupHeaders()
        let id = "e93cab4a-f007-412c-b631-7a9a5ee2c6ed"
        let success = await this.apiClient
            .post(``, data, {
                headers
            })
            .then(response => {
                console.log(response.data)
                return true;
            })
            .catch(err => {
                console.log(err.response)
                return false;
            });

        return success;
    }

    async getAllOffersForOrder(id) {
        let headers = this.setupHeaders()
        let response = await this.apiClient
            .get(`/${id}/offers`, {
                headers
            })
            .then(response => {
                return response
            })
            .catch(err => {
                return err.response
            });

        return response;
    }

}

const purchaseOrderService = new PurchaseOrderService();

export default purchaseOrderService;