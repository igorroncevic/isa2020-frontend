import axios from 'axios'

class AuthService {
    constructor() {
        this.apiClient = axios.create({
            baseURL: 'http://localhost:8085/api/auth'
        })
    }

    async registerNewPatient(patient) {
        const success = this.apiClient
            .post('/register', patient)
            .then(response => {
                return response
            })
            .catch(err => {
                return err.response
            })
        return success
    }

    async login(patient) {
        const success = this.apiClient
            .post('/login', patient)
            .then(response => {
                return response
            })
            .catch(err => {
                return err.response
            })
        return success
    }
}

const authService = new AuthService()

export default authService;
