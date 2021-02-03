import axios from 'axios'

class DoctorService {
  constructor () {
    this.apiClient = axios.create({
      baseURL: 'http://localhost:8085/api/doctors'
    })
  }

  async getMyData () {
    const user = await this.apiClient
      .get('/a5ac174a-45b3-487f-91cb-3d3f727d6f1c') // const ,login not inplemented yet
      .then(response => {
        return response.data
      })
      .catch(err => {
        console.log(err)
        return {}
      })

    return user
  }

  async getAllPharmacists () {
    // Za sada samo ovaj poziv, kada implementiramo autentikaciju bice provera da li je registrovani
    // korisnik ili administrator apoteke
    const user = await this.apiClient
      .get('/pharmacists')
      .then(response => {
        return response.data
      })
      .catch(err => {
        console.log(err)
        return {}
      })

    return user
  }

  async getAllDermatologists () {
    // Za sada samo ovaj poziv, kada implementiramo autentikaciju bice provera da li je registrovani
    // korisnik ili administrator apoteke
    const user = await this.apiClient
      .get('/dermatologists')
      .then(response => {
        return response.data
      })
      .catch(err => {
        console.log(err)
        return {}
      })

    return user
  }

  async getAllPatientsDoctors (data) {
    // Get all doctors that patient interacted with earlier.
    const doctors = await this.apiClient
      .post('/patient', data)
      .then(response => {
        return response
      })
      .catch(err => {
        return err.response
      })

    return doctors
  }

  async updateUserData (data) {
    const responseData = this.apiClient
      .put('', data)
      .then(response => {
        console.log(response)
        return response.data
      })
      .catch(err => {
        console.log(err)
        return 'err'
      })
    return responseData
  }
}

const doctorService = new DoctorService()

export default doctorService
