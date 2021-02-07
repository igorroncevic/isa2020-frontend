import axios from "axios";

class EPrescriptionService {
    constructor() {
        this.apiClient = axios.create({
            baseURL: "http://localhost:8085/api/eprescriptions"
        });
    }

    async getAllPatientsEPrescriptions(data) {
        let prescriptions = await this.apiClient
            .post(`/patient/`, data)
            .then(response => {
                return response;
            })
            .catch(err => {
                return err.response;
            });

        return prescriptions;
    }
}

const ePrescriptionService = new EPrescriptionService();

export default ePrescriptionService;