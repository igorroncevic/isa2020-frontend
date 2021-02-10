import axios from 'axios'
import store from './../store/index'

class PromotionService {
  constructor () {
    this.apiClient = axios.create({
      baseURL: 'http://localhost:8085/api/promotions'
    })
  }

  setupHeaders () {
    const jwt = store.getters.getJwt
    const headers = {
      Accept: 'application/json',
      Authorization: 'Bearer ' + jwt
    }
    return headers
  }

  async getAllPatientsPromotions (id) {
    const headers = this.setupHeaders()
    const promotions = await this.apiClient
      .get(`/patient/${id}`, {
        headers
      })
      .then(response => {
        return response
      })
      .catch(err => {
        return err.response
      })

    return promotions
  }
}

const promotionService = new PromotionService()

export default promotionService
