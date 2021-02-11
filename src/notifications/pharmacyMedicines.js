import { Notify } from 'quasar'

Notify.setDefaults({
   position: 'top',
   timeout: 4000,
   textColor: 'white',
   actions: [{ icon: 'close', color: 'white' }]
})

export function medicineAlreadyExists() {
    let config = {
       type: 'negative',
       message: `This medicine is already in pharmacy.`
    }
 
    Notify.create(config);
}

export function cantDeleteMedicine() {
   let config = {
      type: 'negative',
      message: `This medicine can't be deleted because some patient has reserved it.`
   }

   Notify.create(config);
}

export function successfulyDeletedMedicine() {
   let config = {
      type: 'positive',
      message: `Successfuly deleted this medicine from pharmacy.`
   }

   Notify.create(config);
}