<template>
    <div class="q-mt-lg q-pa-md q-ml-md row justify-around q-gutter-lg">
        <q-card class="my-card" style="width:450px">
            <q-card-section>
              <div class="row">
                <div class="col-10">
                  <q-icon name="playlist_add_check" class="text-primary" style="font-size: 32px;"/>
                </div>
                <div class="col-2">
                  <q-btn push color="primary" @click="edit = true"  icon="edit" />
                </div>
              </div>
            </q-card-section>
        <q-separator></q-separator>
            <q-card-section>
                <div class="q-pa-md row">
                    <div class="col-6 text-primary">
                        Purchase order status:
                    </div>
                    <div class="col-6">
                        {{ object.purchaseOrderStatus }}
                    </div>
                </div>
                <div class="q-pa-md row justify-center">
                    <q-table
                    style="width:400px"
                    :data="data"
                    :columns="columns"
                    row-key="name"
                    hide-bottom
                    dense
                    :pagination.sync="pagination"
                >
                     <template v-slot:body="props">
                        <q-tr :props="props">
                            <q-td key="name" :props="props">
                             {{ props.row.name }}

                            </q-td>
                            <q-td key="quantity" :props="props" >
                             {{ props.row.quantity }}
                            </q-td>
                        </q-tr>
                    </template>
                </q-table>
                </div>
                <div class="q-pa-md row">
                    <div class="col-6 text-primary">
                        Total price:
                    </div>
                    <div class="col-6">
                        {{ object.price }}  $
                    </div>
                </div>
                <div class="q-pa-md row">
                    <div class="col-6 text-primary">
                        Delivery date:
                    </div>
                    <div class="col-6">
                        {{ object.deliveryDate }}
                    </div>
                </div>
            </q-card-section>
        </q-card>
        <q-dialog v-model="edit">
          <q-card class="my-card">
                <q-card-section>
                    <div class="text-h4 text-bold text-primary text-center">Edit offer data</div>
                </q-card-section>
            <q-separator></q-separator>
            <q-card-actions class="q-pa-md" align="center">
                <div class="q-pa-md">
                    <q-form class="q-gutter-md" @submit="onSubmit">
                        <q-input
                            filled
                            label="Total price"
                            v-model="newPrice"
                            lazy-rules
                            style="width:500px"
                            :rules="[ val => val !== null && val !== '' || 'Input total price',
                                      val => val && val.length > 0 || 'Please input total price']"
                        />
                        <q-input
                            filled
                            label="Delivery date"
                            style="width:500px"
                            v-model="newDate"
                            :rules="['']">
                            <template v-slot:append>
                                <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                    <q-date v-model="newDate"  mask="DD-MM-YYYY">
                                    <div class="row items-center justify-end">
                                        <q-btn v-close-popup label="Close" color="primary" flat></q-btn>
                                    </div>
                                    </q-date>
                                </q-popup-proxy>
                                </q-icon>
                            </template>
                        </q-input>
                        <div class="q-mt-lg">
                            <q-btn unelevated type="submit" size="lg" color="primary" class="full-width text-white" label="Edit" />
                        </div>
                    </q-form>
                </div>
            </q-card-actions>
        </q-card>
        </q-dialog>
    </div>
</template>

<script>
import PurchaseOrderService from './../services/PurchaseOrderService'

export default {
  props: ['object'],
  data () {
    return {
      pagination: {
        rowsPerPage: 100 // current rows per page being displayed
      },
      edit: false,
      newPrice: '',
      newDate: '',
      supplierId: this.$store.getters.getId,
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Medicine name',
          align: 'left',
          field: 'name',
          sortable: true,
          classes: 'bg-grey-2 ellipsis',
          style: 'max-width: 100px',
          headerClasses: 'bg-primary text-h5 text-white'
        },
        { name: 'quantity', align: 'center', label: 'Quantity', field: 'quantity', sortable: true }

      ],
      data: []
    }
  },
  mounted () {
    this.object.medicines.forEach(element => {
      var d = {
        name: element.medicineName,
        quantity: element.orderQuantity
      }
      this.data.push(d)
    })
  },
  methods: {
    async onSubmit () {
      var data = {
        supplierId: this.$store.getters.getId,
        price: this.newPrice,
        deliveryDate: this.newDate,
        purchaseOrderId: this.object.purchaseOrderId,
        medicines: this.object.medicines
      }
      var success = await PurchaseOrderService.updateMyPurchaseOrder(data)

      if (success) {
        this.$q.notify({
          color: 'teal',
          timeout: 500,
          textColor: 'white',
          position: 'top',
          message: ' You have successfully update an offer!',
          type: 'positive'
        })
      } else {
        this.$q.notify({
          color: 'red',
          timeout: 500,
          textColor: 'white',
          position: 'top',
          message: ' You can not give your offer for this purchase order!',
          type: 'negative'
        })
      }
    }
  }
}
</script>
