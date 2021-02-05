import axios from 'axios'

class MedicinesService {
  constructor () {
    this.apiClient = axios.create({
      baseURL: 'http://localhost:8085/api/medicines'
    })
  }

  async saveNewMedicine (medicineData) {
    const success = this.apiClient
      .post('/save', medicineData)
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
