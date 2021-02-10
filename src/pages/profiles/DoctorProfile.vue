<template>
<q-page padding>
    <div style="max-width:500px" padd>
        <q-form
      @submit="onSubmit"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="doctor.name"
        label="Name:"
        lazy-rules
        :disable="!edit"
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-input
        filled
        v-model="doctor.surname"
        :disable="!edit"
        label="Surname:"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
       <q-input
        filled
        v-model="doctor.phoneNumber"
        :disable="!edit"
        label="Phone number:"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
       <q-input
        filled
        v-model="doctor.email"
        :disable="!edit"
        label="E-mail:"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
      <div>
        <q-btn label="Save"  icon="save" type="submit" color="primary" v-bind:disable="!edit"/>
        <q-btn label="Edit" @click="edit=true" icon="edit"  color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
    </div>
</q-page>
</template>

<script>
import DoctorService from './../../services/DoctorService'
export default {
  data () {
    return {
      doctor: {},
      edit: false
    }
  },
  async mounted () {
    this.doctor = await DoctorService.getMyData()
  },
  methods: {
    async onSubmit () {
      var res = await DoctorService.updateUserData(this.doctor)
      if (res === 'err') {
        this.$q.notify({
          color: 'red-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Submitted'
        })
      } else {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Submitted'
        })
      }
      this.edit = false
    }
  }
}
</script>
