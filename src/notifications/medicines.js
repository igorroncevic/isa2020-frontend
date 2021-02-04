import { Notify } from 'quasar'

Notify.setDefaults({
   position: 'top',
   timeout: 4000,
   textColor: 'white',
   actions: [{ icon: 'close', color: 'white' }]
})


export function notSelectedAllergyToAdd() {
    let config = {
       type: 'info',
       message: `Please select an allergy to add.`
    }
 
    Notify.create(config);
}

export function successfullyAddedAllergy(name) {
    let config = {
       type: 'positive',
       message: `Successfully added ${name} to the list of allergic medicines.`
    }
 
    Notify.create(config);
}

export function errorOccurredWhileAddingAllergy(name) {
    let config = {
       type: 'negative',
       message: `An error occurred while adding ${name} to the list of allergic medicines. Please try again.`,
       multiLine: true,
    }
 
    Notify.create(config);
}