import axios from 'axios'
import store from './../store/index'

class CheckupService {
  constructor () {
    this.apiClient = axios.create({
      baseURL: 'http://localhost:8085/api/checkups'
    })
  }

  async getAllCheckups () {
    const headers = this.setupHeaders()
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

  async getAllPatientsPastCheckupsPaginated (data) {
    const headers = this.setupHeaders()
    const checkups = await this.apiClient
      .post('/past', data, {
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

  async getAllPatientsUpcomingCheckupsPaginated (data) {
    const headers = this.setupHeaders()
    const checkups = await this.apiClient
      .post('/upcoming', data, {
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

  async getAllPatientsCheckups (patientId) {
    const headers = this.setupHeaders()
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

  async getById (id) {
    const headers = this.setupHeaders()
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

  async scheduleCheckup (data) {
    const headers = this.setupHeaders()
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

  async cancelCheckup (data) {
    const headers = this.setupHeaders()
    const success = this.apiClient
      .put('/cancel', data, { headers })
      .then(response => {
        return response
      })
      .catch(err => {
        return err.data
      })
    return success
  }

  async deleteCheckup (id) {
    const headers = this.setupHeaders()
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

  async getFreeDoctorPharmacyTerms (doctor, pharmacy) {
    const res = this.apiClient
      .get('/freeCheckups/' + doctor + '/' + pharmacy)
      .then(response => {
        return response.data
      })
      .catch(err => {
        console.log(err)
        return []
      })
    return res
  }

  setupHeaders () {
    const jwt = store.getters.getJwt
    const headers = {
      Accept: 'application/json',
      Authorization: 'Bearer ' + jwt
    }
    return headers
  }
}

const checkupService = new CheckupService()

export default checkupService
