import axios from 'axios'
import store from './../store/index'
import { getBackendPath } from './backendPath'

class PurchaseOrderService {
  constructor () {
    this.apiClient = axios.create({
      baseURL: getBackendPath() + '/api/purchaseorders'
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

  async getAllPurchaseOrders () {
    const headers = this.setupHeaders()
    var res = await this.apiClient
      .get('', {
        headers
      })
      .then(response => {
        return response.data
      })
      .catch(err => {
        return err.response
      })
    return res
  }

  async getMyPurchaseOrders (id) {
    const headers = this.setupHeaders()
    var res = await this.apiClient
      .get('/supplier/' + id, {
        headers
      })
      .then(response => {
        return response.data
      })
      .catch(err => {
        return err.response
      })
    return res
  }

  async givePurchaseOffer (data) {
    const headers = this.setupHeaders()
    const success = await this.apiClient
      .post('/offer', data, {
        headers
      })
      .then(response => {
        console.log(response)
        return true
      })
      .catch(err => {
        console.log(err.response)
        return false
      })
    return success
  }
}

const purchaseOrderService = new PurchaseOrderService()

export default purchaseOrderService
