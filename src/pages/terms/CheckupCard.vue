<template>
  <q-card class="my-card column full-height q-pm-lg" flat bordered>
    <q-card-section horizontal>
      <q-card-section class="q-pt-xs">
        <div class="text-h5 q-mt-sm q-mb-xs">
          {{ capitalize(checkup.type) }}
        </div>
        <div class="text-body1">
          Checkup start: {{ dateFormat(checkup.startTime) }} <br />
          Checkup end: {{ dateFormat(checkup.endTime) }} <br />
          Checkup doctor: {{ checkup.doctor.name }}
          {{ checkup.doctor.surname }} <br />
        </div>
      </q-card-section>
    </q-card-section>

    <q-separator></q-separator>

    <q-card-actions>
      <q-btn
        v-if="this.checkup.patient == null"
        @click="scheduleCheckup"
        flat
        icon="event"
        label="Schedule"
        color="primary"
      ></q-btn>
      <q-btn
        v-if="this.checkup.patient != null"
        @click="cancelCheckup"
        flat
        icon="cancel_schedule_send"
        label="Cancel"
        color="red"
      ></q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import moment from 'moment'
import CheckupService from './../../services/CheckupService'
import {
  successfullyScheduled,
  schedulingError,
  successfullyCancelled,
  cancellingError
} from './../../notifications/terms'

export default {
  props: ['checkup'],
  data () {
    return {
      patientId: '5ffe884f-9cd8-42f5-adc4-2a27cd8d2737'
    }
  },
  mounted () {
    console.log(this.checkup)
    this.checkup.type = this.capitalize(this.checkup.type)
    this.checkup.startTime = this.dateFormat(this.checkup.startTime)
    this.checkup.endTime = this.dateFormat(this.checkup.endTime)
  },
  methods: {
    async scheduleCheckup () {
      const checkupData = {
        patientId: this.patientId,
        checkupId: this.checkup.id
      }
      console.log(checkupData)
      const success = await CheckupService.scheduleCheckup(checkupData)

      if (success) {
        successfullyScheduled(this.checkup.type, this.checkup.doctor.surname)
      } else {
        schedulingError(this.checkup.type)
      }
      setTimeout(() => this.$router.go(), 2000)
    },

    async cancelCheckup () {
      const checkupData = {
        patientId: this.patientId,
        checkupId: this.checkup.id
      }
      const success = await CheckupService.cancelCheckup(checkupData)

      if (success) {
        successfullyCancelled(this.checkup.type, this.checkup.doctor.surname)
      } else {
        cancellingError(this.checkup.type)
      }
      setTimeout(() => this.$router.go(), 2000)
    },

    dateFormat (date) {
      return moment(date).format('LT LL')
    },
    capitalize (s) {
      if (typeof s !== 'string') return ''
      return s.charAt(0).toUpperCase() + s.slice(1)
    }
  }
}
</script>

<style>
.my-card {
  width: 100%;
  max-width: 20rem;
}
</style>
