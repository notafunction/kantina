<template>
  <div class="flex flex-col gap-4">
    <PvButton
      icon="pi pi-google"
      label="Continue with Google"
      class="p-button-outlined"
      @click="onLoginWithProvider('google.com')"
    />

    <PvButton
      icon="pi pi-microsoft"
      label="Continue with Microsoft"
      class="p-button-outlined"
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
