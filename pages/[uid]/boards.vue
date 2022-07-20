<template>
  <main>
    <pre>{{ $user }}</pre>
  </main>
</template>

<script setup>
definePageMeta({
  middleware: ['auth'],
})
</script>

<script>
export default {}
</script>

<style></style>
