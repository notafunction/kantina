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
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const app = nuxtApp.vueApp

  app.use(PrimeVue, { ripple: false })
  app.use(ToastService)

  app.component('PvMenubar', Menubar)
  app.component('PvButton', Button)
  app.component('PvToast', Toast)
  app.component('PvCard', Card)
  app.component('PvDivider', Divider)
  app.component('PvInputText', InputText)
  app.component('PvAvatar', Avatar)
  app.component('PvMenu', Menu)
})
