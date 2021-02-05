import axios from 'axios'

class MedicineService {
    constructor() {
        this.apiClient = axios.create({
            baseURL: 'http://localhost:8085/api/medicines'
        })
    }

    async getAllPatientsMedicines(patientId) {
        let medicines = await this.apiClient
            .get(`/patient/${patientId}`)
            .then(response => {
                return response;
            })
            .catch(err => {
                return err.response;
            });

        return medicines;
    }

    async getAllPatientsReservedMedicines(patientId) {
        let medicines = await this.apiClient
            .get(`/reserved/${patientId}`)
            .then(response => {
                return response;
            })
            .catch(err => {
                return err.response;
            });

        return medicines;
    }

    async getAllMedicinesPatientsNotAlergicTo(patientId) {
        let medicines = await this.apiClient
            .get(`/notallergic/${patientId}`)
            .then(response => {
                return response;
            })
            .catch(err => {
                return err.response;
            });

        return medicines;
    }

    async getAllMedicinesForFiltering(data) {
        let medicines = await this.apiClient
            .post('/filter', data)
            .then(response => {
                return response;
            })
            .catch(err => {
                return err.response;
            });

        return medicines;
    }

    async reserveMedicine(data) {
        let success = await this.apiClient
            .post('/reserve', data)
            .then(response => {
                return response;
            })
            .catch(err => {
                return err.response;
            });

        return success;
    }

    async cancelMedicine(data) {
        let success = await this.apiClient
            .post('/cancel', data)
            .then(response => {
                return response;
            })
            .catch(err => {
                return err.response;
            });

        return success;
    }

    async addNewAllergyForPatient(data) {
        let success = await this.apiClient
            .post('/allergy', data)
            .then(response => {
                return response;
            })
            .catch(err => {
                return err.response;
            });

        return success;
    }

}

const medicineService = new MedicineService()

export default medicineService
