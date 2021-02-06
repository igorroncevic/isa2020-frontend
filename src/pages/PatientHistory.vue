<template>
  <q-page>
    <div class="patient-history-wrapper">
      <div class="patient-history-title text-h4 q-mt-lg q-ml-lg">
        Term History
      </div>
      <div class="past-checkups">
        <div class="text-h5 title">Past Checkups</div>
        <div class="text-caption1 sorting">
          <q-select
            borderless
            v-model="checkupSorting"
            :options="sortingOptions"
            label="Sort by"
          />
        </div>
        <div class="list">
          <checkup-card
          
            :scheduling="true"
            v-for="checkup in checkups"
            :key="checkup.id"
            :checkup="checkup"
          />
          <div
            v-if="checkups.length == 0"
            class="text-subtitle1 font-weight-medium"
            style="margin: 0 auto"
          >
            You had no previous checkups.
          </div>
        </div>
        <div class="paging">
          <q-pagination
          v-if="checkups.length != 0"
            v-model="currentCheckupPage"
            :max="checkupPages"
            :direction-links="true"
            @input="changeCheckupPage"
          >
          </q-pagination>
        </div>
      </div>
      <div class="past-counselings">
        <div class="text-h5 title">Past Counselings</div>
        <div class="text-caption1 sorting">
          <q-select
            borderless
            v-model="counselingSorting"
            :options="sortingOptions"
            label="Sort by"
          />
        </div>
        <div class="list">
          <div
            v-if="counselings.length == 0"
            class="text-subtitle1 font-weight-medium"
            style="margin: 0 auto"
          >
            You had no previous counselings.
          </div>
        </div>
        <div class="paging">
          <q-pagination
            v-if="counselings.length != 0"
            v-model="currentCounselingPage"
            :max="counselingPages"
            :direction-links="true"
            @input="changeCounselingPage"
          >
          </q-pagination>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import CheckupCard from "./../components/CheckupCard";
import CounselingCard from "./../components/CounselingCard";

export default {
  components: { CheckupCard, CounselingCard },
  data() {
    return {
      checkupSorting: "Date Desc.",
      counselingSorting: "Date Desc.",
      sortingOptions: [
        "Date Desc.",
        "Date Asc.",
        "Price Desc.",
        "Price Asc.",
        "Duration Desc.",
        "Duration Asc.",
      ],
      currentCheckupPage: 1,
      currentCounselingPage: 1,
      checkupPages: 2,
      counselingPages: 3,
      checkups: [
        {
          id: 1,
          startTime: Date.now(),
          endTime: Date.now(),
          doctor: { name: "Pera", surname: "Peric" },
        },
        {
          id: 2,
          startTime: Date.now(),
          endTime: Date.now(),
          doctor: { name: "Pera", surname: "Peric" },
        },
        {
          id: 3,
          startTime: Date.now(),
          endTime: Date.now(),
          doctor: { name: "Pera", surname: "Peric" },
        },
      ],
      counselings: [],
    };
  },
  methods: {
    changeCheckupPage() {
      console.log(this.currentCheckupPage);
    },
    changeCounselingPage() {
      console.log(this.currentCounselingPage);
    },
  },
};
</script>

<style scoped>
.patient-history-wrapper {
  display: grid;
  grid-template-columns: repeat(10, 11%);
  grid-template-rows: 4rem auto;
  row-gap: 3rem;
}

.patient-history-title {
  grid-row: 1;
  grid-column: 1/5;
}

.past-checkups {
  grid-row: 2;
  grid-column: 2/5;
  display: grid;
  grid-template-columns: auto 7rem;
  grid-template-rows: 2rem auto 2rem;
  row-gap: 30px;
}

.title {
  grid-row: 1;
  grid-column: 1;
}

.list {
  grid-row: 2;
  grid-column: 1;
  display: grid;
  grid-gap: 10px;
}

.paging {
  grid-row: 3;
  grid-column: 1;
  margin: 0 auto;
}

.sorting {
  grid-row: 1;
  grid-column: 2;
}

.past-counselings {
  grid-row: 2;
  grid-column: 6/9;
  display: grid;
  grid-template-columns: auto 7rem;
  grid-template-rows: 2rem auto 2rem;
  row-gap: 30px;
}
</style>