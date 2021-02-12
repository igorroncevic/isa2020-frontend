<template>
    <div>
    <div class="row">
      <div class="col-10 text-h4 text-bold text-primary q-ml-xl q-pa-md q-mt-lg" align=center>
         My purchase offers
      </div>
      <div class="col-2 justify-start q-ml-xl">
        <div class="text-primary text-subtitle1">Filter by purchase order status</div>
          <template>
            <q-option-group
            :options="options"
            type="radio"
            v-model="group"
          />
          </template>
      </div>
    </div>
    <div class="q-pa-md q-ml-md row justify-around q-gutter-lg">
        <purchase-order-card :object="po" v-for="po in filteredList" :key="po.id"></purchase-order-card>
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
      supplierId: this.$store.getters.getId,
      group: 'accepted',
      options: [
        { label: 'Resolved', value: 'accepted' },
        { label: 'Pending', value: 'waiting_for_response' }]
    }
  },
  async beforeMount () {
    this.data = await PurchaseOrderService.getMyPurchaseOrders(this.supplierId)
  },
  computed: {
    filteredList () {
      return this.data.filter(el => {
        if (el.purchaseOrderStatus === this.group) {
          return el
        }
      })
    }
  }
}
</script>
