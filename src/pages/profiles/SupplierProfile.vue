<template>
<div class="q-ml-xl" >
  <div class="row q-ml-md justify-start">
     <h4 class="text-bold text-primary">Profile data</h4>
  </div>
  <q-form
      @submit="onSubmit"
      class="q-gutter-md"
    ><q-input
                            filled
                            label="Name"
                            class="q-pa-md"
                            v-model="supplier.name"
                            :disable="!edit"
                            style="width:450px"
                            />
       <q-input
                            filled
                            label="Surname"
                            class="q-pa-md"
                            v-model="supplier.surname"
                            :disable="!edit"
                            style="width:450px"
                            />
    <q-input
                            filled
                            type="number"
                            class="q-pa-md"
                            style="width:450px"
                            label="Phone number"
                            v-model="supplier.phoneNumber"
                            :disable="!edit"
                            />
                            <q-input
                                filled
                                style="width:450px"
                                label="Address"
                                class="q-pa-md"
                                v-model="supplier.street"
                                :disable="!edit"
                            />

                            <q-input
                                filled
                                style="width:450px"
                                label="City"
                                class="q-pa-md"
                                :disable="!edit"
                                v-model="supplier.city"
                            />
                            <q-input
                                filled
                                style="width:450px"
                                label="Country"
                                class="q-pa-md"
                                :disable="!edit"
                                v-model="supplier.country"
                            />

    <div class="q-ml-md">
                            <q-btn label="Save"  v-bind:disable="!edit" icon="save" type="submit" color="primary"/>
                            <q-btn outline label="Edit" @click="edit=true" icon="edit"  color="primary" class="q-ml-sm" />
                        </div>
  </q-form>
</div>
</template>

<script>
import SupplierService from './../../services/SupplierService'

export default {
  data () {
    return {
      supplierId: this.$store.getters.getId,
      supplier: {},
      edit: false
    }
  },
  async mounted () {
    this.supplier = await SupplierService.getMyData(this.supplierId)
  },
  methods: {
    async onSubmit () {
      const data = {
        id: this.supplierId,
        name: this.supplier.name,
        surname: this.supplier.surname,
        phoneNumber: this.supplier.phoneNumber,
        country: this.supplier.country,
        city: this.supplier.city,
        street: this.supplier.street
      }
      var res = await SupplierService.updateUserData(data)
      if (res === 'err') {
        this.$q.notify({
          color: 'red-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Error'
        })
      } else {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Submitted'
        })
      }
      this.edit = false
    }
  }
}
</script>
