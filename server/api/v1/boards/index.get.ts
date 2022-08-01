import { authorized } from '~/server/lib/auth'
import { queryByCollection } from '~/server/lib/firestore'

export default defineEventHandler(async (event) => {
  if (!authorized(event)) return

  const docs = await queryByCollection('boards')

  return docs
})
