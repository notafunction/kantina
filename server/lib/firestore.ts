import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  setDoc,
  collectionGroup,
  Timestamp,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from './firebase'

export const queryByCollection = async (col: string) => {
  const colRef = collection(db, col)

  const snapshot = await getDocs(colRef)

  const docs = Array.from(snapshot.docs).map((doc) => {
    return {
      ...doc.data(),
      id: doc.id,
    }
  })

  return docs
}

export const set = async (col: string, document: any) => {
  await setDoc(doc(collection(db, col)), document, { merge: true })
}

export const add = async (col: string, document: any) => {
  const collectionsRef = collection(db, col)

  const documentRef = await addDoc(collectionsRef, {
    ...document,
    createdOn: serverTimestamp(),
  })

  return documentRef
}

export const del = async (col: string, id: string) => {
  const docRef = doc(db, col, id)
  return await deleteDoc(docRef)
}
