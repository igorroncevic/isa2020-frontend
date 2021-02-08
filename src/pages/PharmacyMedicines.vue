<template>
  <div class="q-pa-md">
    <q-table
      title="Medicines"
      :data="data"
      :columns="columns"
      row-key="id"
      :filter="filter"
      :loading="loading"  
    >

      <template v-slot:top>
        <q-space />
        <div class="q-pa-sm">
          <q-btn round color="red" icon="add" @click="addMedicineClick"/>
        </div>
      </template>
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <q-btn
          color="positive"
          icon-right="euro_symbol"
          no-caps
          flat
          dense
          @click="showPricings(data.indexOf(props.row))"
        />
          <q-btn
          color="negative"
          icon-right="delete"
          no-caps
          flat
          dense
          @click="deleteval(data.indexOf(props.row))"
        />
        </q-td>
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
    <q-dialog v-model="pricingsDialog">
      <q-card class="q-pa-lg">
        <div class="col text-h6 ellipsis">
          {{ this.selectedMedicine.name }} pricings
          <q-btn
              color="neutral"
              icon-right="add"
              no-caps
              flat
              dense
              @click="addPricingDialog()"
            />
        </div>
        <q-table
          class="q-pa-sm"
          :data="dataPricingHistory"
          :columns="columnsPricingsHistory"
          row-key="id"
          :filter="filter"
          hide-header
          hide-bottom
        >
          <template v-slot:body-cell-action="props">
            <q-td :props="props" >
              <q-btn
              v-if="props.row.endDate > getTodayDate()"
              color="neutral"
              icon-right="edit"
              no-caps
              flat
              dense
              @click="editPricingDialog(dataPricingHistory.indexOf(props.row))"
            />
              <q-btn
              v-if="props.row.startDate > getTodayDate()"
              color="negative"
              icon-right="delete"
              no-caps
              flat
              dense
              @click="deletePricing(dataPricingHistory.indexOf(props.row))"
            />
            </q-td>
          </template>
        </q-table>
      </q-card>
    </q-dialog>
    <q-dialog v-model="newUpdatePricingDialog">
      <q-card class="q-pa-lg">
          <q-input class="q-ma-sm" v-model="newUpdatePricing.startDate" filled type="date" hint="Start date" />
          <q-input class="q-ma-sm" v-model="newUpdatePricing.endDate" filled type="date" hint="End date" />
          <q-input class="q-ma-sm" v-model.number="newUpdatePricing.price" type="number" filled hint="Price" />
          <q-btn v-if="!editPricingMode" flat style="color: red" label="Add new pricing" @click="addNewPricing()" />
          <q-btn v-if="editPricingMode" flat style="color: red" label="Update pricing" @click="updatePricing()" />
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import PharmacyMedicinesService from './../services/PharmacyMedicinesService'
import MedicineService from './../services/MedicineService'
import {medicineAlreadyExists} from './../notifications/pharmacyMedicines'
import {cantDeleteMedicine} from './../notifications/pharmacyMedicines'
import {successfulyDeletedMedicine} from './../notifications/pharmacyMedicines'
import PricingsService from './../services/PricingsService'
import moment from 'moment'
import { date } from 'quasar'
import {cantDeletePricing} from './../notifications/pricings'
import {successfulyDeletedPricing} from './../notifications/pricings'
import {addedNewPricing} from './../notifications/pricings'
import {failedToAddPricing} from './../notifications/pricings'
import {successfulyUpdatedPricing} from './../notifications/pricings'
import {failedToUpdatePricing} from './../notifications/pricings'


