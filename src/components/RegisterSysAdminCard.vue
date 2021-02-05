<template>
     <q-card class="my-card">
        <q-card-section>
            <div class="text-h4 text-bold text-primary text-center">Enter system administrator data</div>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-actions class="q-pa-md" align="center">
            <div class="q-pa-md">
                    <q-form class="q-gutter-md" @submit="onSubmit">
                            <q-input
                                filled
                                style="width:500px"
                                label="Name *"
                                lazy-rules
                                v-model="name"
                                :rules="[ val => val && val.length > 0 || 'Please input your name']"
                            />

                            <q-input
                                filled
                                style="width:500px"
                                label="Surname *"
                                lazy-rules
                                v-model="surname"
                                :rules="[ val => val && val.length > 0 || 'Please input surname']"
                            />

                            <q-input
                                filled
                                style="width:500px"
                                label="Address *"
                                lazy-rules
                                v-model="address"
                                :rules="[ val => val && val.length > 0 || 'Please input address']"
                            />

                            <q-input
                                filled
                                style="width:500px"
                                label="City *"
                                lazy-rules
                                v-model="city"
                                :rules="[ val => val && val.length > 0 || 'Please input name of city']"
                            />

                            <q-input
                                filled
                                style="width:500px"
                                label="Country *"
                                lazy-rules
                                v-model="country"
                                :rules="[ val => val && val.length > 0 || 'Please input name of country']"
                            />

                            <q-input
                                filled
                                style="width:500px"
                                type="number"
                                label="Phone number *"
                                lazy-rules
                                v-model="phoneNum"
                                :rules="[ val => val !== null && val !== '' || 'Input phone number',
                                         val => val && val.length > 0 || 'Please input phone number'
                                ]"
                            />

                            <q-input
                                filled
                                style="width:500px"
                                label="Email *"
                                lazy-rules
                                v-model="email"
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
                            <q-btn unelevated type="submit" size="lg" color="primary" class="full-width text-white" label="Register system admin" />
                        </div>
                </q-form>
            </div>
        </q-card-actions>
        </q-card>
</template>

<script>
import SysAdminService from './../services/SysAdminService'
import {
  successfullyRegisteredDerm,
  registrationError
} from './../notifications/sysAdmin'

export default {
  data () {
    return {
      name: '',
      surname: '',
      address: '',
      city: '',
      country: '',
      phoneNum: '',
      email: '',
      pass: '',
      isPass: false
    }
  },
  methods: {
    async onSubmit () {
      const sysAdminData = {
        name: this.name,
        surname: this.surname,
        phoneNumber: this.phoneNum,
        email: this.email,
        password: this.pass,
        country: this.country,
        city: this.city,
        street: this.address
      }
      const success = await SysAdminService.registerNewSysAdmin(sysAdminData)

      if (success) {
        successfullyRegisteredDerm()
      } else {
        registrationError()
      }
    }
  }
}
</script>
