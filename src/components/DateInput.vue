<template>
  <div class="q-pa-md" style="max-width: 300px">
    <q-input filled v-model="date">
      <template v-slot:prepend>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-date
              v-model="dateLocal"
              mask="YYYY-MM-DD"
            >
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: {
    date: {
      type: String,
      required: true,
    },
  },

  computed: {
    dateLocal: {
      get: function () {
        return this.date;
      },
      set: function (value) {
        this.$emit("datechange", value);
      },
    },
  },
};
</script>

<style>
</style>