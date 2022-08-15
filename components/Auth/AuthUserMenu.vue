<template>
  <it-dropdown clickable placement="bottom-right">
    <UserAvatar class="cursor-pointer" />

    <template #menu>
      <it-dropdown-menu>
        <it-dropdown-item>
          <!-- <UserAvatar /> -->
        </it-dropdown-item>

        <it-dropdown-item icon="settings"> Settings </it-dropdown-item>
      </it-dropdown-menu>
    </template>

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
  </it-dropdown>
</template>

<script setup>
import UserAvatar from '../User/UserAvatar.vue'
const firebaseUser = useFirebaseUser()
const { logoutUser } = useFirebaseAuth()
</script>

<script>
export default {}
</script>

<style></style>
