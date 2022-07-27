import type { CompatibilityEvent } from 'h3'
import { useCookie } from 'h3'
import { name } from '@/package.json'

export default defineEventHandler((event: CompatibilityEvent) => {
  const userCookie = useCookie(event, `${name}.user`)

  if (userCookie) {
    event.context.user = JSON.parse(userCookie)
  }
})
