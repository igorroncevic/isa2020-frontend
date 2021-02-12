<template>
  <div class="q-pa-md">
    <q-table
      title="Treats"
      :data="data"
      :columns="columns"
      row-key="id"
      :filter="filter"
      :filter-method="myFilter"
      :loading="loading"
    >
      <template v-slot:top>
        <q-space />
        <div class="q-pa-sm">
          <q-btn
            round
            color="red"
            icon="highlight_off"
            @click="removeFilters"
            v-show="filtersActive"
          />
        </div>
        <div class="q-pa-sm">
          <q-select
            v-model="filter.pharmacy"
            :options="options"
            label="Pharmacy"
            style="min-width: 200px"
          />
        </div>
        <div class="q-pa-sm">
          <q-input
            v-model.number="filter.minMark"
            type="number"
            label="Minimum average mark"
            style="min-width: 200px"
          />
        </div>
        <div class="q-pa-sm">
          <q-input
            v-model="filter.query"
            label="Search names"
            style="min-width: 200px"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </template>
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <q-btn
            color="positive"
            label="See checkups"
            dense
            @click="openAddCheckupDialog(data.indexOf(props.row))"
          />
        </q-td>
      </template>
    </q-table>
    <q-dialog v-model="addCheckupDialog">
      <q-card class="q-pa-lg" style="min-width: 400px">
        <div class="text-primary text-weight-bold q-pa-sm text-h5">
          {{
            this.selectedDermatologist.name +
            " " +
            this.selectedDermatologist.surname
          }}'s work schedule:
          {{
            dateFormat(this.selectedDermatologistWorkSchedule.fromHour) +
            " - " +
            dateFormat(this.selectedDermatologistWorkSchedule.toHour)
          }}
        </div>
        <q-separator class="q-my-sm"></q-separator>
        <div class="q-pa-sm" style="max-width: 300px">
          <q-input filled v-model="newCheckup.startTime" hint="Start time">
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-date
                    v-model="newCheckup.startTime"
                    mask="YYYY-MM-DD HH:mm"
                  >
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>

            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-time
                    v-model="newCheckup.startTime"
                    mask="YYYY-MM-DD HH:mm"
                    format24h
                  >
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="q-pa-sm" style="max-width: 300px">
          <q-input filled v-model="newCheckup.endTime" hint="End time">
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-date v-model="newCheckup.endTime" mask="YYYY-MM-DD HH:mm">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>

            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-time
                    v-model="newCheckup.endTime"
                    mask="YYYY-MM-DD HH:mm"
                    format24h
                  >
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <q-input
          class="q-ma-sm"
          v-model.number="newCheckup.price"
          filled
          style="max-width: 200px"
          type="number"
          hint="Quantity"
        />
        <q-btn
          :disable="newCheckup.startTime == '' || newCheckup.price <= 0"
          flat
          style="color: red"
          label="Add new checkup"
          @click="addNewCheckup()"
        />
        <q-separator class="q-my-sm"></q-separator>
        <q-table
          class="q-pa-sm"
          :data="dermatologistsCheckups"
          :columns="columnsCheckups"
          row-key="medicineId"
        >
        </q-table>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import DoctorService from "./../services/DoctorService";
import CheckupService from "./../services/CheckupService";
import { addingNewCheckupError } from "./../notifications/terms";
import { successfulyAddedNewCheckup } from "./../notifications/terms";
import moment from "moment";

