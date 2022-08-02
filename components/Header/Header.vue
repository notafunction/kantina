<template>
  <q-toolbar class="header">
    <q-btn stretch flat to="/" exact>
      <q-avatar size="md">
        <img src="@/assets/images/logo.png" />
      </q-avatar>

      <div class="ml-2">Kantina</div>
    </q-btn>

    <q-separator spaced inset vertical />

    <template v-if="firebaseUser">
      <Button text="foo" />

      <q-btn color="primary" no-caps label="Create">
        <q-menu>
          <q-list style="max-width: 300px">
            <q-item clickable @click="showCreateBoardModal">
              <q-item-section>
                <q-item-label>Create Board</q-item-label>
                <q-item-label caption
                  >A board is made up of cards organized into lists. Use it to
                  manage projects, track information, or organize
                  anything.</q-item-label
                >
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </template>

    <q-space />

    <AuthUserMenu v-if="firebaseUser" />

    <template v-else>
      <q-btn stretch flat to="/login">Log in</q-btn>
      <q-btn stretch color="primary" to="/signup"
        >Sign up for a free account</q-btn
      >
    </template>
  </q-toolbar>
</template>

<script setup>
import { dialogInjectionKey } from 'gitart-vue-dialog'

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
