<template>
  <div></div>
</template>

<script setup>
import { useFirebaseUser } from '~/composables/useStates'

const user = useFirebaseUser()

if (user) navigateTo('/home')
</script>

<script></script>

<style></style>
