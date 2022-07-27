import { useBody, CompatibilityEvent, defineEventHandler } from 'h3'
import { add } from '@/server/lib/firestore'
import { authorized } from '~/server/lib/auth'
import { Board } from '~/@types/board'

export default defineEventHandler(async (event: CompatibilityEvent) => {
  if (!authorized(event)) return

  const board = await useBody(event)

  const result = await add('boards', board)

  return result
})
