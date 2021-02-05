import axios from 'axios'

class PharmacyService {
  constructor () {
    this.apiClient = axios.create({
      baseURL: 'http://localhost:8085/api/pharmacies'
    })
  }

  async getAllFilteredPharmacies (filters) {
    const pharmacies = await this.apiClient
      .get(`/search${filters}`)
      .then(response => {
        return response
      })
      .catch(err => {
        return err.response
      })

    return pharmacies
  }

  async registerNewPharmacy (pharmacyData) {
    const success = this.apiClient
      .post('/register', pharmacyData)
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

  async getAllPharmacies () {
    const pharms = []
    await this.apiClient
      .get('/allpharms')
      .then(response => {
        response.data.forEach(p => {
          pharms.push(p.name)
        })
      })
      .catch(err => {
        console.log(err)
      })

    return pharms
  }

  async getAllPatientsPharmacies (id) {
    const pharmacies = await this.apiClient
      .get(`/patient/${id}`)
      .then(response => {
        return response
      })
      .catch(err => {
        return err.response
      })

    return pharmacies
  }
}

const pharmacyService = new PharmacyService()

export default pharmacyService
