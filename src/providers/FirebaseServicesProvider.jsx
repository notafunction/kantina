import React from 'react'
import PropTypes from 'prop-types'
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { getStorage } from 'firebase/storage'
import {
  useFirebaseApp,
  AuthProvider,
  DatabaseProvider,
  StorageProvider,
  AppCheckProvider
} from 'reactfire'
import UserProfileProvider from '../containers/User/UserProfileProvider'

export default function FirebaseServicesProvider({ children }) {
  const app = useFirebaseApp()
  const auth = getAuth(app)
  const database = getDatabase(app)
  const storage = getStorage(app)

  const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider('6Lc9LFseAAAAAPlnOmHB8kaCnM3hLagkbr9v1YN3'),
    isTokenAutoRefreshEnabled: true
  })

  return (
    <AppCheckProvider sdk={appCheck}>
      <AuthProvider sdk={auth}>
        <DatabaseProvider sdk={database}>
          <UserProfileProvider>
            <StorageProvider sdk={storage}>{children}</StorageProvider>
          </UserProfileProvider>
        </DatabaseProvider>
      </AuthProvider>
    </AppCheckProvider>
  )
}

FirebaseServicesProvider.propTypes = {
  children: PropTypes.node.isRequired
}
