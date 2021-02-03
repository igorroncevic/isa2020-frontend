<template>
  <q-page padding>
    <div
      style="margin: 0 0 2rem 0"
      class="row-xs-12 row-sm-4 row-md-3 row-lg-3"
    >
      <div class="text-h4">Vacations</div>
      <div>
        <q-select v-model="statusSelected" :options="options" label="Status" style="max-width: 200px" @input="onValueChange()"/>
      </div>
    </div>

    <div class="row-xs-12 row-sm-4 row-md-3 row-lg-3">

      <div class="vacation-card">
        <div class="text-h6 no-vacations">
          {{
            displayData.length == 0 ? "There are no vacations requests" : ""
          }}
        </div>
        <vacation-card
          v-on:refresh_vacations="refreshPending"
          v-for="vacation in displayData"
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
  beforeMount() {
    this.refreshPending(null)
  },
  data() {
    return {
      displayData: [],
      pending: [],
      approved: [],
      refused: [],
      options: [
        "Pending",
        "Approved",
        "Refused"
      ],
      statusSelected: "Pending",
    };
  },
  methods: {
    async refreshPending(event) {
      let response = await VacationService.getAllPendingVacations();
      if(response.status === 200){
        this.pending = [...response.data]
        this.displayData = this.pending
      }else{
        errorFetchingData()
      } 
    },
    async refreshApproved() {
      let response = await VacationService.getAllApprovedVacations();
      if(response.status === 200){
        this.approved = [...response.data]
        this.displayData = this.approved
      }else{
        errorFetchingData()
      } 
    },
    async refreshRefused() {
      let response = await VacationService.getAllRefusedVacations();
      if(response.status === 200){
        this.refused = [...response.data]
        this.displayData = this.refused
      }else{
        errorFetchingData()
      } 
    },
    onValueChange() {
      console.log(this.statusSelected)
      if(this.statusSelected == 'Pending') {
        this.refreshPending(null)
      } else if(this.statusSelected == 'Approved') {
        this.refreshApproved()
      } else if(this.statusSelected == 'Refused'){
        this.refreshRefused()
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
</style>