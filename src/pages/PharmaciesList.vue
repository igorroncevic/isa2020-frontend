<template>
  <q-page padding>
    <div class="row-xs-12 row-sm-4 row-md-3 row-lg-3">
        {{pharmacies.length == 0 ? "There are no pharmacies that match your filter criteria." : ""}}
      <pharmacy-card
        v-for="pharmacy in pharmacies"
        v-bind:key="pharmacy.id"
        :pharmacy="pharmacy"
      />
    </div>
    <q-space />
    <div class="q-pa-sm">
      <q-btn
        round
        color="red"
        icon="highlight_off"
        @click="removeFilters"
        v-show="filtersActive"
      />
    </div>
    <div class="q-pa-sm">
      <q-input
        v-model="filter.name"
        label="Pharmacy name"
        style="max-width: 300px"
      />
    </div>
    <div class="q-pa-sm">
      <q-input v-model="filter.city" label="City" style="max-width: 300px">
      </q-input>
    </div>
    <div class="q-pa-sm">
      <q-input
        v-model.number="filter.minMark"
        type="number"
        min="1"
        max="5"
        label="Minimum average mark"
        style="max-width: 300px"
      />
    </div>
    <div class="q-pa-sm">
      <q-btn @click="filterPharmacies" color="primary" label="Filter" />
    </div>
  </q-page>
</template>

<script>
import PharmacyCard from "./../components/PharmacyCard";
import PharmacyService from "./../services/PharmacyService";

export default {
  components: { PharmacyCard },
  async beforeMount() {
    this.pharmacies = await PharmacyService.getAllFilteredPharmacies("");
  },
  data() {
    return {
      pharmacies: [],
      filter: {
        name: null,
        minMark: null,
        city: null,
      },
      filtersActive: false,
    };
  },
  methods: {
      async filterPharmacies(){
          let filterQuery = "?";
          if(this.filter.name != null) filterQuery += "name=" + this.filter.name + "&"
          if(this.filter.city != null) filterQuery += "city=" + this.filter.city + "&"
          if(this.filter.minMark != null) filterQuery += "mark=" + this.filter.minMark + "&"

          filterQuery = filterQuery.substr(0, filterQuery.length - 1)

          this.pharmacies = await PharmacyService.getAllFilteredPharmacies(filterQuery)
      }
  }
};
</script>

<style>
</style>