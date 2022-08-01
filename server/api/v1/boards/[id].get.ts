import { CompatibilityEvent } from 'h3'
import { authorized } from '~/server/lib/auth'
import { db } from '~/server/lib/firebase'

export default defineEventHandler(async (event: CompatibilityEvent) => {
  if (!authorized(event)) return

  const colRef = db.collection('boards')

  const doc = await colRef.doc(event.context.params.id).get()

  return {
    ...Object.keys(doc._fieldsProto).reduce(
      (all, next) => ({
        ...all,
        [next]: doc._fieldsProto[next][doc._fieldsProto[next].valueType],
      }),
      {}
    ),
    updatedOn: doc._updateTime,
    createdOn: doc._createTime,
  }
})
