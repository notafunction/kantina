export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'kantina',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['modern-normalize/modern-normalize.css', 'primeflex/primeflex.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // Doc: https://www.primefaces.org/primevue/showcase-v2/#/setup
    'primevue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/firebase'
  ],

  firebase: {
    config: {
      appId: '1:898560228891:web:ce19c5e5cc965ec0',
      apiKey: 'AIzaSyCsW6mSWMZSLeUrJ6kHfQVhwDCTI9UGkCc',
      authDomain: 'kantina-b8628.firebaseapp.com',
      databaseURL: 'https://kantina-b8628.firebaseio.com',
      projectId: 'kantina-b8628',
      storageBucket: 'kantina-b8628.appspot.com',
      messagingSenderId: '898560228891'
    },
    services: {
      auth: true,
      firestore: true,
      storage: true
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/'
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // https://github.com/primefaces/primevue/issues/844
    transpile: ['primevue']
  }
}
