<template>
  <div class="q-pa-xl q-mt-xl row justify-center">
    <q-dialog v-model="changePassDialog">
      <q-card style="height:300px">
        <q-card-section class="row items-center q-pb-none bg-primary text-white">
          <div class="text-h6">First login,please change your pass then login again:</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section class="row items-center justify-center q-pb-none">
         <q-form
      @submit="changePass"
      class="q-gutter-md"
    >
       <q-input
                        v-model="changePass1"
                        filled
                        :type="isPass1 ? 'changePass1' : 'password'"
                        label="Password *"
                        hint="Input your password"
                        lazy-rules
                        :rules="[
                          (val) =>
                            (val && val.length > 0) ||
                            'Please input your password',
                        ]"
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
                        v-model="changePass2"
                        filled
                        :type="isPass2 ? 'changePass2' : 'password'"
                        label="Password *"
                        hint="Confirm your password"
                        lazy-rules
                        v-bind:rules="[
                          (val) =>
                            (val && val.length > 0) ||
                            'Please confirm your password',
                          (val) =>
                            (val && val == changePass1) || 'Passwords do not match!',
                        ]"
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
        <q-btn label="Change password" type="submit" color="primary"/>
      </div>
    </q-form>

        </q-card-section>
      </q-card>
    </q-dialog>
    <div class="q-gutter-y-md" style="max-width: 700px">
      <q-card square class="shadow-10">
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
                <q-card flat style="width: 625px; height: 350px">
                  <q-card-section>
                    <q-form
                      class="q-px-md q-pt-xl q-gutter-md"
                      @submit="onSubmitLogin"
                    >
                      <q-input
                        filled
                        label="Email *"
                        hint="Input your email address"
                        v-model="emailLogin"
                        lazy-rules
                        :rules="[
                          (val) =>
                            (val && val.length > 0) ||
                            'Please input your email address',
                        ]"
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
                        :rules="[
                          (val) =>
                            (val && val.length > 0) ||
                            'Please input your password',
                        ]"
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
                        <q-btn
                          unelevated
                          type="submit"
                          size="lg"
                          color="primary"
                          class="full-width text-white"
                          label="Log in"
                        />
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
                <q-card flat style="width: 625px; height: 1000px">
                  <q-card-section>
                    <q-form
                      class="q-px-md q-pt-xl q-gutter-md"
                      @submit="onSubmit"
                    >
                      <q-input
                        filled
                        label="Name *"
                        hint="Input your name"
                        v-model="pName"
                        lazy-rules
                        :rules="[
                          (val) =>
                            (val && val.length > 0) || 'Please input your name',
                        ]"
                      />

                      <q-input
                        filled
                        label="Surname *"
                        hint="Input your surname"
                        v-model="pSurname"
                        lazy-rules
                        :rules="[
                          (val) =>
                            (val && val.length > 0) ||
                            'Please input your surname',
                        ]"
                      />

                      <q-input
                        filled
                        label="Address *"
                        hint="Input your address"
                        v-model="pAddress"
                        lazy-rules
                        :rules="[
                          (val) =>
                            (val && val.length > 0) ||
                            'Please input your address',
                        ]"
                      />

                      <q-input
                        filled
                        label="City *"
                        hint="Input name of your city"
                        v-model="pCity"
                        lazy-rules
                        :rules="[
                          (val) =>
                            (val && val.length > 0) ||
                            'Please input name of your city',
                        ]"
                      />

                      <q-input
                        filled
                        label="Country *"
                        hint="Input name of your country"
                        v-model="pState"
                        lazy-rules
                        :rules="[
                          (val) =>
                            (val && val.length > 0) ||
                            'Please input name of your country',
                        ]"
                      />

                      <q-input
                        filled
                        type="number"
                        label="Phone number *"
                        hint="Input your phone number"
                        v-model="pPhoneNum"
                        lazy-rules
                        :rules="[
                          (val) =>
                            (val !== null && val !== '') ||
                            'Input your phone number',
                          (val) =>
                            (val && val.length > 0) ||
                            'Please input your phone number',
                        ]"
                      />

                      <q-input
                        filled
                        label="Email *"
                        hint="Input your email address"
                        v-model="pEmail"
                        lazy-rules
                        :rules="[
                          (val) =>
                            (val && val.length > 0) ||
                            'Please input your email address',
                        ]"
                      />

                      <q-input
                        v-model="pPass1"
                        filled
                        :type="isPass1 ? 'pPass1' : 'password'"
                        label="Password *"
                        hint="Input your password"
                        lazy-rules
                        :rules="[
                          (val) =>
                            (val && val.length > 0) ||
                            'Please input your password',
                        ]"
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
                        v-bind:rules="[
                          (val) =>
                            (val && val.length > 0) ||
                            'Please confirm your password',
                          (val) =>
                            (val && val == pPass1) || 'Passwords do not match!',
                        ]"
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
                        <q-btn
                          unelevated
                          type="submit"
                          size="lg"
                          color="primary"
                          class="full-width text-white"
                          label="Sign up"
                        />
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
import AuthService from "./../../services/AuthService";
import PharmacyAdminService from "./../../services/PharmacyAdminService";
import DoctorService from './../../services/DoctorService'
import {
  successfullyRegistered,
  registrationError,
  successfullyLoggedIn,
  logInError,
  successfullyChangedPassword,
  changePasswordError
} from './../../notifications/patients'
import { mapActions } from 'vuex'
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
      pPass2: '',
      changePass1: '',
      changePass2: '',
      changePassDialog: false
    }
  },
  methods: {
    ...mapActions({
      setJwt: 'setJwt',
      setEmail: 'setEmail',
      setName: 'setName',
      setSurname: 'setSurname',
      setId: 'setId',
      setRole: 'setRole',
      setPharmacy: 'setPharmacy'
    }),
    async changePass () {
      var data = {
        email: this.emailLogin,
        oldPass: this.passLogin,
        newPass: this.changePass1
      }
      var res = await AuthService.changePass(data)
      if (res.status == 200) { successfullyChangedPassword() } else { changePasswordError() }
      this.changePassDialog = false
    },
    async onSubmitLogin () {
      const logInData = {
        email: this.emailLogin,
        password: this.passLogin
      }
      const response = await AuthService.login(logInData)
      if (response.status == 423) {
        this.changePassDialog = true
      }
      if (response.status == 200) {
        successfullyLoggedIn()
        this.setJwt(response.data.accessToken)
        this.setEmail(response.data.email)
        this.setName(response.data.name)
        this.setSurname(response.data.surname)
        this.setId(response.data.userId)
        this.setRole(response.data.userRole)
        if (this.$store.getters.getRole == 'patient') {
          setTimeout(() => this.$router.push({ path: '/patient/' }), 2000)
        }
        if (this.$store.getters.getRole === 'dermatologist') {
          var pharmacy = await DoctorService.getCurrentPharmacy(response.data.userId)
          this.setPharmacy(pharmacy)
          setTimeout(() => this.$router.push({ path: '/doctor/derm' }), 2000)
        }
        if (this.$store.getters.getRole === 'pharmacist') {
          setTimeout(() => this.$router.push({ path: '/doctor/pharm' }), 2000)
          var pharmacyP = await DoctorService.getPharmPharmacy(response.data.userId)
          this.setPharmacy(pharmacyP)
        }
        if (this.$store.getters.getRole === 'sysAdmin') {
          setTimeout(() => this.$router.push({ path: '/sysadmin' }), 2000)
        }
        if (this.$store.getters.getRole === 'supplier') {
          setTimeout(() => this.$router.push({ path: '/supplier' }), 2000)
        }
        if(this.$store.getters.getRole == "pharmacyAdmin") {
          let responsePhadmin = await PharmacyAdminService.getPharmacyAdminsPharmacy(response.data.userId)
          if (responsePhadmin.status == 200) {
            console.log(responsePhadmin.data.id)
            this.setPharmacy(responsePhadmin.data.id);
          }
          setTimeout(() => this.$router.push({ path: '/phadmin' }), 2000)
        }
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
      const response = await AuthService.registerNewPatient(patientData)
      if (response.status == 200) {
        successfullyRegistered()
      } else {
        registrationError()
      }
    }
  }
}
</script>