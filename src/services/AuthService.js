import axios from 'axios'
import store from './../store/index'
import { getBackendPath } from './backendPath'

class AuthService {
  constructor () {
    this.apiClient = axios.create({
      baseURL: getBackendPath() + '/auth'
    })
  }

  async registerNewPatient (patient) {
    const success = this.apiClient
      .post('/signup/patient', patient)
      .then(response => {
        return response
      })
      .catch(err => {
        return err.response
      })
    return success
  }

  async registerNewSysAdmin (sysAdmin) {
    const success = this.apiClient
      .post('/signup/sysadmin', sysAdmin)
      .then(response => {
        return response
      })
      .catch(err => {
        return err.response
      })
    return success
  }

  async registerNewDermatologist (derm) {
    const success = this.apiClient
      .post('/signup/derm', derm)
      .then(response => {
        return response
      })
      .catch(err => {
        return err.response
      })
    return success
  }

  async registerNewPhAdmin (pharmadmin) {
    const success = this.apiClient
      .post('/signup/pharmadmin', pharmadmin)
      .then(response => {
        return response
      })
      .catch(err => {
        return err.response
      })
    return success
  }

  async registerNewSupplier (supplier) {
    const success = this.apiClient
      .post('/signup/supplier', supplier)
      .then(response => {
        return response
      })
      .catch(err => {
        return err.response
      })
    return success
  }

  async login (patient) {
    const success = this.apiClient
      .post('/login', patient)
      .then(response => {
        return response
      })
      .catch(err => {
        return err.response
      })
    return success
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

const authService = new AuthService()

export default authService
