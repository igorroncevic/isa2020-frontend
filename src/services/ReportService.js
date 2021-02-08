import axios from 'axios'
import store from './../store/index'

class ReportService {
  constructor() {
    this.apiClient = axios.create({
      baseURL: 'http://localhost:8085/api/reports'
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

  async postReportMedicine(data) {
    let headers = this.setupHeaders()
    const res = this.apiClient
      .post('/reportMedicine', data, {
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
