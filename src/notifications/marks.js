import { Notify } from 'quasar'

Notify.setDefaults({
   position: 'top',
   timeout: 4000,
   textColor: 'white',
   actions: [{ icon: 'close', color: 'white' }]
})

export function notSelectedMarkChoice() {
   let config = {
      type: 'info',
      message: `Please select whom will you mark from the given options.`
   }

   Notify.create(config);
}

export function noOneToMark(entity) {
   let config = {
      type: 'info',
      message: `You cannot mark any ${entity} because you haven't interacted with them.`,
      multiLine: true
   }

   Notify.create(config);
}

export function successfullyGivenMark(entity) {
   let config = {
      type: 'positive',
      message: `You have successfully given mark to ${entity}! Thank you for your time.`,
      multiLine: true
   }

   Notify.create(config);
}

export function successfullyUpdatedMark(entity) {
   let config = {
      type: 'positive',
      message: `You have successfully updated mark for ${entity}! Thank you for your time.`,
      multiLine: true
   }

   Notify.create(config);
}

export function alreadyGivenMark(entity, updateFunc) {
   let config = {
      type: 'info',
      message: `You have already given mark to ${entity}. Do you wish to update it?.`,
      multiLine: true,
      actions: [
         { label: 'Update', color: 'white', handler: updateFunc },
      ],
      timeout: 10000,
   }

   Notify.create(config);
}

export function errorGivingMark(entity) {
   let config = {
      type: 'negative',
      message: `An error occurred whilst marking ${entity}. Please try again.`
   }

   Notify.create(config);
}

export function notAllowed(entity) {
   let config = {
      type: 'negative',
      message: `You are not allowed to mark ${entity}.`
   }

   Notify.create(config);
}
