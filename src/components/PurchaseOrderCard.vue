<template>
  <q-card id="purchase-order-card" bordered class="q-ma-sm">
    <q-card-section vertical>
      <q-card-section>
        <div class="text-body1">
          <span class="text-primary text-weight-medium"> Created by: </span>
          {{
            purchaseOrder.pharmacyAdmin.name +
            " " +
            purchaseOrder.pharmacyAdmin.surname
          }}
          <br />
          <span class="text-primary text-weight-medium"> End time: </span>
          {{ dateFormat(purchaseOrder.endDate) }} <br />
          <q-separator class="q-my-sm"></q-separator>
          <q-btn
            flat
            style="color: red"
            label="See offers"
            @click="$emit('show_offers', purchaseOrder)"
          />
          <q-separator class="q-my-sm"></q-separator>
          <span class="text-primary text-weight-medium"> Medicines: </span>
          <br />
        </div>
      </q-card-section>
    </q-card-section>
    <q-virtual-scroll
      class="q-ma-sm"
      type="table"
      style="max-height: 16vh"
      :virtual-scroll-item-size="48"
      :virtual-scroll-sticky-size-start="48"
      :virtual-scroll-sticky-size-end="32"
      :items="purchaseOrder.medicines"
    >
      <template v-slot="{ item: row, index }">
        <tr :key="row.medicineId">
          <td>#{{ index + 1 }}</td>
          <td v-for="col in columns" :key="index + '-' + col">
            {{ row[col] }}
          </td>
        </tr>
      </template>
    </q-virtual-scroll>
  </q-card>
</template>

<script>
import moment from "moment";

export default {
  props: ["purchaseOrder"],
  data() {
    return {
      columns: ["medicineName", "orderQuantity"],
    };
  },
  methods: {
    dateFormat(date) {
      return moment(date).format("MMMM Do YYYY, hh:mm");
    },
  },
};
</script>

<style scoped>
#purchase-order-card {
  width: 90%;
  max-width: 21rem;
  height: 22rem !important;
  max-height: 22rem !important;
}

.q-card__section--vert {
  padding: 8px !important;
}
</style>
