<template>
  <div class="container px-4">
    <div class="font-semibold text-lg">Recent Boards</div>

    <div class="flex flex-col items-start">
      <nuxt-link
        v-for="board in boards"
        :key="board.id"
        class="p-2 rounded w-44"
        :style="`background-color: ${board.hex}`"
        :to="`/b/${board.id}`"
      >
        <div class="bg-white inline-block p-2 rounded leading-3">
          {{ board.name }}
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script setup>
// const { data: boards } = await useFetch('/api/v1/boards')

// console.log(boards)
</script>

<script>
export default {}
</script>

<style></style>
