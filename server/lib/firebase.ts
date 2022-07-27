import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const { firebase: firebaseConfig } = useRuntimeConfig()

export const firebaseApp = initializeApp(firebaseConfig)

export const db = getFirestore(firebaseApp)
