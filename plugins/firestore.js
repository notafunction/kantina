import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyCsW6mSWMZSLeUrJ6kHfQVhwDCTI9UGkCc',
  authDomain: 'kantina-b8628.firebaseapp.com',
  databaseURL: 'https://kantina-b8628.firebaseio.com',
  projectId: 'kantina-b8628',
  storageBucket: 'kantina-b8628.appspot.com',
  messagingSenderId: '898560228891',
  appId: '1:898560228891:web:ce19c5e5cc965ec0',
}

const firebase = initializeApp(config)
const auth = getAuth(firebase)
const firestore = getFirestore(firebase)

export default function (_context, inject) {
  inject('firebase', {
    firebase,
    firestore,
    auth,
  })
}
