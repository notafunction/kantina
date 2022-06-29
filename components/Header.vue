<template>
  <Menubar >
      <template #start>
        <NuxtLink to="/">Kantina</NuxtLink>
      </template>

      <template #end>
        <ClientOnly>
          <div class="flex" v-if="$user.value">
            <!-- <Button label="Log out" class="p-button-text" @click="$firebase.auth.signOut()" /> -->
            <AuthUserMenu />
          </div>
  
          <div class="flex gap-2" v-else>
            <Button label="Log in" class="p-button-text" @click="$router.push('/login')" />
            <Button label="Join Kantina for free" @click="$router.push('/signup')" />
          </div>
        </ClientOnly>

      </template>
    </Menubar>
</template>

<script>
export default {

}
</script>

<style>

</style>