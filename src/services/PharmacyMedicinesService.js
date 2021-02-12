import axios from 'axios'
import store from './../store/index'
import { getBackendPath } from './backendPath'

class PharmacyMedicinesService {
  constructor () {
    this.apiClient = axios.create({
      baseURL: getBackendPath() + '/api/pharmacyMedicines'
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

  async getPharmacyMedicines(pharmacy) {
    let headers = this.setupHeaders()
    const res = await this.apiClient
      .get('/' + pharmacy, {
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

  async addMedicineToPharmacy(data) {
    let success = await this.apiClient
      .post("", data)
      .then(response => {
        return true;
      })
      .catch(err => {
        return false;
      });

    return success;
  }

  async deletePharmacyMedicine(pid, mid) {
    const success = this.apiClient
      .delete('/' + pid + '/medicine/' + mid)
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

const pharmacyMedicinesService = new PharmacyMedicinesService()

export default pharmacyMedicinesService
