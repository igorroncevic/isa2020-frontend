import axios from "axios";

class TermService {
  constructor() {
    this.apiClient = axios.create({
      baseURL: "http://localhost:8085/api/terms"
    });
  }

  async getAllTerms(type) {
    let route = (type == null ? "/schedule" : `/schedule?type=${type}`);

    let terms = await this.apiClient
      .get(route)
      .then(response => {
        return response.data;
      })
      .catch(err => {
        console.log(err);
        return [];
      });

    return terms;
  }

  async scheduleTerm(data) {
    let success = this.apiClient
      .put("/schedule", data)
      .then(response => {
        console.log(response);
        return true;
      })
      .catch(err => {
        console.log(err);
        return false;
      });
    return success;
  }
}

const termService = new TermService();

export default termService;
