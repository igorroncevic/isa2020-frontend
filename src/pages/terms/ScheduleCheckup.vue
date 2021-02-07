<template>
<div>
 <h4 class="text-primary text-center text-bold">Available checkups</h4>
  <q-page padding>
     <div class="q-pa-md q-gutter-md row justify-around">
         <term-card v-for="checkup in checkups" v-bind:key="checkup.id" :term="checkup"></term-card>
     </div>
  </q-page>
  </div>
</template>

<script>
import TermCard from './../../components/TermCard'
import CheckupService from './../../services/CheckupService'

export default {
  components: { TermCard },
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
