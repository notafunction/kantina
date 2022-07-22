<template>
  <q-page>
    <q-card class="m-auto max-w-sm">
      <q-card-section>
        <div class="text-h6">Log in to Kantina</div>
        <q-form ref="form" @submit="onLogin">
          <q-input
            v-model="email"
            filled
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
            filled
            label="Password"
            lazy-rules="ondemand"
            type="password"
            :rules="[
              (value) =>
                (value && value.length > 0) || 'Please enter your password',
            ]"
          />

          <q-btn color="primary" class="full-width" @click="onLogin"
            >Login</q-btn
          >
        </q-form>
      </q-card-section>

      <q-separator inset />

      <q-card-section>
        <div class="text-h6 q-mb-sm">Or Log in with provider</div>

        <AuthLoginProviders />
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
const firebaseUser = useFirebaseUser()
const form = ref()
const password = ref('')
const email = ref('')

async function onLogin() {
  if (await form.value.validate()) {
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
