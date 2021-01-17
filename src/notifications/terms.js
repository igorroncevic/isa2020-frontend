import { Notify } from 'quasar'

Notify.setDefaults({
  position: 'top',
  timeout: 2500,
  textColor: 'white',
  actions: [{ icon: 'close', color: 'white' }]
})

export function successfullyScheduled(termType, doctorSurname){
   let config = {
      type: 'positive',
      color: 'teal',
      message: `Successfuly scheduled a ${termType} with dr. ${doctorSurname}!`,
      icon: "check"
   }

   Notify.create(config);
}

export function schedulingError(termType){
   let config = {
      type: 'negative',
      message: `An error occured while scheduling this ${termType}. Please try again.`
   }

   Notify.create(config);
}