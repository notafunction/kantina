import { defineNuxtConfig } from 'nuxt'
import eslintPlugin from 'vite-plugin-eslint'
import transformerDirective from '@unocss/transformer-directives'

export default defineNuxtConfig({
  head: {
    title: 'Kantina',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  modules: ['@unocss/nuxt'],

  publicRuntimeConfig: {
    firebase: {
      apiKey: 'AIzaSyCsW6mSWMZSLeUrJ6kHfQVhwDCTI9UGkCc',
      authDomain: 'kantina-b8628.firebaseapp.com',
      databaseURL: 'https://kantina-b8628.firebaseio.com',
      projectId: 'kantina-b8628',
      storageBucket: 'kantina-b8628.appspot.com',
      messagingSenderId: '898560228891',
      appId: '1:898560228891:web:ce19c5e5cc965ec0',
    },
  },

  css: [
    '@unocss/reset/eric-meyer.css',
    'primevue/resources/primevue.min.css',
    'primevue/resources/themes/saga-blue/theme.css',
    'primeicons/primeicons.css',
  ],

  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  unocss: {
    uno: true,
    attributify: true,

    transformers: [transformerDirective()],
  },

  typescript: {
    shim: false,
  },

  vite: {
    plugins: [eslintPlugin()],
  },
})
