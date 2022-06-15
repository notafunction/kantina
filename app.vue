<template>
  <div>
    <Menubar >
      <template #start>
        foo
      </template>

      <template #end>
        <AuthButton />
      </template>
    </Menubar>

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script>
export default {
  
}
</script>