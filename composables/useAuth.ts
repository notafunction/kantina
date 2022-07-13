import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  ProviderId,
} from 'firebase/auth'

import { useFirebaseUser } from './useStates'

const useAuth = () => {
  const auth = getAuth()
  const firebaseUser = useFirebaseUser()

  onAuthStateChanged(auth, (user) => {
    firebaseUser.value = user
  })

  return {
    auth,
    createUserWithEmailAndPassword: (email: string, password: string) =>
      createUserWithEmailAndPassword(auth, email, password),
    signInWithEmailAndPassword: (email: string, password: string) =>
      signInWithEmailAndPassword(auth, email, password),
    signInWithPopup: (provider) => signInWithPopup(auth, provider),
  }
}

export default useAuth
