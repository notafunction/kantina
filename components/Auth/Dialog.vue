<template>
  <Dialog :modal="true" :header="dialogHeader" :visible="visible" @update:visible="$emit('update:visible', $event)">
    <AuthSignUpForm v-if="isSigningUp" v-model="signUpData" />
    <AuthLogInForm v-else v-model="logInData" />

    <template #footer v-if="isSigningUp">
      <div class="flex justify-between">
        <Button label="Log In" @click="isSigningUp = false" />
        <Button label="Sign Up" @click="onSignUp" :loading="isLoading" />
      </div>
    </template>

    <template #footer v-else>
      <div class="flex justify-between">
        <Button label="Sign Up" @click="isSigningUp = true" />
        <Button label="Log In" @click="onLogIn" :loading="isLoading" />
      </div>
    </template>
  </Dialog>
</template>

<script setup>
import { useToast } from 'vue-toastification'

const toast = useToast()
</script>

<script>
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    }
  },

  data() {
    return {
      isSigningUp: false,

      isLoading: false,
      
      signUpData: {
        email: '',
        password: '',
      },

      logInData: {
        email: '',
        password: '',
      }
    }
  },

  computed: {
    dialogHeader() {
      return this.isSigningUp ? 'Sign Up' : 'Log In'
    }
  },

  methods: {
    async onSignUp() {
      this.isLoading = true
      const auth = getAuth()

      const result = await createUserWithEmailAndPassword(auth, this.signUpData.email, this.signUpData.password)

      this.isLoading = false

      if (this.handleError(result)) return

      console.log(result)
    },

    async onLogIn() {
      this.isLoading = true

      try {
        const auth = getAuth()
        await signInWithEmailAndPassword(auth, this.logInData.email, this.logInData.password)
      } catch (error) {
        console.dir(error)
        this.handleError(error)
      }

      this.isLoading = false
    },

    handleError(error) {
      if (!error) return

      this.toast.error(error.code)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>