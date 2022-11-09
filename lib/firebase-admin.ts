import { initializeApp, AppOptions } from 'firebase-admin/app'
import { getDatabase } from 'firebase-admin/database'

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON)

const appOptions: AppOptions = {
  ...serviceAccount,
  databaseURL: process.env.FIREBASE_ADMIN_DATABASE_URL
}

const app = initializeApp(appOptions)

const db = getDatabase(app)

export { db, app }