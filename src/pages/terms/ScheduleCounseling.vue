<template>
  <div class="q-pa-md">
    <!--<q-btn label="Reset" push color="white" text-color="primary" @click="step = 1" class="q-mb-md" />-->
    <q-stepper v-model="step" header-nav ref="stepper" color="primary" animated>
      <q-step
        :name="1"
        title="Enter desired time"
        icon="date_range"
        :done="step > 1"
        :header-nav="step > 1"
      >
        <h6 style="margin-bottom: 0px; margin-top: 5px">Start Time:</h6>
        <date-time-input
          v-model="startTime"
          :date="startTime"
          @datechange="(val) => (this.startTime = val)"
        />

        <h6 style="margin-bottom: 0px; margin-top: 5px">End time:</h6>
        <date-time-input
          v-model="endTime"
          :date="endTime"
          @datechange="(val) => (this.endTime = val)"
        />
        <q-stepper-navigation>
          <q-btn @click="enteredTimes" color="primary" label="Continue" />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="2"
        title="Select desired pharmacy"
        caption="Pharmacies available during selected times are listed below"
        icon="home_work"
        :done="step > 2"
        :header-nav="step > 2"
      >
        <q-select
          borderless
          v-model="pharmacySorting"
          :options="pharmacySortingOptions"
          label="Sort by"
          class="q-mb-lg"
          style="max-width: 150px"
          @input="sortPharmacies"
          v-if="availablePharmacies.length != 0"
        />
        <div
          style="
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            row-gap: 15px;
            column-gap: 15px;
          "
        >
          <counseling-pharmacy-card
            v-for="pharmacy in availablePharmacies"
            :key="pharmacy.id"
            :pharmacy="pharmacy"
            @chosenPharmacy="(value) => choosePharmacy(value)"
          />
        </div>
      </q-step>

      <q-step
        :name="3"
        title="Choose a pharmacist"
        icon="emoji_people"
        :header-nav="step > 3"
      >
        <q-select
          borderless
          v-model="pharmacistSorting"
          :options="pharmacistSortingOptions"
          label="Sort by"
          class="q-mb-lg"
          style="max-width: 150px"
          @input="sortPharmacists"
          v-if="availablePharmacists.length != 0"
        />
        <div
          style="
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            row-gap: 15px;
            column-gap: 15px;
          "
        >
          <counseling-pharmacist-card
            v-for="pharmacist in availablePharmacists"
            :key="pharmacist.id"
            :pharmacist="pharmacist"
            @chosenPharmacist="(value) => choosePharmacist(value)"
          />
        </div>
      </q-step>
    </q-stepper>
  </div>
</template>

<script>
import moment from "moment";
import DateTimeInput from "./../../components/DateTimeInput.vue";
import CounselingPharmacyCard from "./../../components/CounselingPharmacyCard";
import CounselingPharmacistCard from "./../../components/CounselingPharmacistCard";
import {
  startTimeBeforeEndTime,
  noPharmaciesAreAvailable,
  successfullyScheduled,
  schedulingError,
  alreadyScheduled,
} from "./../../notifications/terms";
import { badTimeRange } from "./../../notifications/datetime";
import CounselingService from "./../../services/CounselingService";

