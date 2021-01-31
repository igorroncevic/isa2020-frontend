<template>
  <q-page padding>
    <div
      style="margin: 0 0 1rem 0"
      class="row-xs-12 row-sm-4 row-md-3 row-lg-3"
    >
      <div class="text-h4">Pharmacy search</div>
    </div>
    <q-space />
    <div class="wrapper">
      <div class="q-pa-sm">
        <q-input
          style="width: 15rem"
          v-model="filter.name"
          label="Pharmacy name"
        />
      </div>
      <div class="q-pa-sm">
        <q-input
          v-model="filter.city"
          label="City"
          style="width: 10rem"
          class="inputClass"
        >
        </q-input>
      </div>
      <div class="q-pa-sm">
        <q-input
          style="width: 15rem"
          v-model.number="filter.minMark"
          type="number"
          min="1"
          max="5"
          label="Minimum average mark"
        />
      </div>
      <div class="q-pa-sm">
        <q-btn
          @click="filterPharmacies"
          style="margin-left: -1rem; margin-top: 0.5rem"
          color="primary"
          label="Filter"
        />
      </div>
    </div>
    <q-space />

    <div class="row-xs-12 row-sm-4 row-md-3 row-lg-3">
      <div class="text-h6 no-pharmacies">
        {{
          pharmacies.length == 0
            ? "There are no pharmacies that match your filter criteria."
            : ""
        }}
      </div>
      <div class="pharmacy-card">
        <pharmacy-card
          v-for="pharmacy in pharmacies"
          v-bind:key="pharmacy.id"
          :pharmacy="pharmacy"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import PharmacyCard from "./../components/PharmacyCard";
import PharmacyService from "./../services/PharmacyService";
import {errorFetchingData} from './../notifications/globalErrors'

export default {
  components: { PharmacyCard },
  async beforeMount() {
    let response = await PharmacyService.getAllFilteredPharmacies("");
    if(response.status === 200){
      this.pharmacies = [...response.data]
    }else{
      errorFetchingData()
    }
  },
  data() {
    return {
      pharmacies: [],
      filter: {
        name: null,
        minMark: null,
        city: null,
      },
    };
  },
  methods: {
    async filterPharmacies() {
      let filterQuery = "?";
      if (this.filter.name != null && this.filter.name != "")
        filterQuery += "name=" + this.filter.name + "&";
      if (this.filter.city != null && this.filter.city != "")
        filterQuery += "city=" + this.filter.city + "&";
      if (this.filter.minMark != null)
        filterQuery += "mark=" + this.filter.minMark + "&";

      filterQuery = filterQuery.substr(0, filterQuery.length - 1);


      let response = await PharmacyService.getAllFilteredPharmacies(
        filterQuery
      );

      if(response.status == 200){
        this.pharmacies = response.data
      }else{
        if(response.status == 500) errorFetchingData()
        this.pharmacies = []
      }
    },
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

.pharmacy-card {
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