<template>
    <div>
      <div class="row justify-center text-h4 text-bold text-primary q-pa-md q-mt-lg">
        Available purchase orders
      </div>
      <div class="q-pa-md q-ml-md row justify-around q-gutter-lg">
        <all-purchase-orders-card :object="po" v-for="po in data" :key="po.id"></all-purchase-orders-card>
      </div>
    </div>
</template>

<script>
import AllPurchaseOrdersCard from './../components/AllPurchaseOrdersCard'
import PurchaseOrderService from './../services/PurchaseOrderService'

export default {
  components: { AllPurchaseOrdersCard },
  data: function () {
    return {
      data: []
    }
  },
  async beforeMount () {
    this.data = await PurchaseOrderService.getAllPurchaseOrders()
  }
}
</script>
