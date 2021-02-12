<template>
  <q-card id="pharmacy-promotion-card" flat bordered>
    <q-card-section vertical>
      
      <q-card-section>
        <div class="text-body1">
          <span class="text-primary text-weight-medium"> Start: </span>
          {{ dateFormat(promotion.startDate) }} <br />
          <span class="text-primary text-weight-medium"> End: </span>
          {{ dateFormat(promotion.endDate) }} <br />
          <q-separator class="q-my-sm"></q-separator>
          <span class="text-primary text-weight-medium"> Description: </span>
          {{ promotion.text }} <br />
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
#pharmacy-promotion-card {
  width: 90%;
  max-width: 21rem;
  height: 13.5rem !important;
  max-height: 13.5rem !important;
}

.q-card__section--vert {
  padding: 8px !important;
}
</style>
