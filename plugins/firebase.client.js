import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { initUser } from '~/composables/useFirebaseAuth'

const firebaseConfig = {
  apiKey: 'AIzaSyCsW6mSWMZSLeUrJ6kHfQVhwDCTI9UGkCc',
  authDomain: 'kantina-b8628.firebaseapp.com',
  databaseURL: 'https://kantina-b8628.firebaseio.com',
  projectId: 'kantina-b8628',
  storageBucket: 'kantina-b8628.appspot.com',
  messagingSenderId: '898560228891',
  appId: '1:898560228891:web:ce19c5e5cc965ec0',
}

export default defineNuxtPlugin((nuxtApp) => {
  const app = initializeApp(firebaseConfig)

  initUser()

  const auth = getAuth()

  return {
    provide: {
      auth,
    },
  }
})
