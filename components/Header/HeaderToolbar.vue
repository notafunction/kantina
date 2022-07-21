<template>
  <div>
    <CreateBoardOverlayWrapper>
      <template #default="{ toggle }">
        <PvButton
          label="Create"
          icon="pi pi-plus"
          class="p-button-sm"
          @click="toggle"
        />
      </template>
    </CreateBoardOverlayWrapper>
  </div>
</template>

<script setup></script>

<script>
export default {}
</script>

<style></style>
