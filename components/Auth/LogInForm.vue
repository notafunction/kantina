<template>
  <form class="grid p-fluid my-4 gap-4" @submit.prevent="onLogin">
    <div class="col-12 md:col-4">
        <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
                <i class="pi pi-at"></i>
            </span>
            <InputText placeholder="Email" type="email" v-model="email.value" />
        </div>
    </div>

    <div class="col-12 md:col-4">
        <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
                <i class="pi pi-lock"></i>
            </span>
            <InputText placeholder="Password" type="password" v-model="password.value" />
        </div>
    </div>

    <div class="col-12 md:col-4">
      <Button label="Log in" :loading="loading.value" type="submit" />
    </div>

    <Divider align="center" type="dashed">OR</Divider>

    <Button icon="pi pi-google" label="Continue with Google" class="p-button-outlined" @click="onLoginWithGoogleProvider" />
    <Button icon="pi pi-microsoft" label="Continue with Microsoft" class="p-button-outlined" />
    <Button icon="pi pi-apple" label="Continue with Apple" class="p-button-outlined" />

    <Divider />

    <div class="flex gap-2 items-center mx-auto text-sm">
      <NuxtLink to="/forgot">Can't log in?</NuxtLink> | 
      <NuxtLink to="/signup">Sign up for an account</NuxtLink>
    </div>

  </form>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, OAuthProvider } from 'firebase/auth'

const googleProvider = new GoogleAuthProvider()
const appleProvider = new OAuthProvider('apple.com')
const microsoftProvider = new OAuthProvider('microsoft.com')

const email = ref('')
const password = ref('')
const loading = ref(false)

const onLogin = async () => {
  loading.value = true
  const auth = getAuth()

  const data = await signInWithEmailAndPassword(auth, email.value, password.value)

  console.log(data)
  loading.value = false
}

</script>

<script>

export default {
}
</script>