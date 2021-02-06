import axios from 'axios'

class TermService {
  constructor () {
    this.apiClient = axios.create({
      baseURL: 'http://localhost:8085/api/terms'
    })
  }

  async postTerm (data) {
    const checkups = await this.apiClient
      .post('/', data)
      .then(response => {
        return response.data
      })
      .catch(err => {
        console.log(err)
        return null
      })

    return checkups
  }

  async getDoctorTerms (doctor) {
    const terms = await this.apiClient.get('/doctor/' + doctor)
      .then(response => {
        return response.data
      })
      .catch(err => {
        console.log(err)
        return []
      })
    return terms
  }

  async getDoctorTermsByPharmacy (doctor, pharmacy) {
    const terms = await this.apiClient.get('/doctor/' + doctor + '/' + pharmacy)
      .then(response => {
        return response.data
      })
      .catch(err => {
        console.log(err)
        return []
      })
    return terms
  }

  async checkIsCurrentTherm (doctor, patient) {
    const term = await this.apiClient
      .get('nowTerm/' + patient + '/' + doctor)
      .then(response => {
        return response.data
      })
      .catch(err => {
        console.log(err)
        return null
      })
    return term
  }
}

const termService = new TermService()

export default termService
