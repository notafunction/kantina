<template>
  <div class="grid p-fluid my-4 gap-4">
    <div class="col-12 md:col-4">
        <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
                <i class="pi pi-at"></i>
            </span>
            <InputText placeholder="Email" type="email" :value="modelValue.email" @input="update('email', $event.target.value)" />
        </div>
    </div>

    <div class="col-12 md:col-4">
        <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
                <i class="pi pi-lock"></i>
            </span>
            <InputText placeholder="Password" type="password" :value="modelValue.password" @input="update('password', $event.target.value)" />
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['modelValue'],

  methods: {
    update(key, value) {
      this.$emit('update:modelValue', { ...this.modelValue, [key]: value })
    }
  }
}
</script>