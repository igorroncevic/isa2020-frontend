import axios from 'axios'
import store from './../store/index'
import { getBackendPath } from './backendPath'

class PharmacyAdminService {
  constructor () {
    this.apiClient = axios.create({
      baseURL: getBackendPath() + '/api/phadmin'
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

  async getMyData () {
    const headers = this.setupHeaders()
    const user = await this.apiClient
      .get('/40c88a70-d8cd-4d8f-b56f-eb158f7c27fa', {
        headers
      }) // Zakucano dok ne implementiramo autorizaciju
      .then(response => {
        return response.data
      })
      .catch(err => {
        console.log(err)
        return {
        }
      })

    return user
  }

  async updateUserData (data) {
    const headers = this.setupHeaders()
    const responseData = this.apiClient
      .put('', data, {
        headers
      })
      .then(response => {
        console.log(response)
        return response.data
      })
      .catch(err => {
        console.log(err)
        return {}
      })
    return responseData
  }
}

const pharmacyAdminService = new PharmacyAdminService()

export default pharmacyAdminService
