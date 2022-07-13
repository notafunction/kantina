<template>
  <div>
    <pre>{{ firebaseUser }}</pre>
  </div>
</template>

<script setup>
import { useFirebaseUser } from '~/composables/useStates'

const firebaseUser = useFirebaseUser()
</script>

<script></script>

<style></style>
