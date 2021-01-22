import axios from "axios";

class PharmacyAdminService {
    constructor() {
        this.apiClient = axios.create({
            baseURL: "http://localhost:8085/api/phadmin"
        });
    }

    async getMyData() {
        let user = await this.apiClient
          .get("/40c88a70-d8cd-4d8f-b56f-eb158f7c27fa") //Zakucano dok ne implementiramo autentitkaciju
          .then(response => {
            return response.data;
          })
          .catch(err => {
            console.log(err);
            return {
            };
          });
    
        return user;
      }
}

const pharmacyAdminService = new PharmacyAdminService();

export default pharmacyAdminService;