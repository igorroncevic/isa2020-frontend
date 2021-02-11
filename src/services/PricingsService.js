import axios from 'axios'
import store from './../store/index'

class PricingsService {
  constructor () {
    this.apiClient = axios.create({
      baseURL: 'http://localhost:8085/api/pricings'
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

  async getCurrentPricingsForPharmacy () {
    let headers = this.setupHeaders()
    const pricings = await this.apiClient
      .get('/pharmacy/e93cab4a-f007-412c-b631-7a9a5ee2c6ed', {
        headers
      }) // const ,login not inplemented yet
      .then(response => {
        return response.data
      })
      .catch(err => {
        console.log(err)
        return {}
      })

    return pricings
  }

  async getAllMedicinePricings (medicineId) {
    let headers = this.setupHeaders()
    const pricings = await this.apiClient
      .get(`/pharmacy/e93cab4a-f007-412c-b631-7a9a5ee2c6ed/medicine/${medicineId}`, {
        headers
      }) // const ,login not inplemented yet
      .then(response => {
        return response.data
      })
      .catch(err => {
        console.log(err)
        return {}
      })

    return pricings
  }

  async deletePricing (id) {
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

  async addNewPricing (data) {
    let headers = this.setupHeaders()
    const success = this.apiClient
      .post('', data, {
        headers
      })
      .then(response => {
        console.log(response.body)
        return true
      })
      .catch(err => {
        console.log(err)
        return false
      })
    return success
  }

  async updatePricing (id, data) {
    let headers = this.setupHeaders()
    const response = this.apiClient
      .put('/' + id, data, {
        headers
      })
      .then(response => {
        return response
      })
      .catch(err => {
        return err.response
      })
    return response
  }

}

const pricingsService = new PricingsService()

export default pricingsService
