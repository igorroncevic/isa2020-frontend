<template>
  <div class="q-pa-md">
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">
          {{ pharmacist.name }} {{ pharmacist.surname }}
        </div>
        <div class="text-left">
          {{
            pharmacist.averageMark == 0
              ? `${pharmacist.name} didn't receive any marks yet.`
              : `Average mark: ${pharmacist.averageMark}`
          }}
        </div>
      </q-card-section>
      <q-card-section>
        <q-btn @click="choosePharmacist" color="primary" label="Choose" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  props: {
    pharmacist: {
      type: Object,
      required: true,
    },
  },
  methods: {
    choosePharmacist() {
      this.$emit("chosenPharmacist", {
        id: this.pharmacist.id,
        surname: this.pharmacist.surname,
      });
    },
  },
};
</script>

<style>
.my-card {
  width: 100%;
  max-width: 300px;
}
</style>