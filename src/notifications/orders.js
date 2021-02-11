import { Notify } from 'quasar'

Notify.setDefaults({
  position: 'top',
  timeout: 2500,
  textColor: 'white',
  actions: [{ icon: 'close', color: 'white' }]
})

export function successfulyAddedOrder(){
    let config = {
       type: 'positive',
       color: 'teal',
       message: `Successfuly added purchase order!`,
       icon: "check"
    }
 
    Notify.create(config);
 }

 export function failedToAddOrder(){
    let config = {
       type: 'negative',
       message: `An error occured while adding purchase order.`
    }
 
    Notify.create(config);
 }

 export function failedToAcceptOffer(errMessage){
   let config = {
      type: 'negative',
      message: errMessage
   }

   Notify.create(config);
}

