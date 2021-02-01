<template>
<q-page-container>
<q-page padding class="q-gutter-y-xl column items-center ">
<q-dialog v-model="persistent" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-primary text-white" style="width: 600px">
        <q-card-section>
          <div class="text-h6">Select action</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-btn-toggle
        v-model="model"
        spread
        class="my-custom-toggle"
        no-caps
        rounded
        unelevated
        toggle-color="blue-4"
        color="white"
        text-color="primary"
        :options="[
          {label: 'Start checkup', value: 'start'},
          {label: 'Patient did not apper ', value: 'notApper'}
        ]"
      />
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-primary">
          <q-btn @click="confirmAction" flat label="Confirm" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
</q-page>
</q-page-container>
</template>
<style lang="sass" scoped>
.my-custom-toggle
  border: 1px solid #027be3
</style>
<script>
import checkupService from './../services/CheckupService'
import patientService from './../services/PatientService'
export default {
  data () {
    return {
      id: '',
      res: {},
      show: false,
      show2: false,
      persistent: true,
      model: 'start'
    }
  },
  async mounted () {
    this.res = await checkupService.getById(this.$route.params.id)
  },
  methods: {
    async confirmAction () {
      if (this.model === 'start') {
      }
      if (this.model === 'notApper') {
        var res1 = await patientService.addPenalty(this.res.patient.id)
        var res2 = await checkupService.deleteCheckup(this.res.id)
        if (res1 && res2) {
          this.$q.notify({
            color: 'positive',
            timeout: 150,
            textColor: 'white',
            position: 'center',
            message: 'Action successfully executed!',
            type: 'positive'
          })
          this.$router.push('/doctor/derm')
        } else {
          this.$q.notify({
            color: 'negative',
            textColor: 'white',
            timeout: 500,
            icon: 'error',
            position: 'center',
            message: 'Eror!'
          })
        }
      }
    }
  }
}
</script>
