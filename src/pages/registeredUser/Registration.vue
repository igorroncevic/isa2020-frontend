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
            <div class="q-pa-md row items-center q-gutter-md">
                <q-card class="my-card">
                    <q-card-section>
                       <h4 class="text-primary text-center text-bold">Log in</h4>
                    </q-card-section>
                    <q-separator></q-separator>
                    <q-card-section>
                    <div class="q-pa-md">
                        <q-form class="q-gutter-md" @submit="onSubmitLogin" style="width:600px">
                            <q-input
                                filled
                                label="Email *"
                                hint="Input your email address"
                                v-model="emailLogin"
                                lazy-rules
                                style="width:580px"
                                :rules="[ val => val && val.length > 0 || 'Please input your email address']"
                            />

                            <q-input
                              v-model="passLogin"
                              filled
                              :type="isPass ? 'passLogin' : 'password'"
                              style="width:580px"
                              label="Password *"
                              hint="Input your password"
                              lazy-rules
                              :rules="[ val => val && val.length > 0 || 'Please input your password']"
                              >
                              <template v-slot:append>
                                <q-icon
                                  :name="isPass ? 'visibility' : 'visibility_off'"
                                  class="cursor-pointer"
                                  @click="isPass = !isPass"
                                ></q-icon>
                              </template>
                            </q-input>

                            <div>
                                <q-btn label="Log in" type="submit" color="primary"/>
                            </div>
                        </q-form>
                    </div>
                </q-card-section>
                </q-card>
            </div>
          </q-tab-panel>

          <q-tab-panel name="register">
            <div class="q-pa-md q-gutter-md col justify-end">
                <q-card class="my-card">
                    <q-card-section>
                       <h4 class="text-primary text-center text-bold">Register</h4>
                    </q-card-section>
                    <q-separator></q-separator>
                    <q-card-section>
                         <div class="q-pa-md">
                            <q-form class="q-gutter-md" @submit="onSubmit"  style="width:600px">
                            <q-input
                                filled
                                label="Name *"
                                hint="Input your name"
                                v-model="pName"
                                style="width:580px"
                                lazy-rules
                                :rules="[ val => val && val.length > 0 || 'Please input your name']"
                            />

                            <q-input
                                filled
                                label="Surname *"
                                hint="Input your surname"
                                v-model="pSurname"
                                style="width:580px"
                                lazy-rules
                                :rules="[ val => val && val.length > 0 || 'Please input your surname']"
                            />

                            <q-input
                                filled
                                label="Address *"
                                hint="Input your address"
                                v-model="pAddress"
                                style="width:580px"
                                lazy-rules
                                :rules="[ val => val && val.length > 0 || 'Please input your address']"
                            />

                            <q-input
                                filled
                                label="City *"
                                hint="Input name of your city"
                                style="width:580px"
                                v-model="pCity"
                                lazy-rules
                                :rules="[ val => val && val.length > 0 || 'Please input name of your city']"
                            />

                            <q-input
                                filled
                                label="Country *"
                                hint="Input name of your country"
                                style="width:580px"
                                v-model="pState"
                                lazy-rules
                                :rules="[ val => val && val.length > 0 || 'Please input name of your country']"
                            />

                            <q-input
                                filled
                                type="number"
                                label="Phone number *"
                                hint="Input your phone number"
                                style="width:580px"
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
                                style="width:580px"
                                v-model="pEmail"
                                lazy-rules
                                :rules="[ val => val && val.length > 0 || 'Please input your email address']"
                            />

                            <q-input
                              v-model="pPass1"
                              filled
                              :type="isPass1 ? 'pPass1' : 'password'"
                              style="width:580px"
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
                              style="width:580px"
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

                            <div>
                                <q-btn label="Register" type="submit" color="primary"/>
                            </div>
                            </q-form>
                         </div>
                    </q-card-section>
                </q-card>
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
