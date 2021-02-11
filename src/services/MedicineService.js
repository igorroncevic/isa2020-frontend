import axios from 'axios'
import store from './../store/index'
import { getBackendPath } from './backendPath'

class MedicineService {
    constructor() {
        this.apiClient = axios.create({
            baseURL: getBackendPath() + '/api/medicines'
        })
    }

    setupHeaders() {
        const jwt = store.getters.getJwt;
        let headers = {
            Accept: "application/json",
            Authorization: "Bearer " + jwt,
        };
        return headers;
    }

    async getAllPatientsMedicines(patientId) {
        let headers = this.setupHeaders()
        let medicines = await this.apiClient
            .get(`/patient/${patientId}`, {
                headers
            })
            .then(response => {
                return response;
            })
            .catch(err => {
                return err.response;
            });

        return medicines;
    }

    async getAllPatientsReservedMedicines(patientId) {
        let headers = this.setupHeaders()
        let medicines = await this.apiClient
            .get(`/reserved/${patientId}`, {
                headers
            })
            .then(response => {
                return response;
            })
            .catch(err => {
                return err.response;
            });

        return medicines;
    }

    async getAllMedicinesPatientsNotAlergicTo(patientId) {
        let headers = this.setupHeaders()
        let medicines = await this.apiClient
            .get(`/notallergic/${patientId}`, {
                headers
            })
            .then(response => {
                return response;
            })
            .catch(err => {
                return err.response;
            });

        return medicines;
    }

    async getAllMedicinesPatientsAllergicTo(patientId) {
        let headers = this.setupHeaders()
        let medicines = await this.apiClient
            .get(`/allergic/${patientId}`, {
                headers
            })
            .then(response => {
                return response;
            })
            .catch(err => {
                return err.response;
            });

        return medicines;
    }

    async getAllMedicinesForFiltering(data) {
        let headers = this.setupHeaders()
        let medicines = await this.apiClient
            .post('/filter', data, {
                headers
            })
            .then(response => {
                return response;
            })
            .catch(err => {
                return err.response;
            });

        return medicines;
    }

    // Koristi se za noauth korisnika
    async getAllMedicinesForNoAuthFiltering(data) {
        let medicines = await this.apiClient
            .post('/noauth/filter', data)
            .then(response => {
                return response;
            })
            .catch(err => {
                return err.response;
            });

        return medicines;
    }

    async reserveMedicine(data) {
        let headers = this.setupHeaders()
        let success = await this.apiClient
            .post('/reserve', data, {
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

    async cancelMedicine(data) {
        let headers = this.setupHeaders()
        let success = await this.apiClient
            .post('/cancel', data, {
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

    async addNewAllergyForPatient(data) {
        let headers = this.setupHeaders()
        let success = await this.apiClient
            .post('/allergy', data, {
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

    async getAllMedicines() {
        let headers = this.setupHeaders()
        let medicines = await this.apiClient
            .get(`/all`, {
                headers
            })
            .then(response => {
                return response.data;
            })
            .catch(err => {
                console.log(err.response)
                return [];
            });

        return medicines;
    }

}

const medicineService = new MedicineService()

export default medicineService
