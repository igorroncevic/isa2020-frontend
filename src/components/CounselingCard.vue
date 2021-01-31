<template>
  <q-card class="my-card column full-height q-pm-lg" flat bordered>
    <q-card-section horizontal>
      <q-card-section class="q-pt-xs">
        <div class="text-h5 q-mt-sm q-mb-xs">
          {{ capitalize(counseling.type) }}
        </div>
        <div class="text-body1">
          Counseling start: {{ dateFormat(counseling.startTime) }} <br />
          Counseling end: {{ dateFormat(counseling.endTime) }} <br />
          Counseling doctor: {{ counseling.doctor.name }}
          {{ counseling.doctor.surname }} <br />
        </div>
      </q-card-section>
    </q-card-section>

    <q-separator></q-separator>

    <q-card-actions>
      <q-btn
        v-if="this.counseling.patient != null"
        @click="cancelCounseling"
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
import CounselingService from './../services/CounselingService'
import {
  successfullyCancelled,
  cancellingError
} from './../notifications/terms'

export default {
  props: ['counseling'],
  data () {
    return {
      patientId: '5ffe884f-9cd8-42f5-adc4-2a27cd8d2737'
    }
  },
  mounted () {
    this.counseling.type = this.capitalize(this.counseling.type)
    this.counseling.startTime = this.dateFormat(this.counseling.startTime)
    this.counseling.endTime = this.dateFormat(this.counseling.endTime)
  },
  methods: {
    async cancelCounseling () {
      const counselingData = {
        patientId: this.patientId,
        counselingId: this.counseling.id
      }
      const success = await CounselingService.cancelCounseling(counselingData)

      if (success) {
        successfullyCancelled(this.counseling.type, this.counseling.doctor.surname)
      } else {
        cancellingError(this.counseling.type)
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
