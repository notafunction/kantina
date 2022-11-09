import { initializeApp, AppOptions } from 'firebase-admin/app'
import { getDatabase } from 'firebase-admin/database'
import firebaseConfig from './firebase.config.json'

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON)

const appOptions: AppOptions = {
  ...firebaseConfig,
  ...serviceAccount
}

const app = initializeApp(appOptions)

const db = getDatabase(app)

export { db, app }