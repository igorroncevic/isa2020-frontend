import axios from 'axios'
import store from './../store/index'

class PharmacyMedicinesService {
  constructor () {
    this.apiClient = axios.create({
      baseURL: 'http://localhost:8085/api/pharmacyMedicines'
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

  async checkAvaliable (data) {
    const headers = this.setupHeaders()
    const res = this.apiClient
      .post('/availability', data, {
        headers
      })
      .then(response => {
        return response.data
      })
      .catch(err => {
        console.log(err)
        return false
      })
    return res
  }

  async getPharmacyMedicines (pharmacy) {
    const headers = this.setupHeaders()
    const res = await this.apiClient.get('http://localhost:8085/api/pharmacyMedicines/' + pharmacy, {
      headers
    })
      .then(response => {
        return response.data
      })
      .catch(error => {
        console.log(error)
        return []
      })
    return res
  }
}

const pharmacyMedicinesService = new PharmacyMedicinesService()

export default pharmacyMedicinesService
