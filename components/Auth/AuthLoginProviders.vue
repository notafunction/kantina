<template>
  <div>
    <PvButton
      icon="pi pi-google"
      label="Continue with Google"
      class="p-button-outlined"
      @click="onLoginWithProvider('google.com')"
    />
  </div>
</template>

<script setup>
const { loginUserWithProvider } = useFirebaseAuth()

const onLoginWithProvider = async (provider) => {
  try {
    const credentials = await loginUserWithProvider(provider)
    navigateTo(`/${credentials.user.uid}/boards`)
  }
}
</script>

<script>
export default {}
</script>

<style></style>
