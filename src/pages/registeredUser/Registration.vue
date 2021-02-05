<template>
<div class="q-pa-xl row justify-center">
    <div class="q-gutter-y-md" style="max-width: 700px">
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="login" label="Log in" />
          <q-tab name="register" label="Sign up" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="login">
            <div class="column q-pa-lg">
              <div class="row">
                <q-card square class="shadow-24" style="width:625px;height:350px;">
                  <q-card-section>
                    <q-form class="q-px-md q-pt-xl q-gutter-md"  @submit="onSubmitLogin">
                      <q-input
                        filled
                        label="Email *"
                        hint="Input your email address"
                        v-model="emailLogin"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Please input your email address']"
                      >
                      <template v-slot:prepend>
                          <q-icon name="email" />
                        </template>
                      </q-input>

                      <q-input
                        v-model="passLogin"
                        filled
                        :type="isPass ? 'passLogin' : 'password'"
                        label="Password *"
                        hint="Input your password"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Please input your password']"
                      >
                      <template v-slot:prepend>
                          <q-icon name="lock" />
                        </template>
                      <template v-slot:append>
                        <q-icon
                          :name="isPass ? 'visibility' : 'visibility_off'"
                          class="cursor-pointer"
                          @click="isPass = !isPass"
                          ></q-icon>
                        </template>
                    </q-input>
                    <div class="q-mt-lg">
                    <q-btn unelevated type="submit" size="lg" color="primary" class="full-width text-white" label="Log in" />
                    </div>
                  </q-form>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </q-tab-panel>

          <q-tab-panel name="register">
            <div class="column q-pa-lg">
              <div class="row">
                <q-card square class="shadow-24" style="width:625px;height:1000px;">
                  <q-card-section>
                            <q-form class="q-px-md q-pt-xl q-gutter-md" @submit="onSubmit">
                            <q-input
                                filled
                                label="Name *"
                                hint="Input your name"
                                v-model="pName"
                                lazy-rules
                                :rules="[ val => val && val.length > 0 || 'Please input your name']"
                            />

                            <q-input
                                filled
                                label="Surname *"
                                hint="Input your surname"
                                v-model="pSurname"
                                lazy-rules
                                :rules="[ val => val && val.length > 0 || 'Please input your surname']"
                            />

                            <q-input
                                filled
                                label="Address *"
                                hint="Input your address"
                                v-model="pAddress"
                                lazy-rules
                                :rules="[ val => val && val.length > 0 || 'Please input your address']"
                            />

                            <q-input
                                filled
                                label="City *"
                                hint="Input name of your city"
                                v-model="pCity"
                                lazy-rules
                                :rules="[ val => val && val.length > 0 || 'Please input name of your city']"
                            />

                            <q-input
                                filled
                                label="Country *"
                                hint="Input name of your country"
                                v-model="pState"
                                lazy-rules
                                :rules="[ val => val && val.length > 0 || 'Please input name of your country']"
                            />

                            <q-input
                                filled
                                type="number"
                                label="Phone number *"
                                hint="Input your phone number"
                                v-model="pPhoneNum"
                                lazy-rules
                                :rules="[ val => val !== null && val !== '' || 'Input your phone number',
                                         val => val && val.length > 0 || 'Please input your phone number'
                                ]"
                            />

                            <q-input
                                filled
                                label="Email *"
                                hint="Input your email address"
                                v-model="pEmail"
                                lazy-rules
                                :rules="[ val => val && val.length > 0 || 'Please input your email address']"
                            />

                            <q-input
                              v-model="pPass1"
                              filled
                              :type="isPass1 ? 'pPass1' : 'password'"
                              label="Password *"
                              hint="Input your password"
                              lazy-rules
                              :rules="[ val => val && val.length > 0 || 'Please input your password']"
                              >
                              <template v-slot:append>
                                <q-icon
                                  :name="isPass1 ? 'visibility' : 'visibility_off'"
                                  class="cursor-pointer"
                                  @click="isPass1 = !isPass1"
                                ></q-icon>
                              </template>
                            </q-input>

                            <q-input
                              v-model="pPass2"
                              filled
                              :type="isPass2 ? 'pPass2' : 'password'"
                              label="Password *"
                              hint="Confirm your password"
                              lazy-rules
                              v-bind:rules="[ val => val && val.length > 0 || 'Please confirm your password',
                                              val => val && val == pPass1 || 'Passwords do not match!']"
                              >
                              <template v-slot:append>
                                <q-icon
                                  :name="isPass2 ? 'visibility' : 'visibility_off'"
                                  class="cursor-pointer"
                                  @click="isPass2 = !isPass2"
                                ></q-icon>
                              </template>
                            </q-input>
                           <div class="q-mt-lg">
                            <q-btn unelevated type="submit" size="lg" color="primary" class="full-width text-white" label="Sign up" />
                            </div>
                            </q-form>
                    </q-card-section>
                </q-card>
            </div>
            </div>
          </q-tab-panel>

        </q-tab-panels>
      </q-card>
    </div>
</div>
</template>

<script>
import PatientService from './../../services/PatientService'
import {
  successfullyRegistered,
  registrationError,
  successfullyLoggedIn,
  logInError
} from './../../notifications/patients'

export default {
  data () {
    return {
      tab: 'login',
      isPass: false,
      isPass1: false,
      isPass2: false,
      emailLogin: '',
      passLogin: '',
      pName: '',
      pSurname: '',
      pAddress: '',
      pCity: '',
      pState: '',
      pPhoneNum: '',
      pEmail: '',
      pPass1: '',
      pPass2: ''
    }
  },
  methods: {
    async onSubmitLogin () {
      const logInData = {
        email: this.emailLogin,
        password: this.passLogin
      }
      const success = await PatientService.login(logInData)
      if (success) {
        successfullyLoggedIn()
      } else {
        logInError()
      }
    },
    async onSubmit () {
      const patientData = {
        name: this.pName,
        surname: this.pSurname,
        email: this.pEmail,
        password: this.pPass1,
        phoneNumber: this.pPhoneNum,
        country: this.pState,
        city: this.pCity,
        street: this.pAddress
      }
      const success = await PatientService.registerNewPatient(patientData)

      if (success) {
        successfullyRegistered()
      } else {
        registrationError()
      }
    }
  }
}
</script>
