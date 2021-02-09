<template>
  <q-page padding>
    <div
      style="margin: 0 0 2rem 0"
      class="row-xs-12 row-sm-4 row-md-3 row-lg-3"
    >
      <div class="text-h4 q-mb-xl">
        Promotions
        <q-btn
          class="q-ml-xl"
          round
          color="red"
          icon="add"
          @click="addPromotionDialog = true"
        />
      </div>
    </div>

    <div class="row-xs-12 row-sm-4 row-md-3 row-lg-3">
      <div class="vacation-card">
        <div class="text-h6 no-vacations">
          {{ promotions.length == 0 ? "There are no promotions" : "" }}
        </div>
        <pharmacy-promotion-card
          v-for="promotion in promotions"
          :key="promotion.id"
          :promotion="promotion"
        />
      </div>
    </div>
    <q-dialog v-model="addPromotionDialog">
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
          @click="addNewPromotion()"
        />
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import PharmacyPromotionCard from "./../components/PharmacyPromotionCard";
import PromotionService from "./../services/PromotionService";
import { errorFetchingData } from "./../notifications/globalErrors";
import { successfulyAddedPromotion } from "./../notifications/promotions";
import { failedToAddPromotion } from "./../notifications/promotions";

export default {
  components: { PharmacyPromotionCard },
  async beforeMount() {
    let response = await PromotionService.getAllPharmacyPromotions(
      "e93cab4a-f007-412c-b631-7a9a5ee2c6ed"
    );

    if (response) {
      if (response.status == 200) this.promotions = [...response.data];
    } else {
      errorFetchingData();
    }
  },
  data() {
    return {
      promotions: [],
      addPromotionDialog: false,
      newPromotion: {
        startDate: "",
        endDate: "",
        text: "",
      },
    };
  },
  methods: {
    async addNewPromotion() {
      let success = await PromotionService.addNewPromotion(
        "e93cab4a-f007-412c-b631-7a9a5ee2c6ed",
        this.newPromotion
      );
      if (success) {
        let response = await PromotionService.getAllPharmacyPromotions(
          "e93cab4a-f007-412c-b631-7a9a5ee2c6ed"
        );

        if (response) {
          if (response.status == 200) this.promotions = [...response.data];
        } else {
          errorFetchingData();
        }
        this.addPromotionDialog = false;
        successfulyAddedPromotion();
      } else {
        failedToAddPromotion();
      }
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

.vacation-card {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: -2rem;
}
</style>