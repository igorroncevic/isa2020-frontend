import axios from 'axios'
import store from './../store/index'

class PatientService {
  constructor() {
    this.apiClient = axios.create({
      baseURL: 'http://localhost:8085/api/patients'
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

  async addPenalty(patient) {
    let headers = this.setupHeaders()
    const success = this.apiClient
      .put('/addPenalty/' + patient, {
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

  async getAlergicMedicines(patient) {
    let headers = this.setupHeaders()
    var res = []
    await this.apiClient.get('http://localhost:8085/api/patients/alergicMedicines/' + patient, {
      headers
    })
      .then(response => {
        response.data.forEach(el => {
          res.push(el.name)
        })
      })
      .catch(console.error())
    return res
  }

  async getPatientsProfileInfo(id) {
    let headers = this.setupHeaders()
    let patient = await this.apiClient
      .get(`/profile/${id}`, {
        headers
      })
      .then(response => {
        return response;
      })
      .catch(err => {
        return err.response;
      });

    return patient;
  }

  async updatePatientsInfo(data) {
    let headers = this.setupHeaders()
    let success = await this.apiClient
      .put('/profile', data, {
        headers
      })
      .then(response => {
        return response;
      })
      .catch(err => {
        return err.response;
      });

    return success;
  }

  async getPatientPenalties(id) {
    let headers = this.setupHeaders()
    let penalties = await this.apiClient
      .get(`/penalties/${id}`, {
        headers
      })
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
