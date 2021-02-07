import axios from 'axios'

class MedicineService {
  constructor () {
    this.apiClient = axios.create({
      baseURL: 'http://localhost:8085/api/medicines'
    })
  }

  async getAllPatientsMedicines (patientId) {
    const medicines = await this.apiClient
      .get(`/patient/${patientId}`)
      .then(response => {
        return response
      })
      .catch(err => {
        return err.response
      })

    return medicines
  }

  async getAllPatientsReservedMedicines (patientId) {
    const medicines = await this.apiClient
      .get(`/reserved/${patientId}`)
      .then(response => {
        return response
      })
      .catch(err => {
        return err.response
      })

    return medicines
  }

  async getAllMedicinesPatientsNotAlergicTo (patientId) {
    const medicines = await this.apiClient
      .get(`/notallergic/${patientId}`)
      .then(response => {
        return response
      })
      .catch(err => {
        return err.response
      })

    return medicines
  }

  async getAllMedicinesForFiltering (data) {
    const medicines = await this.apiClient
      .post('/filter', data)
      .then(response => {
        return response
      })
      .catch(err => {
        return err.response
      })

    return medicines
  }

  async reserveMedicine (data) {
    const success = await this.apiClient
      .post('/reserve', data)
      .then(response => {
        return response
      })
      .catch(err => {
        return err.response
      })

    return success
  }

  async cancelMedicine (data) {
    const success = await this.apiClient
      .post('/cancel', data)
      .then(response => {
        return response
      })
      .catch(err => {
        return err.response
      })

    return success
  }

  async addNewAllergyForPatient (data) {
    const success = await this.apiClient
      .post('/allergy', data)
      .then(response => {
        return response
      })
      .catch(err => {
        return err.response
      })

    return success
  }

  async getSpecification (medicine) {
    const res = await this.apiClient
      .get('/specification/' + medicine)
      .then(response => {
        return response.data
      })
      .catch(err => {
        console.log(err)
        return null
      })
    return res
  }
}

const medicineService = new MedicineService()

export default medicineService
