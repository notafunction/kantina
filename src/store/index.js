import { configureStore } from '@reduxjs/toolkit'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'
import uiReducer from './ui'

export default configureStore({
  reducer: {
    ui: uiReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer
  }
})
