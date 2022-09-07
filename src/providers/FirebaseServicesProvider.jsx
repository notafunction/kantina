import React from 'react'
import PropTypes from 'prop-types'
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import {
  useFirebaseApp,
  AuthProvider,
  DatabaseProvider,
  FirestoreProvider,
  StorageProvider,
  AppCheckProvider
} from 'reactfire'

export default function FirebaseServicesProvider({ children }) {
  const app = useFirebaseApp()
  const auth = getAuth(app)
  const database = getDatabase(app)
  const firestore = getFirestore(app)
  const storage = getStorage(app)

  const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider('6Lc9LFseAAAAAPlnOmHB8kaCnM3hLagkbr9v1YN3'),
    isTokenAutoRefreshEnabled: true
  })

  return (
    <AppCheckProvider sdk={appCheck}>
      <AuthProvider sdk={auth}>
        <DatabaseProvider sdk={database}>
          <FirestoreProvider sdk={firestore}>
            <StorageProvider sdk={storage}>{children}</StorageProvider>
          </FirestoreProvider>
        </DatabaseProvider>
      </AuthProvider>
    </AppCheckProvider>
  )
}

FirebaseServicesProvider.propTypes = {
  children: PropTypes.node.isRequired
}
