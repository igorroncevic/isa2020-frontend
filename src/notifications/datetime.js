import { Notify } from 'quasar'

Notify.setDefaults({
  position: 'top',
  timeout: 2500,
  textColor: 'white',
  actions: [{ icon: 'close', color: 'white' }]
})

export function badTimeRange(termType, doctorSurname){
   let config = {
      type: 'negative',
      message: `You have entered invalid time period. Please try again`
   }

   Notify.create(config);
}