<template>
  <NuxtLayout>
    <NuxtPage />

    <Toast />
  </NuxtLayout>
</template>

<script>
export default {
  
}
</script>

<style lang="scss">
html, body, #__nuxt {
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