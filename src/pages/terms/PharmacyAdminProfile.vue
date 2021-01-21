<template>
  <q-page padding>
    <div class="q-pa-md" style="max-width: 400px">

      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
      >
        <q-input :readonly=editEnabled
          rounded outlined
          v-model="user.name"
          label="Your name"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />

        <q-input :readonly=editEnabled
          rounded outlined
          v-model="user.surname"
          label="Your surname"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />

        <q-input :readonly=editEnabled
          rounded outlined
          v-model="user.email"
          label="Your email"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />

        <div>
          <q-btn label="Edit profile" type="submit" color="primary"/>
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>

    </div>
  </q-page>
</template>

<script>
import PharmacyAdminService from "./../../services/PharmacyAdminService";

export default {
  async beforeMount(){
     this.user = await PharmacyAdminService.getMyData()
  },
  data () {
    return {
      user: {
      },
      editEnabled: true,
    }
  },
  methods: {
    onSubmit () {
      this.editEnabled = false
    },
    onReset () {
      this.editEnabled = true
    }
  }
}
</script>