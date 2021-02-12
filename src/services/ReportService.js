import axios from 'axios'
import store from './../store/index'
import { getBackendPath } from './backendPath'

class ReportService {
  constructor() {
    this.apiClient = axios.create({
      baseURL: getBackendPath() + '/api/reports'
    })
  }

  setupHeaders() {
    const jwt = store.getters.getJwt;
    let headers = {
      Accept: "application/json",
      Authorization: "Bearer " + jwt,
    };
    return headers;
  }

  async post(data) {
    let headers = this.setupHeaders()
    const res = this.apiClient
      .post(' ', data, {
        headers
      })
      .then(response => {
        return response.data
      })
      .catch(err => {
        console.log(err)
        return false
      })
    return res
  }

  async postReportMedicine(data, pharmacy) {
    let headers = this.setupHeaders()
    const res = this.apiClient
      .post('/reportMedicine/' + pharmacy, data, {
        headers
      })
      .then(response => {
        return response.data
      })
      .catch(err => {
        console.log(err)
        return false
      })
    return res
  }
}

const reportService = new ReportService()

export default reportService
