import { Notify } from 'quasar'

Notify.setDefaults({
   position: 'top',
   timeout: 4000,
   textColor: 'white',
   actions: [{ icon: 'close', color: 'white' }]
})

export function medicineAlreadyExists() {
    let config = {
       type: 'info',
       message: `This medicine is already in pharmacy.`
    }
 
    Notify.create(config);
 }