import { initializeApp } from 'firebase/app'
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { getStorage } from 'firebase/storage'
import firebaseConfig from './firebase.config.json'

if (import.meta.env.MODE !== 'production') {
  self.FIREBASE_APPCHECK_DEBUG_TOKEN = import.meta.env.VITE_FIREBASE_APPCHECK_DEBUG_TOKEN || false
}

const app = initializeApp(firebaseConfig)
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6Lc9LFseAAAAAPlnOmHB8kaCnM3hLagkbr9v1YN3'),
  isTokenAutoRefreshEnabled: true
})
const db = getDatabase(app)
const auth = getAuth(app)
const storage = getStorage(app)

export { app, appCheck, db, auth, storage }
