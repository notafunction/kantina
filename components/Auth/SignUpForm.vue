<template>
  <form class="grid p-fluid my-4 gap-4" @submit.prevent="onSignup">
    <div class="col-12 md:col-4">
        <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
                <i class="pi pi-at"></i>
            </span>
            <InputText placeholder="Email" type="email" v-model="email" />
        </div>
    </div>

    <div class="col-12 md:col-4">
        <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
                <i class="pi pi-lock"></i>
            </span>
            <InputText placeholder="Password" type="password" v-model="password" />
        </div>
    </div>

     <div class="col-12 md:col-4">
        <Button label="Sign up" type="submit" />
    </div>

    <Divider align="center" type="dashed">OR</Divider>

    <Button @click="onSignupWithProvider(providers.google)" icon="pi pi-google" label="Continue with Google" class="p-button-outlined" />

    <Divider />

    <div class="flex gap-2 items-center mx-auto text-sm">
      <NuxtLink to="/login">Already have an account? Log in</NuxtLink>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, OAuthProvider } from 'firebase/auth'
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

const onSignup = async () => {
  loading.value = true

  try {
    await createUserWithEmailAndPassword($firebase.auth, email.value, password.value)
    handlePostSignupActions()
  } catch (error) {
    handleSignupError(error)
  }

  loading.value = false
}

async function onSignupWithProvider(provider) {
  try {
    await signInWithPopup($firebase.auth, provider)
  } catch (error) {
    handleSignupError(error)
  }
}

function handlePostSignupActions() {
  toast.add({ severity: 'success', summary: `Welcome, ${$user.email}`, life: 3000 })
  return navigateTo({
    path: '/'
  })
}

function handleSignupError(error) {
  toast.add({ severity: 'error', summary: $firebase.getFirebaseErrorMessage(error.code), life: 4000 })
}
</script>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    }
  }
}
</script>