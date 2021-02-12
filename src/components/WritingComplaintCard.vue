<template>
        <q-card class="my card" style="width: 600px">
          <q-tabs
            v-model="tab"
            dense
            class="bg-primary text-white"
            active-color="grey-5"
            indicator-color="primary"
            align="justify"
            narrow-indicator
          >
            <q-tab name="dermatologist" label="Dermatologist"></q-tab>
            <q-tab name="pharmacist" label="Pharmacist"></q-tab>
            <q-tab name="pharmacy" label="Pharmacy"></q-tab>
          </q-tabs>

          <q-separator></q-separator>

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="dermatologist">
              <div class="row">
              <div class="text-h6 q-pa-md col-md-6 col-xs-12 text-primary">Enter complaint text for</div>
              <div class="col-md-6 col-xs-12">
                 <q-select
                  filled
                  v-model="dermsModel"
                  :options="dermsOptions"
                  label="Choose dermatologist" />
              </div>
              </div>
              <div class="col-xs-12 col-sm-12 col-md-12 q-pa-md">
                    <q-input
                        v-model="dermText"
                        filled
                        clearable
                        type="textarea"

                    />
                </div>
            </q-tab-panel>

            <q-tab-panel name="pharmacist">
              <div class="row">
              <div class="text-h6 q-pa-md col-md-6 col-xs-12 text-primary">Enter complaint text for</div>
              <div class="col-md-6 col-xs-12">
                 <q-select
                  filled
                  v-model="pharmsModel"
                  :options="pharmsOptions"
                  label="Choose pharmacist" />
              </div>
              </div>
              <div class="col-xs-12 col-sm-12 col-md-12 q-pa-md">
                    <q-input
                        v-model="pharmacistText"
                        filled
                        clearable
                        type="textarea"
                    />
                </div>
            </q-tab-panel>

            <q-tab-panel name="pharmacy">
              <div class="row">
              <div class="text-h6 q-pa-md col-md-6 col-xs-12 text-primary">Enter complaint text for</div>
              <div class="col-md-6 col-xs-12">
                 <q-select
                  filled
                  v-model="phsModel"
                  :options="phsOptions"
                  label="Choose pharmacy" />
              </div>
              </div>
              <div class="col-xs-12 col-sm-12 col-md-12 q-pa-md">
                    <q-input
                        v-model="pharmacyText"
                        filled
                        clearable
                        type="textarea"
                    />
                </div>
            </q-tab-panel>
          </q-tab-panels>

          <q-card-actions align="center">
                <q-btn color="primary" class="full-width text-white" label="Submit complaint" @click="postComplaint" />
          </q-card-actions>
        </q-card>
</template>

<script>
import PharmacyService from './../services/PharmacyService'
import PatientService from './../services/PatientService'
import ComplaintService from './../services/ComplaintService'

export default {
  async mounted () {
    var dermatologists = await PatientService.getPatientDoctors(this.patient, 'dermatologist')
    dermatologists.forEach(el => {
      var derm = {
        label: el.name + ' ' + el.surname,
        value: el.id
      }
      this.dermsOptions.push(derm)
    })

    var pharmacists = await PatientService.getPatientDoctors(this.patient, 'pharmacist')
    pharmacists.forEach(el => {
      var pharm = {
        label: el.name + ' ' + el.surname,
        value: el.id
      }
      this.pharmsOptions.push(pharm)
    })

    var pharmacy = await PharmacyService.getAllPharmacies2()
    pharmacy.forEach(el => {
      var ph = {
        label: el.name,
        value: el.id
      }
      this.phsOptions.push(ph)
    })
  },
  data () {
    return {
      tab: 'dermatologist',
      dermText: '',
      pharmacistText: '',
      pharmacyText: '',
      dermsModel: null,
      dermsOptions: [],
      pharmsModel: null,
      pharmsOptions: [],
      phsModel: null,
      phsOptions: [],
      patient: this.$store.getters.getId
    }
  },
  methods: {
    postComplaint () {
      if (this.tab === 'dermatologist') {
        const data = {
          patientId: this.patient,
          complaintText: this.dermText,
          doctorId: this.dermsModel.value
        }
        ComplaintService.postComplaint(data, 'doctor')
        return
      }
      if (this.tab === 'pharmacist') {
        const data = {
          patientId: this.patient,
          complaintText: this.pharmacistText,
          doctorId: this.pharmsModel.value
        }
        ComplaintService.postComplaint(data, 'doctor')
        return
      }
      if (this.tab === 'pharmacy') {
        const data = {
          patientId: this.patient,
          complaintText: this.pharmacyText,
          pharmacyId: this.phsModel.value
        }
        ComplaintService.postComplaint(data, 'pharmacy')
      }
    }
  }
}
</script>
