import axios from 'axios'
import store from './../store/index'
import { getBackendPath } from './backendPath'

class ComplaintService {
  constructor () {
    this.apiClient = axios.create({
      baseURL: getBackendPath() + '/api/complaints'
    })
  }

  async postComplaint (data, type) {
    const headers = this.setupHeaders()
    const success = this.apiClient
      .post('/' + type, data, {
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

  async responseComplaint (data) {
    const headers = this.setupHeaders()
    const success = this.apiClient
      .put('/response', data, {
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

  async allComplaints () {
    const headers = this.setupHeaders()
    const comps = await this.apiClient
      .get('', {
        headers
      })
      .then(response => {
        return response.data
      })
      .catch(err => {
        console.log(err)
      })

    return comps
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

const complaintService = new ComplaintService()

export default complaintService
