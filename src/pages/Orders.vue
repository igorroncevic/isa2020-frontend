<template>
  <q-page padding>
    <div
      style="margin: 0 0 2rem 0"
      class="row-xs-12 row-sm-4 row-md-3 row-lg-3"
    >
      <div class="text-h4 q-mb-xl">
        Purchase orders
        <q-btn
          class="q-ml-xl"
          round
          color="red"
          icon="add"
          @click="addPurchaseOrderDialog = true"
        />
      </div>
    </div>

    <div class="row-xs-12 row-sm-4 row-md-3 row-lg-3">
      <div class="order-card">
        <div class="text-h6 no-vacations">
          {{ this.purchaseOrders.length == 0 ? "There are no purchase orders" : "" }}
        </div>
        <purchase-order-card
          v-for="purchaseOrder in purchaseOrders"
          :key="purchaseOrder.id"
          :purchaseOrder="purchaseOrder"
        />
      </div>
    </div>
    <q-dialog v-model="addPurchaseOrderDialog">
      <q-card class="q-pa-lg">
        <q-input
          class="q-ma-sm"
          v-model="newPromotion.startDate"
          filled
          type="date"
          hint="Start date"
        />
        <q-input
          class="q-ma-sm"
          v-model="newPromotion.endDate"
          filled
          type="date"
          hint="End date"
        />
        <q-input
          class="q-ma-sm"
          v-model="newPromotion.text"
          filled
          type="textarea"
          hint="Text"
        />
        <q-btn
          flat
          style="color: red"
          label="Add new promotion"
          @click="addNewPurchaseOrder()"
        />
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import PurchaseOrderCard from "./../components/PurchaseOrderCard";
import PhramacyService from "./../services/PharmacyService";
import { errorFetchingData } from "./../notifications/globalErrors";
import { successfulyAddedPromotion } from "./../notifications/promotions";
import { failedToAddPromotion } from "./../notifications/promotions";

export default {
  components: { PurchaseOrderCard },
  async beforeMount() {
    let response = await PhramacyService.getAllPharmacyPurchaseOrders();

    if (response) {
      if (response.status == 200) this.purchaseOrders = [...response.data];
    } else {
      errorFetchingData();
    }
  },
  data() {
    return {
      purchaseOrders: [],
      addPurchaseOrderDialog: false,
      newPromotion: {
        startDate: "",
        endDate: "",
        text: "",
      },
    };
  },
  methods: {
    async addNewPurchaseOrder() {
    //   let success = await PromotionService.addNewPromotion(
    //     "e93cab4a-f007-412c-b631-7a9a5ee2c6ed",
    //     this.newPromotion
    //   );
    //   if (success) {
    //     let response = await PromotionService.getAllPharmacyPromotions(
    //       "e93cab4a-f007-412c-b631-7a9a5ee2c6ed"
    //     );

    //     if (response) {
    //       if (response.status == 200) this.promotions = [...response.data];
    //     } else {
    //       errorFetchingData();
    //     }
    //     this.addPromotionDialog = false;
    //     successfulyAddedPromotion();
    //   } else {
    //     failedToAddPromotion();
    //   }
    },
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  width: 66%;
  flex-direction: row;
  justify-content: space-evenly;
}

.order-card {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: -2rem;
}
</style>