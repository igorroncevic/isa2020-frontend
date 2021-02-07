<template>
  <q-card class="my-card" flat bordered>
    <q-card-section vertical>
      <q-card-section>
        <div class="text-h5 text-primary text-weight-medium">
          {{ capitalize(term.type) }}
        </div>
      </q-card-section>
      <q-separator></q-separator>
      <q-card-section>
        <div class="text-body1">
          <span class="text-primary text-weight-medium"> Start: </span>
          {{ dateFormat(term.startTime) }} <br />
          <span class="text-primary text-weight-medium"> End: </span>
          {{ dateFormat(term.endTime) }} <br />
          <span class="text-primary text-weight-medium"> Doctor: </span>
          {{ term.doctor.name }} {{ term.doctor.surname }} <br />
          <span class="text-primary text-weight-medium"> Price: </span> ${{
            term.price
          }}
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
            @click="cancelTerm"
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
import CounselingService from "src/services/CounselingService";

export default {
  props: ["term", "scheduling", "cancelling"],
  data() {
    return {
      patientId: "cc6fd408-0084-420b-8078-687d8a72744b",
    };
  },
  mounted() {
    this.term.startTime = this.dateFormat(this.term.startTime);
    this.term.endTime = this.dateFormat(this.term.endTime);
  },
  methods: {
    async scheduleCheckup() {
      const checkupData = {
        patientId: this.patientId,
        checkupId: this.term.id,
      };
      const success = await CheckupService.scheduleCheckup(checkupData);

      if (success) {
        successfullyScheduled("checkup", this.term.doctor.surname);
      } else {
        schedulingError("checkup");
      }
      setTimeout(() => this.$router.go(), 2000);
    },

    async cancelTerm() {
      const termData = {
        patientId: this.patientId,
        termId: this.term.id,
      };
      let success;
      if (this.term.type == "checkup")
        success = await CheckupService.cancelCheckup(termData);
      else
        success = await CounselingService.cancelCounseling(termData);

      if (success) {
        successfullyCancelled(this.term.type, this.term.doctor.surname);
      } else {
        cancellingError(this.term.type);
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
  max-width: 21rem;
  max-height: 13rem !important;
}

.q-card__section--vert {
  padding: 8px !important;
}
</style>
