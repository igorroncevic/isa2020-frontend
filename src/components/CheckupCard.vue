<template>
  <q-card class="my-card" flat bordered>
    <q-card-section vertical>
      <q-card-section>
        <div class="text-h5 text-primary text-weight-medium">Checkup</div>
      </q-card-section>
      <q-separator></q-separator>
      <q-card-section>
        <div class="text-body1">
          <span class="text-primary text-weight-medium"> Start: </span> {{ dateFormat(checkup.startTime) }} <br />
          <span class="text-primary text-weight-medium"> End: </span> {{ dateFormat(checkup.endTime) }} <br />
          <span class="text-primary text-weight-medium"> Doctor: </span> {{ checkup.doctor.name }}
          {{ checkup.doctor.surname }} <br />
        </div>

        <div
          class="q-ml-md q-mt-sm q-mb-md relative-position float-right"
          v-if="scheduling || cancelling"
        >
          <q-btn
            outline
            v-if="scheduling"
            @click="scheduleCheckup"
            icon="event"
            label="Schedule"
            color="primary"
          ></q-btn>
          <q-btn
            v-if="cancelling"
            @click="cancelCheckup"
            flat
            icon="cancel_schedule_send"
            label="Cancel"
            color="red"
          ></q-btn>
        </div>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script>
import moment from "moment";

import CheckupService from "./../services/CheckupService";
import {
  successfullyScheduled,
  schedulingError,
  successfullyCancelled,
  cancellingError,
} from "./../notifications/terms";

export default {
  props: ["checkup", "scheduling", "cancelling"],
  data() {
    return {
      patientId: "5ffe884f-9cd8-42f5-adc4-2a27cd8d2737",
    };
  },
  mounted() {
    this.checkup.startTime = this.dateFormat(this.checkup.startTime);
    this.checkup.endTime = this.dateFormat(this.checkup.endTime);
  },
  methods: {
    async scheduleCheckup() {
      const checkupData = {
        patientId: this.patientId,
        checkupId: this.checkup.id,
      };
      console.log(checkupData);
      const success = await CheckupService.scheduleCheckup(checkupData);

      if (success) {
        successfullyScheduled("checkup", this.checkup.doctor.surname);
      } else {
        schedulingError("checkup");
      }
      setTimeout(() => this.$router.go(), 2000);
    },

    async cancelCheckup() {
      const checkupData = {
        patientId: this.patientId,
        checkupId: this.checkup.id,
      };
      const success = await CheckupService.cancelCheckup(checkupData);

      if (success) {
        successfullyCancelled(this.checkup.type, this.checkup.doctor.surname);
      } else {
        cancellingError(this.checkup.type);
      }
      setTimeout(() => this.$router.go(), 2000);
    },

    dateFormat(date) {
      return moment(date).format("LT LL");
    },
    capitalize(s) {
      if (typeof s !== "string") return "";
      return s.charAt(0).toUpperCase() + s.slice(1);
    },
  },
};
</script>

<style>
.my-card {
  width: 90%;
  max-width: 10rem;
}

.q-card__section--vert {
  padding: 8px !important;
}
</style>
