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
        <counseling-pharmacy-card
          v-for="pharmacy in availablePharmacies"
          :key="pharmacy.id"
          :pharmacy="pharmacy"
          @chosenPharmacy="(value) => choosePharmacy(value)"
        />
      </q-step>

      <q-step
        :name="3"
        title="Choose a pharmacist"
        icon="emoji_people"
        :header-nav="step > 3"
      >
        <counseling-pharmacist-card
          v-for="pharmacist in availablePharmacists"
          :key="pharmacist.id"
          :pharmacist="pharmacist"
          @chosenPharmacist="(value) => choosePharmacist(value)"
        />
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
  data() {
    return {
      step: 1,
      startTime: null,
      endTime: null,
      availablePharmacies: [],
      availablePharmacists: [],
    };
  },
  methods: {
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
        else this.step = 2;
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
        this.step = 3;
      }
    },

    async choosePharmacist(data) {
      let fromTimeArray = this.startTime.split(" ");
      let fromTime =
        fromTimeArray[0] + "T" + fromTimeArray[1] + ":00.000+01:00";

      let toTimeArray = this.endTime.split(" ");
      let toTime = toTimeArray[0] + "T" + toTimeArray[1] + ":00.000+01:00";

      let patientId = "cc6fd408-0084-420b-8078-687d8a72744b";
      let doctorId = data.id;
      let response = await CounselingService.scheduleCounseling({
        patientId,
        doctorId,
        fromTime,
        toTime,
      });

      if (response.status == 200) {
        successfullyScheduled("counseling", data.surname);
        setTimeout(() => this.$router.push({ path: "/" }), 2500);
      } else schedulingError("counseling");
    },
  },
};
</script>

<style>
</style>