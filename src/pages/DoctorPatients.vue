<template>
<q-page padding class="q-gutter-y-xl column items-center ">
  <div class="row text-h3 text-primary">
    My patients  &nbsp;
   <q-input outlined bottom-slots v-model="search" label="Search"  >

        <template v-slot:append>
          <q-icon v-if="search !== ''" name="close" @click="search = ''" class="cursor-pointer" />
          <q-icon name="search" />
        </template>

        <template v-slot:hint>
          Name and surname
        </template>
      </q-input>
  </div>
    <div class="q-pa-md">
    <q-table
      title="Patients"
      :data="filteredPatients"
      :columns="columns"
      row-key="name"
      title-class="text-h4"

    >
      <template v-slot:body="props" >
        <q-tr :props="props" >
          <q-td  key="name" :props="props">
            {{ props.row.name }}
          </q-td>
          <q-td key="surname" :props="props">
              {{ props.row.surname }}
          </q-td>
          <q-td key="mail" :props="props" >
            <q-badge color="primary" style="font-size:18px">
              {{ props.row.mail }}
            </q-badge>
          </q-td>
          <q-td key="phone" :props="props">
            <q-badge color="primary" style="font-size:18px">
              {{ props.row.phone }}
            </q-badge>
          </q-td>
          <q-td key="button" :props="props" >
            <q-btn @click="startTerm(props.row.id)" color="primary">Start checkup</q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</q-page>
</template>

<style lang="sass" scoped>
table.q-table tbody td
  font-size: 18px !important

</style>
<script>
import DoctorService from './../services/DoctorService'
import TermService from './../services/TermService'
export default {
  data () {
    return {
      patients: [],
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Name',
          align: 'left',
          field: 'a',
          format: val => `${val}`,
          sortable: true
        },
        { name: 'surname', align: 'center', label: 'Surname', field: 'surname', sortable: true },
        { name: 'mail', label: 'Email', field: 'mail', sortable: true, align: 'center' },
        { name: 'phone', label: 'Phone number', field: 'phone', align: 'center' },
        { name: 'button', label: '', field: 'button' }
      ],
      search: ''
    }
  },
  async mounted () {
    this.patients = await DoctorService.getDoctorPatients('a5ac174a-45b3-487f-91cb-3d3f727d6f1c') // const for now
  },
  computed: {
    filteredPatients () {
      return this.patients.filter(p => {
        var fullname = p.name.toLowerCase() + ' ' + p.surname.toLowerCase()
        var rfullname = p.surname.toLowerCase() + ' ' + p.name.toLowerCase()
        if (fullname.includes(this.search) || rfullname.includes(this.search)) { return p }
      })
    }
  },
  methods: {
    async startTerm (patientId) {
      var term = await TermService.checkIsCurrentTherm('a5ac174a-45b3-487f-91cb-3d3f727d6f1c', patientId)
      if (term) {
        this.$router.push('derm/startcheckup/' + term.id)
      } else {
        this.$q.notify({
          color: 'negative',
          textColor: 'white',
          timeout: 500,
          icon: 'error',
          position: 'center',
          message: 'Patient does not have scheduled term now!'
        })
      }
    }
  }
}
</script>
