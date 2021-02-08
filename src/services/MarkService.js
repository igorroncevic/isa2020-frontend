import axios from 'axios'
import store from './../store/index'

class MarkService {
    constructor() {
        this.apiClient = axios.create({
            baseURL: 'http://localhost:8085/api/marks'
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

    async giveMark(data) {
        let headers = this.setupHeaders()
        let success = await this.apiClient
            .post('/', data, {
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

    async updateMark(data) {
        let headers = this.setupHeaders()
        let success = await this.apiClient
            .put('/', data, {
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

}

const markService = new MarkService()

export default markService
