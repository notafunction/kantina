import { initializeApp, getApps } from 'firebase-admin/app'
import { getDatabase } from 'firebase-admin/database'

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON)

let app
const apps = getApps()

if (apps.length) {
  app = apps[0]
} else {
  app = initializeApp({
    ...serviceAccount,
    databaseURL: process.env.FIREBASE_ADMIN_DATABASE_URL
  })
}

const db = getDatabase(app)

export { db }