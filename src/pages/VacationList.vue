<template>
  <q-page padding>
    <div
      style="margin: 0 0 2rem 0"
      class="row-xs-12 row-sm-4 row-md-3 row-lg-3"
    >
      <div class="text-h4">Vacations</div>
    </div>

    <div class="row-xs-12 row-sm-4 row-md-3 row-lg-3">

      <div class="vacation-card">
        <vacation-card
          v-on:refresh_vacations="refreshData"
          v-for="vacation in vacations"
          v-bind:key="vacation.id"
          :vacation="vacation"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import VacationCard from "./../components/VacationCard";
import VacationService from "./../services/VacationService";
import {errorFetchingData} from './../notifications/globalErrors'

export default {
  components: { VacationCard },
  async beforeMount() {
    let response = await VacationService.getAllPendingVacations();
    if(response.status === 200){
      this.vacations = [...response.data]
    }else{
      errorFetchingData()
    }
  },
  data() {
    return {
      vacations: [],
    };
  },
  methods: {
    async refreshData(event) {
      let response = await VacationService.getAllPendingVacations();
      if(response.status === 200){
        this.vacations = [...response.data]
      }else{
        errorFetchingData()
      } 
    }
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  width: 66%;
  flex-direction: row;
  justify-content: space-evenly;
}

.vacation-card {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: -2rem;
}

.no-pharmacies{
  width: 50%;
  position: relative;
  left: 30%;
  margin-top: 2rem;
}
</style>