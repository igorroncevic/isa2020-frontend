import axios from 'axios'
import store from './../store/index'
import { getBackendPath } from './backendPath'

class CheckupService {
  constructor() {
    this.apiClient = axios.create({
      baseURL: getBackendPath() + "/api/checkups"
    })
  }

  async getAllCheckups() {
    let headers = this.setupHeaders()
    const checkups = await this.apiClient
      .get('/', {
        headers
      })
      .then(response => {
        return response.data
      })
      .catch(err => {
        console.log(err)
        return []
      })

    return checkups
  }

  async getAllPatientsPastCheckupsPaginated(data) {
    let headers = this.setupHeaders()
    const checkups = await this.apiClient
      .post(`/past`, data, {
        headers
      })
      .then(response => {
        return response
      })
      .catch(err => {
        console.log(err)
        return []
      })

    return checkups
  }

  async getAllPatientsUpcomingCheckupsPaginated(data) {
    let headers = this.setupHeaders()
    const checkups = await this.apiClient
      .post(`/upcoming`, data, {
        headers
      })
      .then(response => {
        return response
      })
      .catch(err => {
        console.log(err)
        return []
      })

    return checkups
  }

  async getAllPatientsCheckups(patientId) {
    let headers = this.setupHeaders()
    const checkups = await this.apiClient
      .get(`/patient/${patientId}`, {
        headers
      })
      .then(response => {
        return response.data
      })
      .catch(err => {
        console.log(err)
        return []
      })

    return checkups
  }

  async getById(id) {
    let headers = this.setupHeaders()
    const term = this.apiClient
      .get('/patientCheckup/' + id, {
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

  async scheduleCheckup(data) {
    let headers = this.setupHeaders()
    const success = this.apiClient
      .put('/schedule', data, {
        headers
      })
      .then(response => {
        return response
      })
      .catch(err => {
        return err.response
      })
    return success
  }

  async cancelCheckup(data) {
    let headers = this.setupHeaders()
    const success = this.apiClient
      .put('/cancel', data, { headers })
      .then(response => {
        return response;
      })
      .catch(err => {
        return response.data
      })
    return success
  }

  async deleteCheckup(id) {
    let headers = this.setupHeaders()
    const success = this.apiClient
      .delete('/' + id, {
        headers
      })
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

  setupHeaders() {
    const jwt = store.getters.getJwt;
    let headers = {
      Accept: "application/json",
      Authorization: "Bearer " + jwt,
    };
    return headers;
  }
}

const checkupService = new CheckupService()

export default checkupService
