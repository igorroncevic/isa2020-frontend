import { Notify } from 'quasar'

Notify.setDefaults({
  position: 'top',
  timeout: 2500,
  textColor: 'white',
  actions: [{ icon: 'close', color: 'white' }]
})

export function successfullyRegistered () {
  const config = {
    type: 'positive',
    color: 'teal',
    message: 'You have registered new pharmacy successfully!',
    icon: 'check'
  }

  Notify.create(config)
}

export function successfullyRegisteredAdmin () {
  const config = {
    type: 'positive',
    color: 'teal',
    message: 'You have registered new pharmacy administrator successfully!',
    icon: 'check'
  }

  Notify.create(config)
}

export function successfullyRegisteredDerm () {
  const config = {
    type: 'positive',
    color: 'teal',
    message: 'You have registered new dermatologist successfully!',
    icon: 'check'
  }

  Notify.create(config)
}

export function successfullyRegisteredSupplier () {
  const config = {
    type: 'positive',
    color: 'teal',
    message: 'You have registered new supplier successfully!',
    icon: 'check'
  }

  Notify.create(config)
}

export function successfullyAddedMedicine () {
  const config = {
    type: 'positive',
    color: 'teal',
    message: 'You have added new medicine successfully!',
    icon: 'check'
  }

  Notify.create(config)
}

export function successfullyAddedLoyalty () {
  const config = {
    type: 'positive',
    color: 'teal',
    message: 'You have added new loyalty successfully!',
    icon: 'check'
  }

  Notify.create(config)
}

export function registrationError () {
  const config = {
    type: 'negative',
    message: 'An error occured. Please try to save object again.'
  }

  Notify.create(config)
}
