import { Notify } from 'quasar'

Notify.setDefaults({
    position: 'top',
    timeout: 4000,
    textColor: 'white',
    actions: [{ icon: 'close', color: 'white' }]
})

export function cantAccessPatientRoutes() {
    const config = {
        type: 'negative',
        message: 'You cannot access this route. Please log in as patient to continue.'
    }

    Notify.create(config)
}