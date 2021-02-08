import axios from 'axios'
import store from './../store/index'

class SysAdminService {
  constructor() {
    this.apiClient = axios.create({
      baseURL: 'http://localhost:8085/api/sysadmins'
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

  async registerNewSysAdmin(sysData) {
    let headers = this.setupHeaders()
    const success = this.apiClient
      .post('/register', sysData, {
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

const sysAdminService = new SysAdminService()

export default sysAdminService
