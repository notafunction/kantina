<template>
  <PvMenubar>
    <template #start>
      <NuxtLink to="/">Kantina</NuxtLink>
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
  </PvMenubar>
</template>

<script setup>
import { useFirebaseUser } from '~/composables/useStates'

const firebaseUser = useFirebaseUser()
</script>

<script>
export default {}
</script>

<style></style>
