<template>
  <div>
    <pre>{{ user }}</pre>
  </div>
</template>

<script setup>
import { useFirebaseUser } from '~/composables/useStates'

const user = useFirebaseUser()
</script>

<script></script>

<style></style>