export default {
  async beforeMount() {
    this.data = await DoctorService.getAllPharmacyDermatologists(
      this.$store.getters.getPharmacy
    );
    this.original = JSON.parse(JSON.stringify(this.data));

    var allPharmacies = [];
    this.data.forEach(
      (element) => (allPharmacies = allPharmacies.concat(element.pharmacies))
    );
    this.options = allPharmacies.filter(
      (item, i, ar) => ar.indexOf(item) === i
    );
  },
  data() {
    return {
      loading: false,
      filter: {
        query: null,
        minMark: null,
        pharmacy: null,
      },
      filtersActive: false,
      options: null,
      rowCount: 10,
      columns: [
        {
          name: "name",
          align: "center",
          label: "Name",
          field: "name",
          sortable: true,
        },
        {
          name: "surname",
          align: "center",
          label: "Surname",
          field: "surname",
          sortable: true,
        },
        {
          name: "average_mark",
          align: "center",
          label: "Average mark",
          field: "averageMark",
          sortable: true,
        },
        {
          name: "pharmacies",
          align: "center",
          label: "Pharmacies",
          field: "pharmacies",
          format: (val, row) => val.join(", "),
          sortable: true,
        },
        { name: "action", label: "", field: "action" },
      ],
      data: [],
      original: [],
      addCheckupDialog: false,
      newCheckup: {
        startTime: "",
        endTime: "",
        price: 0,
        doctorId: "",
      },
      dermatologistsCheckups: [],
      columnsCheckups: [
        {
          name: "startTime",
          align: "center",
          label: "Start time",
          field: "startTime",
          format: (val) => moment(val).format("MMMM Do YYYY, HH:mm"),
        },
        {
          name: "endTime",
          align: "center",
          label: "End time",
          field: "endTime",
          format: (val) => moment(val).format("MMMM Do YYYY, HH:mm"),
        },
        {
          name: "price",
          align: "center",
          label: "Price",
          field: "price",
        },
      ],
      selectedDermatologist: {
        name: "",
        surname: "",
      },
      selectedDermatologistWorkSchedule: {
        fromHour: "",
        toHour: "",
      },
    };
  },

  methods: {
    async openAddCheckupDialog(index) {
      this.selectedDermatologist = this.data[index];
      let checkups = await CheckupService.findAllAvailableDermatologistsCheckups(
        this.selectedDermatologist.id
      );
      this.dermatologistsCheckups = checkups;
      let workSchedule = await DoctorService.getDoctorWorkScheduleInPharmacy(
        this.selectedDermatologist.id,
        this.$store.getters.getPharmacy
      );
      this.selectedDermatologistWorkSchedule = workSchedule;
      this.addCheckupDialog = true;
    },
    dateFormat(date) {
      return moment(date).format("HH:mm");
    },
    async addNewCheckup() {
      this.newCheckup.doctorId = this.selectedDermatologist.id;
      this.newCheckup.startTime = moment(this.newCheckup.startTime).format()
      this.newCheckup.endTime = moment(this.newCheckup.endTime).format()
      let response = await CheckupService.addNewCheckup(this.newCheckup);
      if (response.status == 201) {
        let checkups = await CheckupService.findAllAvailableDermatologistsCheckups(
          this.selectedDermatologist.id
        );
        successfulyAddedNewCheckup()
        this.dermatologistsCheckups = checkups;
      } else {
        addingNewCheckupError(response.data)
      }
      this.newCheckup.startTime = ""
      this.newCheckup.endTime = ""
      this.price = 0
    },
    myFilter() {
      this.filtersActive = false;
      var pharmacyFiltered;
      if (this.filter.pharmacy == null) {
        pharmacyFiltered = this.data;
      } else {
        pharmacyFiltered = this.data.filter(
          (row) => row.pharmacies.indexOf(this.filter.pharmacy) !== -1
        );
        this.filtersActive = true;
      }

      var markFiltered;
      if (this.filter.minMark == null || this.filter.minMark == "") {
        markFiltered = pharmacyFiltered;
      } else {
        markFiltered = pharmacyFiltered.filter(
          (row) => row.averageMark >= this.filter.minMark
        );
        this.filtersActive = true;
      }

      var nameFiltered;
      if (this.filter.query == null || this.filter.query == "") {
        nameFiltered = markFiltered;
      } else {
        nameFiltered = markFiltered.filter(
          (row) =>
            (row.name.toLowerCase() + " " + row.surname.toLowerCase()).indexOf(
              this.filter.query.toLowerCase()
            ) !== -1
        );
        this.filtersActive = true;
      }

      return nameFiltered;
    },
    removeFilters() {
      this.filter.pharmacy = null;
      this.filter.minMark = null;
      this.filter.query = null;
    },
  },
};
</script>