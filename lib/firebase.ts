import { initializeApp, getApps, App, AppOptions } from 'firebase-admin/app'
import { getDatabase, Database } from 'firebase-admin/database'

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON)

const appOptions: AppOptions = {
  ...serviceAccount,
  databaseURL: process.env.FIREBASE_ADMIN_DATABASE_URL
}

let app: App
const apps = getApps()

if (apps.length) {
  app = apps[0]
} else {
  app = initializeApp(appOptions)
}

const db: Database = getDatabase(app)

export { db, app }