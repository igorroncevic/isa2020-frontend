import axios from "axios";

class PharmacyService {
    constructor() {
        this.apiClient = axios.create({
            baseURL: "http://localhost:8085/api/pharmacies"
        });
    }

    async getAllFilteredPharmacies(filters) {
        let pharmacies = await this.apiClient
            .get(`/search${filters}`)
            .then(response => {
                return response;
            })
            .catch(err => {
                return err.response;
            });

        return pharmacies;
    }

    async getAllPatientsPharmacies(data) {
        let pharmacies = await this.apiClient
            .get(`/patient/${id}`)
            .then(response => {
                return response;
            })
            .catch(err => {
                return err.response;
            });

        return pharmacies;
    }
}

const pharmacyService = new PharmacyService();

export default pharmacyService;
