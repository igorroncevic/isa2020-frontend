import axios from 'axios'
import store from './../store/index'
import { getBackendPath } from './backendPath'

class MarkService {
  constructor () {
    this.apiClient = axios.create({
      baseURL: getBackendPath() + '/api/marks'
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

  async giveMark (data) {
    const headers = this.setupHeaders()
    const success = await this.apiClient
      .post('/', data, {
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

  async updateMark (data) {
    const headers = this.setupHeaders()
    const success = await this.apiClient
      .put('/', data, {
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
}

const markService = new MarkService()

export default markService
