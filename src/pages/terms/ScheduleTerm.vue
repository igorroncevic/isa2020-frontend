<template>
  <q-page padding>
     <div class="row-xs-12 row-sm-4 row-md-3 row-lg-3">
         <term-card v-for="term in terms" v-bind:key="term.id" :term="term"></term-card>
     </div>
  </q-page>
</template>

<script>
import TermCard from "./TermCard.vue";
import TermService from "./../../services/TermService";

export default {
  components: { TermCard },
  async beforeMount(){
     this.terms = await TermService.getAllTerms(this.$route.query.type);
  },
  data() {
    return {
      terms: [
        /*{
          id: "1d96a5d6-f5f6-4a74-9208-109991010f31",
          start: "2021-02-28 12:25",
          end: "2021-02-28 13:00",
          doctor: "Pera Peric", 
          type:"Checkup"
        },
        {
          id: "0988b5b2-1d09-47ad-ace7-45282f11e24b",
          start: "2021-02-28 13:05",
          end: "2021-02-28 13:35",
          doctor: "Pera Peric",
          type:"Checkup"
        },
        {
          id: "43501e13-caf6-4d98-a69a-db0178c582e9",
          start: "2021-02-28 14:05",
          end: "2021-02-28 14:35",
          doctor: "Pera Peric",
          type:"Checkup"
        },*/
      ],
    };
  },
};
</script>

<style>
</style>