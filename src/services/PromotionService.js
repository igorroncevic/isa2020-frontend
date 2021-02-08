import axios from "axios";

class PromotionService {
    constructor() {
        this.apiClient = axios.create({
            baseURL: "http://localhost:8085/api/promotions"
        });
    }

    async getAllPatientsPromotions(id) {
        let promotions = await this.apiClient
            .get(`/patient/${id}`)
            .then(response => {
                return response;
            })
            .catch(err => {
                return err.response;
            });

        return promotions;
    }
}

const promotionService = new PromotionService();

export default promotionService;