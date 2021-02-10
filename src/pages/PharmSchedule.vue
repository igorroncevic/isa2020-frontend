<template>
<q-page padding>
<div>
    <DoctorSchedule :terms="terms" :doctor="pharm"></DoctorSchedule>
</div>
</q-page>
</template>
<script>
import DoctorSchedule from './../components/DoctorSchedule.vue'
import TermService from './../services/TermService'
export default {
  components: { DoctorSchedule },
  data: function () {
    return {
      terms: []
    }
  },
  async mounted () {
    var res = await TermService.getDoctorTerms(this.$store.getters.getId)
    res.forEach(element => {
      var patient = {}
      if (element.patient) {
        patient = {
          id: element.patient.id,
          email: element.patient.email,
          displayName: element.patient.name + ' ' + element.patient.surname
        }
      } else {
        patient = {
          id: '',
          email: '',
          displayName: ''
        }
      }
      var term = {
        id: element.id,
        summary: element.type,
        description: '',
        location: 'Neka apoteka',
        start: {
          dateTime: element.startTime // ISO 8601 formatted // Timezone listed as a separate IANA code
        },
        end: {
          dateTime: element.endTime
        },
        color: 'positive',
        attendees: [
          {
            patient
          }
        ]
      }
      this.terms.push(term)
    })
  }
}
</script>
