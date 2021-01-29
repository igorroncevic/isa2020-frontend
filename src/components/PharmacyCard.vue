<template>
  <div class="q-pa-md">
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">{{ pharmacy.name }}</div>
        <div class="text-left">
          {{ pharmacy.address.street }}, {{ pharmacy.address.city }}, {{ pharmacy.address.country }}
        </div>
        <div class="text-subtitle2">
          Average mark: {{ pharmacy.averageMark }}
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  props: ["pharmacy"]
};
</script>

<style>
.my-card {
  width: 100%;
  max-width: 400px;
}
</style>