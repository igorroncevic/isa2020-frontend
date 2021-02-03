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

}

const medicineService = new MedicineService()

export default medicineService