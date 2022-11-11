import React from 'react'
import {
  AuthProvider,
  DatabaseProvider,
  StorageProvider,
  AppCheckProvider,
  FirebaseAppProvider
} from 'reactfire'
import UserProfileProvider from '../containers/User/UserProfileProvider'
import {
  app,
  db,
  auth,
  appCheck,
  storage
} from '../../lib/firebase'

export default function FirebaseServicesProvider({
  children
}) {
  return (
    <FirebaseAppProvider firebaseApp={app}>
      <AppCheckProvider sdk={appCheck}>
        <AuthProvider sdk={auth}>
          <DatabaseProvider sdk={db}>
            <UserProfileProvider>
              <StorageProvider sdk={storage}>
                {children}
              </StorageProvider>
            </UserProfileProvider>
          </DatabaseProvider>
        </AuthProvider>
      </AppCheckProvider>
    </FirebaseAppProvider>
  )
}
