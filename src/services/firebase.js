// import { initializeApp } from 'firebase/app'
import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
import 'firebase/compat/auth'
import 'firebase/compat/storage'
import 'firebase/compat/app-check'

export const firebaseConfig = {
  appId: '1:898560228891:web:ce19c5e5cc965ec0',
  apiKey: 'AIzaSyCsW6mSWMZSLeUrJ6kHfQVhwDCTI9UGkCc',
  authDomain: 'kantina-b8628.firebaseapp.com',
  databaseURL: 'https://kantina-b8628.firebaseio.com',
  projectId: 'kantina-b8628',
  storageBucket: 'kantina-b8628.appspot.com',
  messagingSenderId: '898560228891'
}

firebase.initializeApp(firebaseConfig)
firebase.appCheck().activate('6Lc9LFseAAAAAPlnOmHB8kaCnM3hLagkbr9v1YN3', true)

export default firebase
