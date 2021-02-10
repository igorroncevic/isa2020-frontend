import axios from 'axios'
import store from './../store/index'
import { getBackendPath } from './backendPath'

class TermService {
  constructor() {
    this.apiClient = axios.create({
      baseURL: getBackendPath() + '/api/terms'
    })
  }

  async postTerm(data) {
    let headers = this.setupHeaders()
    const checkups = await this.apiClient
      .post('/', data, {
        headers
      })
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

  async getDoctorTerms(doctor) {
    let headers = this.setupHeaders()
    const terms = await this.apiClient.get('/doctor/' + doctor, {
      headers
    })
      .then(response => {
        return response.data
      })
      .catch(err => {
        console.log(err)
        return []
      })
    return terms
  }

  async getDoctorTermsByPharmacy(doctor, pharmacy) {
    let headers = this.setupHeaders()
    const terms = await this.apiClient.get('/doctor/' + doctor + '/' + pharmacy, {
      headers
    })
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
