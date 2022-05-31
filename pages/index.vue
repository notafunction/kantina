<template>
  <div>hello, world</div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',

  mounted() {
    console.log(this.$firebase)
  },
})
</script>
