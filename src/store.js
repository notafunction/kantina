import { createStore, combineReducers, compose } from 'redux'
import firebase from './services/firebase'
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
import { reduxFirestore, firestoreReducer } from 'redux-firestore'

const composeWithDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rrfConfig = {
    userProfile: 'profiles',
    useFirestoreForProfile: true,
    profileFactory: (userData, profileData) => {
        return {
            id: userData.uid,
            email: userData.email,
            firstName: userData.email.match(/^([^@]*)@/)[1],
            lastName: '',
            username: userData.uid,
            boardsById: [],
            ...profileData,
        }
    },
    profileParamsToPopulate: [
        'boardsById:boards',
    ],
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