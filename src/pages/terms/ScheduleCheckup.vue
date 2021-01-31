<template>
<div>
 <h4 class="text-primary text-center text-bold">Available checkups</h4>
  <q-page padding>
     <div class="q-pa-md q-gutter-md row justify-around">
         <checkup-card v-for="checkup in checkups" v-bind:key="checkup.id" :checkup="checkup"></checkup-card>
     </div>
  </q-page>
  </div>
</template>

<script>
import CheckupCard from './CheckupCard.vue'
import CheckupService from './../../services/CheckupService'

export default {
  components: { CheckupCard },
  async beforeMount () {
    this.checkups = await CheckupService.getAllCheckups()
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
