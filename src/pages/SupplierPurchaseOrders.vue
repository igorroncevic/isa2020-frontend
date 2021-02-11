<template>
    <div>
    <div class="row justify-center text-h4 text-bold text-primary q-pa-md q-mt-lg">
      My purchase offers
    </div>
    <div class="q-pa-md q-ml-md row justify-around q-gutter-lg">
        <purchase-order-card :object="po" v-for="po in data" :key="po.id"></purchase-order-card>
    </div>
    </div>
</template>

<script>
import PurchaseOrderCard from './../components/MyPurchaseOrdersCard'
import PurchaseOrderService from './../services/PurchaseOrderService'

export default {
  components: { PurchaseOrderCard },
  data: function () {
    return {
      data: [],
      supplierId: this.$store.getters.getId
    }
  },
  async beforeMount () {
    this.data = await PurchaseOrderService.getMyPurchaseOrders(this.supplierId)
  }
}
</script>
