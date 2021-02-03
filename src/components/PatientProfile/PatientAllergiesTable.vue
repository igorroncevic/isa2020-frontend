<template>
  <div style="margin: 5px auto; text-align: left">
    <div class="text-h6 q-mb-xs">Medicines I am allergic to</div>
    <q-list separator>
      <q-item v-for="medicine in medicines" :key="medicine.id">
        <q-item-section>
          <q-item-label class="text-subtitle-1 text-weight-bold">{{
            medicine.name
          }}</q-item-label>
          <q-item-label caption>ID: {{ medicine.id }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <div class="row justify-left q-mt-xs" style="align-items: center">
      <label class="text-body1">New allergy:</label>
      <q-select
        class="input-styling-pat"
        :options="newAllergyOptions"
        v-model="newAllergy"
      />
      <q-btn
        class="q-mt-md q-ml-md"
        label="Add"
        type="submit"
        color="primary"
        @click="addNewAllergy"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    medicines: {
      type: Array,
    },
  },
  mounted() {
    this.notAllergicTo.push({ name: "neki novi", id: "127" });
    this.notAllergicTo.forEach((med) => {
      this.newAllergyOptions.push({
        label: med.name,
        value: med.name,
        id: med.id,
      });
    });
  },
  data() {
    return {
      newAllergy: "",
      notAllergicTo: [],
      newAllergyOptions: [],
    };
  },
  methods: {
    addNewAllergy() {
      console.log(this.newAllergy);
    },
  },
};
</script>

<style>
.input-styling-pat {
  width: 150px;
  margin-left: 20px;
  font-size: 16px;
}
</style>