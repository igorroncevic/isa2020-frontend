<template>
    <div>
      <div class="q-pa-md q-mt-lg text-center text-primary text-bold text-h4">
        My medicines
      </div>
        <q-dialog v-model="addMedicine">
        <q-card class="my-card">
            <q-card-section>
            <div class="text-h4 text-bold text-primary text-center">Enter new medicine</div>
            </q-card-section>
            <q-separator></q-separator>
            <q-card-actions class="q-pa-md" align="center">
                <div class="q-pa-md">
                    <q-form class="q-gutter-md" @submit="onSubmit">
                        <q-input
                            filled
                            label="Medicine name *"
                            v-model="mName"
                            lazy-rules
                            style="width:500px"
                            :rules="[ val => val && val.length > 0 || 'Please input medicine name']"
                        />
                        <q-input
                            filled
                            label="Medicine quantity *"
                            v-model="mQuantity"
                            lazy-rules
                            style="width:500px"
                            :rules="[ val => val !== null && val !== '' || 'Input medicine quantity',
                                      val => val && val.length > 0 || 'Please input medicine quantity']"
                        />
                        <div class="q-mt-lg">
                            <q-btn unelevated  type="submit" size="lg" color="primary" class="full-width text-white" label="Add medicine" />
                        </div>
                    </q-form>
                </div>
            </q-card-actions>
        </q-card>
        </q-dialog>

    <div class="row justify-center q-mt-xl">
        <q-table
            :data="data"
            :columns="columns"
            row-key="name"
            style="width:700px"
        >
         <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="medicine" :props="props">
              {{ props.row.medicineName }}

            </q-td>
            <q-td key="quantity" :props="props">
              {{ props.row.quantity }}
            </q-td>
          </q-tr>
         </template>
        </q-table>
    </div>
    <div class="row justify-center q-mt-lg">
        <q-btn color="primary" label="Add new medicine" @click="addMedicine = true"></q-btn>
    </div>
    </div>
</template>

<style lang="sass" scoped>
table.q-table tbody td
  font-size: 18px !important
</style>

<script>
import MedicineService from './../services/MedicineService'

export default {
  async beforeMount () {
    this.data = await MedicineService.getAllSupplierMedicines(this.supplierId)
  },
  data () {
    return {
      supplierId: this.$store.getters.getId,
      addMedicine: false,
      mQuantity: '',
      mName: '',
      data: [],
      columns: [
        {
          name: 'medicine',
          required: true,
          label: 'Medicine name',
          align: 'left',
          field: 'medicineName',
          sortable: true,
          classes: 'bg-grey-2 ellipsis',
          style: 'max-width: 100px',
          headerClasses: 'bg-primary text-h5 text-white'
        },
        { name: 'quantity', align: 'center', label: 'Medicine quantity', field: 'quantity', sortable: true }
      ]
    }
  },
  methods: {
    async onSubmit () {
      const newMed = {
        supplierId: this.supplierId,
        medicineName: this.mName,
        quantity: this.mQuantity
      }
      const success = await MedicineService.addNewSupplierMedicine(newMed)
      if (success) {
        this.data = await MedicineService.getAllSupplierMedicines(this.supplierId)
        this.$q.notify({
          color: 'teal',
          timeout: 2500,
          textColor: 'white',
          position: 'top',
          message: 'You have successfully added new medicine!',
          type: 'positive'
        })
      } else {
        this.$q.notify({
          color: 'negative',
          textColor: 'white',
          timeout: 2500,
          icon: 'error',
          position: 'top',
          message: 'An error occured. Try to add medicine again!'
        })
      }
    }
  }
}

</script>
