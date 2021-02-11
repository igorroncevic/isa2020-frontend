<template>
  <q-page padding>
    <div
      style="margin: 0 0 2rem 0"
      class="row-xs-12 row-sm-4 row-md-3 row-lg-3"
    >
      <div class="text-h4 q-mb-xl">
        Purchase orders
        <q-btn
          class="q-ml-xl"
          round
          color="red"
          icon="add"
          @click="addPurchaseOrderDialog = true"
        />
      </div>
    </div>

    <div class="row-xs-12 row-sm-4 row-md-3 row-lg-3">
      <div class="order-card">
        <div class="text-h6 no-vacations">
          {{
            this.purchaseOrders.length == 0
              ? "There are no purchase orders"
              : ""
          }}
        </div>
        <purchase-order-card
          v-for="purchaseOrder in purchaseOrders"
          @show_offers="showOffers"
          :key="purchaseOrder.id"
          :purchaseOrder="purchaseOrder"
        />
      </div>
    </div>
    <q-dialog v-model="addPurchaseOrderDialog">
      <q-card class="q-pa-lg" style="min-width: 400px">
        <q-input
          v-model="endDate"
          filled
          type="date"
          hint="End date"
          style="max-width: 200px"
        />
        <q-separator class="q-my-sm"></q-separator>
        <q-select
          class="q-ma-sm"
          filled
          v-model="newPurchaseOrderMedicine"
          :options="allMedicines"
          label="Select medicine"
          hint="Medicine"
          style="max-width: 200px"
          map-options
          emit-value
          option-label="name"
        />
        <q-input
          class="q-ma-sm"
          v-model.number="newPurchaseOrderMedicineQuantity"
          filled
          style="max-width: 200px"
          type="number"
          hint="Quantity"
        />
        <q-btn
          :disable="
            newPurchaseOrderMedicine == null ||
            newPurchaseOrderMedicineQuantity <= 0
          "
          flat
          style="color: red"
          label="Add new medicine"
          @click="addNewMedicineToPurchaseOrder()"
        />
        <q-virtual-scroll
          class="q-ma-sm"
          type="table"
          style="max-height: 16vh"
          :virtual-scroll-item-size="48"
          :virtual-scroll-sticky-size-start="48"
          :virtual-scroll-sticky-size-end="32"
          :items="newPurchaseOrderMedicines"
        >
          <template v-slot="{ item: row, index }">
            <tr :key="row.medicineId">
              <td>#{{ index + 1 }}</td>
              <td v-for="col in columns" :key="index + '-' + col">
                {{ row[col] }}
              </td>
            </tr>
          </template>
        </q-virtual-scroll>
        <q-separator class="q-my-sm"></q-separator>
        <q-btn
          :disable="newPurchaseOrderMedicines.length == 0 || endDate == null"
          flat
          style="color: primary"
          label="Save purchase order"
          @click="addNewPurchaseOrder()"
        />
      </q-card>
    </q-dialog>
    <q-dialog v-model="offersDialog">
      <q-card class="q-pa-lg">
        <q-table
          class="q-pa-sm"
          :data="offers"
          :columns="offersColumns"
          hide-bottom
        >
          <template v-slot:body-cell-action="props">
            <q-td
              :props="props"
              v-if="purchaseOrderOffersShow.endDate <= getTodayDate()"
            >
              <q-btn color="green" label="Accept" flat dense @click="acceptOffer(props.row.supplier.id)"/>
            </q-td>
          </template>
        </q-table>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import PurchaseOrderCard from "./../components/PurchaseOrderCard";
import PhramacyService from "./../services/PharmacyService";
import PurchaseOrderService from "./../services/PurchaseOrderService";
import MedicineService from "./../services/MedicineService";
import { errorFetchingData } from "./../notifications/globalErrors";
import { successfulyAddedOrder } from "./../notifications/orders";
import { failedToAddOrder } from "./../notifications/orders";
import { failedToAcceptOffer } from "./../notifications/orders";
import { date } from 'quasar'

export default {
  components: { PurchaseOrderCard },
  async beforeMount() {
    let response = await PhramacyService.getAllPharmacyPurchaseOrders();

    if (response) {
      if (response.status == 200) this.purchaseOrders = [...response.data];
    } else {
      errorFetchingData();
    }
    this.allMedicines = await MedicineService.getAllMedicines();
  },
  data() {
    return {
      purchaseOrders: [],
      addPurchaseOrderDialog: false,
      allMedicines: [],
      newPurchaseOrderMedicine: null,
      newPurchaseOrderMedicineQuantity: 0,
      newPurchaseOrderMedicines: [],
      columns: ["medicineName", "orderQuantity"],
      endDate: null,
      offersDialog: false,
      offers: [],
      offersColumns: [
        {
          name: "supplierName",
          align: "center",
          label: "Name",
          field: (row) => row.supplier.name,
        },
        {
          name: "supplierSurname",
          align: "center",
          label: "Surname",
          field: (row) => row.supplier.surname,
        },
        {
          name: "deliveryDate",
          align: "center",
          label: "Delivery date",
          field: "deliveryDate",
          sortable: true,
        },
        {
          name: "price",
          align: "center",
          label: "Price",
          field: "price",
          sortable: true,
        },
        { name: "action", label: "", field: "action" },
      ],
      purchaseOrderOffersShow: null,
    };
  },
  methods: {
    async addNewPurchaseOrder() {
      let data = {
        pharmacyAdminId: "40c88a70-d8cd-4d8f-b56f-eb158f7c27fa",
        endDate: this.endDate,
        medicines: this.newPurchaseOrderMedicines,
      };
      let success = await PurchaseOrderService.addNewPurchaseOrder(data);
      if (success) {
        let response = await PhramacyService.getAllPharmacyPurchaseOrders();

        if (response.status == 200) {
           this.purchaseOrders = [...response.data];
        } else {
          errorFetchingData();
        }
        this.newPurchaseOrderMedicine = null;
        this.endDate = null;
        this.newPurchaseOrderMedicineQuantity = 0;
        this.newPurchaseOrderMedicines = [];
        this.addPurchaseOrderDialog = false;
        successfulyAddedOrder();
      } else {
        failedToAddOrder();
      }
    },
    addNewMedicineToPurchaseOrder() {
      let purchaseOrderMedicine = {
        medicineId: this.newPurchaseOrderMedicine.id,
        medicineName: this.newPurchaseOrderMedicine.name,
        orderQuantity: this.newPurchaseOrderMedicineQuantity,
      };
      this.newPurchaseOrderMedicines.push(purchaseOrderMedicine);
      this.newPurchaseOrderMedicine = null;
      this.newPurchaseOrderMedicineQuantity = 0;
    },
    async showOffers(value) {
      this.purchaseOrderOffersShow = value;
      let response = await PurchaseOrderService.getAllOffersForOrder(
        this.purchaseOrderOffersShow.id
      );

      if (response) {
        if (response.status == 200) this.offers = [...response.data];
        this.offersDialog = true;
      } else {
        errorFetchingData();
      }
    },
    getTodayDate() {
      let timeStamp = Date.now();
      return date.formatDate(timeStamp, "YYYY-MM-DD");
    },
    async acceptOffer(supplierId) {
      let response = await PurchaseOrderService.acceptOffer(this.purchaseOrderOffersShow.id, supplierId);
      if (response.status == 200) {
        //this.offers = [...response.data];
      } else {
        failedToAcceptOffer(response.data)
      }
    }
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  width: 66%;
  flex-direction: row;
  justify-content: space-evenly;
}

.order-card {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: -2rem;
}
</style>