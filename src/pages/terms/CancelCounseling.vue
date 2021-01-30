<template>
  <q-page padding>
    <div class="row-xs-12 row-sm-4 row-md-3 row-lg-3">
      <counseling-card
        v-for="counseling in counselings"
        v-bind:key="counseling.id"
        :counseling="counseling"
      />
    </div>
  </q-page>
</template>

<script>
import CounselingCard from "./../../components/CounselingCard";
import CounselingService from "./../../services/CounselingService";

export default {
  components: { CounselingCard },
  async beforeMount() {
    this.counselings = await CounselingService.getAllPatientsCounselings(
      this.$route.params.patientId
    );
  },
  data() {
    return {
      counselings: [],
    };
  },
};
</script>

<style>
</style>
