import { Notify } from 'quasar'

Notify.setDefaults({
  position: 'top',
  timeout: 4000,
  textColor: 'white',
  actions: [{ icon: 'close', color: 'white' }]
})

export function errorFetchingData(){
   let config = {
      type: 'negative',
      message: `An error occurred while fetching data. Please reload the page and try again.`,
   }

   Notify.create(config);
}