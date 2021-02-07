<template>
  <q-card class="my-card" flat bordered>
    <q-card-section vertical>
      <q-card-section>
        <div class="text-h5 text-primary text-weight-medium">
          {{ medicine.name }}
        </div>
      </q-card-section>

      <q-separator></q-separator>

      <q-card-section>
        <div class="text-body1"  v-if="!choosingPharmacy">
          <span class="text-primary text-weight-medium"> ID: </span> {{ medicine.id }} <br />
          <span class="text-primary text-weight-medium"> Loyalty points: </span> {{ medicine.loyaltyPoints }} <br />
          </div>

          <div class="text-body1" v-if="choosingPharmacy">
            <span class="text-primary text-weight-medium"> Pharmacy: </span> {{ pharmacy.name }} <br />
            <span class="text-primary text-weight-medium"> Location: </span> {{ pharmacy.address.street }},
            {{ pharmacy.address.city }}, {{ pharmacy.address.country }} <br />
            <div class="" v-if="pharmacy.averageMark">
              <span class="text-primary text-weight-medium"> Average mark: </span> {{ Number(pharmacy.averageMark.toFixed(1)) }} <br />
            </div>
          </div>
        </div>

        <div class="q-ml-md q-mt-sm q-mb-md relative-position float-right">
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
        </div>
      </q-card-section>
    </q-card-section>
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
    },
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

<style scoped>
.my-card {
  width: 90%;
  max-width: 25rem;
  height: 12rem !important;
  max-height: 12rem !important;
}

.q-card__section--vert {
  padding: 8px !important;
}
</style>