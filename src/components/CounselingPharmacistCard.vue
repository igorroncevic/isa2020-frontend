<template>
  <q-card id="pharmacist-card" flat bordered>
    <q-card-section vertical>
      <q-card-section>
        <div class="text-h5 text-primary text-weight-medium">
          {{ pharmacist.name }} {{ pharmacist.surname }}
        </div>
      </q-card-section>
      <q-separator></q-separator>
      <q-card-section>
        <div class="text-left">
          <span
            class="text-body1 text-primary text-weight-medium"
            v-if="pharmacist.averageMark != 0"
            >Average mark:
          </span>
          {{
            pharmacist.averageMark == 0
              ? `${pharmacist.name} didn't receive any marks yet.`
              : ` ${parseFloat(pharmacist.averageMark).toFixed(1)}`
          }}
        </div>
        <div class="q-ml-md q-mt-md q-mb-md relative-position float-right">
          <q-btn @click="choosePharmacist" label="Choose" color="primary" />
        </div>
      </q-card-section>
    </q-card-section>
  </q-card>
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
#pharmacist-card {
  width: 90%;
  max-width: 21rem;
  display: table;
}

.q-card__section--vert {
  padding: 8px !important;
}
</style>