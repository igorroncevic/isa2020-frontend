<template>
    <div class="row justify-center q-mt-xl">
    <q-table
      title="Loyalty programme"
      :data="data"
      :columns="columns"
      row-key="name"
    >
       <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="category" :props="props">
              {{ props.row.category }}

            </q-td>
            <q-td key="min_points" :props="props">
              {{ props.row.minPoints }}
            </q-td>
            <q-td key="max_points" :props="props">
              {{ props.row.maxPoints }}
            </q-td>
            <q-td key="checkup_points" :props="props">
              {{ props.row.checkupPoints }}
            </q-td>
            <q-td key="counseling_points" :props="props">
              {{ props.row.counselingPoints }}
            </q-td>
            <q-td key="disc" :props="props">
              {{ props.row.discount }}
            </q-td>
            <q-td key="actions" :props="props">
              <q-btn class="q-pa-sm" color="blue" label="Update" @click="edit(props.row)" size=md no-caps></q-btn>
              <q-btn class="q-pa-sm" color="red" label="Delete"  @click="deleteItem(props.row)" size=md no-caps></q-btn>
            </q-td>
          </q-tr>

      <q-dialog v-model="edit_dialog">
          <q-card class="my-card">
            <q-card-section>
            <div class="text-h4 text-bold text-primary text-center">Edit loyalty data</div>
            </q-card-section>
            <q-separator></q-separator>
          <q-card-actions>
            <div class="q-pa-md">
                <q-form class="q-gutter-md" @submit="saveChanges">
              <q-input
                filled
                style="width:500px"
                class="q-pa-md"
                v-model="editedItem.category"
                label="Loyalty category">
              </q-input>
              <q-input
                filled
                style="width:500px"
                class="q-pa-md"
                type="number"
                v-model="editedItem.minPoints"
                label="Minimal loyalty points">
              </q-input>
              <q-input
                filled
                style="width:500px"
                class="q-pa-md"
                type="number"
                v-model="editedItem.maxPoints"
                label="Maximal loyalty points">
              </q-input>
              <q-input
                filled
                style="width:500px"
                class="q-pa-md"
                type="number"
                v-model="editedItem.checkupPoints"
                label="Checkup points">
              </q-input>
              <q-input
                filled
                style="width:500px"
                class="q-pa-md"
                type="number"
                v-model="editedItem.counselingPoints"
                label="Counseling points">
              </q-input>
              <q-input
                filled
                style="width:500px"
                class="q-pa-md"
                v-model="editedItem.discount"
                type="number"
                label="Discount">
              </q-input>
            <div class="q-mt-lg">
              <q-btn unelevated type="submit"  size="lg" color="primary" class="full-width text-white" label="Edit loyalty data" />
            </div>
                </q-form>
            </div>
          </q-card-actions>
        </q-card>
    </q-dialog>
        </template>
    </q-table>

    <div class="q-pa-md">
      <q-btn dense color="primary" label="Add new loyalty" @click="show_dialog = true" no-caps></q-btn>
    </div>

        <q-dialog v-model="show_dialog">
          <q-card class="my-card">
            <q-card-section>
            <div class="text-h4 text-bold text-primary text-center">Enter loyalty data</div>
            </q-card-section>
            <q-separator></q-separator>
          <q-card-actions>
            <div class="q-pa-md">
                <q-form class="q-gutter-md" @submit="addRow">
              <q-input
                filled
                style="width:500px"
                class="q-pa-md"
                v-model="addCategory"
                label="Loyalty category"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please input name of loyalty category']">
              </q-input>
              <q-input
                filled
                style="width:500px"
                class="q-pa-md"
                type="number"
                v-model="addMinPoints"
                label="Minimal loyalty points"
                lazy-rules
                :rules="[ val => val !== null && val !== '' || 'Input minimal loyalty points',
                          val => val && val.length > 0 || 'Please input minimal loyalty points']">
              </q-input>
              <q-input
                filled
                style="width:500px"
                class="q-pa-md"
                type="number"
                v-model="addCheckupPoints"
                label="Checkup points"
                lazy-rules
                :rules="[ val => val !== null && val !== '' || 'Input checkup points',
                          val => val && val.length > 0 || 'Please input checkup points']">
              </q-input>
              <q-input
                filled
                style="width:500px"
                class="q-pa-md"
                type="number"
                v-model="addCounselingPoints"
                label="Counseling points"
                lazy-rules
                :rules="[ val => val !== null && val !== '' || 'Input counseling points',
                          val => val && val.length > 0 || 'Please input  counseling points']">
              </q-input>
              <q-input
                filled
                style="width:500px"
                class="q-pa-md"
                type="number"
                v-model="addMaxPoints"
                label="Maximal loyalty points"
                lazy-rules
                :rules="[ val => val !== null && val !== '' || 'Input maximal loyalty points',
                          val => val && val.length > 0 || 'Please input maximal loyalty points']">
              </q-input>
              <q-input
                filled
                style="width:500px"
                class="q-pa-md"
                v-model="addDiscount"
                type="number"
                label="Discount"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please input loyalty discount']">
              </q-input>
            <div class="q-mt-lg">
              <q-btn unelevated type="submit" size="lg" color="primary" class="full-width text-white" label="Add new loyalty" />
            </div>
                </q-form>
            </div>
          </q-card-actions>
        </q-card>
    </q-dialog>
    </div>
