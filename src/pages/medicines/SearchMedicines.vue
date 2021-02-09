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
    </div>
    <q-space />

    <div class="row-xs-12 row-sm-4 row-md-3 row-lg-3">
      <div class="medicine-card">
        <medicine-filter-card
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
import MedicineFilterCard from "./../../components/MedicineFilterCard";
import MedicineService from "./../../services/MedicineService";

export default {
  components: { MedicineFilterCard },
  async mounted() {
    let response = await MedicineService.getAllMedicinesForNoAuthFiltering({
      name: "",
      patientId: "",
    });

    if (response.status == 200) this.medicines = [...response.data];
  },
  data() {
    return {
      medicines: [],
      nameFilter: "",
    };
  },
  methods: {
    async filterMedicines() {
      let response = await MedicineService.getAllMedicinesForNoAuthFiltering({
        name: this.nameFilter,
        patientId: "",
      });

      if (response.status == 200) this.medicines = [...response.data];
    },
  },
};
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