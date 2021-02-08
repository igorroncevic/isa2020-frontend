import axios from 'axios'
import store from './../store/index'

class LoyaltyService {
  constructor() {
    this.apiClient = axios.create({
      baseURL: 'http://localhost:8085/api/loyalty'
    })
  }

  setupHeaders() {
    const jwt = store.getters.getJwt;
    let headers = {
      Accept: "application/json",
      Authorization: "Bearer " + jwt,
    };
    return headers;
  }

  async getAllLoyaltys() {
    let headers = this.setupHeaders()
    const loyalty = await this.apiClient
      .get('/all', {
        headers
      })
      .then(response => {
        return response.data
      })
      .catch(err => {
        console.log(err)
        return {}
      })

    return loyalty
  }

  async addNewLoyalty(data) {
    let headers = this.setupHeaders()
    const success = this.apiClient
      .post('/add', data, {
        headers
      })
      .then(response => {
        console.log(response)
        return true
      })
      .catch(err => {
        console.log(err)
        return false
      })
    return success
  }

  async updateLoyaltyData(data) {
    let headers = this.setupHeaders()
    const responseData = this.apiClient
      .put('', data, {
        headers
      })
      .then(response => {
        console.log(response)
        return response.data
      })
      .catch(err => {
        console.log(err)
        return {}
      })
    return responseData
  }

  async deleteLoyalty(id) {
    let headers = this.setupHeaders()
    const success = this.apiClient
      .delete('/' + id, {
        headers
      })
      .then(response => {
        console.log(response)
        return true
      })
      .catch(err => {
        console.log(err)
        return false
      })
    return success
  }
}

const loyaltyService = new LoyaltyService()

export default loyaltyService
