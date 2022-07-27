import type { CompatibilityEvent } from 'h3'
import { useCookie } from 'h3'
import { name } from '@/package.json'

export default defineEventHandler((event: CompatibilityEvent) => {
  const authCookie = useCookie(event, `${name}.user`)

  event.context.auth = JSON.parse(authCookie)
})
