import axios from 'axios'

class VacationService {
  constructor () {
    this.apiClient = axios.create({
      baseURL: 'http://localhost:8085/api/vacation'
    })
  }

  async getAllPendingVacations () {
    const headers = this.setupHeaders()
    const vacations = await this.apiClient
      .get('/pending', {
        headers
      })
      .then(response => {
        return response
      })
      .catch(err => {
        return err.response
      })

    return vacations
  }

  async getAllApprovedVacations () {
    const headers = this.setupHeaders()
    const vacations = await this.apiClient
      .get('/approved', {
        headers
      })
      .then(response => {
        return response
      })
      .catch(err => {
        return err.response
      })

    return vacations
  }

  async getAllRefusedVacations () {
    const headers = this.setupHeaders()
    const vacations = await this.apiClient
      .get('/refused', {
        headers
      })
      .then(response => {
        return response
      })
      .catch(err => {
        return err.response
      })

    return vacations
  }

  async approveVacation (id) {
    const headers = this.setupHeaders()
    const success = await this.apiClient
      .patch(`/${id}/approve`, {
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

  async refuseVacation (id, data) {
    const headers = this.setupHeaders()
    const success = await this.apiClient
      .patch(`/${id}/refuse`, data, {
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

const vacationService = new VacationService()

export default vacationService
