<template>
  <div class="q-pa-md">
    <q-table
      title="Treats"
      :data="data"
      :columns="columns"
      row-key="id"
      :filter="filter"
      :filter-method="myFilter"
      :loading="loading"
    >

      <template v-slot:top>
        <q-space />
        <div class="q-pa-sm">
          <q-btn round color="red" icon="highlight_off" @click="removeFilters" v-show=filtersActive />
        </div>
        <div class="q-pa-sm">
          <q-select v-model="filter.pharmacy" :options="options" label="Pharmacy" style="min-width: 200px"/>
        </div>
        <div class="q-pa-sm">
          <q-input v-model.number="filter.minMark" type="number" label="Minimum average mark" style="min-width: 200px"/>
        </div>
        <div class="q-pa-sm">
          <q-input v-model="filter.query" label="Search names" style="min-width: 200px">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </template>

    </q-table>
  </div>
</template>

<script>
import DoctorService from './../services/DoctorService'

export default {
  async beforeMount () {
    this.data = await DoctorService.getAllDermatologists()
    this.original = JSON.parse(JSON.stringify(this.data))

    //Moze da se promeni da se povlaci sa backend-a
    var allPharmacies = []
    this.data.forEach(element => allPharmacies = allPharmacies.concat(element.pharmacies));
    this.options = allPharmacies.filter((item, i, ar) => ar.indexOf(item) === i);
  },
  data () {
    return {
      loading: false,
      filter: {
        query: null,
        minMark: null,
        pharmacy: null
      },
      filtersActive: false,
      options: null,
      rowCount: 10,
      columns: [
        { name: 'name', align: 'center', label: 'Name', field: 'name', sortable: true },
        { name: 'surname', align: 'center', label: 'Surname', field: 'surname', sortable: true },
        { name: 'average_mark', align: 'center', label: 'Average mark', field: 'averageMark', sortable: true },
        { name: 'pharmacies', align: 'center', label: 'Pharmacies', field: 'pharmacies', format: (val, row) => val.join(', '), sortable: true }
      ],
      data: [],
      original: []
    }
  },

  methods: {
    myFilter () {
      this.filtersActive = false
      var pharmacyFiltered
      if(this.filter.pharmacy == null) {
        pharmacyFiltered = this.data
      } else {
        pharmacyFiltered = this.data.filter(row => row.pharmacies.indexOf(this.filter.pharmacy) !== -1)
        this.filtersActive = true
      }
      
      var markFiltered
      if(this.filter.minMark == null || this.filter.minMark == '') {
        markFiltered = pharmacyFiltered
      } else {
        markFiltered = pharmacyFiltered.filter(row => row.averageMark >= this.filter.minMark)
        this.filtersActive = true
      }

      var nameFiltered
      if(this.filter.query == null || this.filter.query == '') {
        nameFiltered = markFiltered
      } else {
        nameFiltered = markFiltered.filter(row => (row.name.toLowerCase() + ' ' + row.surname.toLowerCase()).indexOf(this.filter.query.toLowerCase()) !== -1)
        this.filtersActive = true
      }

      return nameFiltered

      const lowerTerms = terms ? terms.toLowerCase() : ''
      return rows.filter(
        row => cols.some(col => (cellValue(col, row) + '').toLowerCase().indexOf(lowerTerms) !== -1)
      )
    },
    removeFilters() {
      this.filter.pharmacy = null
      this.filter.minMark = null
      this.filter.query = null
    }
  }
}
</script>