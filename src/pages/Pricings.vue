<template>
  <div class="q-pa-md">
    <q-table
      title="Pricings"
      :data="dataCurrentPricings"
      :columns="columnsCurrentPricings"
      row-key="id"
      :filter="filter"
      :loading="loading"
      @row-click="onRowClick"
    >

      <template v-slot:top>
        <q-space />
        <div class="q-pa-sm">
          <q-input v-model="filter.query" label="Search names" style="min-width: 200px">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </template>

    </q-table>

    <q-dialog v-model="card">
      <q-card class="q-pa-lg">
        <div class="col text-h6 ellipsis">
          {{ this.selectedPricing.medicine }}
        </div>
        <q-table
          class="q-pa-sm"
          :data="dataPricingHistory"
          :columns="columnsPricingsHistory"
          row-key="id"
          :filter="filter"
          :loading="loading"
          hide-header
          hide-bottom
        >
        </q-table>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import moment from 'moment'
import PricingsService from './../services/PricingsService'

export default {
  async beforeMount () {
    this.dataCurrentPricings = await PricingsService.getCurrentPricingsForPharmacy()
    this.original = JSON.parse(JSON.stringify(this.dataCurrentPricings))
  },
  data () {
    return {
      card: false,
      selectedPricing: {
        medicine: null
      },
      loading: false,
      filter: "",
      rowCount: 10,
      columnsCurrentPricings: [
        { name: 'medicine', align: 'center', label: 'Medicine', field: 'medicine', sortable: true },
        { name: 'startDate', align: 'center', label: 'Start date', field: 'startDate', sortable: true, format: val => moment(val).format('LL')},
        { name: 'endDate', align: 'center', label: 'End date', field: 'endDate', sortable: true, format: val => moment(val).format('LL')},
        { name: 'price', align: 'center', label: 'Current price', field: 'price', sortable: true }
      ],
      columnsPricingsHistory: [
        { name: 'startDate', align: 'center', label: 'Start date', field: 'startDate', sortable: true, format: val => moment(val).format('LL')},
        { name: 'endDate', align: 'center', label: 'End date', field: 'endDate', sortable: true, format: val => moment(val).format('LL')},
        { name: 'price', align: 'center', label: 'Price', field: 'price', sortable: true }
      ],
      dataCurrentPricings: [],
      dataPricingHistory: [],
      original: []
    }
  },
  methods: {
    async onRowClick (evt, row) {
      this.selectedPricing = row
      this.dataPricingHistory = await PricingsService.getAllMedicinePricings(this.selectedPricing.medicineId)
      this.card = true
    }
  }
}
</script>