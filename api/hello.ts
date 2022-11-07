import { initializeApp } from 'firebase-admin/app'
import { getDatabase } from 'firebase-admin/database'

export default function handler(req, res) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON)

  const app = initializeApp(serviceAccount)
  const db = getDatabase(app)

  console.log(db)

  const { name = 'World' } = req.query;
  return res.send(`Hello ${name}!`);
}
