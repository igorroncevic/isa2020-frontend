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