import axios from "axios";
import store from './../store/index'
import { getBackendPath } from './backendPath'

class SupplierOfferService {
    constructor() {
        this.apiClient = axios.create({
            baseURL: getBackendPath() + '/api/offers'
        })
    }

    setupHeaders() {
        const jwt = store.getters.getJwt
        const headers = {
            Accept: 'application/json',
            Authorization: 'Bearer ' + jwt
        }
        return headers
    }

    async getAllPurchaseOrders(id) {
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

    async getMyPurchaseOrders(id) {
        const headers = this.setupHeaders()
        var res = await this.apiClient
            .get('/bla/supplier/' + id, {
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

    async givePurchaseOffer(data) {
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

    async updateMyPurchaseOrder(data) {
        const success = await this.apiClient
            .put('', data)
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

const supplierOfferService = new SupplierOfferService()

export default supplierOfferService