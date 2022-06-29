<template>
<div>
  <h1>hello, world</h1>
  <pre>{{ userData }}</pre>
</div>
</template>

<script setup>
import useUserData from '@/composables/useUserData'

const { userData } = useUserData()
</script>

<script>
export default {
}
</script>

<style>

</style>