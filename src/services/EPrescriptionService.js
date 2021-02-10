import axios from "axios";
import store from './../store/index'
import { getBackendPath } from './backendPath'

class EPrescriptionService {
    constructor() {
        this.apiClient = axios.create({
            baseURL: getBackendPath() + "/api/eprescriptions"
        });
    }

    async getAllPatientsEPrescriptions(data) {
        let headers = this.setupHeaders()
        let prescriptions = await this.apiClient
            .post(`/patient/`, data, {
                headers
            })
            .then(response => {
                return response;
            })
            .catch(err => {
                return err.response;
            });

        return prescriptions;
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

const ePrescriptionService = new EPrescriptionService();

export default ePrescriptionService;