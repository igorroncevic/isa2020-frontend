<template>
    <div>
        <term-dialog :dialog="dialog" :eventObject="eventObject"/>
        <DaykeepCalendar :prevent-event-detail="true" event-ref="MYCALENDAR"  :event-array="terms" ></DaykeepCalendar>
       </div>
</template>
<script>
import { DaykeepCalendar } from '@daykeep/calendar-quasar'
import TermDialog from './../components/TermDialog.vue'
export default {
  props: ['terms'],
  components: {
    DaykeepCalendar,
    TermDialog
  },
  data () {
    return {
      eventObject: {},
      clicks: 0,
      dialog: false
    }
  },
  async mounted () {
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
