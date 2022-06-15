<template>
  <div class="auth-button">
    <Button label="Login or Signup" @click="toggleDialog" />

    <AuthDialog v-model:visible="isDialogOpen" />
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

export default {
  data() {
    return {
      isDialogOpen: false,
    }
  },

  methods: {
    toggleDialog() {
      this.isDialogOpen = !this.isDialogOpen
    }
  }
}
</script>

<style>

</style>