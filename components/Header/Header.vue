<template>
  <v-app-bar>
    <template #prepend>
      <v-app-bar-nav-icon />
    </template>

    <v-app-bar-title>
      <nuxt-link to="/"> Kantina </nuxt-link>
    </v-app-bar-title>

    <v-spacer />

    <div v-if="firebaseUser">
      <v-menu offset-y>
        <template #activator="{ props }">
          <v-btn color="primary" v-bind="props" :icon="mdiPlus"></v-btn>
        </template>

        <v-list max-width="300" lines="three">
          <v-list-item value="create-board">
            <v-list-item-title>Create Board</v-list-item-title>
            <v-list-item-subtitle
              >A board is made up of cards ordered on lists. Use it to manage
              projects, track information, or organize
              anything</v-list-item-subtitle
            >

            <LazyDialogCreateBoard activator="parent" />
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <template #append>
      <AuthUserMenu v-if="firebaseUser" />

      <template v-else>
        <v-btn @click="$router.push('/login')">Log in</v-btn>
        <v-btn flat color="primary" to="/signup"
          >Sign up for a free account</v-btn
        >
      </template>
    </template>
  </v-app-bar>
</template>

<script setup>
import { mdiPlus } from '@mdi/js'
import kantinaLogo from '~/assets/images/logo.png'

const firebaseUser = useFirebaseUser()
</script>