export default {
  components: {
    DateTimeInput,
    CounselingPharmacyCard,
    CounselingPharmacistCard,
  },
  created() {
    let today = new Date();
    this.startTime =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1 < 10
        ? "0" + (today.getMonth() + 1)
        : today.getMonth() + 1) +
      "-" +
      (today.getDate() < 10 ? "0" + today.getDate() : today.getDate()) +
      " " +
      (today.getHours() + 1 < 10
        ? "0" + (today.getHours() + 1)
        : today.getHours() + 1) +
      ":" +
      (today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes());
    this.endTime =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1 < 10
        ? "0" + (today.getMonth() + 1)
        : today.getMonth() + 1) +
      "-" +
      (today.getDate() < 10 ? "0" + today.getDate() : today.getDate()) +
      " " +
      (today.getHours() + 2 < 10
        ? "0" + (today.getHours() + 2)
        : today.getHours() + 2) +
      ":" +
      (today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes());
  },
  mounted() {
    this.patientId = this.$store.getters.getId;
  },
  data() {
    return {
      step: 1,
      startTime: null,
      endTime: null,
      availablePharmacies: [],
      availablePharmacists: [],
      patientId: "",
      pharmacySorting: "Mark Desc.",
      pharmacySortingOptions: [
        "Mark Desc.",
        "Mark Asc.",
        "Price Desc.",
        "Price Asc.",
      ],
      pharmacistSorting: "Mark Desc.",
      pharmacistSortingOptions: ["Mark Desc.", "Mark Asc."],
    };
  },
  methods: {
    sortPharmacies() {
      let sorting = this.pharmacySorting.split(" ");

      if (sorting[0] == "Mark") {
        if (sorting[1] == "Desc.") {
          this.availablePharmacies.sort(function (a, b) {
            if (a.mark > b.mark) return -1;
            if (a.mark < b.mark) return 1;

            return 0;
          });
        } else {
          this.availablePharmacies.sort(function (a, b) {
            if (a.mark > b.mark) return 1;
            if (a.mark < b.mark) return -1;

            return 0;
          });
        }
      } else {
        if (sorting[1] == "Desc.") {
          this.availablePharmacies.sort(function (a, b) {
            if (a.maxPrice > b.maxPrice) return -1;
            if (a.maxPrice < b.maxPrice) return 1;

            return 0;
          });
        } else {
          this.availablePharmacies.sort(function (a, b) {
            if (a.maxPrice > b.maxPrice) return 1;
            if (a.maxPrice < b.maxPrice) return -1;

            return 0;
          });
        }
      }
    },
    sortPharmacists() {
      let sorting = this.pharmacistSorting.split(" ");

      if (sorting[1] == "Desc.") {
        this.availablePharmacists.sort(function (a, b) {
          if (a.averageMark > b.averageMark) return -1;
          if (a.averageMark < b.averageMark) return 1;

          return 0;
        });
      } else {
        this.availablePharmacists.sort(function (a, b) {
          if (a.averageMark > b.averageMark) return 1;
          if (a.averageMark < b.averageMark) return -1;

          return 0;
        });
      }
    },
    async enteredTimes() {
      if (moment(this.endTime) < moment(this.startTime))
        startTimeBeforeEndTime();

      let fromTimeArray = this.startTime.split(" ");
      let fromTime =
        fromTimeArray[0] + "T" + fromTimeArray[1] + ":00.000+01:00";

      let toTimeArray = this.endTime.split(" ");
      let toTime = toTimeArray[0] + "T" + toTimeArray[1] + ":00.000+01:00";

      let response = await CounselingService.getAllAvailablePharmacies({
        fromTime,
        toTime,
      });

      if (response.status == 400) {
        badTimeRange();
      }

      if (response.status == 200) {
        this.availablePharmacies = response.data;
        if (this.availablePharmacies.length == 0) noPharmaciesAreAvailable();
        else {
          this.sortPharmacies();
          this.step = 2;
        }
      }
    },

    async choosePharmacy(id) {
      let fromTimeArray = this.startTime.split(" ");
      let fromTime =
        fromTimeArray[0] + "T" + fromTimeArray[1] + ":00.000+01:00";

      let toTimeArray = this.endTime.split(" ");
      let toTime = toTimeArray[0] + "T" + toTimeArray[1] + ":00.000+01:00";

      let response = await CounselingService.getAllAvailablePharmacistsInPharmacy(
        id,
        {
          fromTime,
          toTime,
        }
      );

      if (response.status == 200) {
        this.availablePharmacists = response.data;
        this.sortPharmacists();
        this.step = 3;
      }
    },

    async choosePharmacist(data) {
      let fromTimeArray = this.startTime.split(" ");
      let fromTime =
        fromTimeArray[0] + "T" + fromTimeArray[1] + ":00.000+01:00";

      let toTimeArray = this.endTime.split(" ");
      let toTime = toTimeArray[0] + "T" + toTimeArray[1] + ":00.000+01:00";

      let doctorId = data.id;
      let response = await CounselingService.scheduleCounseling({
        patientId: this.patientId,
        doctorId,
        fromTime,
        toTime,
      });

      if (response.status == 200) {
        successfullyScheduled("counseling", data.surname);
        setTimeout(
          () => this.$router.push({ path: "/patient/calendar" }),
          2500
        );
      } else if (response.status == 409) {
        alreadyScheduled();
      } else {
        schedulingError("counseling");
      }
    },
  },
};
</script>

<style>
</style>