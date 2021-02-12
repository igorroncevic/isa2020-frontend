<template>
  <q-page padding>
    <div>
      <q-dialog v-model="changePassDialog">
        <q-card style="height: 450px">
          <q-card-section
            class="row items-center q-pb-none bg-primary text-white"
          >
            <div class="text-h6">
              First login,please change your pass then login again:
            </div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>
          <q-card-section class="row items-center justify-center q-pb-none">
            <q-form @submit="changePass" class="q-gutter-md">
              <q-input
                v-model="oldPass"
                filled
                label="Old password *"
                :type="isPwd ? 'password' : 'text'"
                hint="Input your password"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Please input your password',
                ]"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  ></q-icon>
                </template>
              </q-input>
              <q-input
                v-model="changePass1"
                filled
                :type="isPass1 ? 'password' : 'text'"
                label="New password *"
                hint="Input your password"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Please input your password',
                ]"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPass1 ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPass1 = !isPass1"
                  ></q-icon>
                </template>
              </q-input>

              <q-input
                v-model="changePass2"
                filled
                label="New password *"
                :type="isPass2 ? 'password' : 'text'"
                hint="Confirm your password"
                lazy-rules
                v-bind:rules="[
                  (val) =>
                    (val && val.length > 0) || 'Please confirm your password',
                  (val) =>
                    (val && val == changePass1) || 'Passwords do not match!',
                ]"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPass2 ? 'visibility' : 'visibility_off'"
                    @click="isPass2 = !isPass2"
                    class="cursor-pointer"
                  ></q-icon>
                </template>
              </q-input>

              <div>
                <q-btn label="Change password" type="submit" color="primary" />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
    <div style="max-width: 500px" padd>
      <q-form @submit="onSubmit" class="q-gutter-md">
        <q-input
          filled
          v-model="phadmin.name"
          label="Name:"
          lazy-rules
          :disable="!edit"
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />

        <q-input
          filled
          v-model="phadmin.surname"
          :disable="!edit"
          label="Surname:"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />
        <q-input
          filled
          v-model="phadmin.phoneNumber"
          :disable="!edit"
          label="Phone number:"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />
        <q-input
          filled
          v-model="phadmin.email"
          :disable="!edit"
          label="E-mail:"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />
        <div>
          <q-btn
            label="Save"
            icon="save"
            type="submit"
            color="primary"
            v-bind:disable="!edit"
          />
          <q-btn
            label="Edit"
            @click="edit = true"
            icon="edit"
            color="primary"
            flat
            class="q-ml-sm"
          />
          <q-btn
            label="Change password"
            @click="changePassDialog = true"
            icon="edit"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import PharmacyAdminService from "./../../services/PharmacyAdminService";
import AuthService from "./../../services/AuthService";
import {
  successfullyChangedPassword,
  changePasswordError,
} from "./../../notifications/patients";
export default {
  data() {
    return {
      phadmin: {},
      edit: false,
      changePass1: "",
      changePass2: "",
      changePassDialog: false,
      oldPass: "",
      isPwd: true,
      isPass1: true,
      isPass2: true,
    };
  },
  async mounted() {
    this.phadmin = await PharmacyAdminService.getMyData(this.$store.getters.getId);
  },
  methods: {
    async onSubmit() {
      var res = await PharmacyAdminService.updateUserData(this.doctor);
      if (res === "err") {
        this.$q.notify({
          color: "red-4",
          textColor: "white",
          icon: "error",
          message: "Submitted",
        });
      } else {
        this.$q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Submitted",
        });
      }
      this.edit = false;
    },
    async changePass() {
      var data = {
        email: this.$store.getters.getEmail,
        oldPass: this.oldPass,
        newPass: this.changePass1,
      };
      var res = await AuthService.changePass(data);
      if (res.status == 200) {
        successfullyChangedPassword();
      } else {
        changePasswordError();
      }
      this.changePassDialog = false;
    },
  },
};
</script>
