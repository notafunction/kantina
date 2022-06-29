<template>
  <form class="grid p-fluid my-4 gap-4" @submit.prevent="onLogin">
    <div class="col-12 md:col-4">
      <div class="p-inputgroup">
        <span class="p-inputgroup-addon">
          <i class="pi pi-at"></i>
        </span>
        <PvInputText v-model="email" placeholder="Email" type="email" />
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
        />
      </div>
    </div>

    <div class="col-12 md:col-4">
      <PvButton label="Log in" :loading="loading" type="submit" />
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
import { ref } from 'vue'
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  OAuthProvider,
} from 'firebase/auth'
import { useToast } from 'primevue/usetoast'

const toast = useToast()
const { $user, $firebase } = useNuxtApp()

const providers = {
  google: new GoogleAuthProvider(),
  apple: new OAuthProvider('apple.com'),
  microsoft: new OAuthProvider('microsoft.com').setCustomParameters({
    prompt: 'consent',
    tenant: '18133708-3531-404b-8b96-b133c27b5d21',
  }),
}

const email = ref('')
const password = ref('')
const loading = ref(false)

async function onLogin() {
  loading.value = true

  try {
    await signInWithEmailAndPassword(
      $firebase.auth,
      email.value,
      password.value
    )
    handlePostLoginActions()
  } catch (error) {
    handleLoginError(error)
  }

  loading.value = false
}

async function onLoginWithProvider(provider) {
  try {
    await signInWithPopup($firebase.auth, provider)
    handlePostLoginActions()
  } catch (error) {
    handleLoginError(error)
  }
}

function handlePostLoginActions() {
  toast.add({
    severity: 'success',
    summary: `Welcome back, ${$user.email}`,
    life: 3000,
  })
  return navigateTo({
    path: '/',
  })
}

function handleLoginError(error) {
  toast.add({
    severity: 'error',
    summary: $firebase.getFirebaseErrorMessage(error.code),
    life: 4000,
  })
}
</script>

<script>
export default {}
</script>
