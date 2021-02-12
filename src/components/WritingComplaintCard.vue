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
                <q-btn color="primary" class="full-width text-white" label="Submit complaint" />
          </q-card-actions>
        </q-card>
</template>

<script>
import DoctorService from './../services/DoctorService'
import PharmacyService from './../services/PharmacyService'

export default {
  async beforeMount () {
    var dermatologists = await DoctorService.getAllDermatologists()
    dermatologists.forEach(el => {
      var derm = {
        label: el.name + ' ' + el.surname,
        value: el.id
      }
      this.dermsOptions.push(derm)
    })

    var pharmacists = await DoctorService.getAllPharmacists()
    pharmacists.forEach(el => {
      var pharm = {
        label: el.name + ' ' + el.surname,
        value: el.id
      }
      this.pharmsOptions.push(pharm)
    })

    var pharmacy = await PharmacyService.getAllPharmacies()
    pharmacy.forEach(el => {
      var ph = {
        label: el,
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
      phsOptions: []
    }
  }
}
</script>
