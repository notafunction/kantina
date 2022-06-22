import { defineNuxtConfig } from 'nuxt'
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

  modules: [
    '@unocss/nuxt',
  ],

  css: [
    '@unocss/reset/normalize.css',
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

    transformers: [
      transformerDirective()
    ]
  },

  toast: {
    position: 'top-right',
    duration: 5000,
  },
  
  typescript: {
    shim: false,
  },
})
