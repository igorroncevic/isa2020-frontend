<template>
  <q-page class="q-pa-xl">
    <div class="text-h4 text-primary q-mb-lg">Filter Medicines</div>
    <div class="wrapper">
      <div class="q-pa-sm">
        <q-input
          style="width: 15rem"
          v-model="nameFilter"
          label="Medicine name"
        />
      </div>
      <div class="q-pa-sm">
        <q-btn
          @click="filterMedicines"
          style="margin-left: 2rem; margin-top: 1rem"
          color="primary"
          label="Filter"
        />
      </div>
      <div class="q-pa-md q-ml-xl">
        <q-select
        v-model="modelMark"
        :options="optionsMark"
        label="Filter by medicine mark"
        style="width: 15rem"/>
      </div>
      <div class="q-pa-md q-ml-xl">
        <q-select
        v-model="modelType"
        :options="optionsType"
        label="Filter by medicine type"
        style="width: 15rem"/>
      </div>
    </div>
    <q-space />

    <div class="row-xs-12 row-sm-4 row-md-3 row-lg-3">
      <div class="medicine-card">
        <search-medicine-details-card
          v-for="med in medicines"
          :key="med.medicine.id"
          :medicine="med.medicine"
        />
      </div>
      <div class="text-body1 no-medicines">
        {{
          medicines.length == 0
            ? "There are no medicines that match your filter criteria."
            : ""
        }}
      </div>
    </div>
  </q-page>
</template>

<script>
import MedicineService from './../../services/MedicineService'
import SearchMedicineDetailsCard from 'src/components/SearchMedicineDetailsCard.vue'

export default {
  components: { SearchMedicineDetailsCard },
  async mounted () {
    const response = await MedicineService.getAllMedicinesForNoAuthFiltering({
      name: '',
      patientId: ''
    })

    if (response.status == 200) this.medicines = [...response.data]
  },
  data () {
    return {
      medicines: [],
      nameFilter: '',
      modelMark: '',
      optionsMark: [],
      modelType: '',
      optionsType: ['herbal_medicine', 'biological_medicine', 'homeopathic_medicine', 'human_medicine', 'traditional_herbal_medicine', 'vaccine']
    }
  },
  methods: {
    async filterMedicines () {
      const response = await MedicineService.getAllMedicinesForNoAuthFiltering({
        name: this.nameFilter,
        patientId: ''
      })

      if (response.status == 200) this.medicines = [...response.data]
    }
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  width: 66%;
  flex-direction: row;
  margin-top: 2rem;
}

.medicine-card {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 1rem;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  row-gap: 15px;
  column-gap: 15px;
}

.no-medicines {
  width: 50%;
  position: relative;
  left: 30%;
  margin-top: 2rem;
  margin-bottom: 2rem;
}
</style>
