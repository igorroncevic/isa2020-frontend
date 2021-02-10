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
      .post('/register', patient)
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

  async changePass (data) {
    const res = this.apiClient
      .put('/firstLoginPass', data)
      .then(response => {
        return response
      })
      .catch(err => {
        return err.response
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

const authService = new AuthService()

export default authService
