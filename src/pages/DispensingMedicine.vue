<template>
<q-page-container>
<q-page padding class="q-gutter-y-xl column items-center ">
    <div class="text-h4"> Dispensing medicine,enter reservation code: </div>
    <div style="max-width:500px" class="row">
      <div class="row q-gutter-x-sm">
      <q-input style="width:400px" v-model="id" label="Reservation code:" >
      </q-input>
          <q-btn @click="send"  icon="search"/>
    </div>
    </div>
    <div v-show="show">
      <p style="" class="text-h4"> Reservation found <q-icon name="done_outline" size="md" color="green"/> </p>
      <p> Patient: {{res.patientName}}  {{res.patientSurname}} </p>
      <p> E-mail: {{res.email}} </p>
      <p> Medicine: {{res.medicineName}} </p>
      <q-btn v-bind:disabled="show2" color="primary" @click="handle">Dispend medicine </q-btn> <q-icon v-show="show2" name="done_outline" size="md" color="green"/>
    </div>
</q-page>
</q-page-container>
</template>

<script>
import {getBackendPath} from './../services/backendPath'

export default {
  data () {
    return {
      id: '',
      res: {},
      show: false,
      show2: false
    }
  },
  methods: {
    send () {
      this.$axios.get(getBackendPath() + '/api/medicines/reserved/' + this.id + '/e93cab4a-f007-412c-b631-7a9a5ee2c6ed') // fixed pharmacy id for now
        .then(response => {
          if (response.status === 204) {
            this.$q.notify({
              color: 'negative',
              textColor: 'white',
              icon: 'error',
              timeout: 500,
              position: 'center',
              message: 'Reservation code not valid!'
            })
            this.show = false
            return
          }
          this.res = response.data
          this.show = true
          this.$q.notify({
            color: 'positive',
            timeout: 150,
            textColor: 'white',
            position: 'center',
            message: 'Reservation code found!',
            type: 'positive'
          })
        })
        .catch(error => {
          console.log(error)
          this.$q.notify({
            color: 'negative',
            textColor: 'white',
            timeout: 500,
            icon: 'error',
            position: 'center',
            message: 'Code format not valid!'
          })
          this.show = false
        })
    },
    handle () {
      this.$axios.put(getBackendPath() + '/api/medicines/handleReservation', {
        id: this.res.id,
        email: this.res.email,
        medicine: this.res.medicineName
      })
        .then(response => {
          this.$q.notify({
            color: 'positive',
            timeout: 150,
            textColor: 'white',
            position: 'center',
            message: 'Medicine successfully dispended!',
            type: 'positive'
          })
          this.show2 = true
        })
    }
  }
}
</script>
