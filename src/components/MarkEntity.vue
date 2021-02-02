<template>
  <q-card class="mark-card row full-height q-pm-lg" flat bordered>
    <q-card-section horizontal>
      <q-card-section class="q-pt-xs">
        <div class="text-h5 q-mt-sm q-mb-xs">
            {{cardTitle}}
        </div>
        <div class="text-body4" v-for="point in description" :key = point>
            {{point}}
        </div>
      </q-card-section>
    </q-card-section>

    <q-separator v-if="markingStep != 3"></q-separator>

    <q-card-actions>
      <q-btn
       v-if="markingStep != 3"
        @click="selectedForMarking"
        flat
        icon="done_all"
        label="Mark"
        color="primary"
      ></q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  props: {
    entity: {
      type: Object,
    },
    selectedType:{
      type: String,
    },
    markingStep:{
      type: Number
    }
  },
  beforeMount() {
      if(this.selectedType == "Dermatologist" || this.selectedType == "Pharmacist"){
          // Entity for marking is a dermatologist or a pharmacist
          this.cardTitle = `dr. ${this.entity.name} ${this.entity.surname}`
          this.description.push(`Average mark: ${this.entity.averageMark}`)
      } if(this.selectedType == "Medicine"){
          this.cardTitle = this.capitalize(this.entity.name);
          this.description.push(`Loyalty points: ${this.entity.loyaltyPoints}`)
      } else if(this.selectedType == "Pharmacy"){
          this.cardTitle = `${this.entity.name}`
          this.description.push(this.entity.street + ", " + this.entity.city + ", " + this.entity.country)
          let averageMark = this.entity.mark == 0 ? "Not marked yet" : this.entity.mark;
          this.description.push(`Average mark: ${averageMark}`)
      }
  },
  data(){
      return{
          description: [],
          cardTitle: ""
      }
  },
  methods: {
    selectedForMarking() {
      this.$emit("chosenEntity", this.entity.id);
    },
    capitalize (s) {
      if (typeof s !== 'string') return ''
      return s.charAt(0).toUpperCase() + s.slice(1)
    }
  },
};
</script>

<style scoped>
.mark-card {
  width: 40%;
  max-width: 40%;
}
</style>