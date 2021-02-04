<template>
  <q-page>
    <div class="justify-center patient-medicines-grid-wrapper">
      <q-btn
        style="grid-row: 1"
        class="q-mt-md"
        color="primary"
        label="Reserve Medicine"
        icon="book_online"
        @click="navigateToReservePage"
      />
      <q-btn
        style="grid-row: 2"
        class="q-mt-md"
        color="primary"
        label="Cancel Medicine Reservation"
        icon="close"
        @click="navigateToCancelPage"
      />
    </div>
  </q-page>
</template>

<script>
export default {
  methods: {
    navigateToCancelPage() {
      this.$router.push({ path: "/patient/medicines/cancel" });
    },
    navigateToReservePage() {
      this.$router.push({ path: "/patient/medicines/reserve" });
    },
  },
};
</script>

<style scoped>
.patient-medicines-grid-wrapper {
  display: grid;
  grid-template-rows: 50% 50%;
}
</style>