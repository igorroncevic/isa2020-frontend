import axios from 'axios'

class LoyaltyService {
  constructor () {
    this.apiClient = axios.create({
      baseURL: 'http://localhost:8085/api/loyalty'
    })
  }

  async getAllLoyaltys () {
    const loyalty = await this.apiClient
      .get('/all')
      .then(response => {
        return response.data
      })
      .catch(err => {
        console.log(err)
        return {}
      })

    return loyalty
  }

  async addNewLoyalty (data) {
    const success = this.apiClient
      .post('/add', data)
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

  async updateLoyaltyData (data) {
    const responseData = this.apiClient
      .put('', data)
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

  async deleteLoyalty (id) {
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

const loyaltyService = new LoyaltyService()

export default loyaltyService
