<script setup>
import { onMounted } from 'vue'
import { useDisplay } from 'vuetify'

const props = defineProps({
  isOpen: Boolean,
})

const display = useDisplay()
const isOpen = ref(props.isOpen)

const close = () => (isOpen.value = false)
</script>

<template>
  <v-dialog
    v-bind="$attrs"
    v-model="isOpen"
    width="auto"
    :fullscreen="display.xs.value"
  >
    <v-container width="100%">
      <slot v-bind="{ close, isOpen }" />
    </v-container>
  </v-dialog>
</template>

<style></style>
