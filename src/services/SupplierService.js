import axios from 'axios'
import store from './../store/index'
import { getBackendPath } from './backendPath'

class SupplierService {
  constructor() {
    this.apiClient = axios.create({
      baseURL: getBackendPath() + '/api/suppliers'
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

  async registerNewSupplier(suppData) {
    let headers = this.setupHeaders()
    const success = this.apiClient
      .post('/register', suppData, {
        headers
      })
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

const supplierService = new SupplierService()

export default supplierService
