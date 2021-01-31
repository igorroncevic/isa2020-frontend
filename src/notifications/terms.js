import { Notify } from 'quasar'

Notify.setDefaults({
  position: 'top',
  timeout: 2500,
  textColor: 'white',
  actions: [{ icon: 'close', color: 'white' }]
})

export function successfullyScheduled (termType, doctorSurname) {
  const config = {
    type: 'positive',
    color: 'teal',
    message: `Successfuly scheduled a ${termType} with dr. ${doctorSurname}!`,
    icon: 'check'
  }

  Notify.create(config)
}

export function successfullyCancelled (termType, doctorSurname) {
  const config = {
    type: 'positive',
    color: 'teal',
    message: `Successfuly cancelled a ${termType} with dr. ${doctorSurname}!`,
    icon: 'check'
  }

  Notify.create(config)
}

export function schedulingError (termType) {
  const config = {
    type: 'negative',
    message: `An error occured while scheduling this ${termType}. Please try again.`
  }

  Notify.create(config)
}

export function cancellingError (termType) {
  const config = {
    type: 'negative',
    message: `An error occured while cancelling this ${termType}. Please try again.`
  }
  Notify.create(config)
}

export function startTimeBeforeEndTime () {
  const config = {
    type: 'negative',
    message: 'Counseling\'s start time cannot be after end time.'
  }

  Notify.create(config)
}

export function noPharmaciesAreAvailable () {
  const config = {
    type: 'info',
    message: 'No pharmacies are available during selected time period.\nPlease select a different time period.',
    multiline: true
  }

  Notify.create(config)
}
