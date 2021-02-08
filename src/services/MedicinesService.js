import axios from 'axios'
import store from './../store/index'

class MedicinesService {
  constructor() {
    this.apiClient = axios.create({
      baseURL: 'http://localhost:8085/api/medicines'
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

  async saveNewMedicine(medicineData) {
    let headers = this.setupHeaders()
    const success = this.apiClient
      .post('/save', medicineData, {
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

const medicinesService = new MedicinesService()

export default medicinesService
