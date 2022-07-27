import { initializeApp } from 'firebase/app'
import { initUser } from '~/composables/useFirebaseAuth'
import { useFirebaseUser } from '~/composables/useStates'

export default defineNuxtPlugin((nuxtApp) => {
  const app = initializeApp(nuxtApp.$config.firebase)
  const firebaseUser = useFirebaseUser()

  initUser()

  return {
    provide: {
      user: firebaseUser,
    },
  }
})
