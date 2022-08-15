import { CompatibilityEvent } from 'h3'
import admin from 'firebase-admin'

export const authorized = async (event: CompatibilityEvent) => {
  const { user, auth } = event.context

  if (!auth || !auth.accessToken) return false

  const decodedToken = await admin.auth().verifyIdToken(auth.accessToken)

  if (!decodedToken) return false

  if (user) return true

  event.res.statusCode = 401
  event.res.end()
  return false
}
