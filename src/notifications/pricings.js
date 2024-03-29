import { Notify } from 'quasar'

Notify.setDefaults({
   position: 'top',
   timeout: 4000,
   textColor: 'white',
   actions: [{ icon: 'close', color: 'white' }]
})

export function cantDeletePricing() {
   let config = {
      type: 'negative',
      message: `Failed to delete pricing.`
   }

   Notify.create(config);
}

export function successfulyDeletedPricing() {
   let config = {
      type: 'positive',
      message: `Successfuly deleted pricing.`
   }

   Notify.create(config);
}

export function addedNewPricing() {
   let config = {
      type: 'positive',
      message: `Successfuly added new pricing.`
   }
 
   Notify.create(config);
}

export function failedToAddPricing() {
   let config = {
      type: 'negative',
      message: `Failed to add pricing.`
   }
 
   Notify.create(config);
}

export function successfulyUpdatedPricing() {
   let config = {
      type: 'positive',
      message: `Successfuly updated pricing.`
   }
 
   Notify.create(config);
}

export function failedToUpdatePricing(failMessage) {
   let config = {
      type: 'negative',
      message: failMessage
   }
 
   Notify.create(config);
}