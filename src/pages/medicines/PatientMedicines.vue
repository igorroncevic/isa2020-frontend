<template>
  <q-page>
    <div id="patient-medicines-grid">
      <div id="reserved-medicines-wrapper">
        <div
          class="text-h5 text-primary text-weight-medium"
          style="grid-row: 1"
        >
          Your Reserved Medicines
        </div>
        <div id="reserved-medicines-btns">
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
        <div id="reserved-medicines-list" v-if="reservedMedicines.length != 0">
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
          style="grid-row: 2"
          v-if="reservedMedicines.length == 0"
        >
          You haven't reserved any medicines yet.
        </div>
      </div>
      <div id="eprescription-wrapper">Hello</div>
      <div id="eprescription-medicines-wrapper">Hello</div>
    </div>
  </q-page>
</template>

<script>
import ReservedMedicineCard from "./../../components/ReservedMedicineCard";
import MedicineService from "./../../services/MedicineService";
import {
  successfullyCancelledMedicine,
  errorOccurredWhileCancellingMedicine,
} from "./../../notifications/medicines";

export default {
  components: { ReservedMedicineCard },
  async mounted() {
    let response = await MedicineService.getAllPatientsReservedMedicines(
      this.patientId
    );

    console.log(response.data);

    if (response.status == 200) this.reservedMedicines = [...response.data];
  },

  data() {
    return {
      patientId: "cc6fd408-0084-420b-8078-687d8a72744b",
      reservedMedicines: [],
      cancellingReservedMedicine: false,
    };
  },
  methods: {
    navigateToReservePage() {
      this.$router.push({ path: "/patient/medicines/reserve" });
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
  grid-template-rows: repeat(3, 0.9fr);
  grid-template-columns: repeat(10, 1fr);
}

#reserved-medicines-wrapper {
  grid-row: 1;
  grid-column: 1/11;
  padding: 2rem;
  display: grid;
  grid-template-rows: 4rem auto;
}

#reserved-medicines-list {
  grid-row: 2;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  column-gap: 10px;
  row-gap: 10px;
}

#reserved-medicines-btns {
  grid-row: 1;
  grid-column: 11;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  height: 2.5rem;
  margin-top: 0.3rem;
}

#eprescription-wrapper {
  grid-row: 2;
  grid-column: 1/11;
  background-color: blue;
  padding: 2rem;
  display: grid;
  grid-template-rows: 4rem auto;
}

#eprescription-medicines-wrapper {
  grid-row: 3;
  grid-column: 1/11;
  background-color: red;
  padding: 2rem;
}
</style>