<template>
  <div>
    <PvAvatar
      shape="circle"
      class="cursor-pointer"
      v-bind="computePvAvatarProps"
      @click="toggle"
    />

    <PvMenu ref="menu" :model="menu" :popup="true" />
  </div>
</template>

<script setup>
const { userData } = useUserData()
</script>

<script>
export default {
  data() {
    return {
      menu: [
        {
          label: 'Profile',
          icon: 'pi pi-user',
          to: `/user/${this.userData.uid}`,
        },
        {
          label: 'Logout',
          icon: 'pi pi-sign-out',
          command: () => this.$firebase.auth.signOut(),
        },
      ],
    }
  },

  computed: {
    computePvAvatarProps() {
      if (this.userData.photoURL) {
        return {
          image: this.userData.photoURL,
        }
      }

      return {
        icon: 'pi pi-user',
      }
    },
  },

  methods: {
    toggle(event) {
      this.$refs.menu.toggle(event)
    },
  },
}
</script>

<style></style>
