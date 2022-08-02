<script setup lang="ts">
import { computed, toRefs } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: 'md',
    validator: (v: string) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(v),
  },

  text: {
    type: String,
    default: undefined,
  },

  color: {
    type: String,
    default: 'default',
  },

  to: {
    type: [Object, String],
    default: '',
  },

  href: {
    type: String,
    default: '',
  },

  disabled: {
    type: Boolean,
    default: false,
  },

  loading: {
    type: Boolean,
    default: false,
  },

  type: {
    type: String,
    default: 'button',
  },
})

const { disabled, loading } = toRefs(props)

const computedComponent = computed(() => {
  if (props.to) {
    return 'nuxt-link'
  }

  if (props.href) {
    return 'a'
  }

  return 'button'
})

const attrs = computed(() => {
  const attributes = {}

  if (props.to) {
    attributes.to = props.to
  } else if (props.href) {
    attributes.href = props.href
  } else {
    attributes.type = props.type
  }

  return attributes
})

const classes = computed(() => ['btn', `btn-${props.color}`])
</script>

<template>
  <component :is="computedComponent" :class="classes">
    <slot>
      {{ text }}
    </slot>
  </component>
</template>

<style lang="scss" scoped>
.c-button {
  @apply appearance-none
    border-none
    bg-transparent
    cursor-pointer
    px-4 py-1
    inline-flex
    flex-col
    text-sm;
  @apply font-normal
    h-auto
    relative
    align-middle
    w-auto
    items-stretch;

  &:focus {
    @apply border;
  }
}
</style>
