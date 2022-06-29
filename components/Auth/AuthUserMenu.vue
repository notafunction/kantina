<template>
  <div>
    <Avatar shape="circle" @click="toggle" class="cursor-pointer" :image="$user.value.photoURL" />

    <Menu ref="menu" :model="menu" :popup="true" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu: [
        {
          label: 'Profile',
          icon: 'pi pi-user',
          to: `/user/${this.$user.value.uid}`
        },
        {
          label: 'Logout',
          icon: 'pi pi-sign-out',
          command: () => this.$firebase.auth.signOut()
        }
      ]
    }
  },

  methods: {
    toggle(event) {
      this.$refs.menu.toggle(event)
    }
  }
}
</script>

<style>

</style>