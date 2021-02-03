import axios from 'axios'

class PricingsService {
  constructor () {
    this.apiClient = axios.create({
      baseURL: 'http://localhost:8085/api/pricings'
    })
  }

  async getCurrentPricingsForPharmacy () {
    const user = await this.apiClient
      .get('/pharmacy/25fff0b2-ad45-4310-ac7f-96bcc5e517c1') // const ,login not inplemented yet
      .then(response => {
        return response.data
      })
      .catch(err => {
        console.log(err)
        return {}
      })

    return user
  }

}

const pricingsService = new PricingsService()

export default pricingsService
