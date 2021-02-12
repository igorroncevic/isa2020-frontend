<template>
     <div class="q-mt-lg q-pa-md q-ml-md row justify-around q-gutter-lg">
        <q-card class="my-card" style="width:400px">
            <q-card-section>
                <div class="row">
                <div class="col-3">
                    <q-img src="./../assets/pictures/pills.png"
                        height="65px"
                        width="65px"
                    />
                </div>
                <div class="col-9 q-mt-md">
                    <div class="text-h5 text-start text-primary"> {{ medicine.name }} details</div>
                </div>
            </div>
            </q-card-section>
        <q-separator></q-separator>
            <q-card-section>
                <div class="q-pa-md row">
                    <div class="col-6">
                        <label class="text-primary text-subtitle2">Medicine type:</label>
                    </div>
                    <div class="col-6">
                        {{ medicine.medicineType }}
                    </div>
                </div>
                <div class="q-pa-md row">
                    <div class="col-6">
                        <label class="text-primary text-subtitle2">Medicine mark:</label>
                    </div>
                    <div class="col-6">
                        {{ medicine.mark }}
                    </div>
                </div>
            </q-card-section>
            <q-separator></q-separator>
            <q-card-section>
                <div>
                    <q-btn icon-right="list" unelevated @click="specDialog = true" type="submit" color="primary" class="full-width text-white" label="Medicine specification" />
                 </div>
            </q-card-section>
        </q-card>

        <q-dialog v-model="specDialog">
            <q-card class="my-card" style="width:500px">
            <q-card-section class="row items-center q-pb-none">
                <div class="text-h6">Specification</div>
                <q-space></q-space>
                <q-btn icon="close" flat round dense v-close-popup></q-btn>
            </q-card-section>
            <q-card-section>
                <div class="q-pa-md row">
                    <div class="col-6">
                        <label class="text-primary text-subtitle2">Replacement medicine:</label>
                    </div>
                    <div class="col-6">
                        {{ medicine.replacementMedicine }}
                    </div>
                </div>
                <div class="q-pa-md row">
                    <div class="col-6">
                        <label class="text-primary text-subtitle2">Recommended dose per day:</label>
                    </div>
                    <div class="col-6">
                        {{ medicine.recommendedDose}}
                    </div>
                </div>
                <div class="q-pa-md row">
                    <div class="col-6">
                        <label class="text-primary text-subtitle2">Contraindications:</label>
                    </div>
                    <div class="col-6">
                        {{ medicine.contraindications }}
                    </div>
                </div>
                <div class="q-pa-md row">
                    <div class="col-6">
                        <label class="text-primary text-subtitle2">Medicine composition:</label>
                    </div>
                    <div class="col-6">
                        {{ medicine.drugComposition }}
                    </div>
                </div>
                <div class="q-pa-md row">
                    <div class="col-6">
                        <label class="text-primary text-subtitle2">Additional notes:</label>
                    </div>
                    <div class="col-6">
                        {{ medicine.additionalNotes }}
                    </div>
                </div>
            </q-card-section>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>

export default {
  props: {
    medicine: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      specDialog: false,
      inputData: false,
      medicineSpec: {},
      pagination: {
        rowsPerPage: 100 // current rows per page being displayed
      }
    }
  }
}
</script>
