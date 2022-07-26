<template>
  <div>
    <q-btn round>
      <q-avatar>
        <img :src="firebaseUser.photoURL" />

        <q-menu>
          <q-list style="max-width: 300px">
            <q-item>
              <q-item-section avatar>
                <q-avatar>
                  <img :src="firebaseUser.photoURL" />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ firebaseUser.displayName }}</q-item-label>
                <q-item-label caption lines="1">{{
                  firebaseUser.email
                }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item-label header>User Controls</q-item-label>
            <q-item v-close-popup clickable to="/profile">
              <q-item-section>
                <q-item-label>Profile</q-item-label>
                <q-item-label caption> Public profile </q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable @click="logoutUser">
              <!-- <q-item-section avatar>
                <q-avatar icon="fa-solid fa-arrow-right-from-bracket" />
              </q-item-section> -->
              <q-item-section>Logout</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-avatar>
    </q-btn>
  </div>
</template>

<script setup>
const firebaseUser = useFirebaseUser()
const { logoutUser } = useFirebaseAuth()

defineProps({
  user: {
    type: Object,
    required: true,
  },
})
</script>

<script>
export default {}
</script>

<style></style>
