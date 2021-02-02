import axios from 'axios'

class ReportService {
  constructor () {
    this.apiClient = axios.create({
      baseURL: 'http://localhost:8085/api/reports'
    })
  }

  async post (data) {
    const res = this.apiClient
      .post(' ', data)
      .then(response => {
        return response.data
      })
      .catch(err => {
        console.log(err)
        return false
      })
    return res
  }

  async postReportMedicine (data) {
    const res = this.apiClient
      .post('/reportMedicine', data)
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
