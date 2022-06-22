<template>
  <Menubar >
      <template #start>
        <NuxtLink to="/">Kantina</NuxtLink>
      </template>

      <template #end>
        <div class="flex gap-2">
          <Button label="Log in" class="p-button-text" @click="$router.push('/login')" />
          <Button label="Join Kantina for free" @click="$router.push('/signup')" />
        </div>
      </template>
    </Menubar>
</template>

<script>
export default {

}
</script>

<style>

</style>