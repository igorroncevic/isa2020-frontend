<template>
  <q-card class="my-card row full-height q-pm-lg" flat bordered>
    <q-card-section horizontal>
      <q-card-section class="q-pt-xs">
        <div class="text-h5 q-mt-sm q-mb-xs">
          {{ medicine.name }}
        </div>
        <div class="text-body2">
          ID: {{ medicine.id }} <br />
          Loyalty points: {{ medicine.loyaltyPoints }} <br />

          <div class="text-body2" v-if="choosingPharmacy">
            Pharmacy: {{ pharmacy.name }} <br />
            Location: {{ pharmacy.address.street }},
            {{ pharmacy.address.city }}, {{ pharmacy.address.country }} <br />
            <div class="" v-if="pharmacy.averageMark">
              Average mark: {{ Number(pharmacy.averageMark.toFixed(1)) }} <br />
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card-section>

    <q-separator v-if="!choosingDate"></q-separator>

    <q-card-actions>
      <q-btn
        v-if="reserving && !choosingPharmacy && !choosingDate"
        @click="reserveMedicine"
        flat
        icon="book_online"
        label="Reserve"
        color="primary"
      ></q-btn>
      <q-btn
        v-if="reserving && choosingPharmacy && !choosingDate"
        @click="choosePharmacy"
        flat
        icon="book_online"
        label="Choose pharmacy"
        color="primary"
      ></q-btn>
      <q-btn
        v-if="!reserving"
        @click="cancelMedicine"
        flat
        icon="cancel_schedule_send"
        label="Cancel"
        color="red"
      ></q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  props: {
    medicine: {
      type: Object,
      required: true,
    },
    reserving: {
      type: Boolean,
    },
    pharmacy: {
      type: Object,
      required: false,
    },
    choosingPharmacy: {
      type: Boolean,
    },
    choosingDate: {
      type: Boolean,
    },
    reservationId: {
      type: String,
    }
  },
  methods: {
    reserveMedicine() {
      this.$emit("reserveMedicine", this.medicine.id);
    },
    cancelMedicine() {
      this.$emit("cancelMedicine", this.reservationId);
    },
    choosePharmacy() {
      this.$emit("chosenPharmacy", {
        id: this.pharmacy != null ? this.pharmacy.id : null,
      });
    },
  },
};
</script>

<style>
.my-card {
  width: 100%;
  max-width: 25rem;
  max-height: 14rem;
}
</style>