import type { CompatibilityEvent } from 'h3'

export const authorized = (event: CompatibilityEvent) => {
  const { user } = event.context

  if (user) return true

  event.res.statusCode = 401
  event.res.end()
  return false
}
