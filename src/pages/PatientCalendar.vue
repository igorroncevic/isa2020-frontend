<template>
  <q-page>
    <div class="patient-history-wrapper">
      <div class="patient-history-title text-h4 q-mt-lg q-ml-lg">
        Upcoming Terms
      </div>
      <div class="past-checkups">
        <div class="text-h5 title">Checkups</div>
        <div class="text-caption1 sorting">
          <q-select
            borderless
            v-model="checkupSorting"
            :options="sortingOptions"
            label="Sort by"
            @input="sortPaginateCheckup"
          />
          <q-btn
            flat
            color="red"
            label="Cancel"
            @click="cancelCheckups = !cancelCheckups"
          />
        </div>
        <div class="list">
          <term-card
            v-for="checkup in checkups"
            :key="checkup.id"
            :term="checkup"
            :cancelling="cancelCheckups"
          />
          <div
            v-if="checkups.length == 0"
            class="text-subtitle1 font-weight-medium"
            style="margin: 0 auto"
          >
            You had no upcoming checkups.
          </div>
        </div>
        <div class="paging">
          <q-pagination
            v-if="checkups.length != 0"
            v-model="currentCheckupPage"
            :max="checkupPages"
            :direction-links="true"
            @input="sortPaginateCheckup"
          >
          </q-pagination>
        </div>
      </div>

      <div id="scheduling-btns">
        <q-btn
          color="primary"
          label="Schedule Checkup"
          @click="moveToScheduleCheckup"
        />
        <q-btn
          color="primary"
          label="Schedule Counseling"
          @click="moveToScheduleCounseling"
        />
      </div>

      <div class="past-counselings">
        <div class="text-h5 title">Counselings</div>
        <div class="text-caption1 sorting">
          <q-select
            borderless
            v-model="counselingSorting"
            :options="sortingOptions"
            label="Sort by"
            @input="sortPaginateCounseling"
          />
          <q-btn
            flat
            color="red"
            label="Cancel"
            @click="cancelCounselings = !cancelCounselings"
          />
        </div>
        <div class="list">
          <term-card
            v-for="counseling in counselings"
            :key="counseling.id"
            :term="counseling"
            :cancelling="cancelCounselings"
          />
          <div
            v-if="counselings.length == 0"
            class="text-subtitle1 font-weight-medium"
            style="margin: 0 auto"
          >
            You had no upcoming counselings.
          </div>
        </div>
        <div class="paging">
          <q-pagination
            v-if="counselings.length != 0"
            v-model="currentCounselingPage"
            :max="counselingPages"
            :direction-links="true"
            @input="sortPaginateCounseling"
          >
          </q-pagination>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import TermCard from "./../components/TermCard";
import CounselingService from "./../services/CounselingService";
import CheckupService from "./../services/CheckupService";

export default {
  components: { TermCard },
  async beforeMount() {
    let counselingResponse = await CounselingService.getAllPatientsUpcomingCounselingsPaginated(
      {
        id: this.patientId,
        sort: this.transformSortParameter(this.counselingSorting),
        page: this.currentCounselingPage,
        termType: "counseling",
      }
    );

    if (counselingResponse.status == 200) {
      this.counselings = [...counselingResponse.data.terms];
      this.counselingPages = counselingResponse.data.totalPages;
    }

    let checkupResponse = await CheckupService.getAllPatientsUpcomingCheckupsPaginated(
      {
        id: this.patientId,
        sort: this.transformSortParameter(this.checkupSorting),
        page: this.currentCheckupPage,
        termType: "checkup",
      }
    );

    if (checkupResponse.status == 200) {
      this.checkups = [...checkupResponse.data.terms];
      this.checkupPages = checkupResponse.data.totalPages;
    }

    this.$nextTick(() => this.$forceUpdate());
  },
  data() {
    return {
      patientId: "cc6fd408-0084-420b-8078-687d8a72744b",
      checkupSorting: "Date Desc.",
      counselingSorting: "Date Desc.",
      sortingOptions: [
        "Date Desc.",
        "Date Asc.",
        "Price Desc.",
        "Price Asc.",
        //"Duration Desc.",
        //"Duration Asc.",
      ],
      currentCheckupPage: 1,
      currentCounselingPage: 1,
      checkupPages: 2,
      counselingPages: 3,
      checkups: [],
      counselings: [],
      cancelCheckups: false,
      cancelCounselings: false,
    };
  },
  methods: {
    async sortPaginateCheckup() {
      if (
        (this.checkups.length == 0 || this.checkups.length == 1) &&
        this.checkupPages == 1
      )
        return; // Da se ne salju zahtjevi bezveze

      let checkupResponse = await CheckupService.getAllPatientsUpcomingCheckupsPaginated(
        {
          id: this.patientId,
          sort: this.transformSortParameter(this.checkupSorting),
          page: this.currentCheckupPage,
          termType: "checkup",
        }
      );

      if (checkupResponse.status == 200) {
        this.checkups = [...checkupResponse.data.terms];
        this.checkupPages = checkupResponse.data.totalPages;
      }

      console.log(this.checkups);
    },
    async sortPaginateCounseling() {
      if (
        (this.counselings.length == 0 || this.counselings.length == 1) &&
        this.counselingPages == 1
      )
        return; // Da se ne salju zahtjevi bezveze

      let counselingResponse = await CounselingService.getAllPatientsUpcomingCounselingsPaginated(
        {
          id: this.patientId,
          sort: this.transformSortParameter(this.counselingSorting),
          page: this.currentCounselingPage,
          termType: "counseling",
        }
      );

      if (counselingResponse.status == 200) {
        this.counselings = [...counselingResponse.data.terms];
        this.counselingPages = counselingResponse.data.totalPages;
      }
    },
    transformSortParameter(parameter) {
      if (parameter.includes("Date")) {
        let parts = parameter.split(" ");
        return "startTime " + parts[1];
      } else {
        return parameter.toLowerCase();
      }
    },
    moveToScheduleCheckup() {
      this.$router.push({ path: "schedule/checkups" });
    },
    moveToScheduleCounseling() {
      this.$router.push({ path: "schedule/counselings" });
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
  column-gap: -10px;
}

.patient-history-title {
  grid-row: 1;
  grid-column: 1/5;
}

.past-checkups {
  grid-row: 2;
  grid-column: 2/5;
  display: grid;
  grid-template-columns: auto 12rem;
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
  display: flex;
  flex-direction: row;
}

#scheduling-btns {
  grid-row: 1;
  grid-column: 7/10;
  display: flex;
  flex-direction: row;
  max-height: 2.5rem;
  justify-content: space-evenly;
  margin-top: 1.25rem;
}

.past-counselings {
  grid-row: 2;
  grid-column: 6/9;
  display: grid;
  grid-template-columns: auto 12rem;
  grid-template-rows: 2rem auto 2rem;
  row-gap: 30px;
}
</style>