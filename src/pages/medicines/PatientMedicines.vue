<template>
  <q-page>
    <div id="patient-medicines-grid">
      <div id="reserved-medicines-wrapper">
        <div
          class="text-h4 text-primary text-weight-medium"
          style="grid-row: 1; grid-column: 1/5"
        >
          Your Reserved Medicines
        </div>
        <div class="list-btns">
          <q-btn
            label="Reserve Medicines"
            color="primary"
            bordered
            @click="navigateToReservePage"
          />
          <q-btn
            label="Cancel Reservations"
            color="red"
            flat
            @click="cancellingReservedMedicine = !cancellingReservedMedicine"
          />
        </div>
        <div class="card-list" v-if="reservedMedicines.length != 0">
          <reserved-medicine-card
            v-for="medicine in reservedMedicines"
            :pharmacy="medicine.pharmacy"
            :key="medicine.id"
            :cancelling="cancellingReservedMedicine"
            :medicine="medicine.medicine"
            :pickupDate="medicine.pickupDate"
            :reservationId="medicine.id"
            @cancelMedicine="(id) => cancelMedicine(id)"
          />
        </div>
        <div
          class="text-body1"
          style="grid-row: 2; grid-column: 1/5"
          v-if="reservedMedicines.length == 0"
        >
          You haven't reserved any medicines yet.
        </div>
      </div>
      <div id="eprescription-wrapper">
        <div
          class="text-h4 text-primary text-weight-medium"
          style="grid-row: 1; grid-column: 1/5"
        >
          Your EPrescriptions
        </div>
        <div class="card-list" v-if="eprescriptions.length != 0">
          <EPrescriptionMedicinesCard
            v-for="eprescription in eprescriptions"
            :key="eprescription.id"
            :eprescriptionMedicines="eprescription.eprescriptionMedicines"
            :issueDate="eprescription.issueDate"
            :status="eprescription.status"
          />
        </div>
        <div
          class="text-body1"
          style="grid-row: 2; grid-column: 1/5"
          v-if="eprescriptions.length == 0"
        >
          You haven't received any prescriptions yet.
        </div>
        <div class="list-btns">
          <q-select
            borderless
            v-model="prescriptionSorting"
            :options="sortingOptions"
            label="Sort by"
            @input="filterAndSortPrescriptions"
          />
          <q-select
            borderless
            v-model="prescriptionFiltering"
            :options="filteringOptions"
            label="Status"
            @input="filterAndSortPrescriptions"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import ReservedMedicineCard from "./../../components/ReservedMedicineCard";
import EPrescriptionMedicinesCard from "./../../components/EPrescriptionMedicinesCard";
import MedicineService from "./../../services/MedicineService";
import EPrescriptionService from "./../../services/EPrescriptionService";
import {
  successfullyCancelledMedicine,
  errorOccurredWhileCancellingMedicine,
} from "./../../notifications/medicines";

export default {
  components: { ReservedMedicineCard, EPrescriptionMedicinesCard },
  async mounted() {
    this.patientId = this.$store.getters.getId

    let response = await MedicineService.getAllPatientsReservedMedicines(
      this.patientId
    );

    if (response.status == 200) this.reservedMedicines = [...response.data];

    response = await EPrescriptionService.getAllPatientsEPrescriptions({
      patientId: this.patientId,
      filter: this.prescriptionFiltering,
      sort: this.prescriptionSorting,
    });
    if (response.status == 200) this.eprescriptions = [...response.data];
  },

  data() {
    return {
      patientId: "",
      reservedMedicines: [],
      eprescriptions: [],
      cancellingReservedMedicine: false,
      prescriptionFiltering: "All of them",
      prescriptionSorting: "Issue Date Desc.",
      filteringOptions: ["All of them", "Pending", "Processed", "Declined"],
      sortingOptions: ["Issue Date Desc.", "Issue Date Asc."],
    };
  },
  methods: {
    navigateToReservePage() {
      this.$router.push({ path: "/patient/medicines/reserve" });
    },
    async filterAndSortPrescriptions() {
      let response = await EPrescriptionService.getAllPatientsEPrescriptions({
        patientId: this.patientId,
        filter: this.prescriptionFiltering,
        sort: this.prescriptionSorting,
      });
      if (response.status == 200) this.eprescriptions = [...response.data];
    },
    async cancelMedicine(id) {
      let reservation = {
        ...this.reservedMedicines.filter((med) => med.id == id)[0],
      };

      let response = await MedicineService.cancelMedicine({
        patientId: this.patientId,
        pharmacyId: reservation.pharmacy.id,
        medicineId: reservation.medicine.id,
        reservationId: reservation.id,
      });

      if (response.status == 200) {
        successfullyCancelledMedicine(
          reservation.medicine.name,
          reservation.pharmacy.name
        );
        setTimeout(() => this.$router.go(), 2500);
      } else {
        errorOccurredWhileCancellingMedicine(
          reservation.medicine.name,
          reservation.pharmacy.name
        );
      }
    },
  },
};
</script>

<style scoped>
#patient-medicines-grid {
  display: grid;
  grid-template-rows: repeat(2, 0.5fr);
  grid-template-columns: repeat(10, 1fr);
}

#reserved-medicines-wrapper {
  grid-row: 1;
  grid-column: 1/11;
  padding: 2rem;
  display: grid;
  grid-template-rows: 4rem auto;
  grid-template-columns: repeat(10, 1fr);
  row-gap: 5px;
}

.card-list {
  grid-row: 2;
  grid-column: 1/10;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  column-gap: 10px;
  row-gap: 10px;
}

.list-btns {
  grid-row: 1;
  grid-column: 8/11;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  height: 2.5rem;
  margin-top: 0.3rem;
}

#eprescription-wrapper {
  grid-row: 2;
  grid-column: 1/11;
  padding: 2rem;
  display: grid;
  grid-template-rows: 4rem auto;
}

#eprescription-wrapper .list-btns {
  justify-content: flex-end;
  margin-right: 3rem;
  column-gap: 5rem;
}
</style>