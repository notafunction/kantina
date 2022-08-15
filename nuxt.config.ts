import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  app: {
    head: {
      title: 'Kantina',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap',
        },
      ],
    },
  },

  runtimeConfig: {
    public: {
      environment: process.env.NODE_ENV,
      sentry: {
        dns: process.env.SENTRY_DNS,
        tracesSampleRate: 1.0,
        debug: false,
      },
      firebaseClientConfig: {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.FIREBASE_DATABASE_URL,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
      },
      firebaseCookiePrefix: 'kantina',
    },

    firebaseAdminConfig: {
      type: 'service_account',
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      privateKeyId: process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY
        ? JSON.parse(process.env.FIREBASE_ADMIN_PRIVATE_KEY).privateKey
        : undefined,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      clientId: process.env.FIREBASE_ADMIN_CLIENT_ID,
      authUri: process.env.FIREBASE_ADMIN_AUTH_URI,
      tokenUri: process.env.FIREBASE_ADMIN_TOKEN_URI,
      authProviderX509CertUrl:
        process.env.FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL,
      clientX509CertUrl: process.env.FIREBASE_ADMIN_CLIENT_X509_CERT_URL,
      databaseURL: process.env.FIREBASE_ADMIN_DATABASE_URL,
    },
  },

  modules: ['@nuxtjs/tailwindcss'],

  css: ['vuetify/lib/styles/main.sass'],

  build: {
    transpile: ['vuetify'],
  },

  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  vite: {
    server: {
      watch: {
        usePolling: true,
      },
    },
  },

  typescript: {
    shim: false,
  },
})
