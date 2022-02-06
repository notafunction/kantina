import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
import 'firebase/compat/auth'
import 'firebase/compat/storage'
import 'firebase/compat/app-check'
import firebaseConfig from './firebase.config.json'

firebase.initializeApp(firebaseConfig)
firebase.appCheck().activate('6Lc9LFseAAAAAPlnOmHB8kaCnM3hLagkbr9v1YN3', true)

export default firebase
export { firebaseConfig }
