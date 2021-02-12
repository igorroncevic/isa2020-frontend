<template>
     <q-card class="my-card">
        <q-card-section>
            <div class="text-h4 text-bold text-primary text-center">Enter pharmacy admin data</div>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-actions class="q-pa-md" align="center">
            <div class="q-pa-md">
                    <q-form class="q-gutter-md" @submit="onSubmit">
                            <q-input
                                filled
                                style="width:500px"
                                label="Name *"
                                v-model="aName"
                                lazy-rules
                                :rules="[ val => val && val.length > 0 || 'Please input your name']"
                            />

                            <q-input
                                filled
                                style="width:500px"
                                label="Surname *"
                                v-model="aSurname"
                                lazy-rules
                                :rules="[ val => val && val.length > 0 || 'Please input surname']"
                            />

                            <q-input
                                filled
                                style="width:500px"
                                label="Address *"
                                v-model="aAddress"
                                lazy-rules
                                :rules="[ val => val && val.length > 0 || 'Please input address']"
                            />

                            <q-input
                                filled
                                style="width:500px"
                                label="City *"
                                v-model="aCity"
                                lazy-rules
                                :rules="[ val => val && val.length > 0 || 'Please input name of city']"
                            />

                            <q-input
                                filled
                                style="width:500px"
                                label="Country *"
                                v-model="aCountry"
                                lazy-rules
                                :rules="[ val => val && val.length > 0 || 'Please input name of country']"
                            />

                            <q-input
                                filled
                                style="width:500px"
                                type="number"
                                label="Phone number *"
                                v-model="aPhoneNum"
                                lazy-rules
                                :rules="[ val => val !== null && val !== '' || 'Input phone number',
                                         val => val && val.length > 0 || 'Please input phone number'
                                ]"
                            />

                            <q-input
                                filled
                                style="width:500px"
                                label="Email *"
                                v-model="aEmail"
                                lazy-rules
                                :rules="[ val => val && val.length > 0 || 'Please input email address']"
                            />

                            <q-input
                              filled
                              style="width:500px"
                              v-model="pass"
                              :type="isPass ? 'pass' : 'password'"
                              label="Password *"
                              lazy-rules
                              :rules="[ val => val && val.length > 0 || 'Please input password']"
                              >
                              <template v-slot:append>
                                <q-icon
                                  :name="isPass ? 'visibility' : 'visibility_off'"
                                  class="cursor-pointer"
                                  @click="isPass = !isPass"
                                ></q-icon>
                              </template>
                            </q-input>
                         <q-select
                            filled
                            v-model="pharmacyName"
                            :options="pharms"
                            label="Pharmacy *"
                            lazy-rules
                              :rules="[ val => val && val !== null || 'Please choose pharmacy']"
                            />
                        <div class="q-mt-lg">
                            <q-btn unelevated type="submit" size="lg" color="primary" class="full-width text-white" label="Register pharmacy admin" />
                        </div>
                </q-form>
            </div>
        </q-card-actions>
        </q-card>
</template>

<script>
import AuthService from './../services/AuthService'
import PharmacyService from './../services/PharmacyService'
import {
  successfullyRegisteredAdmin,
  registrationError
} from './../notifications/sysAdmin'

export default {
  async beforeMount () {
    this.pharms = await PharmacyService.getAllPharmacies()
  },
  data () {
    return {
      aName: '',
      aSurname: '',
      aAddress: '',
      aCountry: '',
      aCity: '',
      aPhoneNum: '',
      aEmail: '',
      pass: '',
      pharmacyName: '',
      isPass: false,
      pharms: []
    }
  },
  methods: {
    async onSubmit () {
      const adminData = {
        name: this.aName,
        surname: this.aSurname,
        phoneNumber: this.aPhoneNum,
        email: this.aEmail,
        password: this.pass,
        country: this.aCountry,
        city: this.aCity,
        street: this.aAddress,
        pharmacyName: this.pharmacyName
      }
      const response = await AuthService.registerNewPhAdmin(adminData)

      if (response.status == 201) {
        successfullyRegisteredAdmin()
      } else {
        registrationError()
      }
    }
  }
}
</script>
