<template>
  <div class="flex flex-1" :style="`background-color: ${backgroundColor}`">
    <h1>{{ board.name }}</h1>
  </div>
</template>

<script setup>
const route = useRoute()
const { data: board } = await useFetch(`/api/v1/boards/${route.params.boardId}`)

const backgroundColor = computed(() => board.value.hex)
</script>

<script>
export default {}
</script>

<style></style>
