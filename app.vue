<template>
  <client-only>
    <v-app>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </v-app>
  </client-only>
</template>

<script>
export default {}
</script>

<style lang="scss">
body {
  background-color: #eff3f8;
}

a {
  color: #0052cc;
  @apply no-underline;
}
</style>
