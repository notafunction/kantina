<template>
  <div>
    <!-- <slot v-bind="{ toggle, hide }" />

    <PvDialog v-model:visible="dialogIsVisible" modal header="Create Board">
      <CreateBoardForm />
    </PvDialog> -->
  </div>
</template>

<script setup>
const dialogIsVisible = ref(false)

const toggle = (event) => {
  dialogIsVisible.value = !dialogIsVisible.value
}

const hide = () => {
  dialogIsVisible.value = false
}
</script>

<script>
export default {}
</script>

<style></style>
