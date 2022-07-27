<template>
  <client-only>
    <NuxtLayout>
      <NuxtPage />

      <GDialogRoot />
    </NuxtLayout>
  </client-only>
</template>

<script>
import { GDialogRoot } from 'gitart-vue-dialog'

export default {
  components: {
    GDialogRoot,
  },
}
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
}
</style>