export default {
  async beforeMount () {
    this.loading = true
    this.data = await PharmacyMedicinesService.getPharmacyMedicines("e93cab4a-f007-412c-b631-7a9a5ee2c6ed") // Zakucano za sada
    this.original = JSON.parse(JSON.stringify(this.data))
    this.loading = false
  },
  data () {
    return {
      pricingsDialog: false,
      newUpdatePricingDialog: false,
      selectedMedicine: {
        name: null
      },
      selectedPricingUpdate: null,
      card: false,
      loading: false,
      filter: "",
      rowCount: 10,
      columns: [
        { name: 'name', align: 'center', label: 'Name', field: 'name', sortable: true },
        { name: 'loyaltyPoints', align: 'center', label: 'Loyalty points', field: 'loyaltyPoints', sortable: true},
        { name: 'quantity', align: 'center', label: 'Quantity', field: 'quantity', sortable: true},
        { name: 'action', label: '', field: 'action'}
      ],
      columnsPricingsHistory: [
        { name: 'startDate', align: 'center', label: 'Start date', field: 'startDate', sortable: true, format: val => moment(val).format('LL')},
        { name: 'endDate', align: 'center', label: 'End date', field: 'endDate', sortable: true, format: val => moment(val).format('LL')},
        { name: 'price', align: 'center', label: 'Price', field: 'price', sortable: true },
        { name: 'action', label: '', field: 'action'}
      ],
      data: [],
      dataPricingHistory: [],
      allMedicines: [],
      selectedNewMedicine: null,
      original: [],
      newPricing: {
        medicineId: "",
        pharmacyId: "",
        startDate: "",
        endDate: "",
        price: 0
      },
      newUpdatePricing: {
        startDate: "",
        endDate: "",
        price: 0
      },
      editPricingMode: false
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
    },
    async deleteval(index){
      let success = await PharmacyMedicinesService.deletePharmacyMedicine("e93cab4a-f007-412c-b631-7a9a5ee2c6ed", this.data[index].id);
      if(success) {
        this.data = await PharmacyMedicinesService.getPharmacyMedicines("e93cab4a-f007-412c-b631-7a9a5ee2c6ed");
        successfulyDeletedMedicine()
      } else {
        cantDeleteMedicine()
      }
    },
    async showPricings(index) {
      this.selectedMedicine = this.data[index]
      this.dataPricingHistory = await PricingsService.getAllMedicinePricings(this.selectedMedicine.id)
      this.dataPricingHistory.sort(function(a,b){ return new Date(a.startDate) - new Date(b.startDate) });
      this.pricingsDialog = true
    },
    async deletePricing(index) {
      console.log(index)
      let success = await PricingsService.deletePricing(this.dataPricingHistory[index].id)
      if(success) {
        this.dataPricingHistory = await PricingsService.getAllMedicinePricings(this.selectedMedicine.id)
        this.dataPricingHistory.sort(function(a,b){ return new Date(a.startDate) - new Date(b.startDate) });
        successfulyDeletedPricing()
      } else {
        cantDeletePricing()
      }
    },
    async addNewPricing() {
      console.log(this.newUpdatePricing.startDate)
      let newPricing = {
        medicineId: this.selectedMedicine.id,
        pharmacyId: "e93cab4a-f007-412c-b631-7a9a5ee2c6ed",
        startDate: this.newUpdatePricing.startDate,
        endDate: this.newUpdatePricing.endDate,
        price: this.newUpdatePricing.price
      }
      let success = await PricingsService.addNewPricing(newPricing)
      if(success) {
        this.dataPricingHistory = await PricingsService.getAllMedicinePricings(this.selectedMedicine.id)
        this.dataPricingHistory.sort(function(a,b){ return new Date(a.startDate) - new Date(b.startDate) });
        addedNewPricing()
        this.newUpdatePricingDialog = false
      } else {
        failedToAddPricing()
      }
    },
    async updatePricing() {
      console.log(this.newUpdatePricing)
      let response = await PricingsService.updatePricing(this.selectedPricingUpdate.id, this.newUpdatePricing)
      if (response.status == 200) {
        this.dataPricingHistory = await PricingsService.getAllMedicinePricings(this.selectedMedicine.id)
        this.dataPricingHistory.sort(function(a,b){ return new Date(a.startDate) - new Date(b.startDate) });
        successfulyUpdatedPricing()
        this.newUpdatePricingDialog = false
      } else {
        failedToUpdatePricing(response.data)
      }
    },
    editPricingDialog(index) {
      this.selectedPricingUpdate = this.dataPricingHistory[index]
      this.newUpdatePricing.startDate = this.selectedPricingUpdate.startDate
      this.newUpdatePricing.endDate = this.selectedPricingUpdate.endDate
      this.newUpdatePricing.price = this.selectedPricingUpdate.price
      this.editPricingMode = true
      this.newUpdatePricingDialog = true
    },
    addPricingDialog() {
      this.newUpdatePricing.startDate = ""
      this.newUpdatePricing.endDate = ""
      this.newUpdatePricing.price = 0
      this.editPricingMode = false
      this.newUpdatePricingDialog = true
    },
    getTodayDate() {
      let timeStamp = Date.now()
      return date.formatDate(timeStamp, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
    }
  }
}
</script>