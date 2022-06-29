import { defineNuxtPlugin } from '#app'

// Services
import Toast from 'primevue/toast'

// Components
import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Menubar from 'primevue/menubar'
import Card from 'primevue/card'
import Divider from 'primevue/divider'
import Avatar from 'primevue/avatar'
import Menu from 'primevue/menu'

// services
import ToastService from 'primevue/toastservice'

export default defineNuxtPlugin((nuxtApp) => {
  const app = nuxtApp.vueApp

  app.use(PrimeVue, { ripple: false })
  app.use(ToastService)

  app.component('Button', Button)
  app.component('Menubar', Menubar)
  app.component('Toast', Toast)
  app.component('Card', Card)
  app.component('Divider', Divider)
  app.component('InputText', InputText)
  app.component('Avatar', Avatar)
  app.component('Menu', Menu)
})