<template>
  <div class="q-pa-md" id="centralize">
    <q-stepper v-model="step" vertical color="primary" animated>
      <q-step
        :name="1"
        title="Choose whom to mark"
        icon="how_to_reg"
        :done="step > 1"
      >
        <q-select
          v-model="selectedMarkChoice"
          :options="markChoices"
          style="max-width: 300px"
          label="Whom will you mark?"
          clearable
        />
        <q-stepper-navigation>
          <q-btn @click="selectMarkChoice" color="primary" label="Continue" />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="2"
        title="Choose an entity to mark"
        icon="check"
        :done="step > 2"
      >
        <div class="text-h6 no-entities" v-if="entitiesToMark.length == 0">
          You have no entities to mark.
        </div>
        <div class="mark-entity">
          <mark-entity
            v-for="entity in entitiesToMark"
            :key="entity.id"
            :entity="entity"
            :selectedType="selectedMarkChoice"
            :markingStep="step"
            @chosenEntity="(id) => selectedEntityToMark(id)"
          />
        </div>

        <q-stepper-navigation>
          <q-btn
            flat
            @click="goBack"
            color="primary"
            label="Back"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step :name="3" title="Give a mark" icon="done_all">
        <div id="final-mark">
          <mark-entity
            style="margin: 10px"
            :entity="selectedEntity"
            :selectedType="selectedMarkChoice"
            :markingStep="step"
          />

          <q-input
            style="width: 10rem; font-size: 16px"
            v-model.number="givenMark"
            type="number"
            min="1"
            max="5"
            label="Mark"
          />
        </div>

        <q-stepper-navigation>
          <q-btn color="primary" label="Finish" @click="giveMark" />
          <q-btn
            flat
            @click="goBack"
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
import {
  notSelectedMarkChoice,
  noOneToMark,
  errorGivingMark,
  successfullyGivenMark,
  alreadyGivenMark,
  notAllowed,
  successfullyUpdatedMark,
} from "./../notifications/marks";
import DoctorService from "./../services/DoctorService";
import PharmacyService from "./../services/PharmacyService";
import MedicineService from "./../services/MedicineService";
import MarkEntity from "src/components/MarkEntity.vue";
import MarkService from "./../services/MarkService";

export default {
  components: { MarkEntity },
  data() {
    return {
      step: 1,
      markChoices: ["Dermatologist", "Pharmacist", "Pharmacy", "Medicine"],
      selectedMarkChoice: null,
      entitiesToMark: [],
      selectedEntity: null,
      givenMark: 5,
      patientId: "dd4c7e5f-f2c4-42dc-a809-fd7f588b3acb",
    };
  },
  methods: {
    goBack() {
      if (this.step == 1) return;
      if (this.step == 2) {
        this.entitiesToMark = [];
        this.step = 1;
        return;
      }
      if (this.step == 3) {
        this.selectedEntity = null;
        this.step = 2;
        return;
      }
    },
    async selectMarkChoice() {
      let response;
      if (this.selectedMarkChoice == null) {
        notSelectedMarkChoice();
        return;
      } else if (this.selectedMarkChoice == "Dermatologist") {
        response = await DoctorService.getAllPatientsDoctors({
          patientId: this.patientId,
          doctorRole: "dermatologist",
        });
        if (response.status == 200) this.entitiesToMark = response.data;
        if (response.status == 404) noOneToMark("dermatologists");
      } else if (this.selectedMarkChoice == "Pharmacist") {
        response = await DoctorService.getAllPatientsDoctors({
          patientId: this.patientId,
          doctorRole: "pharmacist",
        });
        if (response.status == 200) this.entitiesToMark = response.data;
        if (response.status == 404) noOneToMark("pharmacists");
      } else if (this.selectedMarkChoice == "Pharmacy") {
        response = await PharmacyService.getAllPatientsPharmacies(
          this.patientId
        );
        if (response.status == 200) this.entitiesToMark = response.data;
        if (response.status == 404) noOneToMark("pharmacies");
      } else if (this.selectedMarkChoice == "Medicine") {
        response = await MedicineService.getAllPatientsMedicines(
          this.patientId
        );
        if (response.status == 200) this.entitiesToMark = response.data;
        if (response.status == 404) noOneToMark("medicines");
      }

      if (response.status) {
        if (response.status == 200) {
          this.step = 2;
        }
      }
    },
    selectedEntityToMark(id) {
      this.selectedEntity = this.entitiesToMark.filter(
        (entity) => entity.id == id
      )[0];
      console.log(this.entitiesToMark);
      console.log(this.selectedEntity);
      this.step = 3;
    },
    async giveMark() {
      const markData = {
        markValue: this.givenMark,
        doctorId:
          this.selectedMarkChoice == "Pharmacist" ||
          this.selectedMarkChoice == "Dermatologist"
            ? this.selectedEntity.id
            : null,
        medicineId:
          this.selectedMarkChoice == "Medicine" ? this.selectedEntity.id : null,
        pharmacyId:
          this.selectedMarkChoice == "Pharmacy" ? this.selectedEntity.id : null,
        patientId: this.patientId,
      };

      let response = await MarkService.giveMark(markData);
      if (response.status == 201) {
        successfullyGivenMark(this.getResponseMessage());
        setTimeout(() => this.$router.push({ path: "/" }), 2500);
      } else if (response.status == 208) {
        alreadyGivenMark(
          this.selectedMarkChoice,
          async () => await this.updateMark(markData)
        );
      } else if (response.status == 403) {
        notAllowed(this.getResponseMessage());
      } else {
        errorGivingMark(this.getResponseMessage());
      }
    },
    async updateMark(markData) {
      console.log(markData)
      let response = await MarkService.updateMark(markData);
      if (response.status == 200) {
        successfullyUpdatedMark(this.getResponseMessage());
        setTimeout(() => this.$router.push({ path: "/" }), 2500);
      } else if (response.status == 403) {
        notAllowed(this.getResponseMessage());
      } else {
        errorGivingMark(this.getResponseMessage());
      }
    },
    getResponseMessage() {
      if (
        this.selectedMarkChoice == "Pharmacist" ||
        this.selectedMarkChoice == "Dermatologist"
      ) {
        return `dr. ${this.selectedEntity.name} ${this.selectedEntity.surname}`;
      } else if (this.selectedMarkChoice == "Pharmacy") {
        return `${this.selectedEntity.name} pharmacy`;
      } else if (this.selectedMarkChoice == "Medicine") {
        return `medicine ${this.selectedEntity.name}`;
      } else {
        return "";
      }
    },
  },
};
</script>

<style scoped>
#centralize {
  width: 60%;
  margin: 0 auto;
}

.mark-entity {
  width: 90%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}

.mark-entity > * {
  margin: 20px;
}

#final-mark {
  width: 60%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}

.no-entities {
  width: 50%;
  margin: 0 auto;
}
</style>