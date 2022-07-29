import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

const { firebaseAdminConfig } = useRuntimeConfig()

export const firebaseApp = initializeApp({
  credential: cert(firebaseAdminConfig),
  databaseURL: firebaseAdminConfig.databaseURL,
})

export const db = getFirestore(firebaseApp)
