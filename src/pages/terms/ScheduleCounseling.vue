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
        Hello world.

        <date-time-input :date="startTime" />
        <date-time-input :date="endTime" />
        <q-stepper-navigation>
          <q-btn @click="enteredTimes" color="primary" label="Continue" />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="2"
        title="Create an ad group"
        caption="Optional"
        icon="create_new_folder"
        :done="step > 2"
        :header-nav="step > 2"
      >
        An ad group contains one or more ads which target a shared set of
        keywords.

        <q-stepper-navigation>
          <q-btn
            @click="
              () => {
                done2 = true;
                step = 3;
              }
            "
            color="primary"
            label="Continue"
          />
          <q-btn
            flat
            @click="step = 1"
            color="primary"
            label="Back"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="3"
        title="Create an ad"
        icon="add_comment"
        :header-nav="step > 3"
      >
        Try out different ad text to see what brings in the most customers, and
        learn how to enhance your ads using features like ad extensions. If you
        run into any problems with your ads, find out how to tell if they're
        running and how to resolve approval issues.

        <q-stepper-navigation>
          <q-btn color="primary" @click="done3 = true" label="Finish" />
          <q-btn
            flat
            @click="step = 2"
            color="primary"
            label="Back"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
  </div>
</template>

<script>
import DateTimeInput from "./DateTimeInput.vue";

export default {
  components: {
    DateTimeInput,
  },
  created() {
    let today = new Date();
    this.startTime =
      today.getFullYear() +
      "-" +
      ((today.getMonth() + 1) < 10 ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)) +
      "-" +
      (today.getDate() < 10 ? "0" + today.getDate() : today.getDate()) +
      " " +
      (today.getHours() < 10 ? "0" + today.getHours() : today.getHours()) +
      ":" +
      (today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes());
    this.endTime = today.getFullYear() +
      "-" +
      ((today.getMonth() + 1) < 10 ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)) +
      "-" +
      (today.getDate() < 10 ? "0" + today.getDate() : today.getDate()) +
      " " +
      (today.getHours() < 10 ? "0" + (today.getHours() + 1) : (today.getHours() + 1)) +
      ":" +
      (today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes());
    console.log(this.startTime);
    console.log(this.endTime);
  },
  data() {
    return {
      step: 1,
      startTime: null,
      endTime: null,
    };
  },
  methods: {
    enteredTimes() {
      done1 = true;
      step = 2;
    },
  },
};
</script>

<style>
</style>