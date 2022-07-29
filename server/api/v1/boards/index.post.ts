import { useBody, CompatibilityEvent, defineEventHandler } from 'h3'
import { add } from '@/server/lib/firestore'
import { authorized } from '~/server/lib/auth'

export default defineEventHandler(async (event: CompatibilityEvent) => {
  if (!authorized(event)) return

  const board = await useBody(event)

  try {
    const result = await add('boards', board)
    return result
  } catch (error) {
    console.log(error)
    return error
  }
})
