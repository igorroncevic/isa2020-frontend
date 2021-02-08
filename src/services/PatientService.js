import axios from 'axios'

class PatientService {
  constructor() {
    this.apiClient = axios.create({
      baseURL: 'http://localhost:8085/api/patients'
    })
  }

  async registerNewPatient(patient) {
    const success = this.apiClient
      .post('/register', patient)
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

  async getPatientPenalties(id) {
    let penalties = await this.apiClient
      .get(`/penalties/${id}`)
      .then(response => {
        return response;
      })
      .catch(err => {
        return err.response;
      });

    return penalties;
  }
}

const patientService = new PatientService()

export default patientService
