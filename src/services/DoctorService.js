import axios from 'axios'
import store from './../store/index'

class DoctorService {
  constructor() {
    this.apiClient = axios.create({
      baseURL: 'http://localhost:8085/api/doctors'
    })
  }

  async getMyData() {
    let headers = this.setupHeaders()
    const user = await this.apiClient
      .get('/a5ac174a-45b3-487f-91cb-3d3f727d6f1c', {
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

  async getAllPharmacists() {
    let headers = this.setupHeaders()
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

  async getAllDermatologists() {
    let headers = this.setupHeaders()
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

  async getAllPatientsDoctors(data) {
    let headers = this.setupHeaders()
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

  async getDoctorPharmacyList(doctor) {
    let headers = this.setupHeaders()
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

  async updateUserData(data) {
    let headers = this.setupHeaders()
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

  async registerNewDermatologist(dermData) {
    let headers = this.setupHeaders()
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

  async getDoctorPatients(doctorId) {
    let headers = this.setupHeaders()
    const data = this.apiClient.get('http://localhost:8085/api/doctors/patients/' + doctorId, {
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

  setupHeaders() {
    const jwt = store.getters.getJwt;
    let headers = {
      Accept: "application/json",
      Authorization: "Bearer " + jwt,
    };
    return headers;
  }
}

const doctorService = new DoctorService()

export default doctorService
