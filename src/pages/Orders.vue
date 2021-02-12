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
          @click="addNewOrderDialog"
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
          @delete_order="deleteOrder"
          @update_order="updateOrderDialog"
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
        <q-table
          class="q-pa-sm"
          :data="newPurchaseOrderMedicines"
          :columns="columns"
          row-key="medicineId"
          hide-header
          hide-bottom
        >
          <template v-slot:body-cell-action="props">
            <q-td :props="props">
              <q-btn
                color="negative"
                icon-right="delete"
                no-caps
                flat
                dense
                @click="
                  deletePurchaseOrderMedicine(
                    newPurchaseOrderMedicines.indexOf(props.row)
                  )
                "
              />
            </q-td>
          </template>
        </q-table>
        <q-separator class="q-my-sm"></q-separator>
        <q-btn
          v-if="!modeUpdate"
          :disable="newPurchaseOrderMedicines.length == 0 || endDate == null"
          flat
          style="color: primary"
          label="Add new purchase order"
          @click="addNewPurchaseOrder()"
        />
        <q-btn
          v-if="modeUpdate"
          :disable="newPurchaseOrderMedicines.length == 0 || endDate == null"
          flat
          style="color: primary"
          label="Update purchase order"
          @click="updatePurchaseOrder()"
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
              <q-btn
                color="green"
                label="Accept"
                flat
                dense
                @click="acceptOffer(props.row.supplier.id)"
              />
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
import { successfulyUpdatedOrder } from "./../notifications/orders";
import { failedToUpdateOrder } from "./../notifications/orders";
import { successfulyDeletedOrder } from "./../notifications/orders";
import { failedToDeleteOrder } from "./../notifications/orders";
import { failedToAcceptOffer } from "./../notifications/orders";
import { successfulyAcceptedOffer } from "./../notifications/orders";
import { date } from "quasar";

export default {
  components: { PurchaseOrderCard },
  async beforeMount() {
    this.getPurchaseOrders()
    this.allMedicines = await MedicineService.getAllMedicines();
  },
  data() {
    return {
      purchaseOrders: [],
      allMedicines: [],
      addPurchaseOrderDialog: false,
      newPurchaseOrderMedicine: null,
      newPurchaseOrderMedicineQuantity: 0,
      newPurchaseOrderMedicines: [],
      updatePurchaseOrderId: "",
      endDate: null,
      columns: [
        {
          name: "medicineName",
          align: "center",
          label: "Medicine name",
          field: "medicineName",
        },
        {
          name: "orderQuantity",
          align: "center",
          label: "Quantity",
          field: "orderQuantity",
        },
        { name: "action", label: "", field: "action" },
      ],
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
      modeUpdate: false,
    };
  },
  methods: {
    async getPurchaseOrders() {
      let response = await PhramacyService.getAllPharmacyPurchaseOrders(this.$store.getters.getPharmacy);

      if (response) {
        if (response.status == 200) this.purchaseOrders = [...response.data];
      } else {
        errorFetchingData();
      }
    },
    async addNewPurchaseOrder() {
      let data = {
        pharmacyAdminId: this.$store.getters.getId,
        endDate: this.endDate,
        medicines: this.newPurchaseOrderMedicines,
      };
      let success = await PurchaseOrderService.addNewPurchaseOrder(data);
      if (success) {
        this.getPurchaseOrders()
        this.addPurchaseOrderDialog = false;
        successfulyAddedOrder();
      } else {
        failedToAddOrder();
      }
    },
    async updatePurchaseOrder() {
      let data = {
        endDate: this.endDate,
        medicines: this.newPurchaseOrderMedicines,
      };
      let success = await PurchaseOrderService.updatePurchaseOrder(
        this.updatePurchaseOrderId,
        data
      );
      if (success) {
        this.getPurchaseOrders();
        this.addPurchaseOrderDialog = false;
        successfulyUpdatedOrder();
      } else {
        failedToUpdateOrder();
      }
    },
    async deleteOrder(orderId) {
      let success = await PurchaseOrderService.deletePurchaseOrder(orderId)
      if (success) {
        this.getPurchaseOrders();
        successfulyDeletedOrder();
      } else {
        failedToDeleteOrder();
      }
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
    async acceptOffer(supplierId) {
      let response = await PurchaseOrderService.acceptOffer(
        this.purchaseOrderOffersShow.id,
        supplierId
      );
      if (response.status == 200) {
        getPurchaseOrders()
        this.offersDialog = false;
        successfulyAcceptedOffer();
      } else {
        failedToAcceptOffer(response.data);
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
    getTodayDate() {
      let timeStamp = Date.now();
      return date.formatDate(timeStamp, "YYYY-MM-DD");
    },
    updateOrderDialog(value) {
      this.newPurchaseOrderMedicine = null;
      this.newPurchaseOrderMedicineQuantity = 0;
      this.endDate = JSON.parse(JSON.stringify(value.endDate));
      this.newPurchaseOrderMedicines = JSON.parse(
        JSON.stringify(value.medicines)
      );
      this.updatePurchaseOrderId = value.id;
      this.addPurchaseOrderDialog = true;
      this.modeUpdate = true;
    },
    addNewOrderDialog() {
      this.newPurchaseOrderMedicine = null;
      this.newPurchaseOrderMedicineQuantity = 0;
      this.endDate = null;
      this.newPurchaseOrderMedicines = [];
      this.addPurchaseOrderDialog = true;
      this.modeUpdate = false;
    },
    deletePurchaseOrderMedicine(index) {
      this.newPurchaseOrderMedicines.splice(index, 1);
    },
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