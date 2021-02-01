<template>
  <div class="q-pa-md">
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">{{ vacation.doctor.name }} {{ vacation.doctor.surname }}</div>
        <div class="text-left">
          {{ dateFormat(vacation.startDate) }} - {{ dateFormat(vacation.endDate) }}
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    vacation: {
      type: Object,
      required: false,
      default: {
        doctor: {
            name: "",
            surname: ""
        },
        startDate: null,
        endDate: null,
      },
    },
  },
  methods: {
    dateFormat (date) {
      return moment(date).format('LL')
    }
  }
};
</script>

<style>
.my-card {
  width: 100%;
  max-width: 400px;
  width: 20rem;
  height: 8rem;
}
</style>