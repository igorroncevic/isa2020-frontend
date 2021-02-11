<template>
    <q-dialog v-model="vacation">
      <q-card style="width:400px;height:300px">
        <q-card-section class="row items-center text-center bg-primary text-white q-pb-none">
          <div class="text-h6 text-center">Vacation request</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
          <div class="row  justify-center q-mt-lg">
            <q-input filled  label="Vacation start date" v-model="startDate"  :rules="['dd-MM-yyyy']">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="startDate" :options="optionsFnDate" mask="YYYY-MM-DD">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          </div>
          <div class="row  justify-center">
          <q-input filled  label="Vacation end date" v-model="endDate" readonly  :rules="['DD-MM-YYYY']">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date :options="therapyEndValidation" v-model="endDate" mask="YYYY-MM-DD">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          </div>
          <div class="row  justify-center">
          <q-btn color="primary" @click="createRequest">Send request </q-btn>
          </div>
        <q-card-section>
        </q-card-section>
      </q-card>
    </q-dialog>
</template>

<script>
import VacationService from './../services/VacationService'
export default {
  props: ['vacation'],
  data: function () {
    return {
      startDate: '',
      endDate: ''
    }
  },
  methods: {
    optionsFnDate (date) {
      var dateN = new Date()
      var year = dateN.getFullYear().toString()
      var day = dateN.getDate().toString()
      var month = dateN.getMonth() + 1
      month = month.toString()
      if (day.length === 1) {
        day = '0' + day
      }
      if (month.length == 1) {
        month = '0' + month
      }
      return date >= year + '/' + month + '/' + day
    },
    formatTime (date) {
      return date + 'T' + '00:00' + ':00.000+01:00'
    },
    therapyEndValidation (date) {
      var arr = this.startDate.split('-')
      var year = arr[0]
      var month = arr[1]
      var day = arr[2]
      return date > year + '/' + month + '/' + day
    },
    async createRequest () {
      var data = {
        startDate: this.formatTime(this.startDate),
        endDate: this.formatTime(this.endDate),
        doctorId: this.$store.getters.getId
      }
      var res = await VacationService.createRequest(data)
      if (res.status == 201) {
        this.$q.notify({
          color: 'positive',
          timeout: 650,
          textColor: 'white',
          position: 'center',
          message: 'Request sucessfully sent!',
          type: 'positive'
        })
        this.vacation = false
      } else {
        console.log(err)
        this.$q.notify({
          color: 'negative',
          textColor: 'white',
          timeout: 500,
          icon: 'error',
          position: 'center',
          message: 'Error!'
        })
      }
    }
  }
}
</script>
