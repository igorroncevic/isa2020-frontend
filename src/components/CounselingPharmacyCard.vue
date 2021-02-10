<template>
  <q-card id="pharmacy-card" flat bordered>
    <q-card-section vertical>
      <q-card-section>
        <div class="text-h5 text-primary text-weight-medium">
          {{ pharmacy.name }}
        </div>
      </q-card-section>
      <q-separator></q-separator>
      <q-card-section>
        <div class="text-left">
          <span class="text-body1 text-primary text-weight-medium"
            >Location: </span
          >{{ pharmacy.street }}, {{ pharmacy.city }}, {{ pharmacy.country }}
          <br />
          <span class="text-body1 text-primary text-weight-medium"
            >Price:
          </span>
          ${{ pharmacy.minPrice }} - ${{ pharmacy.maxPrice }} <br />
          <span class="text-body1 text-primary text-weight-medium"
            >Average mark:
          </span>
          {{ parseFloat(pharmacy.mark).toFixed(1) }} <br />
        </div>
        <div
          class="q-ml-md q-mt-md q-mb-md relative-position float-right"
        >
          <q-btn
            @click="choosePharmacy"
            label="Choose"
            color="primary"
          />
        </div>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  props: ["pharmacy"],
  methods: {
    choosePharmacy() {
      this.$emit("chosenPharmacy", this.pharmacy.id);
    },
  },
};
</script>

<style scoped>
#pharmacy-card {
  width: 90%;
  max-width: 21rem;
  display: table;
}

.q-card__section--vert {
  padding: 8px !important;
}
</style>