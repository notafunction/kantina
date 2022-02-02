// import { initializeApp } from 'firebase/app'
import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
import 'firebase/compat/auth'
import 'firebase/compat/storage'

export const firebaseConfig = {
  apiKey: 'AIzaSyCsW6mSWMZSLeUrJ6kHfQVhwDCTI9UGkCc',
  authDomain: 'kantina-b8628.firebaseapp.com',
  databaseURL: 'https://kantina-b8628.firebaseio.com',
  projectId: 'kantina-b8628',
  storageBucket: 'kantina-b8628.appspot.com',
  messagingSenderId: '898560228891'
}

firebase.initializeApp(firebaseConfig)

export default firebase
