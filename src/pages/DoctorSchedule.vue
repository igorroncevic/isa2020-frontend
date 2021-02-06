<template>
    <div>
        <term-dialog :dialog="dialog" :eventObject="eventObject"/>
        <DaykeepCalendar :prevent-event-detail="true" event-ref="MYCALENDAR"  :event-array="terms" ></DaykeepCalendar>
       </div>
</template>
<script>
import { DaykeepCalendar } from '@daykeep/calendar-quasar'
import TermService from './../services/TermService'
import TermDialog from './../components/TermDialog.vue'
export default {
  components: {
    DaykeepCalendar,
    TermDialog
  },
  data () {
    return {
      eventObject: {},
      clicks: 0,
      dialog: false,
      terms: []
    }
  },
  async mounted () {
    var res = await TermService.getDoctorTerms('a5ac174a-45b3-487f-91cb-3d3f727d6f1c')
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
    await this.$root.$on(
      'click-event-MYCALENDAR',
      (eventDetailObject) => {
        this.eventObject = eventDetailObject
        this.dialog = false
        this.dialog = true
      })
  },
  beforeDestroy () {
    this.$root.$off(
      'click-event-MYCALENDAR',
      function (eventDetailObject) {
      }
    )
  }
}
</script>
