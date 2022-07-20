<template>
  <NuxtLayout>
    <NuxtPage />

    <PvToast />
  </NuxtLayout>
</template>

<script setup>
import { useFirebaseUser } from './composables/useStates'

const { initUser } = useFirebaseUser()
</script>

<script>
export default {}
</script>

<style lang="scss">
html,
body,
#__nuxt {
  height: 100%;
}

body {
  background-color: #eff3f8;
}

a {
  color: #0052cc;
  @apply no-underline;

  &:hover {
    @apply underline;
  }
}
</style>
