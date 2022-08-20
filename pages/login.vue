<template>
  <v-container>
    <v-card tonal>
      <v-card-title>Log in to Kantina</v-card-title>
      <v-card-text>
        <v-form ref="form" @submit="onLogin">
          <v-text-field
            v-model="formData.email"
            variant="solo"
            label="Email"
            type="email"
            :rules="[
              (value) =>
                (value && value.length > 0) ||
                'Please enter your email address',
            ]"
          />

          <v-text-field
            v-model="formData.password"
            variant="solo"
            label="Password"
            type="password"
            :rules="[
              (value) =>
                (value && value.length > 0) || 'Please enter your password',
            ]"
          />

          <v-btn color="primary" flat type="submit">Login</v-btn>
        </v-form>
      </v-card-text>

      <v-spacer />

      <v-card-text>
        <div class="text-h6 q-mb-sm text-center">Or Log in with provider</div>

        <AuthLoginProviders @login="onLoginWithProvider" />
      </v-card-text>

      <v-spacer />

      <v-card-actions>
        <v-btn to="/recover">Can't log in?</v-btn>
        <q-separator vertical inset />
        <v-btn to="/signup">Sign up for an account</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
const { loginUserWithProvider, loginUserWithEmailAndPassword } =
  useFirebaseAuth()

const form = ref()
const formData = ref({ email: '', password: '' })

async function onLogin() {
  if (await form.value.validate()) {
    const { email, password } = formData.value

    try {
      const credentials = await loginUserWithEmailAndPassword(email, password)

      if (credentials) {
        performPostLogin(credentials.user)
      }
    } catch (error) {
      console.log('catch', error)
    }
  }
}

async function onLoginWithProvider(provider) {
  try {
    const credentials = await loginUserWithProvider(provider)

    if (credentials) {
      performPostLogin(credentials.user)
    }
  } catch (error) {
    console.error(error)
  }
}

function performPostLogin() {
  const firebaseUser = useFirebaseUser()
  navigateTo(`/home`)
}

definePageMeta({
  layout: 'basic',
})
</script>

<script>
export default {}
</script>

<style></style>
