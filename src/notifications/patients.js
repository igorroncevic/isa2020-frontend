import { Notify } from 'quasar'

Notify.setDefaults({
  position: 'top',
  timeout: 2500,
  textColor: 'white',
  actions: [{ icon: 'close', color: 'white' }]
})

export function successfullyLoggedIn () {
  const config = {
    type: 'positive',
    color: 'teal',
    message: 'You have logged in successfully!',
    icon: 'check'
  }

  Notify.create(config)
}

export function logInError () {
  const config = {
    type: 'negative',
    message: 'An error occured. Please try to log in again.'
  }

  Notify.create(config)
}

export function successfullyRegistered () {
  const config = {
    type: 'positive',
    color: 'teal',
    message: 'You have registered successfully!',
    icon: 'check'
  }

  Notify.create(config)
}

export function registrationError () {
  const config = {
    type: 'negative',
    message: 'An error occured. Please try to register again.'
  }

  Notify.create(config)
}