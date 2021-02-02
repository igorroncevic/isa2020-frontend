<template>
  <div class="q-pa-md">
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">{{ vacation.doctor.name }} {{ vacation.doctor.surname }}</div>
        <div class="text-left">
          {{ dateFormat(vacation.startDate) }} - {{ dateFormat(vacation.endDate) }}
        </div>
        <div v-if="vacation.status == 'pending'" >
          <q-btn class="q-mtr-sm" color="primary" label="Approve" @click="approveClick" />
          <q-btn class="q-ma-sm" color="red" label="Refuse" @click="prompt = true" />
        </div>
        <div class="q-ma-md">
          <q-scroll-area v-if="vacation.status == 'refused'" style="height: 150px; max-width: 300px;">
            <div class="text-left">
              {{ vacation.rejectionReason }}
            </div>
          </q-scroll-area>
        </div>
      </q-card-section>
    </q-card>

    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Reason for refusal</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input v-model="refusal.rejectionReason" autofocus filled type="textarea" @keyup.enter="prompt = false"/>
        </q-card-section>

        <q-card-actions align="right" class="text-primary" >
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Confirm" @click="refuseClick" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import moment from 'moment'
import VacationService from "./../services/VacationService";
import {successfulyAccepted} from './../notifications/vacations'
import {failedToAccept} from './../notifications/vacations'
import {successfulyRefused} from './../notifications/vacations'
import {failedToRefuse} from './../notifications/vacations'

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
  data() {
    return {
      refusal: {
        rejectionReason: ""
      },
      prompt: false,
      pending: false
    };
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
    async refuseClick() {
      let response = await VacationService.refuseVacation(this.vacation.id, this.refusal);
      if(response.status === 200){
        successfulyRefused(this.vacation.doctor.surname);
        this.$emit('refresh_vacations');
        this.prompt = false;
      }else{
        failedToRefuse();
      }
    }
  }
};
</script>

<style>
.my-card {
  width: 100%;
  max-width: 400px;
  width: 20rem;
  height: 15rem;
}
</style>