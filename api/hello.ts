import { initializeApp } from 'firebase-admin/app'

export default function handler(req, res) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON)

  const app = initializeApp(serviceAccount)

  console.log(app)

  const { name = 'World' } = req.query;
  return res.send(`Hello ${name}!`);
}
