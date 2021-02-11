import axios from 'axios'
import store from './../store/index'
import { getBackendPath } from './backendPath'

class SupplierService {
  constructor () {
    this.apiClient = axios.create({
      baseURL: getBackendPath() + '/api/suppliers'
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

  async getMyData (id) {
    const headers = this.setupHeaders()
    const user = await this.apiClient
      .get(`/${id}`, {
        headers
      })
      .then(response => {
        return response.data
      })
      .catch(err => {
        console.log(err)
        return {}
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

const supplierService = new SupplierService()

export default supplierService
