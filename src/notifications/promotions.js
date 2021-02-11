import { Notify } from 'quasar'

Notify.setDefaults({
  position: 'top',
  timeout: 2500,
  textColor: 'white',
  actions: [{ icon: 'close', color: 'white' }]
})

export function successfulyAddedPromotion(){
    let config = {
       type: 'positive',
       color: 'teal',
       message: `Successfuly added promotion!`,
       icon: "check"
    }
 
    Notify.create(config);
 }

 export function failedToAddPromotion(){
    let config = {
       type: 'negative',
       message: `An error occured while adding promotion.`
    }
 
    Notify.create(config);
 }