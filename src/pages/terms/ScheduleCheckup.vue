<template>
  <div>
    <h4 class="text-primary text-center text-bold">Available checkups</h4>
    <q-page padding>
      <div class="q-pa-md q-gutter-md checkup-cards-flow">
        <term-card
          v-for="checkup in checkups"
          v-bind:key="checkup.id"
          :term="checkup"
          :scheduling="true"
        ></term-card>
      </div>
    </q-page>
  </div>
</template>

<script>
import TermCard from "./../../components/TermCard";
import CheckupService from "./../../services/CheckupService";

export default {
  components: { TermCard },
  async beforeMount() {
    this.checkups = await CheckupService.getAllCheckups();
  },
  data() {
    return {
      checkups: [],
    };
  },
};
</script>

<style scoped>
.checkup-cards-flow {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  column-gap: 2rem;
  row-gap: 2rem;
}
</style>