</template>

<style lang="sass" scoped>
table.q-table tbody td
  font-size: 18px !important
</style>

<script>
import LoyaltyService from './../../services/LoyaltyService'
import {
  successfullyAddedLoyalty,
  registrationError
} from './../../notifications/sysAdmin'

export default {
  async beforeMount () {
    this.data = await LoyaltyService.getAllLoyaltys()
  },
  data () {
    return {
      show_dialog: false,
      edit_dialog: false,
      editedIndex: -1,
      loyalty: '',
      addCategory: '',
      addMinPoints: '',
      addMaxPoints: '',
      addCheckupPoints: '',
      addCounselingPoints: '',
      addDiscount: '',
      editedItem: {
        category: '',
        minPoints: '',
        maxPoints: '',
        checkupPoints: '',
        counselingPoints: '',
        discount: ''
      },
      data: [],
      columns: [
        {
          name: 'category',
          required: true,
          label: 'Loyalty category',
          align: 'left',
          field: 'category',
          sortable: true,
          classes: 'bg-grey-2 ellipsis',
          style: 'max-width: 100px',
          headerClasses: 'bg-primary text-h5 text-white'
        },
        { name: 'min_points', align: 'center', label: 'Minimal loyalty points', field: 'minPoints', sortable: true },
        { name: 'max_points', align: 'center', label: 'Maximal loyalty points', field: 'maxPoints', sortable: true },
        { name: 'checkup_points', align: 'center', label: 'Checkup points', field: 'checkupPoints', sortable: true },
        { name: 'counseling_points', align: 'center', label: 'Counseling points', field: 'counselingPoints', sortable: true },
        { name: 'disc', align: 'center', label: 'Discount', field: 'discount', sortable: true },
        { name: 'actions', align: 'center', label: 'Actions', field: 'actions' },
        { name: 'id', align: 'center', label: 'id', field: 'id' }
      ]
    }
  },
  methods: {
    async addRow () {
      const loyData = {
        category: this.addCategory,
        minPoints: this.addMinPoints,
        maxPoints: this.addMaxPoints,
        checkupPoints: this.addCheckupPoints,
        counselingPoints: this.addCounselingPoints,
        discount: this.addDiscount
      }
      const success = await LoyaltyService.addNewLoyalty(loyData)

      if (success) {
        successfullyAddedLoyalty()
        this.show_dialog = false
      } else {
        registrationError()
      }
      this.data = await LoyaltyService.getAllLoyaltys()
    },
    async deleteItem (item) {
      var id = Object.assign({}, item).id
      var res = LoyaltyService.deleteLoyalty(id)
      if (res) {
        this.$q.notify({
          color: 'teal',
          timeout: 500,
          textColor: 'white',
          position: 'top',
          message: ' You have successfully deleted this loyalty programme!',
          type: 'positive'
        })
      }
      this.data = await LoyaltyService.getAllLoyaltys()
    },
    edit (item) {
      this.editedIndex = this.data.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.edit_dialog = true
    },
    async saveChanges () {
      const data = {
        id: this.editedItem.id,
        category: this.editedItem.category,
        minPoints: this.editedItem.minPoints,
        maxPoints: this.editedItem.maxPoints,
        checkupPoints: this.editedItem.checkupPoints,
        counselingPoints: this.editedItem.counselingPoints,
        discount: this.editedItem.discount
      }
      const success = await LoyaltyService.updateLoyaltyData(data)

      if (success) {
        successfullyAddedLoyalty()
        this.edit_dialog = false
      } else {
        registrationError()
      }
      this.data = await LoyaltyService.getAllLoyaltys()
    }
  }
}
</script>
