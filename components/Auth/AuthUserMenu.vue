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

    <!-- <q-menu>
      <q-list style="max-width: 300px">
        <q-item>
          <q-item-section avatar>
            <UserAvatar />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ firebaseUser.displayName }}</q-item-label>
            <q-item-label caption lines="1">{{
              firebaseUser.email
            }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <q-item v-close-popup clickable to="/profile">
          <q-item-section>
            <q-item-label>Settings</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <q-item clickable @click="logoutUser">          
          <q-item-section>Logout</q-item-section>
        </q-item>
      </q-list>
    </q-menu> -->
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
