<template>
    <div class="q-mt-lg q-pa-md q-ml-md row justify-around q-gutter-lg">
        <q-card class="my-card" style="width:450px">
            <q-card-section>
                <q-icon name="playlist_add_check" class="text-primary" style="font-size: 32px;"/>
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
    </div>
</template>

<script>
export default {
  props: ['object'],
  data () {
    return {
      pagination: {
        rowsPerPage: 100 // current rows per page being displayed
      },
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
        name: element.name,
        quantity: element.quantity
      }
      this.data.push(d)
    })
  }
}
</script>
