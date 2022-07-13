import useAuth from '~/composables/useAuth'
import { useFirebaseUser } from '~/composables/useStates'

export default defineNuxtRouteMiddleware((to, from) => {
  const user = useFirebaseUser()

  if (!user) {
    abortNavigation()
  }
})
