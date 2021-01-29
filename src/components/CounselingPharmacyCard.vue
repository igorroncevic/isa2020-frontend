<template>
  <div class="q-pa-md">
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">{{ pharmacy.name }}</div>
        <div class="text-left">
          {{ pharmacy.street }}, {{ pharmacy.city }}, {{ pharmacy.country }}
        </div>
        <div class="text-subtitle2">
          Prices: ${{ pharmacy.minPrice }} - ${{
            pharmacy.maxPrice
          }}
          &nbsp;&nbsp; Average mark: {{ pharmacy.mark }}
        </div>
      </q-card-section>
      <q-card-section>
        <q-btn @click="choosePharmacy" color="primary" label="Choose" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  props: ["pharmacy"],
  methods: {
      choosePharmacy(){
          this.$emit("chosenPharmacy", this.pharmacy.id);
      }
  }
};
</script>

<style>
.my-card {
  width: 100%;
  max-width: 400px;
}
</style>