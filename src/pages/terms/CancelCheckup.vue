<template>
  <q-page padding>
     <div class="row-xs-12 row-sm-4 row-md-3 row-lg-3">
         <checkup-card v-for="checkup in checkups" v-bind:key="checkup.id" :checkup="checkup"></checkup-card>
     </div>
  </q-page>
</template>

<script>
import CheckupCard from './CheckupCard.vue'
import CheckupService from './../../services/CheckupService'

export default {
  components: { CheckupCard },
  async beforeMount () {
    this.checkups = await CheckupService.getAllPatientsCheckups(this.$route.params.patientId)
  },
  data () {
    return {
      checkups: []
    }
  }
}
</script>

<style>

</style>
