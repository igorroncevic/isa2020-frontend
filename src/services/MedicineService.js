import axios from 'axios'
import store from './../store/index'
import { getBackendPath } from './backendPath'

class MedicineService {
  constructor () {
    this.apiClient = axios.create({
      baseURL: getBackendPath() + '/api/medicines'
    })
  }

  setupHeaders () {
    const jwt = store.getters.getJwt
    const headers = {
      Accept: 'application/json',
      Authorization: 'Bearer ' + jwt
    }
    return headers
  }

  async getAllPatientsMedicines (patientId) {
    const headers = this.setupHeaders()
    const medicines = await this.apiClient
      .get(`/patient/${patientId}`, {
        headers
      })
      .then(response => {
        return response
      })
      .catch(err => {
        return err.response
      })

    return medicines
  }

  async getAllPatientsReservedMedicines (patientId) {
    const headers = this.setupHeaders()
    const medicines = await this.apiClient
      .get(`/reserved/${patientId}`, {
        headers
      })
      .then(response => {
        return response
      })
      .catch(err => {
        return err.response
      })

    return medicines
  }

  async getAllMedicinesPatientsNotAlergicTo (patientId) {
    const headers = this.setupHeaders()
    const medicines = await this.apiClient
      .get(`/notallergic/${patientId}`, {
        headers
      })
      .then(response => {
        return response
      })
      .catch(err => {
        return err.response
      })

    return medicines
  }

  async getAllMedicinesPatientsAllergicTo (patientId) {
    const headers = this.setupHeaders()
    const medicines = await this.apiClient
      .get(`/allergic/${patientId}`, {
        headers
      })
      .then(response => {
        return response
      })
      .catch(err => {
        return err.response
      })

    return medicines
  }

  async getAllMedicinesForFiltering (data) {
    const headers = this.setupHeaders()
    const medicines = await this.apiClient
      .post('/filter', data, {
        headers
      })
      .then(response => {
        return response
      })
      .catch(err => {
        return err.response
      })

    return medicines
  }

  // Koristi se za noauth korisnika
  async getAllMedicinesForNoAuthFiltering (data) {
    const medicines = await this.apiClient
      .post('/noauth/filter', data)
      .then(response => {
        return response
      })
      .catch(err => {
        return err.response
      })

    return medicines
  }

  async reserveMedicine (data) {
    const headers = this.setupHeaders()
    const success = await this.apiClient
      .post('/reserve', data, {
        headers
      })
      .then(response => {
        return response
      })
      .catch(err => {
        return err.response
      })

    return success
  }

  async cancelMedicine (data) {
    const headers = this.setupHeaders()
    const success = await this.apiClient
      .post('/cancel', data, {
        headers
      })
      .then(response => {
        return response
      })
      .catch(err => {
        return err.response
      })

    return success
  }

  async addNewAllergyForPatient (data) {
    const headers = this.setupHeaders()
    const success = await this.apiClient
      .post('/allergy', data, {
        headers
      })
      .then(response => {
        return response
      })
      .catch(err => {
        return err.response
      })

    return success
  }

  async saveNewMedicine (medicineData) {
    const headers = this.setupHeaders()
    const success = this.apiClient
      .post('/save', medicineData, {
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

  async getSpecification (medicine) {
    const headers = this.setupHeaders()
    const res = await this.apiClient
      .get('/specification/' + medicine, {
        headers
      })
      .then(response => {
        return response.data
      })
      .catch(err => {
        console.log(err)
        return null
      })
    return res
  }

  async getAllSupplierMedicines (id) {
    const headers = this.setupHeaders()
    var res = await this.apiClient
      .get('/suppliermeds/' + id, {
        headers
      })
      .then(response => {
        return response.data
      })
      .catch(err => {
        return err.response
      })
    return res
  }

  async addNewSupplierMedicine (data) {
    const headers = this.setupHeaders()
    const success = await this.apiClient
      .post('/add', data, {
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

  async getAllMedicines () {
    const medicines = await this.apiClient
      .get('/all')
      .then(response => {
        return response.data
      })
      .catch(err => {
        console.log(err.response)
        return []
      })

    return medicines
  }
}

const medicineService = new MedicineService()

export default medicineService
