<template>
     <q-card class="my-card">
        <q-card-section>
            <div class="text-h4 text-bold text-primary text-center">Enter dermatologist data</div>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-actions class="q-pa-md" align="center">
            <div class="q-pa-md">
                    <q-form class="q-gutter-md" @submit="onSubmit">
                            <q-input
                                filled
                                style="width:500px"
                                label="Name *"
                                v-model="dName"
                                lazy-rules
                                :rules="[ val => val && val.length > 0 || 'Please input your name']"
                            />

                            <q-input
                                filled
                                style="width:500px"
                                label="Surname *"
                                v-model="dSurname"
                                lazy-rules
                                :rules="[ val => val && val.length > 0 || 'Please input surname']"
                            />

                            <q-input
                                filled
                                style="width:500px"
                                label="Address *"
                                v-model="dAddress"
                                lazy-rules
                                :rules="[ val => val && val.length > 0 || 'Please input address']"
                            />

                            <q-input
                                filled
                                style="width:500px"
                                label="City *"
                                v-model="dCity"
                                lazy-rules
                                :rules="[ val => val && val.length > 0 || 'Please input name of city']"
                            />

                            <q-input
                                filled
                                style="width:500px"
                                label="Country *"
                                v-model="dCountry"
                                lazy-rules
                                :rules="[ val => val && val.length > 0 || 'Please input name of country']"
                            />

                            <q-input
                                filled
                                style="width:500px"
                                type="number"
                                label="Phone number *"
                                v-model="dPhoneNum"
                                lazy-rules
                                :rules="[ val => val !== null && val !== '' || 'Input phone number',
                                         val => val && val.length > 0 || 'Please input phone number'
                                ]"
                            />

                            <q-input
                                filled
                                style="width:500px"
                                label="Email *"
                                v-model="dEmail"
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
                        <div class="q-mt-lg">
                            <q-btn unelevated type="submit" size="lg" color="primary" class="full-width text-white" label="Register dermatologist" />
                        </div>
                </q-form>
            </div>
        </q-card-actions>
        </q-card>
</template>

<script>
import DoctorService from './../services/DoctorService'
import {
  successfullyRegisteredDerm,
  registrationError
} from './../notifications/sysAdmin'

export default {
  data () {
    return {
      dName: '',
      dSurname: '',
      dAddress: '',
      dCity: '',
      dCountry: '',
      dPhoneNum: '',
      dEmail: '',
      pass: '',
      isPass: false
    }
  },
  methods: {
    async onSubmit () {
      const dermData = {
        name: this.dName,
        surname: this.dSurname,
        phoneNumber: this.dPhoneNum,
        email: this.dEmail,
        password: this.pass,
        country: this.dCountry,
        city: this.dCity,
        street: this.dAddress
      }
      const success = await DoctorService.registerNewDermatologist(dermData)

      if (success) {
        successfullyRegisteredDerm()
      } else {
        registrationError()
      }
    }
  }
}
</script>
