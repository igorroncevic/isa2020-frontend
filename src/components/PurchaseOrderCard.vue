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
          <span class="text-primary text-weight-medium"> Medicines: </span>
          <br />
          <q-virtual-scroll
            class="virtual-scroll"
            type="table"
            style="height: 16vh"
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
          <q-separator class="q-my-sm"></q-separator>
          <div
            v-if="
              purchaseOrder.numberOfOffers > 0 &&
              purchaseOrder.acceptedOffer == null
            "
          >
            <span class="text-primary text-weight-medium">
              Number of offers:
            </span>
            {{ purchaseOrder.numberOfOffers }} <br />
            <q-btn
              class="q-mt-sm"
              color="red"
              label="See offers"
              @click="$emit('show_offers', purchaseOrder)"
            />
          </div>

          <div v-if="purchaseOrder.numberOfOffers == 0">
            <span class="text-primary text-weight-medium">
              Number of offers:
            </span>
            {{ purchaseOrder.numberOfOffers }} <br />
            <q-btn class="q-ma-sm" color="primary" label="Update" @click="$emit('update_order', purchaseOrder)"/>
            <q-btn class="q-ma-sm" color="primary" label="Delete" @click="$emit('delete_order', purchaseOrder.id)"/>
          </div>
          <div v-if="purchaseOrder.acceptedOffer != null">
            <span class="text-red text-weight-medium"> Accepted offer </span>
            <br />
            <span class="text-red text-weight-small"> Supplier: </span>
            {{
              purchaseOrder.acceptedOffer.supplier.name +
              " " +
              purchaseOrder.acceptedOffer.supplier.surname
            }}
            <br />
            <span class="text-red text-weight-small"> Delivery date: </span>
            {{ dateFormat(purchaseOrder.acceptedOffer.deliveryDate) }} <br />
            <span class="text-red text-weight-small"> Price: </span>
            {{ purchaseOrder.acceptedOffer.price }} <br />
          </div>
        </div>
      </q-card-section>
    </q-card-section>
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
      return moment(date).format("MMMM Do YYYY");
    },
  },
};
</script>

<style scoped>
#purchase-order-card {
  width: 90%;
  max-width: 21rem;
  height: 25rem !important;
  max-height: 25rem !important;
}

.q-card__section--vert {
  padding: 8px !important;
}
</style>
