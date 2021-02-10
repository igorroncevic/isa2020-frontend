import axios from 'axios'
import store from './../store/index'
import { getBackendPath } from './backendPath'

class DoctorService {
  constructor () {
    this.apiClient = axios.create({
      baseURL: getBackendPath() + '/api/doctors'
    })
  }

  async getMyData (doctor) {
    const headers = this.setupHeaders()
    const user = await this.apiClient
      .get('/' + doctor, {
        headers
      }) // const ,login not inplemented yet
      .then(response => {
        return response.data
      })
      .catch(err => {
        console.log(err)
        return {}
      })

    return user
  }

  async getAllPharmacists () {
    const headers = this.setupHeaders()
    const user = await this.apiClient
      .get('/pharmacists', {
        headers
      })
      .then(response => {
        return response.data
      })
      .catch(err => {
        console.log(err)
        return {}
      })

    return user
  }

  async getAllDermatologists () {
    const headers = this.setupHeaders()
    const user = await this.apiClient
      .get('/dermatologists', {
        headers
      })
      .then(response => {
        return response.data
      })
      .catch(err => {
        console.log(err)
        return {}
      })

    return user
  }

  async getAllPatientsDoctors (data) {
    const headers = this.setupHeaders()
    const doctors = await this.apiClient
      .post('/patient', data, {
        headers
      })
      .then(response => {
        return response
      })
      .catch(err => {
        return err.response
      })

    return doctors
  }

  async getDoctorPharmacyList (doctor) {
    const headers = this.setupHeaders()
    const pharmacyList = await this.apiClient
      .get('/pharmacyList/' + doctor, {
        headers
      })
      .then(response => {
        return response.data
      })
      .catch(err => {
        return err.response
      })

    return pharmacyList
  }

  async getCurrentPharmacy (doctor) {
    const headers = this.setupHeaders()
    const pharmacyList = await this.apiClient
      .get('/currentPharmacy/' + doctor, {
        headers
      })
      .then(response => {
        if (response.data !== '') { return response.data.id }
        return null
      })
      .catch(err => {
        return err.response
      })

    return pharmacyList
  }

  async updateUserData (data) {
    const headers = this.setupHeaders()
    const responseData = this.apiClient
      .put('', data, {
        headers
      })
      .then(response => {
        console.log(response)
        return response.data
      })
      .catch(err => {
        console.log(err)
        return 'err'
      })
    return responseData
  }

  async registerNewDermatologist (dermData) {
    const headers = this.setupHeaders()
    const success = this.apiClient
      .post('/register', dermData, {
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

  async getDoctorPatients (doctorId) {
    const headers = this.setupHeaders()
    const data = this.apiClient
      .get('/patients/' + doctorId, {
        headers
      })
      .then(resonse => {
        return resonse.data
      })
      .catch(err => {
        console.log(err)
      })
    return data
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

const doctorService = new DoctorService()

export default doctorService
