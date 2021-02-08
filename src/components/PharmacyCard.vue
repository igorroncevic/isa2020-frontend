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
        <div class="text-body1 text-left">
          <span class="text-primary text-weight-medium"> Location: </span>
          {{ pharmacy.address.street }}, {{ pharmacy.address.city }},
          {{ pharmacy.address.country }}
          <br />
          <span class="text-primary text-weight-medium"> Average mark: </span>
          {{ pharmacy.averageMark }}
        </div>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  props: {
    pharmacy: {
      type: Object,
      required: false,
      default: {
        name: "",
        address: {
          street: "",
          city: "",
          country: "",
        },
      },
    },
  },
};
</script>

<style>
#pharmacy-card {
  width: 90%;
  max-width: 21rem;
  height: 13.5rem !important;
  max-height: 13.5rem !important;
}
</style>