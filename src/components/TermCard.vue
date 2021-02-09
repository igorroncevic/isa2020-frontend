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
  alreadyScheduled,
} from "./../notifications/terms";
import CounselingService from "src/services/CounselingService";

export default {
  props: ["term", "scheduling", "cancelling"],
  data() {
    return {
      patientId: "",
    };
  },
  mounted() {
    this.patientId = this.$store.getters.getId
    this.term.startTime = this.dateFormat(this.term.startTime);
    this.term.endTime = this.dateFormat(this.term.endTime);
  },
  methods: {
    async scheduleCheckup() {
      const checkupData = {
        patientId: this.patientId,
        checkupId: this.term.id,
      };
      const response = await CheckupService.scheduleCheckup(checkupData);

      if (response.status == 200) {
        successfullyScheduled("checkup", this.term.doctor.surname);
        setTimeout(() => this.$router.go('/patient/calendar'), 2000);
      } else if (response.status == 409) {
        alreadyScheduled();
      } else {
        schedulingError("checkup");
      }
    },

    async cancelTerm() {
      const termData = {
        patientId: this.patientId,
        termId: this.term.id,
      };
      let response;
      if (this.term.type == "checkup")
        response = await CheckupService.cancelCheckup(termData);
      else response = await CounselingService.cancelCounseling(termData);

      if (response.status == 200) {
        successfullyCancelled(this.term.type, this.term.doctor.surname);
        setTimeout(() => this.$router.go(), 2000);
      } else {
        cancellingError(this.term.type);
      }
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
  height: 13.5rem !important;
  max-height: 13.5rem !important;
}

.q-card__section--vert {
  padding: 8px !important;
}
</style>
