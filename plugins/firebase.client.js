import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import useUserData from '@/composables/useUserData'

const getFirebaseErrorMessage = (code) => {
  switch (code) {
    case 'auth/invalid-email':
      return 'Invalid email'

    case 'auth/user-not-found':
      return 'No account with that email was found'

    case 'auth/wrong-password':
      return 'Incorrect password'
  }
}

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const { userData, setUserData } = useUserData()

  const firebase = initializeApp(config.firebase)
  const auth = getAuth(firebase)

  auth.onAuthStateChanged((user) => {
    setUserData(user)
  })

  return {
    provide: {
      user: userData,
      firebase: {
        firebase,
        auth,
        getFirebaseErrorMessage,
      },
    },
  }
})
