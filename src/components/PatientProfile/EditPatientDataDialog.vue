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
        class="q-mt-md"
        label="Update password"
        type="submit"
        color="primary"
        v-bind:disable="!updatingPassword"
      />
      <q-btn
        flat
        class="q-mt-md q-ml-md"
        label="Cancel"
        type="submit"
        color="primary"
        v-bind:disable="!updatingPassword"
        @click="updatingPassword = !updatingPassword"
      />
    </div>
  </div>
</template>

<script>
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
    this.changeUser = Object.assign(this.changeUser, this.currentUser);
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