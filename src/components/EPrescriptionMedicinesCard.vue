<template>
  <q-card class="my-card" flat bordered>
    <q-card-section vertical>
      <q-card-section>
        <div class="text-h6 text-primary text-weight-medium">
          Issued at {{ dateFormat(issueDate) }}
        </div>
        <div class="text-caption text-grey">
          Status: {{ capitalize(status) }} <br />
        </div>
      </q-card-section>

      <q-separator></q-separator>

      <q-card-section>
        <div class="text-body1">
          <span class="text-primary text-weight-medium"> Medicines: </span>
          <br />
          <q-list separator>
            <q-item
              v-for="medicine in eprescriptionMedicines"
              :key="medicine.medicine.id"
            >
              <q-item-section>
                <q-item-label class="text-subtitle-1 text-weight-bold">
                  {{ medicine.medicine.name }}, <span class="text-weight-regular">quantity: {{ medicine.quantity }}</span>
                </q-item-label>
                <q-item-label caption
                  >from {{ medicine.pharmacy.name }}</q-item-label
                >
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script>
import moment from "moment";

export default {
  props: {
    eprescriptionMedicines: {
      type: Array,
      required: true,
    },
    issueDate: {
      type: Number,
    },
    status: {
      type: String,
    },
  },
  methods: {
    dateFormat(date) {
      return moment(date).format("LL");
    },
    capitalize(s) {
      if (typeof s !== "string") return "";
      return s.charAt(0).toUpperCase() + s.slice(1);
    },
  },
};
</script>

<style scoped>
.my-card {
  width: 90%;
  max-width: 25rem;
  display: table;
}

.q-card__section--vert {
  padding: 8px !important;
}
</style>