import axios from 'axios'

class PricingsService {
  constructor () {
    this.apiClient = axios.create({
      baseURL: 'http://localhost:8085/api/pricings'
    })
  }

  async getCurrentPricingsForPharmacy () {
    const pricings = await this.apiClient
      .get('/pharmacy/e93cab4a-f007-412c-b631-7a9a5ee2c6ed') // const ,login not inplemented yet
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
    const pricings = await this.apiClient
      .get(`/pharmacy/e93cab4a-f007-412c-b631-7a9a5ee2c6ed/medicine/${medicineId}`) // const ,login not inplemented yet
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
    const success = this.apiClient
      .delete('/' + id)
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

const pricingsService = new PricingsService()

export default pricingsService
