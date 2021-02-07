import axios from "axios";

class EPrescriptionService {
    constructor() {
        this.apiClient = axios.create({
            baseURL: "http://localhost:8085/api/eprescriptions"
        });
    }

    async getAllPatientsEPrescriptions(id) {
        let prescriptions = await this.apiClient
            .get(`/${id}`)
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