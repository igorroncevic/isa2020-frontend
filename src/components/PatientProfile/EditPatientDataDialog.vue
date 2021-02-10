<template>
  <div class="user-info q-mt-lg">
    <div class="row justify-center" style="align-items: center">
      <label class="text-body1">First name:</label>
      <q-input
        class="input-styling-epdd"
        v-model="changeUser.name"
        :readonly="!editing"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
    </div>
    <div class="row justify-center" style="align-items: center">
      <label class="text-body1">Last name:</label>
      <q-input
        class="input-styling-epdd"
        v-model="changeUser.surname"
        :readonly="!editing"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
    </div>
    <div class="row justify-center" style="align-items: center">
      <label class="text-body1">Phone number:</label>
      <q-input
        class="input-styling-epdd"
        v-model="changeUser.phoneNumber"
        mask="###/###-###"
        hint="Mask: ###/###-###"
        :readonly="!editing"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
    </div>
    <div
      v-if="!updatingPassword"
      class="row justify-center q-mt-md q-mb-md"
      style="align-items: center"
    >
      <label class="text-body1">Password: </label>
      <q-btn
        @click="updatingPassword = !updatingPassword"
        class="q-ml-md"
        label="Change password"
        type="submit"
        color="primary"
        :disable="updatingPassword"
      />
    </div>
    <div
      v-if="updatingPassword"
      class="row justify-center"
      style="align-items: center"
    >
      <label class="text-body1">Enter new password:</label>
      <q-input
        class="input-styling-epdd"
        :type="isPwd ? 'password' : 'text'"
        v-model="newPassword"
        lazy-rules
        :disable="!updatingPassword"
        :readonly="!editing"
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
    </div>

    <div
      v-if="updatingPassword"
      class="row justify-center"
      style="align-items: center"
    >
      <label class="text-body1">Confirm password:</label>
      <q-input
        class="input-styling-epdd"
        :type="isPwd ? 'password' : 'text'"
        v-model="confirmPassword"
        lazy-rules
        :disable="!updatingPassword"
        :readonly="!editing"
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
    </div>
    <div
      v-if="updatingPassword"
      class="row justify-center"
      style="align-items: center"
    >
      <q-btn
        flat
        class="q-mt-md"
        label="Cancel password update"
        type="submit"
        color="primary"
        v-bind:disable="!updatingPassword"
        @click="cancelPasswordUpdate"
      />
    </div>
    
      <q-btn
        class="q-mt-xl"
        label="Update personal info"
        type="submit"
        color="primary"
        @click="updateData"
      />
  </div>
</template>

<script>
import {passwordsDoNotMatch, cantLeaveAnyFieldsEmpty} from './../../notifications/globalErrors'
export default {
  props: {
    currentUser: {
      type: Object,
    },
    editing: {
      type: Boolean,
    }
  },
  beforeMount() {
    this.changeUser = {...this.currentUser};
  },
  data() {
    return {
      updatingPassword: false,
      newPassword: "",
      confirmPassword: "",
      isPwd: true,
      changeUser: {},
    };
  },
  methods:{
    cancelPasswordUpdate(){
      this.updatingPassword = false;
      this.newPassword = "";
      this.confirmPassword = "";
    },
    updateData(){
      if(this.newPassword != this.confirmPassword){
        passwordsDoNotMatch()
        return
      }

      if(this.changeUser.name == "" || this.changeUser.surname == "" || this.changeUser.phoneNumber == ""){
        cantLeaveAnyFieldsEmpty()
        return
      }

      this.$emit("updateData", {
        id: this.changeUser.id,
        name: this.changeUser.name,
        surname: this.changeUser.surname,
        phoneNumber: this.changeUser.phoneNumber,
        newPassword: this.newPassword,
        confirmPassword: this.confirmPassword,
      })
    }
  }
};
</script>

<style>
.user-info-epdd {
  margin: 2em auto;
  max-width: 60%;
  position: relative;
}

.input-styling-epdd {
  width: 250px;
  margin-left: 20px;
  font-size: 16px;
}
</style>