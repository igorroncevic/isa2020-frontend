import { Notify } from 'quasar'

Notify.setDefaults({
  position: 'top',
  timeout: 2500,
  textColor: 'white',
  actions: [{ icon: 'close', color: 'white' }]
})

export function successfulyAccepted(doctorSurname){
    let config = {
       type: 'positive',
       color: 'teal',
       message: `Successfuly accepted vacation for dr. ${doctorSurname}!`,
       icon: "check"
    }
 
    Notify.create(config);
 }

 export function failedToAccept(){
    let config = {
       type: 'negative',
       message: `An error occured while accepting vacation request.`
    }
 
    Notify.create(config);
 }

 export function successfulyRefused(doctorSurname){
    let config = {
       type: 'positive',
       color: 'teal',
       message: `Successfuly refused vacation for dr. ${doctorSurname}!`,
       icon: "check"
    }
 
    Notify.create(config);
 }

 export function failedToRefuse(){
    let config = {
       type: 'negative',
       message: `An error occured while refusing vacation request.`
    }
 
    Notify.create(config);
 }

 export function badRejectionMessage(){
   let config = {
      type: 'negative',
      message: `Rejection reason message must be between 10 and 255 characters.`
   }

   Notify.create(config);
 }