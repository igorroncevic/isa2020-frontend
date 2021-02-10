import axios from 'axios'
import store from './../store/index'
import { getBackendPath } from './backendPath'

class TermService {
  constructor () {
    this.apiClient = axios.create({
      baseURL: getBackendPath() + '/api/terms'
    })
  }

  setupHeaders () {
    const jwt = store.getters.getJwt
    const headers = {
      Accept: 'application/json',
      Authorization: 'Bearer ' + jwt
    }
    return headers
  }

  async postTerm (data) {
    const headers = this.setupHeaders()
    const checkups = await this.apiClient
      .post('/', data, {
        headers
      })
      .then(response => {
        return response
      })
      .catch(err => {
        console.log(err)
        return null
      })

    return checkups
  }

  async getAllPatientsUpcomingTerms (id) {
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
    return terms
  }

  async getDoctorTerms (doctor) {
    const headers = this.setupHeaders()
    const terms = await this.apiClient.get('/doctorAll/' + doctor, {
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

  async getDoctorTermsByPharmacy (doctor, pharmacy) {
    const headers = this.setupHeaders()
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

  async checkIsCurrentTherm (doctor, patient) {
    const headers = this.setupHeaders()
    const term = await this.apiClient
      .get('nowTerm/' + patient + '/' + doctor,{
        headers
      })
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
