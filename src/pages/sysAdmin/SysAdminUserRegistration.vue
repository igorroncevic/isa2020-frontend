<template>
    <div class="q-mt-lg q-pa-md q-ml-md row justify-around q-gutter-lg">
        <q-card class="my-card" style="width:300px">
            <q-img src="./../../assets/pictures/pharmacy.jpg"
            height="220px"
            width="300px"
            />

            <q-card-actions align="center">
                <q-btn @click="phCard = true" outline color="primary" icon-right="add" label="Register new pharmacy" />
            </q-card-actions>
        </q-card>
        <q-card class="my-card" style="width:300px">
            <q-img src="./../../assets/pictures/add-admin.png"
            height="220px"
            width="300px"
            />

            <q-card-actions align="center">
                <q-btn @click="phAdminCard = true" outline color="primary" icon-right="add" label="Register new pharmacy admin" />
            </q-card-actions>
        </q-card>
        <q-card class="my-card" style="width:300px">
            <q-img src="./../../assets/pictures/dermatologist.jpg"
            height="220px"
            width="300px"
            />

            <q-card-actions align="center">
                <q-btn @click="dermCard = true" outline color="primary" icon-right="add" label="Register new dermatologist" />
            </q-card-actions>
        </q-card>
        <q-card class="my-card" style="width:300px">
            <q-img src="./../../assets/pictures/sysadmin.jpg"
            height="220px"
            width="300px"
            />

            <q-card-actions align="center">
                <q-btn @click="sysAdminCard = true" outline color="primary" icon-right="add" label="Register new system admin" />
            </q-card-actions>
        </q-card>
        <q-card class="my-card" style="width:300px">
            <q-img src="./../../assets/pictures/supplier.jpg"
            height="220px"
            width="300px"
            />

            <q-card-actions align="center">
                <q-btn @click="supplierCard = true" outline color="primary" icon-right="add" label="Register new supplier" />
            </q-card-actions>
        </q-card>

        <q-dialog v-model="phCard">
            <pharmacy-card></pharmacy-card>
        </q-dialog>

        <q-dialog v-model="sysAdminCard">
            <register-sys-admin-card></register-sys-admin-card>
        </q-dialog>

        <q-dialog v-model="phAdminCard">
            <register-pharmacy-admin-card></register-pharmacy-admin-card>
        </q-dialog>

        <q-dialog v-model="supplierCard">
            <register-supplier-card></register-supplier-card>
        </q-dialog>

        <q-dialog v-model="dermCard">
            <register-dermatologist-card></register-dermatologist-card>
        </q-dialog>
    </div>
</template>

<script>

import PharmacyCard from './../../components/RegisterPharmacyCard'
import RegisterSysAdminCard from './../../components/RegisterSysAdminCard'
import RegisterPharmacyAdminCard from './../../components/RegisterPharmacyAdminCard'
import RegisterSupplierCard from './../../components/RegisterSupplierCard'
import RegisterDermatologistCard from './../../components/RegisterDermatologistCard'

export default {
  components: {
    PharmacyCard,
    RegisterSysAdminCard,
    RegisterSupplierCard,
    RegisterDermatologistCard,
    RegisterPharmacyAdminCard
  },
  data () {
    return {
      phCard: false,
      phAdminCard: false,
      sysAdminCard: false,
      supplierCard: false,
      dermCard: false,
      name: '',
      address: '',
      city: '',
      country: ''
    }
  }
}
</script>
