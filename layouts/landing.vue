<template>
  <div>
    <Menubar>
      <template #start>
        <NuxtLink to="/" class="brand">
          <img src="icon.png" height="40" class="mr-2">
          <span>Kantina</span>
        </NuxtLink>
      </template>

      <template #end />
    </Menubar>

    <Nuxt />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Menubar from 'primevue/menubar'

export default Vue.extend({
  name: 'DefaultLayout',

  components: {
    Menubar
  }

})
</script>

<style scoped lang="scss">
@import 'primeflex/primeflex.scss';

.brand {
  @include styleclass('flex align-items-center');
}
</style>
