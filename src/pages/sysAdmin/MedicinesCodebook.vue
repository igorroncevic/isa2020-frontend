<template>
    <div class="q-pa-md q-ml-xl" style="width:1000px">
        <div class="row justify-center">
            <h4 class="text-bold text-primary">Enter medicine data</h4>
        </div>
        <q-form @submit="onSubmit">
        <div class="row justify-center">
            <div class="col-xs-12 col-sm-6 col-md-4 q-pa-md">
            <q-input
                filled
                v-model="medicineName"
                label="Medicine name *"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please input medicine name']"/>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4 q-pa-md">
            <q-input
                filled
                v-model="medicineCode"
                label="Medicine code *"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please input medicine code']"/>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4 q-pa-md">
            <q-select
                filled
                v-model="medicineType"
                :options="medicineTypes"
                label="Medicine type *"
                lazy-rules
                :rules="[ val => val && val !== null || 'Please choose medicine type']"
            />
            </div>
        </div>
        <div class="row justify-center">
            <div class="col-xs-12 col-sm-6 col-md-4 q-pa-md">
            <q-select
                filled
                v-model="medicineForm"
                :options="medicineForms"
                label="Medicine form *"
                lazy-rules
                :rules="[ val => val && val !== null || 'Please choose medicine form']"
            />
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4 q-pa-md">
            <q-select
                filled
                v-model="medicineManufacturer"
                :options="medicineManufacturers"
                label="Medicine manufacturer *"
                lazy-rules
                :rules="[ val => val && val !== null || 'Please choose medicine manufacturer']"
            />
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4 q-pa-md">
            <q-select
                filled
                v-model="issuingRegime"
                :options="issuingRegimes"
                label="Medicine issuing regime *"
                lazy-rules
                :rules="[ val => val && val !== null || 'Please choose medicine issuing regime']"
            />
            </div>
        </div>
        <div class="row justify-start">
            <div class="col-xs-12 col-sm-12 col-md-4 q-pa-md">
                <q-input
                    filled
                    type="number"
                    label="Loyalty points *"
                    v-model="loyaltyPoints"
                    lazy-rules
                    :rules="[ val => val !== null && val !== '' || 'Input loyalty points',
                              val => val && val.length > 0 || 'Please input loyalty points'
                            ]"
                />
            </div>
        </div>
        <div class="text-h4 text-bold text-primary text-center">Medicine specification</div>
            <div class="row justify-center">
                <div class="col-xs-12 col-sm-12 col-md-6 q-pa-md">
                    <q-input
                        filled
                        label="Replacement medicine*"
                        v-model="replacementMedicine"
                        style="width:425px"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Please input your replacement medicine']"
                    />
               </div>
                <div class="col-xs-12 col-sm-12 col-md-6 q-pa-md">
                    <q-input
                        filled
                        type="number"
                        label="Recommended dose per day*"
                        v-model="recommendedDose"
                        style="width:425px"
                        lazy-rules
                        :rules="[ val => val !== null && val !== '' || 'Input recommended dose per day',
                                  val => val && val.length > 0 || 'Please input recommended dose per day'
                                ]"
                    />
                </div>
            </div>
            <div class="row justify-center">
                <div class="col-xs-12 col-sm-12 col-md-6 q-pa-md">
                    <q-input
                        v-model="contraindications"
                        filled
                        clearable
                        type="textarea"
                        label="Contraindications"

                    />
                </div>
                <div class="col-xs-12 col-sm-12 col-md-6 q-pa-md">
                    <q-input
                        v-model="drugComposition"
                        filled
                        clearable
                        type="textarea"
                        label="Drug composition"

                    />
                </div>
                <div class="col-xs-12 col-sm-12 col-md-6 q-pa-md">
                    <q-input
                        v-model="additionalNotes"
                        filled
                        clearable
                        type="textarea"
                        label="Additional notes"
                    />
                </div>
             </div>

        <div class="row justify-center q-mt-lg">
            <q-btn
                unelevated
                type="submit"
                size="lg"
                color="primary"
                class="text-white"
                style="width:500px"
                label="Add new medicine" />
        </div>
        </q-form>
    </div>
</template>

<script>
import MedicinesService from './../../services/MedicinesService'
import {
  successfullyAddedMedicine,
  registrationError
} from './../../notifications/sysAdmin'

export default {
  data () {
    return {
      medicineName: '',
      medicineCode: '',
      medicineType: '',
      medicineTypes: ['herbal_medicine', 'biological_medicine', 'homeopathic_medicine', 'human_medicine', 'traditional_herbal_medicine', 'vaccine'],
      medicineForm: '',
      medicineForms: ['liquid', 'capsule', 'tablet', 'topical_medicines', 'suppositories', 'drops', 'inhalers', 'injections', 'buccal_medicines'],
      medicineManufacturer: '',
      medicineManufacturers: ['Hemofarm', 'Galenika', 'Zdravlje', 'Inpharm', 'Sanofi', 'Pfizer', 'MaxMedica', 'EkoFarm', 'Alkaloid', 'Bayer', 'Zambon'],
      issuingRegime: '',
      issuingRegimes: ['with_prescription', 'without_prescription'],
      loyaltyPoints: '',
      replacementMedicine: '',
      recommendedDose: '',
      contraindications: '',
      drugComposition: '',
      additionalNotes: ''
    }
  },
  methods: {
    async onSubmit () {
      const medicineData = {
        medicineName: this.medicineName,
        medicineCode: this.medicineCode,
        medicineType: this.medicineType,
        medicineForm: this.medicineForm,
        medicineManufacturer: this.medicineManufacturer,
        issuingRegime: this.issuingRegime,
        loyaltyPoints: this.loyaltyPoints,
        replacementMedicine: this.replacementMedicine,
        recommendedDose: this.recommendedDose,
        contraindications: this.contraindications,
        drugComposition: this.drugComposition,
        additionalNotes: this.additionalNotes
      }
      const success = await MedicinesService.saveNewMedicine(medicineData)

      if (success) {
        successfullyAddedMedicine()
      } else {
        registrationError()
      }
    }
  }
}
</script>
