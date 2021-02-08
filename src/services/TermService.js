import axios from 'axios'

class TermService {
  constructor() {
    this.apiClient = axios.create({
      baseURL: 'http://localhost:8085/api/terms'
    })
  }

  async postTerm(data) {
    const checkups = await this.apiClient
      .post('/', data)
      .then(response => {
        return response.data
      })
      .catch(err => {
        console.log(err)
        return null
      })

    return checkups
  }

  async getAllPatientsUpcomingTerms(id) {
    const terms = await this.apiClient
      .get(`/upcoming/${id}`)
      .then(response => {
        return response
      })
      .catch(err => {
        return err.response
      })

    return terms
  }
}

const termService = new TermService()

export default termService
