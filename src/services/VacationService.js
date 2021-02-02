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

    async approveVacation(id) {
        let success = await this.apiClient
          .patch(`/${id}/approve`)
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
