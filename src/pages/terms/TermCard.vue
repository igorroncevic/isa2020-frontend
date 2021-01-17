<template>
  <q-card class="my-card column full-height q-pm-lg" flat bordered>
      <q-card-section horizontal>
        <q-card-section class="q-pt-xs">
          <div class="text-h5 q-mt-sm q-mb-xs">{{capitalize(term.type)}}</div>
          <div class="text-body1">
            Term start: {{dateFormat(term.startTime)}} <br>
            Term end: {{dateFormat(term.endTime)}} <br>
            Term doctor: {{term.doctor.name}} {{term.doctor.surname}} <br>
          </div>
        </q-card-section>
      </q-card-section>

      <q-separator></q-separator>

      <q-card-actions>
        <q-btn @click="schedule" flat icon="event" label="Schedule" color="primary"></q-btn>
      </q-card-actions>
    </q-card>
</template>

<script>
import moment from 'moment'
import TermService from './../../services/TermService'
import {successfullyScheduled, schedulingError} from './../../notifications/terms'

export default {
   props: ['term'],
   mounted(){
      this.term.type = this.capitalize(this.term.type)
      this.term.startTime = this.dateFormat(this.term.startTime)
      this.term.endTime = this.dateFormat(this.term.endTime)
   },
   methods: {
      async schedule(){
         let termData = {
            patientId: "5ffe884f-9cd8-42f5-adc4-2a27cd8d2737",
            termId: this.term.id
         }
         let success = await TermService.scheduleTerm(termData);

         if(success){
            successfullyScheduled(this.term.type, this.term.doctor)
         }else{
            schedulingError(this.term.type)
         }
         this.$router.go()
      },
   
      dateFormat(date){
         return moment(date).format("LT LL")
      },
      capitalize(s){
         if (typeof s !== 'string') return ''
         return s.charAt(0).toUpperCase() + s.slice(1)
      }
   }
}
</script>

<style>
.my-card{
  width: 100%;
  max-width: 20rem;
}

</style>