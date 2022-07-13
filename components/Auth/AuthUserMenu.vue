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
defineProps({
  user: {
    type: Object,
    required: true,
  },
})

const { logoutUser } = useFirebaseAuth()
</script>

<script>
export default {
  data() {
    return {
      menu: [
        {
          label: 'Profile',
          icon: 'pi pi-user',
          to: `/user/${this.user.uid}`,
        },
        {
          label: 'Logout',
          icon: 'pi pi-sign-out',
          command: () => this.logoutUser(),
        },
      ],
    }
  },

  computed: {
    computePvAvatarProps() {
      if (this.user.photoURL) {
        return {
          image: this.user.photoURL,
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
