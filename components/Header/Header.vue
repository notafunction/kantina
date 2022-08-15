<template>
  <div class="bg-slate-200 flex items-center p-2 gap-2">
    <nuxt-link to="/" exact class="flex items-center">
      <v-img :src="kantinaLogo" class="h-8 w-8" />

      <div class="ml-2">Kantina</div>
    </nuxt-link>

    <it-divider vertical />

    <div v-if="firebaseUser">
      <v-menu offset-y>
        <template #activator="{ on, attrs }">
          <v-btn color="primary" v-bind="attrs" v-on="on">Create</v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title> >Create Board </v-list-item-title></v-list-item
          >
        </v-list>
      </v-menu>
    </div>

    <div class="ml-auto">
      <AuthUserMenu v-if="firebaseUser" />

      <div v-else class="flex items-center gap-1">
        <v-btn @click="$router.push('/login')">Log in</v-btn>
        <v-btn type="primary" @click="$router.push('/signup')"
          >Sign up for a free account</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { dialogInjectionKey } from 'gitart-vue-dialog'
import kantinaLogo from '~/assets/images/logo.png'

const firebaseUser = useFirebaseUser()
const $dialog = inject(dialogInjectionKey)

async function showCreateBoardModal() {
  const { default: component } = await import(
    '@/components/Dialog/DialogCreateBoard.vue'
  )

  $dialog.addDialog({
    component,
  })
}
</script>

<style lang="scss" scoped>
.header {
  @apply bg-slate-200;
}
</style>
