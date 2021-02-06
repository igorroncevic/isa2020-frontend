import axios from 'axios'

class PharmacyMedicinesService {
  constructor () {
    this.apiClient = axios.create({
      baseURL: 'http://localhost:8085/api/pharmacyMedicines'
    })
  }

  async checkAvaliable (data) {
    const res = this.apiClient
      .post('/availability', data)
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
    const res = await this.apiClient.get('http://localhost:8085/api/pharmacyMedicines/' + pharmacy)
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

}

const pharmacyMedicinesService = new PharmacyMedicinesService()

export default pharmacyMedicinesService
