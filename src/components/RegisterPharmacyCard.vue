<template>
        <q-card class="my-card">
            <q-card-section>
            <div class="text-h4 text-bold text-primary text-center">Enter pharmacy data</div>
            </q-card-section>
            <q-separator></q-separator>
            <q-card-actions class="q-pa-md" align="center">
                <div class="q-pa-md">
                    <q-form class="q-gutter-md" @submit="onSubmit">
                        <q-input
                            filled
                            label="Pharmacy name *"
                            v-model="pName"
                            lazy-rules
                            style="width:500px"
                            :rules="[ val => val && val.length > 0 || 'Please input pharmacy name']"
                        />
                        <q-input
                            filled
                            label="Pharmacy address *"
                            v-model="pAddress"
                            lazy-rules
                            style="width:500px"
                            :rules="[ val => val && val.length > 0 || 'Please input pharmacy address']"
                        />
                        <q-input
                            filled
                            label="Pharmacy city *"
                            v-model="pCity"
                            lazy-rules
                            style="width:500px"
                            :rules="[ val => val && val.length > 0 || 'Please input pharmacy city']"
                        />
                        <q-input
                            filled
                            label="Pharmacy country *"
                            v-model="pCountry"
                            lazy-rules
                            style="width:500px"
                            :rules="[ val => val && val.length > 0 || 'Please input pharmacy country']"
                        />
                        <div class="q-mt-lg">
                            <q-btn unelevated type="submit" size="lg" color="primary" class="full-width text-white" label="Register pharmacy" />
                        </div>
                    </q-form>
                </div>
            </q-card-actions>
        </q-card>
</template>

<script>
import PharmacyService from './../services/PharmacyService'
import {
  successfullyRegistered,
  registrationError
} from './../notifications/sysAdmin'

export default {
  data () {
    return {
      pName: '',
      pAddress: '',
      pCity: '',
      pCountry: ''
    }
  },
  methods: {
    async onSubmit () {
      const pharmacyData = {
        name: this.pName,
        country: this.pCountry,
        city: this.pCity,
        street: this.pAddress
      }
      const success = await PharmacyService.registerNewPharmacy(pharmacyData)

      if (success) {
        successfullyRegistered()
      } else {
        registrationError()
      }
    }
  }
}
</script>
