<template>
  <div class="q-pa-md">
    <q-table
      title="Medicines"
      :data="data"
      :columns="columns"
      row-key="id"
      :filter="filter"
      :loading="loading"
      @row-click="onRowClick"
    >

      <template v-slot:top>
        <q-space />
        <div class="q-pa-sm">
          <q-btn round color="red" icon="add" @click="addMedicineClick"/>
        </div>
      </template>

    </q-table>

    <q-dialog v-model="card">
      <q-card class="q-pa-lg">
          <q-select filled v-model="selectedNewMedicine" :options="allMedicines" label="Select medicine" style="min-width: 200px"
          map-options
          emit-value
          option-value="id"
          option-label="name"/>
          <q-btn class="q-mt-lg" color="primary" label="Add new medicine" @click="addNewMedicine"/>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import PharmacyMedicinesService from './../services/PharmacyMedicinesService'
import MedicineService from './../services/MedicineService'
import {medicineAlreadyExists} from './../notifications/pharmacyMedicines'

export default {
  async beforeMount () {
    this.data = await PharmacyMedicinesService.getPharmacyMedicines("e93cab4a-f007-412c-b631-7a9a5ee2c6ed") // Zakucano za sada
    this.original = JSON.parse(JSON.stringify(this.data))
  },
  data () {
    return {
      card: false,
      loading: false,
      filter: "",
      rowCount: 10,
      columns: [
        { name: 'name', align: 'center', label: 'Name', field: 'name', sortable: true },
        { name: 'loyaltyPoints', align: 'center', label: 'Loyalty points', field: 'loyaltyPoints', sortable: true},
        { name: 'quantity', align: 'center', label: 'Quantity', field: 'quantity', sortable: true}
      ],
      data: [],
      allMedicines: [],
      selectedNewMedicine: null,
      original: []
    }
  },
  methods: {
    async onRowClick (evt, row) {
      this.card = true
    },
    async addMedicineClick(evt) {
        this.allMedicines = await MedicineService.getAllMedicines()
        this.card = true
    },
    async addNewMedicine(evt) {
        let data = {
            pharmacyId: "e93cab4a-f007-412c-b631-7a9a5ee2c6ed", //Zakucano za sada
            medicineId: this.selectedNewMedicine
        }
        let success = await PharmacyMedicinesService.addMedicineToPharmacy(data)
        if(success) {
            this.data = await PharmacyMedicinesService.getPharmacyMedicines("e93cab4a-f007-412c-b631-7a9a5ee2c6ed")
            this.card = false
        } else {
            medicineAlreadyExists()
        }
    }
  }
}
</script>