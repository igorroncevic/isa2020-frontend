import { Notify } from 'quasar'

Notify.setDefaults({
   position: 'top',
   timeout: 2500,
   textColor: 'white',
   actions: [{ icon: 'close', color: 'white' }]
})

export function successfulyAddedOrder() {
   let config = {
      type: 'positive',
      color: 'teal',
      message: `Successfuly added purchase order!`,
      icon: "check"
   }

   Notify.create(config);
}

export function failedToAddOrder() {
   let config = {
      type: 'negative',
      message: `An error occured while adding purchase order.`
   }

   Notify.create(config);
}

export function successfulyUpdatedOrder() {
   let config = {
      type: 'positive',
      color: 'teal',
      message: `Successfuly updated purchase order!`,
      icon: "check"
   }

   Notify.create(config);
}

export function failedToUpdateOrder() {
   let config = {
      type: 'negative',
      message: `An error occured while updating purchase order.`
   }

   Notify.create(config);
}

export function failedToAcceptOffer(errMessage) {
   let config = {
      type: 'negative',
      message: errMessage
   }

   Notify.create(config);
}

export function successfulyAcceptedOffer() {
   let config = {
      type: 'positive',
      color: 'teal',
      message: `Successfuly accepted offer!`,
      icon: "check"
   }

   Notify.create(config);
}

