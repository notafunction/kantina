import Equal from 'equal-vue'
import { defineNuxtPlugin } from '#app'
import 'equal-vue/dist/style.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Equal)
})
