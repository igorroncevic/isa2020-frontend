import axios from 'axios'

class CheckupService {
  constructor () {
    this.apiClient = axios.create({
      baseURL: 'http://localhost:8085/api/checkups'
    })
  }

  async getAllCheckups () {
    const checkups = await this.apiClient
      .get('/')
      .then(response => {
        return response.data
      })
      .catch(err => {
        console.log(err)
        return []
      })

    return checkups
  }

  async getAllPatientsPastCheckupsPaginated(data) {
    const checkups = await this.apiClient
      .post(`/past`, data)
      .then(response => {
        return response
      })
      .catch(err => {
        console.log(err)
        return []
      })

    return checkups
  }

  async getAllPatientsUpcomingCheckupsPaginated(data) {
    const checkups = await this.apiClient
      .post(`/upcoming`, data)
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
    const checkups = await this.apiClient
      .get(`/patient/${patientId}`)
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
    const term = this.apiClient
      .get('/patientCheckup/' + id)
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
    const success = this.apiClient
      .put('/schedule', data)
      .then(response => {
        return response
      })
      .catch(err => {
        return err.response
      })
    return success
  }

  async cancelCheckup (data) {
    const success = this.apiClient
      .put('/cancel', data)
      .then(response => {
        return response;
      })
      .catch(err => {
        return response.data
      })
    return success
  }

  async deleteCheckup (id) {
    const success = this.apiClient
      .delete('/' + id)
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
}

const checkupService = new CheckupService()

export default checkupService
