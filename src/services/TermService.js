import axios from 'axios'
import store from './../store/index'

class TermService {
  constructor() {
    this.apiClient = axios.create({
      baseURL: 'http://localhost:8085/api/terms'
    })
  }

  async postTerm(data) {
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

  async getAllPatientsUpcomingTerms(id) {
    const headers = this.setupHeaders()
    const terms = await this.apiClient
      .get(`/upcoming/${id}`, {
        headers
      })
      .then(response => {
        return response
      })
      .catch(err => {
        return err.response
      })
      return terms;
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

  setupHeaders() {
    const jwt = store.getters.getJwt;
    let headers = {
        Accept: "application/json",
        Authorization: "Bearer " + jwt,
    };
    return headers;
  }
}

const termService = new TermService()

export default termService
