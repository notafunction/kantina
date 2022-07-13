import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  UserCredential,
  GoogleAuthProvider,
  ProviderId,
  FacebookAuthProvider,
  GithubAuthProvider,
  TwitterAuthProvider,
  AuthProvider,
} from 'firebase/auth'
import { useFirebaseUser } from './useStates'

export const createUser = async (email: string, password: string) => {
  const auth = getAuth()

  try {
    const credentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    return credentials
  } catch (error) {}
}

export const loginUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  const auth = getAuth()

  try {
    const credentials = await signInWithEmailAndPassword(auth, email, password)
    return credentials
  } catch (error) {}
}

export const loginUserWithProvider = async (
  providerId: string
): Promise<UserCredential> => {
  if (!providerId) throw new Error('No provider ID')

  const auth = getAuth()

  const provider = getProvider(providerId)

  const credentials = await signInWithPopup(auth, provider)

  return credentials
}

export const logoutUser = async () => {
  const auth = getAuth()
  return await auth.signOut()
}

export const initUser = () => {
  const auth = getAuth()
  const firebaseUser = useFirebaseUser()
  firebaseUser.value = auth.currentUser

  const firebaseUserCookie = useCookie(`${name}.user`)

  onAuthStateChanged(auth, (user) => {
    firebaseUser.value = user
    firebaseUserCookie.value = user
  })
}

export default function useFirebaseAuth() {
  return {
    createUser,
    loginUserWithEmailAndPassword,
    loginUserWithProvider,
    logoutUser,
    initUser,
  }
}

function getProvider(providerId: string): AuthProvider {
  switch (providerId) {
    case ProviderId.FACEBOOK: {
      return new FacebookAuthProvider()
    }

    case ProviderId.GITHUB: {
      return new GithubAuthProvider()
    }

    case ProviderId.GOOGLE: {
      return new GoogleAuthProvider()
    }

    case ProviderId.TWITTER: {
      return new TwitterAuthProvider()
    }

    default: {
      return new GoogleAuthProvider()
    }
  }
}
