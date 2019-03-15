import { createStore, combineReducers, compose } from 'redux'
import firebase from './services/firebase'
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
import { reduxFirestore, firestoreReducer } from 'redux-firestore'

const composeWithDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
  profileFactory: (userData, profileData) => {
    return {
      id: userData.uid,
      email: userData.email,
      boardsById: [],
      ...profileData,
    }
  }
}

const createStoreWithFirebase = composeWithDevTools(
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase)
)(createStore)

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
})

const initialState = {}

const store = createStoreWithFirebase(rootReducer, initialState)

export default store