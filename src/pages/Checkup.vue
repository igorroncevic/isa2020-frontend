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

    <q-dialog v-model="alergicDialog">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Patient is alergic to medicines:</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
          <div class="text" v-for="m in alergicMedicines" :key="m">
             {{m}},
          </div>
        <q-card-section>
        </q-card-section>
      </q-card>
    </q-dialog>
    <div class="row">
    <q-splitter
      v-model="splitterModel"
      style="height: 700px;width:1200px"
    >

      <template v-slot:before>
        <q-tabs
          v-model="tab"
          vertical
          class="text-primary"
        >
          <q-tab name="report" icon="history_edu" label="Report" />
          <q-tab name="medicines" icon="healing" label="Medicines" />
          <q-tab name="schedule" icon="today" label="Schedule checkup" />
          <q-tab name="save" icon="save" label="Save checkup" />
        </q-tabs>
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="tab"
          animated
          swipeable
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
          style="width:800px;height:700px"
        >
          <q-tab-panel name="report">
            <div class="text-h4 q-mb-md">Report text:</div>
            <div>
              <q-editor
                v-model="editor"
                flat
                content-class="bg-grey-3"
                toolbar-text-color="white"
                toolbar-toggle-color="yellow-8"
                toolbar-bg="primary"
                style="width:700px;"
                height="500px"
                :toolbar="[
                  ['bold', 'italic', 'underline'],
                  [{
                    label: $q.lang.editor.formatting,
                    icon: $q.iconSet.editor.formatting,
                    list: 'no-icons',
                    options: ['p', 'h3', 'h4', 'h5', 'h6', 'code']
                  }]
                ]"
              />
            </div>
          </q-tab-panel>

          <q-tab-panel name="medicines">
           <div class="text-h4 q-mb-md">Prescribe medicine</div>
           <div style="max-width:400px">
          <q-select filled v-model="medicine" :options="options" label="Select medicine"/>
          <div class="row items-center">
          <p> *Medicines which patient is alergic to are disabled</p>
          <q-btn @click="alergicDialog=true" flat color="primary" label="List" />
          </div>
          <div class="row q-gutter-sm">
          <q-input
            v-model="quantity"
            type="number"
            filled
            style="max-width: 200px"
            lazy-rules
            label="Medicine qyantity"
            :rules="[ val => val && val.length > 0 || 'Enter number!']" min="1"
          />
          <q-btn color="primary" @click="checkMedicine" style="width:200px;height:50px">Check availability</q-btn>
          </div>
          <div v-show="show" class="text-h5" v-bind:style="'color:'+color">
                {{checkText}}
          </div>
          <q-input filled  label="Therapy start date" v-model="startDate" mask="date" :rules="['date']">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="startDate">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-input filled  label="Therapy end date" v-model="endDate" mask="date" :rules="['date']">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date :options="date=>date > startDate" v-model="endDate">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
           </div>
          </q-tab-panel>

          <q-tab-panel name="schedule">
            <div class="text-h4 q-mb-md">Schedule new checkup:</div>
          </q-tab-panel>
          <q-tab-panel name="save">
            <div class="text-h4 q-mb-md">Finish checkup?</div>
            <q-btn icon="save" @click="finishCheckup" color="primary" size="xl">Finish</q-btn>
          </q-tab-panel>
        </q-tab-panels>
      </template>

    </q-splitter>
    <div class="col">
  <q-card
      class="my-card text-white"
      style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
    >
      <q-card-section>
        <div class="text-h6">Patient <q-icon name="face" size="md"/> </div>
        <div class="text-subtitle2">{{res.patient.name}} {{res.patient.surname}}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{ res.patient.email }}
      </q-card-section>
    </q-card>
  </div>
  </div>
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
import pharmacyMedicinesService from './../services/PharmacyMedicinesService'
export default {
  data () {
    return {
      id: '',
      res: {},
      show: false,
      show2: false,
      persistent: true,
      model: 'start',
      editor: '',
      options: [{ label: 'None', value: null }],
      medicine: null,
      alergicMedicines: [],
      tab: 'report',
      splitterModel: 20,
      startDate: '',
      endDate: '',
      quantity: 1,
      checkText: 'Found',
      color: 'green',
      avaliable: false,
      alergicDialog: false
    }
  },
  async mounted () {
    this.res = await checkupService.getById(this.$route.params.id)
    this.alergicMedicines = await patientService.getAlergicMedicines(this.res.patient.id)
    var pharmacyMedicines = await pharmacyMedicinesService.getPharmacyMedicines('25fff0b2-ad45-4310-ac7f-96bcc5e517c1') //  fixed for now
    pharmacyMedicines.forEach(element => {
      var option = {}
      option.label = element.name
      option.value = element.id
      if (this.alergicMedicines.includes(element.name)) { option.disable = true }
      this.options.push(option)
    })
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
    },
    async checkMedicine () {
      var data = {
        medicineId: this.medicine.value,
        pharmacyId: '25fff0b2-ad45-4310-ac7f-96bcc5e517c1',
        medicineQuantity: this.quantity
      }
      var res = await pharmacyMedicinesService.checkAvaliable(data)
      if (res) {
        this.color = 'green'
        this.checkText = 'Medicine avaliable!'
        this.avaliable = true
      } else {
        this.color = 'red'
        this.checkText = 'Medicine not avaliable!'
        this.avaliable = false
      }
      this.show = true
    },
    finishCheckup () {
    }
  }
}
</script>
