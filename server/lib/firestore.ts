import { FieldValue } from 'firebase-admin/firestore'
import { db } from './firebase'

export const queryByCollection = async (col: string) => {
  const colRef = db.collection(col)

  const snapshot = await colRef.get()

  const docs = Array.from(snapshot.docs).map((doc) => {
    return {
      ...doc.data(),
      id: doc.id,
    }
  })

  return docs
}

export const set = async (collection: string, document: any) => {
  const docRef = await db.collection(collection).doc()

  return await docRef.set(document, { merge: true })
}

export const add = async (col: string, document: any) => {
  const collectionsRef = db.collection(col)

  const documentRef = await collectionsRef.add({
    ...document,
    createdOn: FieldValue.serverTimestamp(),
  })

  return documentRef
}

export const del = async (col: string, id: string) => {
  const docRef = db.collection(col).doc(id)
  return await docRef.delete()
}
