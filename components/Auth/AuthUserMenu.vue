<template>
  <q-btn round dense>
    <UserAvatar />

    <q-menu>
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
          <!-- <q-item-section avatar>
                <q-avatar icon="fa-solid fa-arrow-right-from-bracket" />
              </q-item-section> -->
          <q-item-section>Logout</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script setup>
const firebaseUser = useFirebaseUser()
const { logoutUser } = useFirebaseAuth()
</script>

<script>
export default {}
</script>

<style></style>
