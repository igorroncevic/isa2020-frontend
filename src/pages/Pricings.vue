<template>
  <div class="q-pa-md">
    <q-table
      title="Pricings"
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
          <q-input v-model="filter.query" label="Search names" style="min-width: 200px">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </template>

    </q-table>

    <q-dialog v-model="card">
      <q-card class="my-card">
        
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import moment from 'moment'
import PricingsService from './../services/PricingsService'

export default {
  async beforeMount () {
    this.data = await PricingsService.getCurrentPricingsForPharmacy()
    this.original = JSON.parse(JSON.stringify(this.data))
  },
  data () {
    return {
      card: false,
      loading: false,
      filter: "",
      rowCount: 10,
      columns: [
        { name: 'medicine', align: 'center', label: 'Medicine', field: 'medicine', sortable: true },
        { name: 'startDate', align: 'center', label: 'Start date', field: 'startDate', sortable: true, format: val => moment(val).format('LL')},
        { name: 'endDate', align: 'center', label: 'End date', field: 'endDate', sortable: true, format: val => moment(val).format('LL')},
        { name: 'price', align: 'center', label: 'Price', field: 'price', sortable: true }
      ],
      data: [],
      original: []
    }
  },
  methods: {
    onRowClick (evt, row) {
      this.card = true
    }
  }
}
</script>