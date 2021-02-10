import axios from "axios";
import store from './../store/index'
import { getBackendPath } from './backendPath'

class PromotionService {
    constructor() {
        this.apiClient = axios.create({
            baseURL: getBackendPath() + "/api/promotions"
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

    async getAllPatientsPromotions(id) {
        let headers = this.setupHeaders()
        let promotions = await this.apiClient
            .get(`/patient/${id}`, {
                headers
            })
            .then(response => {
                return response;
            })
            .catch(err => {
                return err.response;
            });

        return promotions;
    }

    async getAllPharmacyPromotions(id) {
        let headers = this.setupHeaders()
        let promotions = await this.apiClient
            .get(`/pharmacy/${id}`, {
                headers
            })
            .then(response => {
                return response;
            })
            .catch(err => {
                return err.response;
            });

        return promotions;
    }

    async addNewPromotion(id, data) {
        let headers = this.setupHeaders()
        let success = await this.apiClient
            .post(`/pharmacy/${id}`, data, {
                headers
            })
            .then(response => {
                return true;
            })
            .catch(err => {
                return false;
            });

        return success;
    }
}

const promotionService = new PromotionService();

export default promotionService;