import axios from 'axios'

class SupplierService {
  constructor () {
    this.apiClient = axios.create({
      baseURL: 'http://localhost:8085/api/suppliers'
    })
  }

  async registerNewSupplier (suppData) {
    const success = this.apiClient
      .post('/register', suppData)
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
