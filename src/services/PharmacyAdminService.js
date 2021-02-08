import axios from 'axios'
import store from './../store/index'

class PharmacyAdminService {
  constructor() {
    this.apiClient = axios.create({
      baseURL: 'http://localhost:8085/api/phadmin'
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

  async getMyData() {
    let headers = this.setupHeaders()
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

  async updateUserData(data) {
    let headers = this.setupHeaders()
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

  async registerNewPharmacyAdmin(adminData) {
    let headers = this.setupHeaders()
    const success = this.apiClient
      .post('/register', adminData, {
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

const pharmacyAdminService = new PharmacyAdminService()

export default pharmacyAdminService
