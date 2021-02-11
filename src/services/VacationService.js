import axios from "axios";
import store from './../store/index'
import { getBackendPath } from './backendPath'

class VacationService {
    constructor() {
        this.apiClient = axios.create({
            baseURL: getBackendPath() + "/api/vacation"
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

    async getAllPendingVacations() {
        let headers = this.setupHeaders()
        let vacations = await this.apiClient
            .get(`/pending`, {
                headers
            })
            .then(response => {
                return response;
            })
            .catch(err => {
                return err.response;
            });

        return vacations;
    }

    async getAllApprovedVacations() {
        let headers = this.setupHeaders()
        let vacations = await this.apiClient
            .get(`/approved`, {
                headers
            })
            .then(response => {
                return response;
            })
            .catch(err => {
                return err.response;
            });

        return vacations;
    }

    async getAllRefusedVacations() {
        let headers = this.setupHeaders()
        let vacations = await this.apiClient
            .get(`/refused`, {
                headers
            })
            .then(response => {
                return response;
            })
            .catch(err => {
                return err.response;
            });

        return vacations;
    }

    async approveVacation(id) {
        let headers = this.setupHeaders()
        let success = await this.apiClient
            .patch(`/${id}/approve`, {
                headers
            })
            .then(response => {
                return response;
            })
            .catch(err => {
                return err.response;
            });

        return success;
    }

    async refuseVacation(id, data) {
        let headers = this.setupHeaders()
        let success = await this.apiClient
            .patch(`/${id}/refuse`, data, {
                headers
            })
            .then(response => {
                return response;
            })
            .catch(err => {
                return err.response;
            });
        return success;
    }

}

const vacationService = new VacationService();

export default vacationService;
