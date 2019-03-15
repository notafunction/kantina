import firebase from 'firebase'
import '@firebase/firestore'

export const config = {
  apiKey: "AIzaSyCsW6mSWMZSLeUrJ6kHfQVhwDCTI9UGkCc",
  authDomain: "kantina-b8628.firebaseapp.com",
  databaseURL: "https://kantina-b8628.firebaseio.com",
  projectId: "kantina-b8628",
  storageBucket: "kantina-b8628.appspot.com",
  messagingSenderId: "898560228891"
}

firebase.initializeApp(config)
export const db = firebase.firestore()

export default firebase