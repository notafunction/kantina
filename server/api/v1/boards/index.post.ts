import type { CompatibilityEvent } from 'h3'

export default defineEventHandler((event: CompatibilityEvent) => {
  console.log(event.context.auth)

  return 'hi there'
})
