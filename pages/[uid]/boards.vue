<template>
  <main>
    <pre>{{ $auth }}</pre>
  </main>
</template>

<script setup>
const { $auth } = useNuxtApp()

definePageMeta({
  middleware: ['auth'],
})
</script>

<script>
export default {}
</script>

<style></style>
