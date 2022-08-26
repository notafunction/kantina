import React from 'react'
import PropTypes from 'prop-types'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { getFirestore } from 'firebase/firestore'
import {
  AuthProvider,
  DatabaseProvider,
  FirestoreProvider,
  useFirebaseApp,
  StorageProvider
} from 'reactfire'
import { getStorage } from 'firebase/storage'

export default function FirebaseServicesProvider({ children }) {
  const app = useFirebaseApp()
  const auth = getAuth(app)
  const database = getDatabase(app)
  const firestore = getFirestore(app)
  const storage = getStorage(app)

  return (
    <AuthProvider sdk={auth}>
      <DatabaseProvider sdk={database}>
        <FirestoreProvider sdk={firestore}>
          <StorageProvider sdk={storage}>{children}</StorageProvider>
        </FirestoreProvider>
      </DatabaseProvider>
    </AuthProvider>
  )
}

FirebaseServicesProvider.propTypes = {
  children: PropTypes.node.isRequired
}
