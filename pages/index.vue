<template>
  <div></div>
</template>

<script setup>
const { userData } = useUserData()

if (userData.value) {
  navigateTo(`/${userData.value.uid}/boards`)
}
</script>

<script></script>

<style></style>
