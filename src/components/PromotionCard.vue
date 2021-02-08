<template>
  <q-card id="promotion-card" flat bordered>
    <q-card-section vertical>
      <q-card-section>
        <div class="text-h5 text-primary text-weight-medium">
          {{ promotion.pharmacy.name }}
        </div>
      </q-card-section>
      <q-separator></q-separator>
      <q-card-section>
        <div class="text-body1">
          <span class="text-primary text-weight-medium"> Description: </span>
          {{ promotion.text }} <br />
          <span class="text-primary text-weight-medium"> Start: </span>
          {{ dateFormat(promotion.startDate) }} <br />
          <span class="text-primary text-weight-medium"> End: </span>
          {{ dateFormat(promotion.endDate) }} <br />
        </div>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script>
import moment from "moment";

export default {
  props: ["promotion"],
  methods: {
    dateFormat(date) {
      return moment(date).format("LL");
    },
  },
};
</script>

<style scoped>
#promotion-card {
  width: 90%;
  max-width: 21rem;
  height: 13.5rem !important;
  max-height: 13.5rem !important;
}

.q-card__section--vert {
  padding: 8px !important;
}
</style>
