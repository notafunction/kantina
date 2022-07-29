import { useCookie, CompatibilityEvent } from 'h3'
import { name } from '@/package.json'

export default defineEventHandler((event: CompatibilityEvent) => {
  const userCookie = useCookie(event, `${name}.user`)
  const authCookie = useCookie(event, `${name}.tokens`)

  if (userCookie) {
    event.context.user = JSON.parse(userCookie)
  }

  if (authCookie) {
    event.context.auth = JSON.parse(authCookie)
  }
})
