import axios from 'axios'

class MedicineService {
    constructor() {
        this.apiClient = axios.create({
            baseURL: 'http://localhost:8085/api/medicines'
        })
    }

    async getAllPatientsMedicines(patientId) {
        let success = await this.apiClient
            .get(`patient/${patientId}`)
            .then(response => {
                return response;
            })
            .catch(err => {
                return err.response;
            });

        return success;
    }

    async getAllMedicines() {
        let medicines = await this.apiClient
            .get(`/all`)
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
