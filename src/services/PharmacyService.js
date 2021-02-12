import axios from 'axios'
import store from './../store/index'
import { getBackendPath } from './backendPath'

class PharmacyService {
  constructor() {
    this.apiClient = axios.create({
      baseURL: getBackendPath() + '/api/pharmacies'
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

  // Koristi i neauth korisnik
  async getAllFilteredPharmacies(filters) {
    const pharmacies = await this.apiClient
      .get(`/search${filters}`)
      .then(response => {
        return response
      })
      .catch(err => {
        return err.response
      })

    return pharmacies
  }

  async registerNewPharmacy(pharmacyData) {
    let headers = this.setupHeaders()
    const success = this.apiClient
      .post('/register', pharmacyData, {
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

  async getAllPharmacies() {
    let headers = this.setupHeaders()
    const pharms = []
    await this.apiClient
      .get('/allpharms', {
        headers
      })
      .then(response => {
        response.data.forEach(p => {
          pharms.push(p.name)
        })
      })
      .catch(err => {
        console.log(err)
      })

    return pharms
  }

  async getAllPatientsPharmacies(id) {
    let headers = this.setupHeaders()
    const pharmacies = await this.apiClient
      .get(`/patient/${id}`, {
        headers
      })
      .then(response => {
        return response
      })
      .catch(err => {
        return err.response
      })

    return pharmacies
  }

  async getAllPharmacyPurchaseOrders(id) {
    let headers = this.setupHeaders()
    let purchaseOrders = await this.apiClient
      .get(`/${id}/orders`, {
        headers
      })
      .then(response => {
        return response;
      })
      .catch(err => {
        return err.response;
      });

    return purchaseOrders;
  }

}

const pharmacyService = new PharmacyService()

export default pharmacyService
