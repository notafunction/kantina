<template>
  <form class="grid p-fluid my-4 gap-4" @submit.prevent="onLogin">
    <div class="col-12 md:col-4">
      <div class="p-inputgroup">
        <span class="p-inputgroup-addon">
          <i class="pi pi-at"></i>
        </span>
        <PvInputText
          v-model="email"
          placeholder="Email"
          type="email"
          name="email"
        />
      </div>
    </div>

    <div class="col-12 md:col-4">
      <div class="p-inputgroup">
        <span class="p-inputgroup-addon">
          <i class="pi pi-lock"></i>
        </span>
        <PvInputText
          v-model="password"
          placeholder="Password"
          type="password"
          name="password"
        />
      </div>
    </div>

    <div class="col-12 md:col-4">
      <PvButton label="Log in" type="submit" />
    </div>

    <PvDivider align="center" type="dashed">OR</PvDivider>

    <PvButton
      icon="pi pi-google"
      label="Continue with Google"
      class="p-button-outlined"
      @click="onLoginWithProvider(providers.google)"
    />

    <PvDivider />

    <div class="flex gap-2 items-center mx-auto text-sm">
      <NuxtLink to="/forgot">Can't log in?</NuxtLink> |
      <NuxtLink to="/signup">Sign up for an account</NuxtLink>
    </div>
  </form>
</template>

<script setup>
import { GoogleAuthProvider, OAuthProvider } from 'firebase/auth'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

const isLoading = ref(false)
const data = ref({
  email: '',
  password: '',
})

const providers = {
  google: new GoogleAuthProvider(),
  apple: new OAuthProvider('apple.com'),
  microsoft: new OAuthProvider('microsoft.com').setCustomParameters({
    prompt: 'consent',
    tenant: '18133708-3531-404b-8b96-b133c27b5d21',
  }),
}

const onLogin = async () => {
  isLoading.value = true

  try {
    const { signInWithEmailAndPassword } = useAuth()
    const credentials = await signInWithEmailAndPassword(
      email.value,
      password.value
    )

    navigateTo(`/${credentials.user.uid}/boards`)
  } catch (error) {
    console.error(error)
  }

  isLoading.value = false
}

const onLoginWithProvider = async (provider) => {
  const { signInWithPopup } = useAuth()
  await signInWithPopup(provider)
}
</script>

<script>
export default {}
</script>
