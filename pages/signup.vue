<template>
  <q-page class="flex p-4">
    <q-card class="m-auto w-full max-w-sm">
      <q-card-section>
        <h1 class="text-h5 text-center">Sign up for your account</h1>
      </q-card-section>
      <q-card-section>
        <q-form ref="form" greedy @submit="onSignup">
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
                    (value && value.length > 0) || 'Please enter a password',
                ]"
              />
            </div>
          </div>

          <q-btn color="primary" class="full-width" type="submit">Signup</q-btn>
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

      <q-card-section class="text-center">
        <nuxt-link to="/login">Already have an account? Log in</nuxt-link>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
const form = ref()
const password = ref('')
const email = ref('')

async function onSignup() {
  if (await form.value.validate()) {
    const { createUser } = useFirebaseAuth()

    try {
      await createUser(email.value, password.value).then((credentials) =>
        navigateTo(`/${credentials.user.uid}/boards`)
      )
    } catch (error) {
      console.log(error)
    }
  }
}

async function onLoginWithProvider(provider) {
  try {
    await loginUserWithProvider(provider).then((credentials) =>
      navigateTo(`/${credentials.user.uid}/boards`)
    )
  } catch (error) {
    console.error(error)
  }
}

definePageMeta({
  layout: 'basic',
})
</script>

<script>
export default {}
</script>

<style></style>
