<template>
  <q-card class="my-card" flat bordered>
    <q-card-section vertical>
      <q-card-section>
        <div class="text-h5 text-primary text-weight-medium">
          {{ medicine.name }}
        </div>
        <div class="text-caption text-grey">
          Reservation ID: {{ reservationId }} <br />
        </div>
      </q-card-section>

      <q-separator></q-separator>

      <q-card-section>
        <div class="text-body1">
          <span class="text-primary text-weight-medium"> Pharmacy: </span>
          {{ pharmacy.name }} <br />
          <span class="text-primary text-weight-medium"> Location: </span>
          {{ pharmacy.street }}, {{ pharmacy.city }},
          {{ pharmacy.country }} <br />
          <span class="text-primary text-weight-medium"> Pickup Date: </span>
          {{ pickupDate }}
        </div>

        <div class="q-ml-md q-mt-sm q-mb-md relative-position float-right">
          <q-btn
            v-if="cancelling"
            @click="cancelMedicine"
            flat
            icon="cancel_schedule_send"
            label="Cancel"
            color="red"
          />
        </div>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    medicine: {
      type: Object,
      required: true,
    },
    cancelling: {
      type: Boolean,
    },
    pharmacy: {
      type: Object,
      required: false,
    },
    reservationId: {
      type: String,
      required: true,
    },
    pickupDate: {
      type: String || Number,
    },
  },
  methods: {
    cancelMedicine() {
      this.$emit("cancelMedicine", this.reservationId);
    },
    dateFormat(date) {
      return moment(date).format("LL");
    },
  },
};
</script>

<style>
.my-card {
  width: 90%;
  max-width: 25rem;
  height: 14rem;
  display: table;
}

.q-card__section--vert {
  padding: 8px !important;
}
</style>