<template>
  <q-page v-if="currentUser">
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
      <div class="text-h4">
        {{ currentUser.firstName }} {{ currentUser.lastName }}
      </div>
      <div class="text-subtitle-1 text-weight-regular text-grey-6">
        {{ currentUser.email }}
      </div>
      <div class="displayed-data">
        <PatientAllergiesTable
          style="grid-column: 2/6"
          v-if="viewAlergies"
          :medicines="currentUser.allergicMedicines"
        />
        <EditPatientDataDialog
          style="grid-column: 6/16"
          :editing="editing"
          :currentUser="currentUser"
        />
        <PatientLoyalty
          :loyalty="currentUser.loyalty"
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
export default {
  components: { EditPatientDataDialog, PatientAllergiesTable, PatientLoyalty },
  created() {
    this.$q.loading.show({
      message: "Loading your user information...",
      backgroundColor: "grey",
    });
  },
  mounted() {
    if (this.currentUser) {
      this.$q.loading.hide();
    }
  },
  data() {
    return {
      currentUser: {
        firstName: "Petar",
        lastName: "Peric",
        email: "email@gmail.com",
        mobile: "065/123123",
        allergicMedicines: [
          { name: "Aspirin", id: "123" },
          { name: "Aspirin2", id: "124" },
          { name: "Aspirin3", id: "125" },
        ],
        loyalty: {
          status: "regular",
          points: 50,
          discount: 5,
        },
      },
      editing: false,
      viewAlergies: true,
    };
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