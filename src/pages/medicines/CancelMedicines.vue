<template>
  <div class="row justify-left q-ml-xl q-mt-xl cmgrid">
    <div class="text-h5" style="grid-row: 1">Your Reserved Medicines</div>
    <div style="grid-row: 2">
      <medicine-filter-card
        v-for="medicine in reservedMedicines"
        :pharmacy="medicine.pharmacy"
        :key="medicine.id"
        :medicine="medicine.medicine"
        :choosingPharmacy="true"
        :reservationId="medicine.id"
        @cancelMedicine="(id) => cancelMedicine(id)"
      />
      <div class="text-body1 no-medicines">
        {{
          reservedMedicines.length == 0
            ? "There are no medicines that match your filter criteria."
            : ""
        }}
      </div>
    </div>
  </div>
</template>

<script>
import MedicineFilterCard from "./../../components/MedicineFilterCard";
import MedicineService from "./../../services/MedicineService";
import {
  successfullyCancelledMedicine,
  errorOccurredWhileCancellingMedicine,
} from "./../../notifications/medicines";

export default {
  components: { MedicineFilterCard },
  async mounted() {
    this.patientId = this.$store.getters.getId

    let response = await MedicineService.getAllPatientsReservedMedicines(
      this.patientId
    );

    if (response.status == 200) this.reservedMedicines = [...response.data];
  },
  data() {
    return {
      patientId: "",
      reservedMedicines: [],
    };
  },
  methods: {
    async cancelMedicine(id) {
      let reservation = {
        ...this.reservedMedicines.filter((med) => med.id == id)[0],
      };

      console.log({
        patientId: this.patientId,
        pharmacyId: reservation.pharmacy.id,
        medicineId: reservation.medicine.id,
        reservationId: reservation.id,
      });
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
.cmgrid {
  display: grid;
  grid-template-rows: 10% 90%;
  grid-gap: 20px;
}

.no-medicines {
  width: 50%;
  position: relative;
  left: 30%;
  margin-top: 2rem;
  margin-bottom: 2rem;
}
</style>