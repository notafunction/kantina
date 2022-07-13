<template>
  <main>
    <PvCard class="max-w-md mx-auto">
      <template #title>
        <h5 class="text-center">Log in to Kantina</h5>
      </template>
      <template #content>
        <AuthLoginForm />
      </template>
    </PvCard>
  </main>
</template>

<script setup>
const firebaseUser = useFirebaseUser()

definePageMeta({
  layout: 'basic',
})
</script>

<script>
export default {}
</script>

<style></style>
