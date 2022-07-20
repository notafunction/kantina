<template>
  <form class="grid p-fluid my-4 gap-4" @submit.prevent="onSignup">
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
      <PvButton label="Sign up" type="submit" />
    </div>

    <PvDivider align="center" type="dashed">OR</PvDivider>

    <PvButton
      icon="pi pi-google"
      label="Continue with Google"
      class="p-button-outlined"
      @click="onSignupWithProvider(providers.google)"
    />

    <PvDivider />

    <div class="flex gap-2 items-center mx-auto text-sm">
      <NuxtLink to="/login">Already have an account? Log in</NuxtLink>
    </div>
  </form>
</template>

<script setup>
import { useToast } from 'primevue/usetoast'
import useFirebaseAuth from '~/composables/useFirebaseAuth'

const toast = useToast()
const { createUser } = useFirebaseAuth()

const email = ref('')
const password = ref('')
const isLoading = ref(false)

const onSignup = async () => {
  isLoading.value = true

  try {
    const credentials = await createUser(email.value, password.value)

    navigateTo(`/${credentials.uid}/boards`)
  } catch (error) {
    toast.add({
      summary: 'Could not create user',
      detail: error.message,
      severity: 'error',
    })
  }

  isLoading.value = false
}

const onSignupWithProvider = async (providerId) => {
  const { signInWithPopup } = useAuth()

  try {
    const credentials = await signInWithPopup(providerId)

    navigateTo(`/${credentials.uid}/boards`)
  } catch (error) {
    console.error(error)
  }
}
</script>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
}
</script>
