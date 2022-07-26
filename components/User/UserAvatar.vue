<template>
  <q-avatar>
    <img :src="firebaseUser.photoURL" referrerpolicy="no-referrer" />
  </q-avatar>
</template>

<script setup>
const firebaseUser = useFirebaseUser()
</script>

<script>
export default {}
</script>

<style></style>
