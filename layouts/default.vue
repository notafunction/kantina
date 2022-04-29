<template>
  <div>
    <Menubar>
      <template #start>
        <NuxtLink to="/">
          <img src="icon.png" height="40" class="mr-2">
        </NuxtLink>
      </template>
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
