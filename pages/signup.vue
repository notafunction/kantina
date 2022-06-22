<template>
  <main>
    <Card class="max-w-md mx-auto">
      <template #title>
        <h5 class="text-center">Sign up for your account</h5>
      </template>
      <template #content>
        <AuthSignupForm />
      </template>
    </Card>
  </main>
</template>

<script setup>
definePageMeta({
  layout: 'basic'
})
</script>

<script>
export default {
}
</script>

<style>

</style>