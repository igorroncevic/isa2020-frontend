<template>
  <q-stepper v-model="step" header-nav ref="stepper" color="primary" animated>
    <q-step
      :name="1"
      title="Choose a medicine"
      icon="medication"
      :done="step > 1"
      :header-nav="step > 1"
    >
      <div class="text-h5">Filter Medicines</div>
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
            @reserveMedicine="(id) => chooseMedicine(id)"
            :reserving="true"
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
    </q-step>

    <q-step
      :name="2"
      title="Choose a pharmacy"
      icon="business"
      :done="step > 2"
      :header-nav="step > 2"
    >
      <div class="medicine-card">
        <medicine-filter-card
          v-for="pharmacy in availablePharmacies"
          :pharmacy="pharmacy"
          :key="pharmacy.id"
          :medicine="selectedMedicine"
          :reserving="true"
          :choosingPharmacy="true"
          @chosenPharmacy="(data) => choosePharmacy(data)"
        />
      </div>
    </q-step>
    <q-step
      :name="3"
      title="Choose a pickup date"
      icon="event"
      :done="step > 3"
      :header-nav="step > 3"
    >
      <medicine-filter-card
        :pharmacy="selectedPharmacy"
        :key="selectedPharmacy.id"
        :medicine="selectedMedicine"
        :choosingPharmacy="true"
        :choosingDate="true"
        :reserving="true"
      />
      <div class="row justify-left" style="align-items: center">
        <h6 style="margin-bottom: 0px; margin-top: 5px">Pickup Time:</h6>
        <date-input
          v-model="pickupTime"
          :date="pickupTime"
          @datechange="
            (val) => {
              this.pickupTime = val;
            }
          "
        />
        <q-btn @click="chooseDate" color="primary" label="Reserve" />
      </div>
    </q-step>
  </q-stepper>
</template>

<script>
import moment from "moment";
import MedicineFilterCard from "./../../components/MedicineFilterCard";
import MedicineService from "./../../services/MedicineService";
import DateInput from "./../../components/DateInput.vue";
import {
  errorOccurredWhileReservingMedicine,
  successfullyReservedMedicine,
} from "./../../notifications/medicines";

export default {
  components: { MedicineFilterCard, DateInput },
  async mounted() {
    this.patientId = this.$store.getters.getId

    let response = await MedicineService.getAllMedicinesForFiltering({
      name: "",
      patientId: this.patientId,
    });

    if (response.status == 200) this.medicines = [...response.data];

    let today = new Date();
    this.pickupTime =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1 < 10
        ? "0" + (today.getMonth() + 1)
        : today.getMonth() + 1) +
      "-" +
      (today.getDate() + 1 < 10
        ? "0" + (today.getDate() + 1)
        : today.getDate() + 1);
  },
  data() {
    return {
      medicines: [],
      patientId: "",
      nameFilter: "",
      selectedMedicine: { id: 1 },
      selectedPharmacy: { id: 2 },
      availablePharmacies: [],
      step: 1,
      pickupTime: null,
    };
  },
  methods: {
    async filterMedicines() {
      let response = await MedicineService.getAllMedicinesForFiltering({
        name: this.nameFilter,
        patientId: this.patientId,
      });

      if (response.status == 200) this.medicines = [...response.data];
    },
    chooseMedicine(id) {
      let selected = {
        ...this.medicines.filter((med) => med.medicine.id == id)[0],
      };
      this.selectedMedicine = { ...selected.medicine };
      this.availablePharmacies = [...selected.pharmacies];
      this.step = 2;
    },
    async choosePharmacy(pharmacy) {
      if (pharmacy.id == null) return;

      this.selectedPharmacy = {
        ...this.availablePharmacies.filter((ph) => ph.id == pharmacy.id)[0],
      };

      this.step = 3;
    },
    async chooseDate() {
      let response = await MedicineService.reserveMedicine({
        patientId: this.patientId,
        medicineId: this.selectedMedicine.id,
        pharmacyId: this.selectedPharmacy.id,
        pickupDate: moment(this.pickupTime).format("DD/MM/yyyy"),
      });

      if (response.status == 200)
        successfullyReservedMedicine(
          this.selectedMedicine.name,
          this.selectedPharmacy.name
        );
      else
        errorOccurredWhileReservingMedicine(
          this.selectedMedicine.name,
          this.selectedPharmacy.name
        );
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