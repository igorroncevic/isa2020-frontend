<template>
  <q-page v-if="loaded">
    <div class="background-photo">
      <div class="default-background">
        <q-img
          src="https://cdn.quasar.dev/img/material.png"
          style="height: 200px"
        ></q-img>
      </div>
    </div>
    <div class="profile-container">
      <div class="profile-photo text-center">
        <div class="default-user-image">
          <q-avatar
            round="round"
            color="blue-grey-10"
            icon="person"
            font-size="100px"
            size="120px"
            text-color="white"
          ></q-avatar>
        </div>
      </div>
      <div class="text-h4 q-mt-xs">
        {{ currentUser.name }} {{ currentUser.surname }}
      </div>
      <div class="text-subtitle-1 text-weight-regular text-grey-6">
        {{ currentUser.email }}
      </div>
      <div class="displayed-data">
        <PatientAllergiesTable
          style="grid-column: 2/6"
          :medicines="allergicMedicines"
          :notAllergicMedicines="notAllergicMedicines"
          @addNewAllergyEvent="(allergy) => addNewAllergy(allergy)"
        />
        <EditPatientDataDialog
          style="grid-column: 6/16"
          :editing="editing"
          :currentUser="currentUser"
          @updateData="(user) => updateData(user)"
        />
        <PatientLoyalty
          :loyalty="currentUser.loyalty"
          :points="currentUser.loyaltyPoints"
          style="grid-column: 16/19"
        />
      </div>
    </div>
    <q-btn
      class="absolute-top-right q-ma-md"
      color="primary"
      label="Edit personal info"
      icon="edit"
      @click="editing = !editing"
    ></q-btn>
  </q-page>
</template>

<script>
import EditPatientDataDialog from "./../../components/PatientProfile/EditPatientDataDialog.vue";
import PatientLoyalty from "./../../components/PatientProfile/PatientLoyalty.vue";
import PatientAllergiesTable from "./../../components/PatientProfile/PatientAllergiesTable.vue";
import PatientService from "./../../services/PatientService";
import MedicineService from "./../../services/MedicineService";
import {
  successfullyAddedAllergy,
  notSelectedAllergyToAdd,
  errorOccurredWhileAddingAllergy,
} from "./../../notifications/medicines";
import {
  failedUpdatingProfileData,
  successfullyUpdatedProfileData,
} from "./../../notifications/patients";

export default {
  components: { EditPatientDataDialog, PatientAllergiesTable, PatientLoyalty },
  async beforeMount() {
    this.patientId = this.$store.getters.getId

    let response = await PatientService.getPatientsProfileInfo(this.patientId);
    if (response.status == 200) this.currentUser = { ...response.data };

    response = await MedicineService.getAllMedicinesPatientsNotAlergicTo(
      this.patientId
    );
    if (response.status == 200)
      this.notAllergicMedicines = [...response.data]

    response = await MedicineService.getAllMedicinesPatientsAllergicTo(
      this.patientId
    );

    if (response.status == 200)
      this.allergicMedicines = [...response.data]

    this.$nextTick(() => (this.loaded = true));
  },
  data() {
    return {
      loaded: false,
      currentUser: {},
      editing: false,
      notAllergicMedicines: [],
      allergicMedicines: [],
      patientId: "",
    };
  },
  methods: {
    async addNewAllergy(allergy) {
      if (allergy == null) {
        notSelectedAllergyToAdd();
        return;
      }
      let response = await MedicineService.addNewAllergyForPatient({
        patientId: this.patientId,
        medicineId: allergy.id,
      });
      if (response.status == 201) {
        successfullyAddedAllergy(allergy.label);
        setTimeout(() => this.$router.go(), 2500);
      } else {
        errorOccurredWhileAddingAllergy(allergy.label);
      }
    },
    async updateData(user) {
      console.log(user)
      let response = await PatientService.updatePatientsInfo(user);
      if (response.status == 200) {
        successfullyUpdatedProfileData();
        setTimeout(() => this.$router.go(), 2500);
      } else {
        failedUpdatingProfileData();
        return;
      }
    },
  },
};
</script>

<style>
.profile-container {
  position: relative;
  text-align: center;
  background: rgba(0, 0, 0, 0);
  top: -4.6em;
}

.user-info {
  margin: 2em auto;
  max-width: 60%;
  position: relative;
}

.input-styling {
  width: 250px;
  margin-left: 20px;
  font-size: 16px;
}

.displayed-data {
  display: grid;
  grid-template-columns: repeat(20, 5%);
}
</style>