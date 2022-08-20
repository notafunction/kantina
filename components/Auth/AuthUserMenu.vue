<template>
  <v-menu>
    <template #activator="{ props }">
      <v-btn v-bind="props" icon>
        <v-avatar size="large">
          <v-img :src="firebaseUser.photoURL" alt="" />
        </v-avatar>
      </v-btn>
    </template>

    <v-list>
      <v-list-item
        :prepend-avatar="firebaseUser.photoURL"
        :title="firebaseUser.displayName"
        :subtitle="firebaseUser.email"
      />
    </v-list>
  </v-menu>
</template>

<script setup>
const firebaseUser = useFirebaseUser()
const { logoutUser } = useFirebaseAuth()

const menu = false
</script>

<script>
export default {}
</script>

<style></style>
