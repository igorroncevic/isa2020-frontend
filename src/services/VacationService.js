import axios from "axios";

class VacationService {
    constructor() {
        this.apiClient = axios.create({
            baseURL: "http://localhost:8085/api/vacation"
        });
    }

    async getAllPendingVacations() {
        let vacations = await this.apiClient
            .get(`/pending`)
            .then(response => {
                return response;
            })
            .catch(err => {
                return err.response;
            });

        return vacations;
    }

}

const vacationService = new VacationService();

export default vacationService;
