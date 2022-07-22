<template>
  <q-form @submit="onLogin">
    <q-input
      v-model="email"
      label="Email"
      lazy-rules="ondemand"
      type="email"
      :rules="[
        (value) =>
          (value && value.length > 0) || 'Please enter your email address',
      ]"
    />
  </q-form>

  <!-- <form class="grid p-fluid my-4 gap-4" @submit.prevent="onLogin">
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
      <PvButton label="Log in" type="submit" :loading="isLoading" />
    </div>

    <PvDivider align="center" type="dashed">OR</PvDivider>
    <AuthLoginProviders />
    <PvDivider />

    <div class="flex gap-2 items-center mx-auto text-sm">
      <NuxtLink to="/forgot">Can't log in?</NuxtLink> |
      <NuxtLink to="/signup">Sign up for an account</NuxtLink>
    </div>
  </form> -->
</template>

<script setup>
import { useToast } from 'primevue/usetoast'

const { loginUserWithEmailAndPassword, loginUserWithProvider } =
  useFirebaseAuth()

const toast = useToast()

const isLoading = ref(false)
const form = ref()

const email = ref('')
const password = ref('')

const onLogin = async () => {
  if (await form.validate()) {
    isLoading.value = true

    try {
      const credentials = await loginUserWithEmailAndPassword(
        email.value,
        password.value
      )

      navigateTo(`/${credentials.user.uid}/boards`)
    } catch (error) {
      console.error(error)
    }

    isLoading.value = false
  }
}

const onLoginWithProvider = async (provider) => {
  try {
    const credentials = await loginUserWithProvider(provider)
    navigateTo(`/${credentials.user.uid}/boards`)
  } catch (error) {
    console.error(error)
  }
}
</script>

<script>
export default {}
</script>
