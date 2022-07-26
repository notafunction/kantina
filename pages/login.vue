<template>
  <q-page class="flex p-4">
    <q-card class="m-auto w-full max-w-sm">
      <q-card-section>
        <h1 class="text-h5 text-center">Log in to Kantina</h1>
      </q-card-section>
      <q-card-section>
        <q-form ref="form" greedy @submit="onLogin">
          <div class="q-py-md">
            <div class="q-gutter-md">
              <q-input
                v-model="email"
                outlined
                label="Email"
                lazy-rules="ondemand"
                type="email"
                :rules="[
                  (value) =>
                    (value && value.length > 0) ||
                    'Please enter your email address',
                ]"
              />

              <q-input
                v-model="password"
                outlined
                label="Password"
                lazy-rules="ondemand"
                type="password"
                :rules="[
                  (value) =>
                    (value && value.length > 0) || 'Please enter your password',
                ]"
              />
            </div>
          </div>

          <q-btn color="primary" class="full-width" type="submit">Login</q-btn>
        </q-form>
      </q-card-section>

      <q-separator inset />

      <q-card-section>
        <div class="text-h6 q-mb-sm text-center">Or Log in with provider</div>

        <q-card-actions vertical>
          <AuthLoginProviders @login="onLoginWithProvider" />
        </q-card-actions>
      </q-card-section>

      <q-separator inset />

      <q-card-section class="row justify-between">
        <nuxt-link to="/recover">Can't log in?</nuxt-link>
        <q-separator vertical inset />
        <nuxt-link to="/signup">Sign up for an account</nuxt-link>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
const { loginUserWithProvider, loginUserWithEmailAndPassword } =
  useFirebaseAuth()

const form = ref()
const password = ref('')
const email = ref('')

async function onLogin() {
  if (await form.value.validate()) {
    try {
      const credentials = await loginUserWithEmailAndPassword(
        email.value,
        password.value
      )

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
  navigateTo(`/${firebaseUser.uid}/boards`)
}

definePageMeta({
  layout: 'basic',
})
</script>

<script>
export default {}
</script>

<style></style>
