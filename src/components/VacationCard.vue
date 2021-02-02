<template>
  <div class="q-pa-md">
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">{{ vacation.doctor.name }} {{ vacation.doctor.surname }}</div>
        <div class="text-left">
          {{ dateFormat(vacation.startDate) }} - {{ dateFormat(vacation.endDate) }}
        </div>
        <div>
          <q-btn class="q-mtr-sm" color="primary" label="Approve" @click="approveClick" />
          <q-btn class="q-ma-sm" color="red" label="Refuse" @click="refuseClick" />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import moment from 'moment'
import VacationService from "./../services/VacationService";
import {successfulyAccepted} from './../notifications/vacations'
import {failedToAccept} from './../notifications/vacations'

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
    },
    async approveClick() {
        let response = await VacationService.approveVacation(this.vacation.id);
        if(response.status === 200){
          successfulyAccepted(this.vacation.doctor.surname);
          this.$emit('refresh_vacations');
        }else{
          failedToAccept();
        }
    },
    refuseClick() {

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