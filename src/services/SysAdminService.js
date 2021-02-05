import axios from 'axios'

class SysAdminService {
  constructor () {
    this.apiClient = axios.create({
      baseURL: 'http://localhost:8085/api/sysadmins'
    })
  }

  async registerNewSysAdmin (sysData) {
    const success = this.apiClient
      .post('/register', sysData)
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
