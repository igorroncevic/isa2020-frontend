<template>
<q-page padding>
<div>
    <div class="row q-gutter-md">
    <q-select filled v-model="pharmacy" :options="pharmacyList" label="Select pharmacy" style="width:500px"/>
    <q-btn color="primary" @click="selectPharmacy"> confirm </q-btn>
    </div>
    <DoctorSchedule :terms="terms"></DoctorSchedule>
</div>
</q-page>
</template>
<script>
import DoctorSchedule from './../components/DoctorSchedule.vue'
import TermService from './../services/TermService'
import DoctorService from './../services/DoctorService'
export default {
  components: { DoctorSchedule },
  data: function () {
    return {
      terms: [],
      pharmacyList: [],
      pharmacy: ''
    }
  },
  async mounted () {
    var pList = await DoctorService.getDoctorPharmacyList('a5ac174a-45b3-487f-91cb-3d3f727d6f1c')
    pList.forEach(p => {
      var pharmacy = {
        label: p.name,
        id: p.id
      }
      this.pharmacyList.push(pharmacy)
    })
  },
  methods: {
    async selectPharmacy () {
      if (this.pharmacy === '') {
        this.$q.notify({
          color: 'negative',
          textColor: 'white',
          timeout: 500,
          icon: 'error',
          position: 'center',
          message: 'Select pharmacy first!'
        })
        return
      }
      await this.getTerms()
    },
    async getTerms () {
      this.terms = []
      var res = await TermService.getDoctorTermsByPharmacy('a5ac174a-45b3-487f-91cb-3d3f727d6f1c', this.pharmacy.id)
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
}
</script>
