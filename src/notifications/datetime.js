import { Notify } from 'quasar'

Notify.setDefaults({
  position: 'top',
  timeout: 4000,
  textColor: 'white',
  actions: [{ icon: 'close', color: 'white' }]
})

export function badTimeRange (termType, doctorSurname) {
  const config = {
    type: 'negative',
    message: 'You have entered invalid time period. Please try again'
  }

  Notify.create(config)
}
