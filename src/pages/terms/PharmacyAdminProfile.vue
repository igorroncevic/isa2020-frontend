<template>
  <q-page padding>
    <div class="q-pa-md" style="max-width: 400px">

      <q-input :readonly=readOnly
          rounded outlined
          v-model="user.name"
          label="Your name"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />

        <q-input :readonly=readOnly
          rounded outlined
          v-model="user.surname"
          label="Your surname"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />

        <q-input :readonly=readOnly
          rounded outlined
          v-model="user.email"
          label="Your email"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />

        <q-input :readonly=readOnly
          rounded outlined
          v-model="user.phoneNumber"
          label="Your phone number"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />

        <div>
          <q-btn round :color="btnColor" :icon="btnIcon" @click="editClick" />
          <q-btn round color="primary" v-show=!readOnly icon="save" @click="saveClick" />
        </div>

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
      tempUser: {},
      readOnly: true,
      btnColor: 'primary',
      btnIcon: 'edit'
    }
  },
  methods: {
    editClick () {
      if(this.readOnly === true) {
        this.readOnly = false
        this.tempUser = JSON.parse(JSON.stringify(this.user));
        this.btnColor = 'red'
        this.btnIcon = 'highlight_off'
      } else {
        this.readOnly = true
        this.user = this.tempUser
        this.btnColor = 'primary'
        this.btnIcon = 'edit'
      }
    },
    async saveClick () {
      this.user = await PharmacyAdminService.updateUserData(this.user)
      this.readOnly = true
      this.btnColor = 'primary'
      this.btnIcon = 'edit'
    }
  }
}
</script>