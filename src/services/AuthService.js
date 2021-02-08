import axios from 'axios'
import store from './../store/index'

class AuthService {
    constructor() {
        this.apiClient = axios.create({
            baseURL: 'http://localhost:8085/auth'
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

    setupHeaders() {
        const jwt = store.getters.getJwt;
        let headers = {
            Accept: "application/json",
            Authorization: "Bearer " + jwt,
        };
        return headers;
    }
}

const authService = new AuthService()

export default authService;
