import axios from 'axios'

class PatientService {
  constructor () {
    this.apiClient = axios.create({
      baseURL: 'http://localhost:8085/api/patients'
    })
    this.apiClientAuth = axios.create({
      baseURL: 'http://localhost:8085/auth'
    })
  }

  async registerNewPatient (patient) {
    const success = this.apiClientAuth
      .post('/signup/patient', patient)
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

  async login(patient) {
    const success = this.apiClient
      .post('/login', patient)
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

  async addPenalty(patient) {
    const success = this.apiClient
      .put('/addPenalty/' + patient)
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

  async getAlergicMedicines(patient) {
    var res = []
    await this.apiClient.get('http://localhost:8085/api/patients/alergicMedicines/' + patient)
      .then(response => {
        response.data.forEach(el => {
          res.push(el.name)
        })
      })
      .catch(console.error())
    return res
  }

  async getPatientsProfileInfo(id) {
    let patient = await this.apiClient
      .get(`/profile/${id}`)
      .then(response => {
        return response;
      })
      .catch(err => {
        return err.response;
      });

    return patient;
  }

  async updatePatientsInfo(data) {
    let success = await this.apiClient
      .put('/profile', data)
      .then(response => {
        return response;
      })
      .catch(err => {
        return err.response;
      });

    return success;
  }
}

const patientService = new PatientService()

export default patientService
