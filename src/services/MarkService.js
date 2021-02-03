import axios from 'axios'

class MarkService {
    constructor() {
        this.apiClient = axios.create({
            baseURL: 'http://localhost:8085/api/marks'
        })
    }

    async giveMark(data) {
        let success = await this.apiClient
            .post('/', data)
            .then(response => {
                return response;
            })
            .catch(err => {
                return err.response;
            });

        return success;
    }

    async updateMark(data) {
        let success = await this.apiClient
            .put('/', data)
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
