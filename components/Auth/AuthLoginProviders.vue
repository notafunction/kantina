<template>
  <div class="flex flex-col gap-2">
    <q-btn
      icon="fa-brands fa-google"
      label="Continue with Google"
      no-caps
      @click="onLoginWithProvider('google.com')"
    />

    <q-btn
      icon="fa-brands fa-windows"
      no-caps
      label="Continue with Microsoft"
      @click="onLoginWithProvider('microsoft.com')"
    />
  </div>
</template>

<script setup>
const { loginUserWithProvider } = useFirebaseAuth()

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

<style></style>
