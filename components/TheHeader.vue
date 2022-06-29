<template>
  <PvMenubar>
    <template #start>
      <NuxtLink to="/">Kantina</NuxtLink>
    </template>

    <template #end>
      <ClientOnly>
        <div v-if="$user.value" class="flex">
          <!-- <PvButton label="Log out" class="p-button-text" @click="$firebase.auth.signOut()" /> -->
          <AuthUserMenu />
        </div>

        <div v-else class="flex gap-2">
          <PvButton
            label="Log in"
            class="p-button-text"
            @click="$router.push('/login')"
          />
          <PvButton
            label="Join Kantina for free"
            @click="$router.push('/signup')"
          />
        </div>
      </ClientOnly>
    </template>
  </PvMenubar>
</template>

<script>
export default {}
</script>

<style></style>
