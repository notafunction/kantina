<template>
  <GDialog max-width="500" persistent>
    <q-card>
      <q-card-section class="row items-center pb-0">
        <div v-if="title" class="text-h6">{{ title }}</div>
        <q-space />
        <q-btn
          icon="fa-solid fa-close"
          flat
          round
          dense
          @click="$emit('update:modelValue', false)"
        />
      </q-card-section>

      <q-card-section>
        <slot />
      </q-card-section>

      <q-card-actions v-if="$slots.actions" align="right">
        <slot name="actions" />
      </q-card-actions>
    </q-card>
  </GDialog>
</template>

<script>
import { GDialog } from 'gitart-vue-dialog'

export default {
  components: {
    GDialog,
  },

  props: {
    title: {
      type: String,
      required: true,
    },
  },
}
</script>

<style></style>
