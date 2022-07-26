<template>
  <q-toolbar class="header">
    <q-btn flat dense to="/" exact>Kantina</q-btn>

    <q-separator spaced inset vertical />

    <q-space />

    <AuthUserMenu />
  </q-toolbar>

  <!-- <div>
    <template #start>
      <NuxtLink to="/">Kantina</NuxtLink>
      <HeaderToolbar v-if="firebaseUser" class="ml-4" />
    </template>

    <template #end>
      <div v-if="firebaseUser" class="flex">
        <AuthUserMenu :user="firebaseUser" />
      </div>

      <div v-else class="flex gap-2">
        <PvButton
          label="Log in"
          class="p-button-text"
          @click="$router.push('/login')"
        />
        <PvButton
          label="Join Kantina for free"
          @click="$router.push('/signup')"
        />
      </div>
    </template>
  </div> -->
</template>

<script setup>
import { useFirebaseUser } from '~/composables/useStates'

const firebaseUser = useFirebaseUser()
</script>

<script>
export default {}
</script>

<style lang="scss" scoped>
.header {
  @apply bg-slate-200;
}
</style>
