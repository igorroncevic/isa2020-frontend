<template>
  <div class="q-pa-md">
    <q-table
      title="Treats"
      :data="data"
      :columns="columns"
      row-key="id"
      :filter="filter"
      :loading="loading"
    >

      <template v-slot:top>
        <q-space />
        <q-input borderless dense debounce="300" color="primary" v-model="filter">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
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
  },
  data () {
    return {
      loading: false,
      filter: '',
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
  }
}
</script>