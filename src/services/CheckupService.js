import axios from "axios";

class CheckupService {
  constructor() {
    this.apiClient = axios.create({
      baseURL: "http://localhost:8085/api/checkups"
    });
  }

  async getAllCheckups() {
    let checkups = await this.apiClient
      .get("/")
      .then(response => {
        return response.data;
      })
      .catch(err => {
        console.log(err);
        return [];
      });

    return checkups;
  }

  async getAllPatientsCheckups(patientId) {
   let checkups = await this.apiClient
     .get(`/patient/${patientId}`)
     .then(response => {
       return response.data;
     })
     .catch(err => {
       console.log(err);
       return [];
     });

   return checkups;
 }

  async scheduleCheckup(data) {
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

  async cancelCheckup(data) {
   let success = this.apiClient
     .put("/cancel", data)
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

const checkupService = new CheckupService();

export default checkupService;
