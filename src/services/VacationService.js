
import axios from 'axios'
import store from './../store/index'
import { getBackendPath } from './backendPath'

class VacationService {
  constructor () {
    this.apiClient = axios.create({
      baseURL: getBackendPath() + '/api/vacation'
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

  async createRequest (data) {
    const headers = this.setupHeaders()
    const request = await this.apiClient
      .post('', data, {
        headers
      })
      .then(response => {
        return response
      })
      .catch(err => {
        return err.response
      })

    return request
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
      .patch(`/${id}/approve`, null, {
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
