import axios from "axios";

class CounselingService {
    constructor() {
        this.apiClient = axios.create({
            baseURL: "http://localhost:8085/api/counseling"
        });
    }

    async getAllAvailablePharmacies(data) {
        let pharmacies = await this.apiClient
            .post("/available", data)
            .then(response => {
                return response;
            })
            .catch(err => {
                return err.response;
            });

        return pharmacies;
    }

    async getAllAvailablePharmacistsInPharmacy(id, data) {
        let counselings = await this.apiClient
            .post(`/available/${id}`, data)
            .then(response => {
                return response;
            })
            .catch(err => {
                return err.response;
            });

        return counselings;
    }

    async scheduleCounseling(data) {
        let success = await this.apiClient
            .post(`/schedule`, data)
            .then(response => {
                return response;
            })
            .catch(err => {
                return err.response;
            });

        return success;
    }

}

const counselingService = new CounselingService();

export default counselingService;
