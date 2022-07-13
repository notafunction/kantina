import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCsW6mSWMZSLeUrJ6kHfQVhwDCTI9UGkCc',
  authDomain: 'kantina-b8628.firebaseapp.com',
  databaseURL: 'https://kantina-b8628.firebaseio.com',
  projectId: 'kantina-b8628',
  storageBucket: 'kantina-b8628.appspot.com',
  messagingSenderId: '898560228891',
  appId: '1:898560228891:web:ce19c5e5cc965ec0',
}

export const firebaseApp = initializeApp(firebaseConfig)

// import { initializeApp } from 'firebase/app'
// import { getAuth } from 'firebase/auth'
// import { getFirestore } from 'firebase/firestore'
// import { defineNuxtPlugin, useRuntimeConfig } from '#app'
// import useUser from '~/composables/useUser'

// const getFirebaseErrorMessage = (code) => {
//   switch (code) {
//     case 'auth/invalid-email':
//       return 'Invalid email'

//     case 'auth/user-not-found':
//       return 'No account with that email was found'

//     case 'auth/wrong-password':
//       return 'Incorrect password'
//   }
// }

// export default defineNuxtPlugin(() => {
//   const config = useRuntimeConfig()
//   const { user, setUser } = useUserData()

//   const firebase = initializeApp(config.firebase)

//   const auth = getAuth()
//   const db = getFirestore()

//   auth.onAuthStateChanged((user) => {
//     setUser(user)
//   })

//   return {
//     provide: {
//       firebase,
//       db,
//       auth,
//       getFirebaseErrorMessage,
//     },
//   }
// })
